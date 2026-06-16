"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
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

  const links = [
    { href: `mailto:${personal.email}`, icon: Mail, label: "Email", value: personal.email, primary: true },
    { href: personal.github, icon: Github, label: "GitHub", value: "github.com/samarkun" },
    { href: personal.linkedin, icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/samarkun" },
    { href: personal.twitter, icon: Twitter, label: "X / Twitter", value: "x.com/samarkun" },
  ];

  return (
    <section id="contact" className="py-14">
      <SectionHeader label="Contact" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="mt-6"
      >
        <p className="text-sm text-text-secondary leading-relaxed mb-8">
          I&apos;m open to freelance work, full-time roles, and interesting
          collaboration. If you&apos;re building something ambitious, let&apos;s talk.
        </p>

        <div className="space-y-2">
          {links.map(({ href, icon: Icon, label, value, primary }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 group ${
                primary
                  ? "border-accent/30 bg-accent-subtle hover:bg-accent hover:border-accent"
                  : "border-border bg-surface hover:border-muted"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={14}
                  className={
                    primary
                      ? "text-accent group-hover:text-background transition-colors"
                      : "text-muted-text group-hover:text-text transition-colors"
                  }
                />
                <div>
                  <div
                    className={`font-mono text-xs font-medium ${
                      primary
                        ? "text-accent group-hover:text-background transition-colors"
                        : "text-text"
                    }`}
                  >
                    {label}
                  </div>
                  <div className="font-mono text-xs text-muted-text mt-0.5">
                    {value}
                  </div>
                </div>
              </div>
              <ArrowRight
                size={12}
                className={`transition-all duration-200 group-hover:translate-x-1 ${
                  primary
                    ? "text-accent group-hover:text-background"
                    : "text-muted-text"
                }`}
              />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
