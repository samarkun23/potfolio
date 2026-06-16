interface Personal {
  name: string;
}

export default function Footer({ personal }: { personal: Personal }) {
  return (
    <footer className="border-t border-border py-8 mt-4">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <span className="font-mono text-xs text-muted-text">
          <span className="text-accent">©</span> {new Date().getFullYear()} {personal.name}
        </span>
        <span className="font-mono text-xs text-muted-text">
          Built with{" "}
          <span className="text-accent">Next.js</span> ×{" "}
          <span className="text-accent">TypeScript</span>
        </span>
      </div>
    </footer>
  );
}
