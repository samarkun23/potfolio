import Link from "next/link";
import { getAllNotes } from "@/lib/mdx";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Architectural Scrolls (全書) — Samar Kun",
  description:
    "Architecture studies and system design breakdowns of large-scale distributed systems.",
};

const kanjiSlugs: Record<string, string> = {
  whatsapp: "通信",
  discord: "集会",
  loadbalancer: "平衡",
  image_upload_service: "画像",
};

export default function SystemDesignIndex() {
  const notes = getAllNotes();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden zen-grid-pattern">
      <div className="zen-mist-top" />

      {/* Back nav */}
      <div className="border-b border-white/5 sticky top-0 bg-[#08090a]/85 backdrop-blur-md z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs text-muted-text hover:text-white transition-colors flex items-center gap-1.5 group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>~/home</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="font-serif text-xs text-crimson font-medium">全書</span>
            <span className="font-mono text-xs text-blade">architectural-scrolls</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="kanji-seal text-xs px-2 py-0.5 font-serif font-bold">
              構
            </span>
            <span className="font-mono text-xs text-blade font-medium tracking-widest uppercase">
              Architectural Scrolls
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide mb-3">
            Dissecting High-Scale Systems
          </h1>

          <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
            In-depth architecture studies and distributed systems breakdowns. Written with zero fluff — focusing on failure modes, data flows, and sub-second scale.
          </p>

          <div className="flex items-center gap-2 mt-4 font-mono text-xs text-muted-text">
            <span className="text-accent">{notes.length} scrolls available</span>
            <span>·</span>
            <span>Expanded continuously</span>
          </div>
        </div>

        {/* Notes list */}
        {notes.length === 0 ? (
          <div className="rounded-xl border border-white/10 blade-card p-8 text-center">
            <p className="font-mono text-xs text-muted-text">
              <span className="text-crimson">$</span> no scrolls yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <Link
                key={note.slug}
                href={`/system-design/${note.slug}`}
                className="blade-card group flex items-center justify-between p-5 rounded-xl border border-white/10 hover:border-white/25 transition-all duration-300"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-crimson/10 border border-crimson/30 flex items-center justify-center font-serif text-xs font-bold text-crimson flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    {kanjiSlugs[note.slug] ?? "書"}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-blade transition-colors">
                      {note.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed line-clamp-2">
                      {note.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-muted-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                  <span className="font-mono text-xs text-muted-text hidden sm:flex items-center gap-1">
                    <Clock size={11} />
                    <span>{note.readingTime}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-text group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Tags cloud */}
        {notes.length > 0 && (
          <div className="mt-14 pt-8 border-t border-white/10">
            <p className="font-mono text-xs text-muted-text mb-3 uppercase tracking-wider">
              Study Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(notes.flatMap((n) => n.tags))).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.02] text-blade"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
