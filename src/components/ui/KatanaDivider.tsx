"use client";

import { motion } from "framer-motion";

interface KatanaDividerProps {
  kanji?: string;
  label?: string;
}

export default function KatanaDivider({ kanji = "刀", label }: KatanaDividerProps) {
  return (
    <div className="relative py-12 flex items-center justify-center overflow-hidden">
      {/* Razor-thin hairline blade slash */}
      <div className="katana-slash" />

      {/* Center glowing blade glint */}
      <div className="katana-slash-glow" />

      {/* Kanji & label seal in center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#08090a] border border-white/10 text-muted-text text-xs"
      >
        <span className="font-serif text-blade font-semibold tracking-widest text-sm text-crimson">
          {kanji}
        </span>
        {label && (
          <span className="font-mono text-[11px] tracking-wider uppercase text-text-secondary">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
