export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center font-mono text-xs px-2 py-0.5 rounded bg-border text-muted-text border border-border hover:border-muted transition-colors duration-200">
      {children}
    </span>
  );
}
