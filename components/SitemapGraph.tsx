"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { SITE, type SitePage } from "@/lib/content";

const CATEGORY_RADIUS = 140;
const PAGE_RADIUS = 300;
const CENTER = 340;

function polar(radius: number, angle: number) {
  return {
    x: CENTER + radius * Math.cos(angle - Math.PI / 2),
    y: CENTER + radius * Math.sin(angle - Math.PI / 2),
  };
}

export default function SitemapGraph({ pages }: { pages: SitePage[] }) {
  const categories = Array.from(new Set(pages.map((page) => page.category)));

  return (
    <svg viewBox={`0 0 ${CENTER * 2} ${CENTER * 2}`} role="img" aria-label="サイトマップ構成図" className="w-full">
      <motion.circle
        cx={CENTER}
        cy={CENTER}
        r={28}
        className="fill-yahari-navy"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      />
      <text x={CENTER} y={CENTER} textAnchor="middle" dominantBaseline="middle" className="fill-white text-[11px] font-bold">
        {SITE.name}
      </text>

      {categories.map((category, categoryIndex) => {
        const categoryAngle = (categoryIndex / categories.length) * Math.PI * 2;
        const categoryPos = polar(CATEGORY_RADIUS, categoryAngle);
        const categoryPages = pages.filter((page) => page.category === category);

        return (
          <g key={category}>
            <motion.line
              x1={CENTER}
              y1={CENTER}
              x2={categoryPos.x}
              y2={categoryPos.y}
              className="stroke-yahari-sky"
              strokeWidth={1.5}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            />
            <motion.circle
              cx={categoryPos.x}
              cy={categoryPos.y}
              r={8}
              className="fill-yahari-accent"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
            <text
              x={categoryPos.x}
              y={categoryPos.y - 12}
              textAnchor="middle"
              className="fill-yahari-navy text-[10px] font-bold"
            >
              {category}
            </text>

            {categoryPages.map((page, pageIndex) => {
              const spread = Math.PI / 5;
              const pageAngle =
                categoryAngle - spread / 2 + (categoryPages.length > 1 ? (pageIndex / (categoryPages.length - 1)) * spread : 0);
              const pagePos = polar(PAGE_RADIUS, pageAngle);

              return (
                <g key={page.href}>
                  <motion.line
                    x1={categoryPos.x}
                    y1={categoryPos.y}
                    x2={pagePos.x}
                    y2={pagePos.y}
                    className="stroke-gray-300"
                    strokeWidth={1}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  />
                  <motion.g
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Link href={page.href}>
                      <circle cx={pagePos.x} cy={pagePos.y} r={5} className="fill-yahari-navy hover:fill-yahari-accent" />
                      <text
                        x={pagePos.x}
                        y={pagePos.y + (pagePos.y > CENTER ? 16 : -10)}
                        textAnchor="middle"
                        className="fill-gray-700 text-[9px] hover:underline"
                      >
                        {page.title}
                      </text>
                    </Link>
                  </motion.g>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
