"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Server } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";

interface SystemDesignItem {
  id: string;
  name: string;
  description: string;
  topics: string[];
  notes: string;
}

const icons: Record<string, string> = {
  whatsapp: "💬",
  discord: "🎮",
  youtube: "▶",
  uber: "🚗",
  trading: "📈",
};

export default function SystemDesign({ designs }: { designs: SystemDesignItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="system-design" ref={ref} className="py-10 border-b border-border">
      <SectionHeader label="System Design" />

      <p className="text-xs text-muted-text font-mono mt-2 mb-6">
        <span className="text-accent">▸</span> Architecture studies of large-scale systems
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {designs.map((design, i) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <Link
              href={design.notes}
              className="group flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface hover:border-muted hover:bg-background transition-all duration-300 h-full"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{icons[design.id] ?? "🏗"}</span>
                  <span className="font-mono text-sm font-medium text-text">
                    {design.name}
                  </span>
                </div>
                <BookOpen
                  size={12}
                  className="text-muted-text group-hover:text-accent transition-colors"
                />
              </div>

              {/* Description */}
              <p className="text-xs text-text-secondary leading-relaxed">
                {design.description}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-1 mt-auto">
                {design.topics.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-1.5 py-0.5 rounded bg-border text-muted-text"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>

        ))}
      </div>
      <div className="flex items-center justify-center pt-5 group ">
        <div className="flex items-center gap-3 "  style={{ transition: "color 0.3s" }}>
          <BookOpen
            size={18}
            className= "text-muted-text group-hover:text-text transition-colors"
          />
          <Link href="/system-design"
            className="text-xs text-text-secondary group-hover:text-text transition-colors" 
          >
            Show all
          </Link>
        </div>
      </div>
    </section>
  );
}
