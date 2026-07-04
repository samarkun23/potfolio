"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Zap } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";

interface RustSystem {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github: string;
}

export default function RustSystems({ systems }: { systems: RustSystem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="rust" ref={ref} className="py-14 border-b border-border">
      <SectionHeader label="Trading Systems" />

      <p className="text-xs text-muted-text font-mono mt-2 mb-6">
        <span className="text-accent">▸</span> High-performance infrastructure written in Rust
      </p>

      <div className="space-y-4">
        {systems.map((sys, i) => (
          <motion.div
            key={sys.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="terminal-card rounded-lg border border-border bg-surface overflow-hidden hover:border-muted transition-colors duration-300"
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
              </div>
              <span className="font-mono text-xs text-muted ml-2">
                {sys.id}.rs
              </span>
            </div>

            <div className="p-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-2">
                  <Zap size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <h3 className="font-mono text-sm font-medium text-text leading-tight">
                    {sys.name}
                  </h3>
                </div>
              </div>

              {/* Code-style description */}
              <div className="font-mono text-xs text-muted-text bg-background rounded p-3 mb-4 border border-border-subtle leading-relaxed">
                <span className="text-accent">// </span>
                {sys.description}
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {sys.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2 py-0.5 rounded border border-accent/20 bg-accent-subtle text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={sys.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border text-muted-text hover:text-text hover:border-muted transition-all duration-200"
              >
                <Github size={11} />
                View Source
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
