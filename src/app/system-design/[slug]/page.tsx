import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getNoteBySlug } from "@/lib/mdx";
import { mdxComponents, Callout, Diagram } from "@/components/MdxComponents";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft, Clock, Calendar, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: `${note.title} — Architectural Scrolls`,
    description: note.description,
  };
}

export default async function SystemDesignNote({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const formattedDate = new Date(note.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background relative overflow-hidden zen-grid-pattern">
      <div className="zen-mist-top" />

      {/* Sticky top bar */}
      <div className="border-b border-white/5 sticky top-0 bg-[#08090a]/85 backdrop-blur-md z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/system-design"
              className="font-mono text-xs text-muted-text hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={13} />
              <span>all scrolls</span>
            </Link>
            <span className="text-white/20 font-mono text-xs">/</span>
            <span className="font-mono text-xs text-crimson truncate max-w-[200px] sm:max-w-none">
              {slug}
            </span>
          </div>

          <Link
            href="/"
            className="font-mono text-xs text-muted-text hover:text-blade transition-colors"
          >
            ~/home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {/* Note header */}
        <header className="mb-10 pb-8 border-b border-white/10">
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2.5 py-0.5 rounded border border-crimson/30 bg-crimson/10 text-crimson"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-tight mb-4 tracking-wide">
            {note.title}
          </h1>

          {note.description && (
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
              {note.description}
            </p>
          )}

          <div className="flex items-center gap-4 font-mono text-xs text-muted-text">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-crimson" />
              <span>{formattedDate}</span>
            </span>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-accent" />
              <span>{note.readingTime}</span>
            </span>
          </div>
        </header>

        {/* MDX content */}
        <article className="prose-custom">
          <MDXRemote
            source={note.content}
            components={{ ...mdxComponents, Callout, Diagram }}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </article>

        {/* Footer nav */}
        <footer className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/system-design"
            className="font-mono text-xs text-muted-text hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Return to All Scrolls</span>
          </Link>
          <a
            href={`https://github.com/samarkun23/portfolio/blob/main/content/system-design/${slug}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-text hover:text-crimson transition-colors flex items-center gap-1.5"
          >
            <span>Examine on GitHub</span>
            <ExternalLink size={12} />
          </a>
        </footer>
      </div>
    </div>
  );
}
