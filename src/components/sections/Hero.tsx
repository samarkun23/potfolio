"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Download, Check, Copy, Sparkles, X, Zap, BookOpen } from "lucide-react";
import Image from "next/image";
import { zenSound } from "@/lib/sound";

interface Personal {
  name: string;
  handle: string;
  tagline: string;
  intro: string;
  avatar: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resume: string;
}

const nagumoQuotes = [
  "Relax... it's just zero-cost abstractions.",
  "Never bring an O(N²) algorithm to a nanosecond knife fight.",
  "Why allocate on the heap when you can pin to CPU registers?",
  "I'm just a normal guy who likes razor-sharp systems.",
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function Hero({ personal }: { personal: Personal }) {
  const [copied, setCopied] = useState(false);
  const [showNagumoDial, setShowNagumoDial] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    zenSound.playBladeSheen();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAvatarClick = () => {
    zenSound.playBladeSheen();
    setQuoteIndex((prev) => (prev + 1) % nagumoQuotes.length);
    setShowNagumoDial((prev) => !prev);
  };

  const socials = [
    { href: personal.github, icon: Github, label: "GitHub" },
    { href: personal.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: personal.twitter, icon: Twitter, label: "X" },
  ];

  return (
    <section className="pt-32 pb-16 relative">
      {/* Background Watermark Kanji */}
      <div className="absolute right-0 top-16 pointer-events-none select-none opacity-[0.03] font-serif text-[180px] leading-none text-white hidden sm:block">
        無心
      </div>

      {/* Top Status Pill: In the Forge */}
      <motion.div {...fadeUp(0.05)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md mb-8">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span className="font-serif text-xs text-crimson font-medium">鍛錬</span>
        <span className="font-mono text-xs text-text-secondary">
          In the Forge · Open to Systems &amp; Full-Stack Roles
        </span>
      </motion.div>

      {/* Profile Header with Interactive Nagumo Avatar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8 relative">
        {/* Nagumo Avatar with Brushed Steel Ring */}
        <motion.div {...fadeUp(0.1)} className="relative flex-shrink-0">
          <button
            onClick={handleAvatarClick}
            onMouseEnter={() => zenSound.playBambooTap()}
            title="Click to inspect Nagumo's Concealed Blade"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[0_0_25px_rgba(255,255,255,0.06)] hover:scale-105 active:scale-95 transition-all duration-200 block text-left group"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-surface relative">
              <Image
                src={personal.avatar}
                alt={personal.name}
                width={96}
                height={96}
                priority
                className="object-cover w-full h-full"
              />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-crimson/90 border border-white/20 flex items-center justify-center text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles size={10} />
            </span>
          </button>
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-accent rounded-full border-2 border-background shadow-[0_0_8px_rgba(16,185,129,0.6)]" />

          {/* Nagumo Easter Egg Popover */}
          <AnimatePresence>
            {showNagumoDial && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute left-0 sm:left-full top-full sm:top-0 sm:ml-4 mt-3 sm:mt-0 z-30 w-72 rounded-2xl bg-[#0e1014]/95 backdrop-blur-xl border border-white/15 p-4 shadow-2xl"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <span className="font-serif text-xs font-bold text-crimson flex items-center gap-1.5">
                    <span>刀</span>
                    <span>Nagumo's Concealed Tool</span>
                  </span>
                  <button
                    onClick={() => setShowNagumoDial(false)}
                    className="text-muted-text hover:text-white p-0.5"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="font-mono text-xs text-blade italic mb-3">
                  &ldquo;{nagumoQuotes[quoteIndex]}&rdquo;
                </p>
                <div className="flex flex-col gap-1.5">
                  <a
                    href="#rust"
                    onClick={() => {
                      setShowNagumoDial(false);
                      zenSound.playBladeSheen();
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-text-secondary hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Zap size={12} className="text-accent" />
                      <span>Inspect Orderbook Engine</span>
                    </span>
                    <span className="text-[10px] text-muted-text">刃</span>
                  </a>
                  <a
                    href="#system-design"
                    onClick={() => {
                      setShowNagumoDial(false);
                      zenSound.playBladeSheen();
                    }}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono text-text-secondary hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen size={12} className="text-crimson" />
                      <span>Read System Design Scrolls</span>
                    </span>
                    <span className="text-[10px] text-muted-text">構</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Name & Handle */}
        <motion.div {...fadeUp(0.15)}>
          <div className="flex items-baseline gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
              {personal.name}
            </h1>
            <span className="font-serif text-lg text-crimson font-medium">
              無心
            </span>
          </div>
          <p className="font-mono text-xs text-muted-text mt-1">
            {personal.handle} · India
          </p>
          <p className="font-mono text-xs text-accent mt-1 flex items-center gap-1.5">
            <span>Systems Craftsman</span>
            <span className="text-white/20">|</span>
            <span className="text-text-secondary">Rust &amp; Distributed Architecture</span>
          </p>
        </motion.div>
      </div>

      {/* Main Punchy Statement */}
      <motion.div {...fadeUp(0.25)} className="mb-6 max-w-3xl">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-blade leading-snug">
          Forging <span className="text-transparent bg-clip-text bg-gradient-to-r from-blade via-slate-100 to-zinc-400">low-latency systems</span> with razor-sharp discipline.
        </h2>
      </motion.div>

      {/* Terminal Teletype Badge */}
      <motion.div {...fadeUp(0.3)} className="mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0e1014] border border-white/10 font-mono text-xs text-muted-text">
          <span className="text-crimson">$</span>
          <span className="text-text">cargo run --release -p orderbook</span>
          <span className="text-white/20">→</span>
          <span className="text-accent">&lt; 1μs p99 matching</span>
          <span className="inline-block w-1.5 h-3 bg-crimson cursor-blink align-middle" />
        </div>
      </motion.div>

      {/* Philosophical Intro */}
      <motion.p {...fadeUp(0.35)} className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
        {personal.intro}
      </motion.p>

      {/* Action Buttons: Copy Email, Socials, Resume */}
      <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-2.5">
        {/* Copy Email Button */}
        <button
          onClick={handleCopyEmail}
          onMouseEnter={() => zenSound.playBambooTap()}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 bg-white/[0.04] text-blade hover:border-white/30 hover:bg-white/[0.08] text-xs font-mono transition-all duration-200"
          title="Click to copy email"
        >
          {copied ? (
            <>
              <Check size={13} className="text-accent" />
              <span className="text-accent">Copied to clipboard!</span>
            </>
          ) : (
            <>
              <Mail size={13} className="text-muted-text" />
              <span>{personal.email}</span>
              <Copy size={11} className="text-muted-text/60 ml-1" />
            </>
          )}
        </button>

        {/* Social Links */}
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => zenSound.playBambooTap()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-surface text-muted-text hover:text-white hover:border-white/25 text-xs font-mono transition-all duration-200"
          >
            <Icon size={13} />
            <span>{label}</span>
          </a>
        ))}

        <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

        {/* Download Resume with Crimson Accent */}
        <a
          href={personal.resume}
          download
          onClick={() => zenSound.playBladeSheen()}
          onMouseEnter={() => zenSound.playBambooTap()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-crimson/40 bg-crimson/10 text-crimson hover:bg-crimson hover:text-white text-xs font-mono font-medium transition-all duration-200 shadow-[0_0_15px_rgba(225,29,72,0.15)]"
        >
          <Download size={13} />
          <span>Resume (経歴書)</span>
        </a>
      </motion.div>
    </section>
  );
}
