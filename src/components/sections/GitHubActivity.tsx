"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, GitCommit, GitPullRequest, FolderGit2, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function GitHubActivity({ username }: { username: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { label: "Repositories Forged", value: "40+", icon: FolderGit2, kanji: "庫" },
    { label: "Code Commits", value: "2,300+", icon: GitCommit, kanji: "刻" },
    { label: "Pull Requests Merged", value: "80+", icon: GitPullRequest, kanji: "結" },
  ];

  return (
    <section id="github" ref={ref} className="py-16 relative">
      <SectionHeader
        kanji="錬"
        label="The Daily Discipline"
        subtitle="Continuous daily practice, open-source activity, and code telemetry"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {stats.map(({ label, value, icon: Icon, kanji }) => (
            <div
              key={label}
              className="blade-card rounded-xl p-4 flex items-center justify-between border border-white/10"
            >
              <div>
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {value}
                </div>
                <div className="font-mono text-xs text-text-secondary mt-0.5 flex items-center gap-1.5">
                  <Icon size={12} className="text-crimson" />
                  <span>{label}</span>
                </div>
              </div>
              <span className="font-serif text-lg font-bold text-white/10">
                {kanji}
              </span>
            </div>
          ))}
        </div>

        {/* Contribution Graph Frame */}
        <div className="blade-card rounded-xl overflow-hidden border border-white/10">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0c10] border-b border-white/10">
            <div className="flex items-center gap-2">
              <Github size={13} className="text-crimson" />
              <span className="font-mono text-xs text-blade">
                github.com/{username}
              </span>
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-muted-text hover:text-white transition-colors"
            >
              <span>View Profile</span>
              <ArrowUpRight size={11} />
            </a>
          </div>

          <div className="p-5 overflow-x-auto flex justify-center bg-[#08090a]/60">
            <img
              src={`https://ghchart.rshah.org/10b981/${username}`}
              alt="GitHub contribution chart"
              className="w-full min-w-[620px] max-w-3xl opacity-85 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
