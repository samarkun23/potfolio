"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";

interface SystemDesignItem {
  id: string;
  name: string;
  kanji?: string;
  description: string;
  topics: string[];
  readingTime?: string;
  notes: string;
}

export default function SystemDesign({ designs }: { designs: SystemDesignItem[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="system-design" ref={ref} className="py-16 relative">
      <SectionHeader
        kanji="構"
        label="Architectural Scrolls"
        subtitle="Deep breakdowns of large-scale distributed systems, consensus, and fault tolerance"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {designs.map((design, i) => (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.35, delay: i * 0.08 }}
          >
            <Link
              href={design.notes}
              className="blade-card group flex flex-col justify-between p-5 rounded-xl h-full border border-white/10 hover:border-white/25 transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    {design.kanji && (
                      <span className="w-7 h-7 rounded-lg bg-crimson/10 border border-crimson/30 flex items-center justify-center font-serif text-xs font-bold text-crimson group-hover:scale-105 transition-transform">
                        {design.kanji}
                      </span>
                    )}
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-blade transition-colors">
                      {design.name}
                    </h3>
                  </div>

                  <ArrowUpRight
                    size={14}
                    className="text-muted-text group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  {design.description}
                </p>
              </div>

              {/* Footer info: Topics & Reading time */}
              <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {design.topics.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-muted-text"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {design.readingTime && (
                  <div className="flex items-center gap-1 font-mono text-[10px] text-muted-text/80">
                    <Clock size={10} />
                    <span>{design.readingTime}</span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Show all link */}
      <div className="flex items-center justify-center pt-8">
        <Link
          href="/system-design"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-xs font-mono text-blade transition-all duration-200"
        >
          <BookOpen size={13} className="text-crimson" />
          <span>Examine All Architectural Scrolls (全書)</span>
          <ArrowUpRight size={12} className="text-muted-text" />
        </Link>
      </div>
    </section>
  );
}
