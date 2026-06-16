"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function GitHubActivity({ username }: { username: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="github" ref={ref} className="py-14 border-b border-border">
      <SectionHeader label="GitHub Activity" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Repos", value: "40+" },
            { label: "Commits", value: "2300+" },
            { label: "PRs", value: "80+" },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-surface p-3 text-center"
            >
              <div className="font-mono text-lg font-semibold text-text">
                {value}
              </div>
              <div className="font-mono text-xs text-muted-text mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub contribution graph */}
        <div className="rounded-lg border border-border bg-surface overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-background">
            <Github size={12} className="text-muted-text" />
            <span className="font-mono text-xs text-muted-text">
              {username} — contribution graph
            </span>
          </div>
          <div className="p-4 overflow-x-auto">
            <img
              src={`https://ghchart.rshah.org/22c55e/${username}`}
              alt="GitHub contribution graph"
              className="w-full min-w-[500px] opacity-80"
              loading="lazy"
            />
          </div>
        </div>

        {/* GitHub streak stats */}
        <div className="mt-3 rounded-lg border border-border bg-surface overflow-hidden">
          <div className="p-4 flex justify-center">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=22c55e&text_color=a1a1aa&icon_color=22c55e&bg_color=00000000`}
              alt="GitHub stats"
              className="max-w-full"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
