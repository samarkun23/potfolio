interface SectionHeaderProps {
  label: string;
}

export default function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs text-accent tracking-wider uppercase">
        [ {label} ]
      </span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
