"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Play, ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

interface Project {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  highlights?: string[];
  tech: string[];
  github: string;
  demo: string;
  screenshot: string;
  status: string;
}

export default function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-16 relative">
      <SectionHeader
        kanji="作"
        label="Living Canvases"
        subtitle="Full-stack platforms, real-time sync engines, and collaborative canvases"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            className="blade-card rounded-xl overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Mock Browser Header */}
              <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#08090a] border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]/80" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/5 font-mono text-[10px] text-muted-text">
                  <Globe size={10} className="text-muted-text/60" />
                  <span>{project.id}.engine</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Screenshot Preview */}
              <div className="relative w-full aspect-[16/9] bg-[#0c0e12] overflow-hidden border-b border-white/5">
                <Image
                  src={project.screenshot}
                  alt={project.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1014] via-transparent to-transparent opacity-40 pointer-events-none" />
              </div>

              {/* Content Body */}
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2 mb-1.5">
                  <h3 className="font-serif text-lg font-bold text-white tracking-wide">
                    {project.name}
                  </h3>
                  <span className="font-mono text-[10px] text-accent font-medium px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20">
                    {project.status}
                  </span>
                </div>

                {project.tagline && (
                  <p className="font-mono text-xs text-crimson/90 mb-3">
                    // {project.tagline}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Technical Highlights */}
                {project.highlights && (
                  <ul className="mb-4 space-y-1.5 border-t border-white/5 pt-3">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-blade font-mono"
                      >
                        <span className="text-crimson mt-0.5 flex-shrink-0">▸</span>
                        <span className="text-text-secondary">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tech.map((t) => (
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
            <div className="p-5 pt-0 flex gap-2.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] text-blade hover:border-white/30 hover:bg-white/[0.08] text-xs font-mono transition-all duration-200"
              >
                <Github size={12} />
                <span>GitHub</span>
              </a>

              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg border border-crimson/30 bg-crimson/10 text-crimson hover:bg-crimson hover:text-white text-xs font-mono font-medium transition-all duration-200"
              >
                <Play size={11} className="fill-current" />
                <span>Demo Video</span>
                <ArrowUpRight size={11} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
