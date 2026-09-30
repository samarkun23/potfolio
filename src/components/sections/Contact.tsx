"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Copy, Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

interface Personal {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export default function Contact({ personal }: { personal: Personal }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      href: personal.github,
      icon: Github,
      label: "GitHub",
      handle: "samarkun23",
      kanji: "庫",
    },
    {
      href: personal.linkedin,
      icon: Linkedin,
      label: "LinkedIn",
      handle: "samar-kun",
      kanji: "結",
    },
    {
      href: personal.twitter,
      icon: Twitter,
      label: "X (Twitter)",
      handle: "@samarkun4",
      kanji: "呟",
    },
  ];

  return (
    <section id="contact" className="py-16 relative">
      <SectionHeader
        kanji="庵"
        label="The Sanctuary"
        subtitle="Initiate dialogue for systems engineering roles, high-performance builds, or collaborations"
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
          Whether you need an ultra-low latency execution engine, a real-time distributed platform, or someone who crafts code with single-digit microsecond intent — my inbox is open.
        </p>

        {/* Primary Email Box */}
        <div className="blade-card rounded-2xl p-6 sm:p-8 border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-serif text-sm text-crimson font-semibold">
              <span>無心 · Direct Transmission</span>
            </div>
            <div className="font-mono text-lg sm:text-xl font-bold text-white tracking-wide">
              {personal.email}
            </div>
            <p className="font-mono text-xs text-muted-text mt-1">
              Guaranteed response within 24 hours.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-blade hover:border-white/30 hover:bg-white/[0.08] text-xs font-mono transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-accent" />
                  <span className="text-accent font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-muted-text" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson hover:bg-crimson/90 text-white text-xs font-mono font-medium transition-all duration-200 shadow-[0_0_20px_rgba(225,29,72,0.3)]"
            >
              <Mail size={13} />
              <span>Send Email</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {links.map(({ href, icon: Icon, label, handle, kanji }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
              className="blade-card p-4 rounded-xl border border-white/10 flex items-center justify-between group hover:border-white/25 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-blade group-hover:text-crimson transition-colors">
                  <Icon size={15} />
                </div>
                <div>
                  <div className="font-mono text-xs font-medium text-white flex items-center gap-1.5">
                    <span>{label}</span>
                    <span className="font-serif text-[10px] text-muted-text/50">{kanji}</span>
                  </div>
                  <div className="font-mono text-[11px] text-muted-text mt-0.5">
                    {handle}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={13}
                className="text-muted-text group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
