"use client";

import { ArrowUp } from "lucide-react";

interface Personal {
  name: string;
}

export default function Footer({ personal }: { personal: Personal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 py-12 mt-12 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright with Kanji Stamp */}
        <div className="flex items-center gap-2.5">
          <span className="w-5 h-5 rounded-full bg-crimson/15 border border-crimson/30 flex items-center justify-center font-serif text-[10px] text-crimson font-bold">
            刀
          </span>
          <span className="font-mono text-xs text-muted-text">
            © {new Date().getFullYear()} {personal.name} · <span className="text-text-secondary">無心 (Mushin)</span>
          </span>
        </div>

        {/* Center: Philosophy Tag */}
        <span className="font-mono text-xs text-muted-text/80 hidden md:block">
          Forged with <span className="text-blade">Next.js</span> × <span className="text-blade">TypeScript</span> × <span className="text-crimson">Rust</span>
        </span>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 font-mono text-xs text-muted-text hover:text-blade transition-colors group"
        >
          <span>Return to Top</span>
          <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
