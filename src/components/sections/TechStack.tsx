"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

interface TechStack {
  [category: string]: string[];
}

const categoryColors: Record<string, string> = {
  Frontend: "text-blue-400 border-blue-400/20 bg-blue-400/5",
  Backend: "text-purple-400 border-purple-400/20 bg-purple-400/5",
  Systems: "text-accent border-accent/20 bg-accent/5",
  DevOps: "text-orange-400 border-orange-400/20 bg-orange-400/5",
};

export default function TechStack({ stack }: { stack: TechStack }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" ref={ref} className="py-14 border-b border-border">
      <SectionHeader label="Tech Stack" />

      <div className="mt-6 space-y-5">
        {Object.entries(stack).map(([category, techs], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.35, delay: ci * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2.5">
              <span className="font-mono text-xs text-muted-text uppercase tracking-wider">
                {category}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              {techs.map((tech, ti) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.25,
                    delay: ci * 0.1 + ti * 0.05,
                  }}
                  whileHover={{ y: -1 }}
                  className={`inline-flex items-center font-mono text-xs px-2.5 py-1 rounded-md border transition-all duration-200 ${
                    categoryColors[category] ??
                    "text-muted-text border-border bg-surface"
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
