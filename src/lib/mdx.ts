import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content/system-design");

export interface NoteMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  draft?: boolean;
}

export interface Note extends NoteMetadata {
  content: string;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function getNoteBySlug(slug: string): Note | null {
  const extensions = [".mdx", ".md"];
  let filePath = "";

  for (const ext of extensions) {
    const candidate = path.join(CONTENT_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    tags: data.tags ?? [],
    readingTime: rt.text,
    draft: data.draft ?? false,
    content,
  };
}

export function getAllNotes(): NoteMetadata[] {
  return getAllSlugs()
    .map((slug) => {
      const note = getNoteBySlug(slug);
      if (!note || note.draft) return null;
      const { content: _, ...meta } = note;
      return meta;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as NoteMetadata[];
}
