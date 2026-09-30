"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Layers, Database, Cpu } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

interface TechStack {
  [category: string]: string[];
}

const categoryIcons: Record<string, { icon: typeof Terminal; kanji: string; color: string }> = {
  "Systems & Low-Level": { icon: Cpu, kanji: "極", color: "text-crimson border-crimson/30 bg-crimson/10" },
  "Full-Stack & Real-Time": { icon: Layers, kanji: "創", color: "text-accent border-accent/30 bg-accent/10" },
  "Storage & Databases": { icon: Database, kanji: "蓄", color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
  "Infrastructure & Tooling": { icon: Terminal, kanji: "基", color: "text-purple-400 border-purple-400/30 bg-purple-400/10" },
};

export default function TechStack({ stack }: { stack: TechStack }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="py-16 relative">
      <SectionHeader
        kanji="具"
        label="Tools of the Craft"
        subtitle="Languages, systems runtimes, storage primitives, and infrastructure"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(stack).map(([category, techs], ci) => {
          const meta = categoryIcons[category] ?? {
            icon: Terminal,
            kanji: "技",
            color: "text-blade border-white/20 bg-white/5",
          };
          const Icon = meta.icon;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: ci * 0.1 }}
              className="blade-card rounded-xl p-5 border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} className="text-text-secondary" />
                    <span className="font-serif text-sm font-bold text-white tracking-wide">
                      {category}
                    </span>
                  </div>
                  <span
                    className={`font-serif text-xs px-2 py-0.5 rounded border font-semibold ${meta.color}`}
                  >
                    {meta.kanji}
                  </span>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, ti) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.05, y: -1 }}
                      transition={{ duration: 0.15 }}
                      className="inline-flex items-center font-mono text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] text-blade hover:border-white/30 hover:bg-white/[0.06] transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
