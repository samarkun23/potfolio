interface SectionHeaderProps {
  label: string;
  kanji?: string;
  subtitle?: string;
}

export default function SectionHeader({ label, kanji, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        {kanji && (
          <span className="kanji-seal text-xs px-2 py-0.5 font-serif font-bold">
            {kanji}
          </span>
        )}
        <span className="font-mono text-xs text-blade font-medium tracking-widest uppercase">
          {label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
      </div>
      {subtitle && (
        <p className="text-xs text-text-secondary font-mono mt-2 flex items-center gap-2">
          <span className="text-crimson">▸</span> {subtitle}
        </p>
      )}
    </div>
  );
}
