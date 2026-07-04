"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

interface Props {
  personal: { intro: string };
  skills: { about: string[] };
}

export default function About({ skills }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-14 border-b border-border">
      <SectionHeader label="About" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mt-6 space-y-4"
      >
        <p className="text-sm text-text-secondary leading-relaxed">
          I&apos;m a{" "}
          <span className="text-text font-medium">self-taught developer</span>{" "}
           Recently, I've been exploring systems programming with Rust and C++, real-time
  applications using WebSockets, and Web3 infrastructure. I'm always building,
  learning, and pushing myself through challenging projects. 
        </p>
        <p className="text-sm text-text-secondary leading-relaxed">
          My current focus is on{" "}
          <span className="text-accent font-mono text-xs font-medium">
            systems programming
          </span>{" "}
          and{" "}
          <span className="text-accent font-mono text-xs font-medium">
            Web3 infrastructure
          </span>
          . I&apos;m interested in the intersection of high-performance backend
          systems and decentralized applications.
        </p>

        <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-border">
          {skills.about.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 size={12} className="text-accent flex-shrink-0" />
              <span className="font-mono text-xs text-text-secondary">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
