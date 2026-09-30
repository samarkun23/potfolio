"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Search } from "lucide-react";
import { zenSound } from "@/lib/sound";

const navItems = [
  { label: "About", href: "#about", kanji: "道" },
  { label: "Blades", href: "#rust", kanji: "刃" },
  { label: "Works", href: "#projects", kanji: "作" },
  { label: "Design", href: "#system-design", kanji: "構" },
  { label: "Stack", href: "#stack", kanji: "具" },
  { label: "Contact", href: "#contact", kanji: "庵" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });

    // Initial sound state
    setSoundActive(zenSound.isEnabled());

    const handleSoundToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setSoundActive(customEvent.detail);
    };
    window.addEventListener("zen-sound-toggle", handleSoundToggle);

    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("zen-sound-toggle", handleSoundToggle);
    };
  }, []);

  const toggleSound = () => {
    const nextState = !soundActive;
    zenSound.setEnabled(nextState);
    setSoundActive(nextState);
  };

  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none"
      >
        <div
          className={`pointer-events-auto w-full max-w-5xl h-12 rounded-full px-4 sm:px-5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-[#0b0d11]/85 backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              : "bg-[#0e1014]/60 backdrop-blur-sm border border-white/5"
          }`}
        >
          {/* Logo with Zen Blade emblem */}
          <a
            href="#"
            onMouseEnter={() => zenSound.playBambooTap()}
            className="flex items-center gap-2.5 group transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-crimson/15 border border-crimson/40 flex items-center justify-center font-serif text-xs font-semibold text-crimson group-hover:scale-105 transition-transform">
              刀
            </span>
            <span className="font-mono text-xs font-medium text-blade tracking-wider group-hover:text-white transition-colors">
              samarkun<span className="text-crimson">.</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => zenSound.playBambooTap()}
                className="group flex items-center gap-1.5 font-mono text-xs text-muted-text hover:text-blade transition-colors tracking-wide"
              >
                <span className="text-[10px] text-muted-text/50 font-serif group-hover:text-crimson transition-colors">
                  {item.kanji}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Bar: Cmd+K, Sound Toggle, CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Command Palette Trigger */}
            <button
              onClick={triggerCommandPalette}
              title="Open Command Palette (Cmd + K or /)"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-muted-text hover:text-white bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all"
            >
              <Search size={11} className="text-crimson" />
              <span className="hidden sm:inline text-[10px] text-muted-text">⌘K</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? "Zen Audio FX Enabled (Click to mute)" : "Zen Audio FX Muted (Click to enable)"}
              className={`p-1.5 rounded-full border transition-all ${
                soundActive
                  ? "bg-accent/15 border-accent/40 text-accent shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "bg-white/[0.03] border-white/10 text-muted-text hover:text-white"
              }`}
            >
              {soundActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            {/* Let's Talk CTA */}
            <a
              href="#contact"
              onClick={() => zenSound.playBladeSheen()}
              onMouseEnter={() => zenSound.playBambooTap()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-blade border border-white/10 bg-white/[0.03] hover:border-crimson/50 hover:bg-crimson/10 hover:text-white transition-all duration-200"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight size={12} className="text-crimson" />
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden text-muted-text hover:text-blade p-1"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-18 left-4 right-4 z-40 rounded-2xl bg-[#0e1014]/95 backdrop-blur-xl border border-white/10 p-5 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    zenSound.playBambooTap();
                    setOpen(false);
                  }}
                  className="flex items-center justify-between font-mono text-xs text-text-secondary hover:text-white py-2 border-b border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-crimson font-serif text-xs">{item.kanji}</span>
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight size={12} className="text-muted-text" />
                </a>
              ))}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    triggerCommandPalette();
                  }}
                  className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-muted-text font-mono text-xs text-center"
                >
                  Search (⌘K)
                </button>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex-1 text-center py-2 rounded-lg bg-crimson/15 border border-crimson/30 text-crimson font-mono text-xs font-medium hover:bg-crimson hover:text-white transition-colors"
                >
                  Contact
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
