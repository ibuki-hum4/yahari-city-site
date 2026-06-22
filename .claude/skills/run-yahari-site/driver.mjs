// REPL driver for 矢張市サイト (Next.js + Bun). Run with: node driver.mjs
// Designed for agents: wrap in tmux, send-keys commands, capture-pane output.
// `launch` starts `bun run dev` as a managed child process (so the agent never
// has to invoke `bun run dev` directly) and connects headless Chromium to it.
import { chromium } from "playwright";
import { spawn, spawnSync } from "node:child_process";
import * as readline from "node:readline";
import * as fs from "node:fs";
import * as path from "node:path";

const APP_DIR = path.resolve(import.meta.dirname, "../../..");
const SHOT_DIR = process.env.SCREENSHOT_DIR || path.join(import.meta.dirname, "shots");
fs.mkdirSync(SHOT_DIR, { recursive: true });
const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

let devServer = null;
let browser = null;
let page = null;
const consoleErrors = [];

// Last-resort cleanup: whatever taskkill /T missed, find the PID actually
// LISTENING on `port` (via netstat) and kill that directly. POSIX equivalent
// would be `lsof -ti:port | xargs kill -9`, but this driver targets Windows.
function killPort(port) {
  if (process.platform !== "win32") return;
  const out = spawnSync("netstat", ["-ano"], { encoding: "utf8" }).stdout || "";
  const pids = new Set();
  for (const line of out.split("\n")) {
    if (line.includes(`:${port} `) && line.includes("LISTENING")) {
      const pid = line.trim().split(/\s+/).pop();
      if (pid && /^\d+$/.test(pid)) pids.add(pid);
    }
  }
  for (const pid of pids) spawnSync("taskkill", ["/F", "/T", "/PID", pid]);
}

function waitForServer(timeoutMs = 60_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(BASE_URL);
        if (res.status < 500) return resolve();
      } catch {
        // not up yet
      }
      if (Date.now() - start > timeoutMs) return reject(new Error("dev server did not become ready in time"));
      setTimeout(tick, 500);
    };
    tick();
  });
}

const COMMANDS = {
  async launch() {
    if (devServer) return console.log("already launched");
    killPort(PORT); // clear out any orphan from a previous run that didn't shut down cleanly
    console.log("starting `bun run dev`...");
    // Single command string (not an args array) with shell:true avoids Node's
    // DEP0190 warning, which only fires for the args-array + shell:true combo.
    devServer = spawn("bun run dev", { cwd: APP_DIR, shell: true });
    devServer.on("error", (e) => console.log("dev server error:", e.message));
    await waitForServer();

    browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    page = await context.newPage();
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${e.message}`));
    console.log("launched. dev server + chromium ready at", BASE_URL);
  },

  async nav(target) {
    if (!page) return console.log("ERROR: launch first");
    await page.goto(`${BASE_URL}${target || "/"}`, { waitUntil: "networkidle" });
    console.log("nav ->", page.url());
  },

  async ss(name) {
    if (!page) return console.log("ERROR: launch first");
    const f = path.join(SHOT_DIR, `${name || `ss-${Date.now()}`}.png`);
    await page.screenshot({ path: f, fullPage: true });
    console.log("screenshot:", f);
  },

  async click(sel) {
    if (!page) return console.log("ERROR: launch first");
    const r = await page.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return "NOT_FOUND";
      el.click();
      return "OK";
    }, sel);
    console.log("click", sel, "->", r);
  },

  async "click-text"(text) {
    if (!page) return console.log("ERROR: launch first");
    const r = await page.evaluate((t) => {
      const els = [...document.querySelectorAll('button, a, [role="button"]')];
      const el = els.find((e) => e.textContent?.trim() === t) ?? els.find((e) => e.textContent?.includes(t));
      if (!el) return "NOT_FOUND";
      el.click();
      return `OK: ${el.tagName}`;
    }, text);
    console.log("click-text", JSON.stringify(text), "->", r);
  },

  async fill(args) {
    if (!page) return console.log("ERROR: launch first");
    const [sel, ...rest] = args.split(" ");
    await page.fill(sel, rest.join(" "));
    console.log("fill", sel);
  },

  async type(text) {
    if (page) await page.keyboard.type(text, { delay: 30 });
  },

  async press(key) {
    if (page) await page.keyboard.press(key);
  },

  async wait(sel) {
    if (!page) return console.log("ERROR: launch first");
    try {
      await page.waitForSelector(sel, { timeout: 10_000 });
      console.log("found:", sel);
    } catch {
      console.log("TIMEOUT:", sel);
    }
  },

  async "wait-text"(text) {
    if (!page) return console.log("ERROR: launch first");
    try {
      await page.waitForFunction((t) => document.body.innerText.includes(t), text, { timeout: 10_000 });
      console.log("found text:", text);
    } catch {
      console.log("TIMEOUT waiting for text:", text);
    }
  },

  async eval(expr) {
    if (!page) return console.log("ERROR: launch first");
    try {
      console.log(JSON.stringify(await page.evaluate(expr)));
    } catch (e) {
      console.log("ERROR:", e.message);
    }
  },

  async text(sel) {
    if (!page) return console.log("ERROR: launch first");
    console.log(
      await page.evaluate((s) => (s ? document.querySelector(s) : document.body)?.innerText ?? "(null)", sel || null)
    );
  },

  async "console-errors"() {
    console.log(consoleErrors.length ? consoleErrors : "(none)");
  },

  async quit() {
    if (browser) await browser.close().catch(() => {});
    if (devServer) {
      // `shell: true` makes devServer.pid the shell's pid, not bun/next's — plain
      // .kill() only terminates that shell on Windows, leaving next dev orphaned
      // and still bound to the port. taskkill /T *should* kill the whole tree, but
      // how bun/next nest their own child processes varies run-to-run, so /T alone
      // has been observed to leave the actual port-holder alive. killPort() below
      // is the real guarantee: find whatever PID is LISTENING on PORT and kill it.
      if (process.platform === "win32") {
        spawnSync("taskkill", ["/F", "/T", "/PID", String(devServer.pid)]);
      } else {
        devServer.kill();
      }
    }
    killPort(PORT);
    browser = null;
    page = null;
    devServer = null;
    console.log("stopped.");
  },

  help() {
    console.log("commands:", Object.keys(COMMANDS).join(", "));
  },
};

// Unlike Electron, Playwright's chromium.launch() doesn't steal stdin, so plain
// process.stdin works here (and is portable to Windows, unlike a /dev/stdin fd trick).
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: "driver> " });

// readline emits a "line" event per buffered line as soon as data arrives —
// if several commands are piped in at once (e.g. `printf 'a\nb\n' | node driver.mjs`),
// all "line" events fire before an async handler for the first one resolves.
// Queue + a single in-flight runner keeps piped commands sequential.
const queue = [];
let draining = false;
let closed = false; // stdin EOF (piped input closes almost instantly — must not cut off in-flight commands)

async function drainQueue() {
  if (draining) return;
  draining = true;
  while (queue.length) {
    const line = queue.shift();
    const [cmd, ...rest] = line.trim().split(/\s+/);
    if (!cmd) continue;
    const fn = COMMANDS[cmd];
    if (!fn) {
      console.log("unknown:", cmd, "— try: help");
      continue;
    }
    try {
      await fn(rest.join(" "));
    } catch (e) {
      console.log("ERROR:", e.message);
    }
    if (cmd === "quit") {
      process.exit(0);
    }
    if (!closed) rl.prompt();
  }
  draining = false;
  if (closed) {
    // stdin already ended (e.g. piped input) and no explicit "quit" was queued — clean up now.
    await COMMANDS.quit();
    process.exit(0);
  }
}

rl.on("line", (line) => {
  queue.push(line);
  drainQueue();
});
rl.on("close", () => {
  closed = true;
  if (!draining && queue.length === 0) {
    COMMANDS.quit().then(() => process.exit(0));
  }
  // otherwise drainQueue() notices `closed` once the queue empties and exits then
});

console.log('yahari-city-site driver — "help" for commands, "launch" to start');
rl.prompt();
