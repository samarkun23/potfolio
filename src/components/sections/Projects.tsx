"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Video, ExternalLink } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";

interface Project {
  id: string;
  name: string;
  description: string;
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
    <section id="projects" ref={ref} className="py-14 border-b border-border">
      <SectionHeader label="Featured Projects" />

      <div className="mt-6 space-y-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group rounded-lg border border-border bg-surface overflow-hidden hover:border-muted transition-colors duration-300"
          >
            {/* Screenshot */}
            <div className="relative w-full h-40 bg-background overflow-hidden border-b border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Fallback placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-surface via-background to-surface flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-mono text-4xl text-border mb-2">{"{ }"}</div>
                    <div className="font-mono text-xs text-muted">{project.name}</div>
                  </div>
                </div>
              </div>
              <Image
                src={project.screenshot}
                alt={project.name}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                onLoad={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "1";
                }}
                onError={() => {}}
              />

              {/* Status badge */}
              {/* <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-mono text-xs text-accent">{project.status}</span>
              </div> */}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-text mb-1.5">
                {project.name}
              </h3>
              <p className="text-xs text-text-secondary leading-relaxed mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border text-muted-text hover:text-text hover:border-muted transition-all duration-200"
                >
                  <Github size={11} />
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border text-muted-text hover:text-text hover:border-muted transition-all duration-200"
                >
                  <Video size={11} />
                  Demo
                </a>
                {/* <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-border text-muted-text hover:text-text hover:border-muted transition-all duration-200 ml-auto"
                >
                  <ExternalLink size={11} />
                  Live
                </a> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
