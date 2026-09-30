"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Zap, ArrowUpRight, Gauge } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import OrderbookSimulator from "@/components/sections/OrderbookSimulator";
import { zenSound } from "@/lib/sound";

interface RustSystem {
  id: string;
  name: string;
  kanji?: string;
  badge?: string;
  description: string;
  telemetry?: string[];
  tech: string[];
  github: string;
}

export default function RustSystems({ systems }: { systems: RustSystem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="rust" ref={ref} className="py-16 relative">
      <SectionHeader
        kanji="刃"
        label="The Forged Blades"
        subtitle="High-performance infrastructure & low-latency trading engines written in pure Rust"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {systems.map((sys, i) => (
          <motion.div
            key={sys.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.15 }}
            onMouseEnter={() => zenSound.playBambooTap()}
            className="blade-card rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Tsuba / Katana Guard Top Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#0a0c10]/90">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_rgba(225,29,72,0.8)]" />
                  <span className="font-mono text-xs text-blade font-medium">
                    {sys.id}.rs
                  </span>
                </div>
                {sys.kanji && (
                  <span className="font-serif text-xs text-crimson/90 tracking-widest font-semibold px-2 py-0.5 rounded bg-crimson/10 border border-crimson/25">
                    {sys.kanji}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Title & Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-2.5">
                    <Zap size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <h3 className="font-serif text-base font-bold text-white leading-snug">
                      {sys.name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  {sys.description}
                </p>

                {/* Telemetry Metrics Grid */}
                {sys.telemetry && (
                  <div className="mb-5 rounded-lg bg-[#08090a]/80 border border-white/5 p-3">
                    <div className="flex items-center gap-1.5 mb-2 font-mono text-[10px] text-muted-text uppercase tracking-widest">
                      <Gauge size={12} className="text-accent" />
                      <span>Telemetry Specs</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {sys.telemetry.map((metric) => (
                        <div
                          key={metric}
                          className="flex items-center gap-1.5 font-mono text-xs text-blade"
                        >
                          <span className="text-accent text-[10px]">▸</span>
                          <span className="truncate">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {sys.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2 py-0.5 rounded border border-white/10 bg-white/[0.02] text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0">
              <a
                href={sys.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => zenSound.playBladeSheen()}
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-blade hover:border-white/30 hover:bg-white/[0.08] text-xs font-mono transition-all duration-200"
              >
                <Github size={13} />
                <span>Examine Source Code</span>
                <ArrowUpRight size={12} className="text-muted-text" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Matching Engine Telemetry Simulator */}
      <OrderbookSimulator />
    </section>
  );
}
