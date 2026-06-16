import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getNoteBySlug } from "@/lib/mdx";
import { mdxComponents, Callout, Diagram } from "@/components/MdxComponents";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

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
    title: `${note.title} — System Design`,
    description: note.description,
  };
}

export default async function SystemDesignNote({ params }: Props) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const formattedDate = new Date(note.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky top bar */}
      <div className="border-b border-border sticky top-0 bg-background/90 backdrop-blur-md z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-2">
          <Link href="/" className="font-mono text-xs text-muted-text hover:text-text transition-colors">
            ← home
          </Link>
          <span className="text-border font-mono text-xs">/</span>
          <Link href="/system-design" className="font-mono text-xs text-muted-text hover:text-text transition-colors">
            system-design
          </Link>
          <span className="text-border font-mono text-xs">/</span>
          <span className="font-mono text-xs text-accent truncate">{slug}</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Note header */}
        <header className="mb-10 pb-8 border-b border-border">
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 rounded border border-accent/20 bg-accent/5 text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-semibold text-text leading-tight mb-3">
            {note.title}
          </h1>
          {note.description && (
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {note.description}
            </p>
          )}
          <div className="flex items-center gap-4 font-mono text-xs text-muted-text">
            <span>{formattedDate}</span>
            <span className="text-border">·</span>
            <span>{note.readingTime}</span>
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
        <footer className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/system-design"
            className="font-mono text-xs text-muted-text hover:text-accent transition-colors flex items-center gap-1.5"
          >
            ← all notes
          </Link>
          <a
            href={`https://github.com/samarkun/system-design/blob/main/${slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted-text hover:text-text transition-colors"
          >
            edit on github →
          </a>
        </footer>
      </div>
    </div>
  );
}
