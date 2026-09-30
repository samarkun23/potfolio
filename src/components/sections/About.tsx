"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

interface Props {
  personal: { intro: string };
  skills: { about: string[] };
}

export default function About({ skills }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-16 relative">
      <SectionHeader 
        kanji="道" 
        label="The Philosophy" 
        subtitle="Self-taught discipline, low-level mastery, and intentional design" 
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Narrative */}
        <div className="md:col-span-7 space-y-4">
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            I am a <span className="text-blade font-medium">self-taught software engineer</span>. 
            Without formal dogma, I learned by dissecting systems from the metal up: from manual memory layout in <span className="text-accent font-mono text-xs">C++</span> and fearless concurrency in <span className="text-accent font-mono text-xs">Rust</span>, to sub-100ms real-time event loops using <span className="text-accent font-mono text-xs">WebSockets</span>.
          </p>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            I treat code like a swordsmith treats steel — every line must have purpose. Bloat, unnecessary heap allocations, and sloppy abstractions are discarded. My current focus is building <span className="text-blade font-medium">high-throughput trading engines</span>, <span className="text-blade font-medium">real-time distributed applications</span>, and exploring decentralized infrastructure.
          </p>
        </div>

        {/* Right Column: Disciplines Grid */}
        <div className="md:col-span-5 blade-card rounded-xl p-5 border border-white/10">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
            <span className="font-mono text-xs text-muted-text uppercase tracking-widest">
              Core Disciplines
            </span>
            <span className="font-serif text-xs text-crimson font-medium">技</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {skills.about.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-2.5 py-1 px-2 rounded hover:bg-white/[0.03] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-crimson shadow-[0_0_6px_rgba(225,29,72,0.8)]" />
                <span className="font-mono text-xs text-blade/90">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
