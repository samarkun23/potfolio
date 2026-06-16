"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react";
import Image from "next/image";

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

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function Hero({ personal }: { personal: Personal }) {
  const socials = [
    { href: personal.github, icon: Github, label: "GitHub" },
    { href: personal.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: personal.twitter, icon: Twitter, label: "X" },
    { href: `mailto:${personal.email}`, icon: Mail, label: "Email" },
  ];

  return (
    <section className="pt-28 pb-16 border-b border-border">
      <motion.div {...fadeUp(0.05)} className="flex items-start gap-5 mb-7">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-border bg-surface">
            <Image
              src={personal.avatar}
              alt={personal.name}
              width={64}
              height={64}
              className="object-cover w-full h-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
              }}
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-accent rounded-full border-2 border-background" />
        </div>

        {/* Name + handle */}
        <div>
          <h1 className="text-xl font-semibold text-text tracking-tight">
            {personal.name}
          </h1>
          <p className="font-mono text-xs text-muted-text mt-0.5">
            {personal.handle}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-mono text-xs text-accent">
              Available for work
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.div {...fadeUp(0.15)} className="mb-4">
        <p className="font-mono text-sm text-muted-text">
          <span className="text-accent">$</span>{" "}
          <span className="text-text">{personal.tagline}</span>
          <span className="inline-block w-0.5 h-4 bg-accent ml-1 cursor-blink align-middle" />
        </p>
      </motion.div>

      {/* Intro */}
      <motion.p {...fadeUp(0.25)} className="text-sm text-text-secondary leading-relaxed mb-8">
        {personal.intro}
      </motion.p>

      {/* Socials + Resume */}
      <motion.div {...fadeUp(0.35)} className="flex flex-wrap items-center gap-2">
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-surface text-muted-text hover:text-text hover:border-muted text-xs font-mono transition-all duration-200"
          >
            <Icon size={12} />
            {label}
          </a>
        ))}

        <span className="text-border mx-1">|</span>

        <a
          href={personal.resume}
          download
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-accent/30 bg-accent-subtle text-accent hover:bg-accent hover:text-background text-xs font-mono transition-all duration-200 font-medium"
        >
          <Download size={12} />
          Resume
        </a>
      </motion.div>
    </section>
  );
}
