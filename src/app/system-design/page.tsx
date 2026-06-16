import Link from "next/link";
import { getAllNotes } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design Notes — Samar Kun",
  description:
    "Architecture studies and system design breakdowns of large-scale distributed systems.",
};

const icons: Record<string, string> = {
  whatsapp: "💬",
  discord: "🎮",
  youtube: "▶",
  uber: "🚗",
  trading: "📈",
  twitter: "𝕏",
  netflix: "▶",
  airbnb: "🏠",
};

export default function SystemDesignIndex() {
  const notes = getAllNotes();

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-md z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-xs text-muted-text hover:text-text transition-colors flex items-center gap-1.5"
          >
            ← home
          </Link>
          <span className="text-border">/</span>
          <span className="font-mono text-xs text-accent">system-design</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-accent tracking-wider uppercase">
              [ System Design ]
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            Architecture breakdowns of large-scale distributed systems.
            Written as I study — raw, honest, and in my own words.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="font-mono text-xs text-muted-text">
              {notes.length} note{notes.length !== 1 ? "s" : ""}
            </span>
            <span className="text-border">·</span>
            <span className="font-mono text-xs text-muted-text">
              growing over time
            </span>
          </div>
        </div>

        {/* Notes list */}
        {notes.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-8 text-center">
            <p className="font-mono text-xs text-muted-text">
              <span className="text-accent">$</span> no notes yet — add{" "}
              <span className="text-text">content/system-design/whatsapp.mdx</span>
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => (
              <Link
                key={note.slug}
                href={`/system-design/${note.slug}`}
                className="group flex items-center justify-between p-4 rounded-lg border border-border bg-surface hover:border-muted transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base flex-shrink-0">
                    {icons[note.slug] ?? "📄"}
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-sm font-medium text-text group-hover:text-accent transition-colors truncate">
                      {note.title}
                    </div>
                    <div className="font-mono text-xs text-muted-text mt-0.5 truncate">
                      {note.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span className="font-mono text-xs text-muted hidden sm:block">
                    {note.readingTime}
                  </span>
                  <span className="font-mono text-xs text-muted-text group-hover:text-text transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Tags cloud if any */}
        {notes.length > 0 && (
          <div className="mt-10 pt-8 border-t border-border">
            <p className="font-mono text-xs text-muted-text mb-3">topics</p>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(notes.flatMap((n) => n.tags))).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2 py-0.5 rounded bg-border text-muted-text"
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
