import type { ComponentPropsWithoutRef } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h1"> & { id?: string };

function HeadingLink({ id, children, tag: Tag, size }: HeadingProps & { tag: "h1"|"h2"|"h3"|"h4"; size: string }) {
  return (
    <Tag id={id} className={`group relative ${size}`}>
      {id && (
        <a
          href={`#${id}`}
          className="absolute -left-5 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity text-accent font-mono text-sm"
          aria-label="Link to section"
        >
          #
        </a>
      )}
      {children}
    </Tag>
  );
}

export const mdxComponents = {
  h1: (props: HeadingProps) => (
    <HeadingLink {...props} tag="h1" size="text-xl font-semibold text-text mt-10 mb-4 leading-tight" />
  ),
  h2: (props: HeadingProps) => (
    <HeadingLink {...props} tag="h2" size="text-base font-semibold text-text mt-8 mb-3 pb-2 border-b border-border" />
  ),
  h3: (props: HeadingProps) => (
    <HeadingLink {...props} tag="h3" size="text-sm font-semibold text-text mt-6 mb-2" />
  ),
  h4: (props: HeadingProps) => (
    <HeadingLink {...props} tag="h4" size="text-sm font-medium text-text-secondary mt-4 mb-2" />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="text-sm text-text-secondary leading-relaxed my-3" />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="text-accent hover:underline underline-offset-2 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="my-3 space-y-1.5 pl-4" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} className="my-3 space-y-1.5 pl-4 list-decimal" />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="text-sm text-text-secondary leading-relaxed flex gap-2 items-start [&>*]:leading-relaxed list-none before:content-['▸'] before:text-accent before:text-xs before:mt-0.5 before:flex-shrink-0" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="my-4 pl-4 border-l-2 border-accent/50 text-sm text-text-secondary italic"
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code
          {...props}
          className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface border border-border text-accent"
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <div className="my-4 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-2 bg-surface border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
      </div>
      <pre
        {...props}
        className="p-4 overflow-x-auto bg-background text-xs leading-relaxed font-mono"
      />
    </div>
  ),
  hr: () => <hr className="my-8 border-border" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} className="font-semibold text-text" />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em {...props} className="italic text-text-secondary" />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-border">
      <table {...props} className="w-full text-xs font-mono" />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => (
    <thead {...props} className="bg-surface border-b border-border" />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th {...props} className="px-4 py-2.5 text-left text-muted-text font-medium tracking-wide" />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td {...props} className="px-4 py-2.5 text-text-secondary border-t border-border" />
  ),
  // Custom callout component — use in MDX as <Callout type="info">...</Callout>
};

// Custom components available in .mdx files
export function Callout({
  type = "info",
  children,
}: {
  type?: "info" | "warning" | "tip" | "danger";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-blue-500/30 bg-blue-500/5 text-blue-400",
    warning: "border-yellow-500/30 bg-yellow-500/5 text-yellow-400",
    tip: "border-accent/30 bg-accent/5 text-accent",
    danger: "border-red-500/30 bg-red-500/5 text-red-400",
  };
  const icons = { info: "ℹ", warning: "⚠", tip: "💡", danger: "✕" };

  return (
    <div className={`my-4 flex gap-3 rounded-lg border p-4 ${styles[type]}`}>
      <span className="text-sm flex-shrink-0 mt-0.5">{icons[type]}</span>
      <div className="text-sm leading-relaxed [&>p]:my-0 [&>p]:text-inherit">
        {children}
      </div>
    </div>
  );
}

export function Diagram({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-6">
      <div className="rounded-lg border border-border overflow-hidden bg-surface">
        <img src={src} alt={alt} className="w-full" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-muted-text">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
