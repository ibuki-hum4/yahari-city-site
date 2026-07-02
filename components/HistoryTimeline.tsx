"use client";

import { motion } from "motion/react";
import type { HistoryEvent } from "@/lib/content";

export default function HistoryTimeline({ events }: { events: HistoryEvent[] }) {
  return (
    <ol className="relative border-l-2 border-yahari-sky pl-8">
      {events.map((event, index) => (
        <motion.li
          key={`${event.date}-${event.title}`}
          className="relative mb-10 last:mb-0"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <motion.span
            className="absolute -left-[41px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-yahari-navy"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
          />
          <time className="text-sm font-semibold text-yahari-navy">{event.date}</time>
          <h2 className="mt-1 font-bold text-gray-800">{event.title}</h2>
          {event.description && (
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{event.description}</p>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
