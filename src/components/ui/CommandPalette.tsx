"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ArrowRight,
  Mail,
  Download,
  Volume2,
  VolumeX,
  Github,
  Zap,
  BookOpen,
  X,
  Code2
} from "lucide-react";
import { zenSound } from "@/lib/sound";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions";
  kanji: string;
  icon: typeof Search;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const closePalette = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const openPalette = () => {
    setIsOpen(true);
    zenSound.playZenBell();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on Cmd+K, Ctrl+K or '/'
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) closePalette();
        else openPalette();
      } else if (e.key === "/" && !isOpen && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        openPalette();
      } else if (e.key === "Escape" && isOpen) {
        closePalette();
      }
    };

    const handleCustomOpen = () => openPalette();
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  const items: CommandItem[] = [
    {
      id: "about",
      title: "The Philosophy (道)",
      category: "Navigation",
      kanji: "道",
      icon: Code2,
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        closePalette();
      },
    },
    {
      id: "rust",
      title: "The Forged Blades / Rust Systems (刃)",
      category: "Navigation",
      kanji: "刃",
      icon: Zap,
      action: () => {
        document.getElementById("rust")?.scrollIntoView({ behavior: "smooth" });
        closePalette();
      },
    },
    {
      id: "projects",
      title: "Living Canvases / Projects (作)",
      category: "Navigation",
      kanji: "作",
      icon: ArrowRight,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        closePalette();
      },
    },
    {
      id: "design",
      title: "Architectural Scrolls / System Design (構)",
      category: "Navigation",
      kanji: "構",
      icon: BookOpen,
      action: () => {
        document.getElementById("system-design")?.scrollIntoView({ behavior: "smooth" });
        closePalette();
      },
    },
    {
      id: "contact",
      title: "The Sanctuary / Contact (庵)",
      category: "Navigation",
      kanji: "庵",
      icon: Mail,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        closePalette();
      },
    },
    {
      id: "email",
      title: "Copy Email (samarkun4@gmail.com)",
      category: "Actions",
      kanji: "寫",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText("samarkun4@gmail.com");
        zenSound.playBladeSheen();
        alert("Email copied to clipboard!");
        closePalette();
      },
    },
    {
      id: "resume",
      title: "Download Resume PDF (経歴書)",
      category: "Actions",
      kanji: "歴",
      icon: Download,
      action: () => {
        zenSound.playBladeSheen();
        window.open("/resume.pdf", "_blank");
        closePalette();
      },
    },
    {
      id: "sound",
      title: `Toggle Zen Audio FX (${zenSound.isEnabled() ? "Disable" : "Enable"})`,
      category: "Actions",
      kanji: "音",
      icon: zenSound.isEnabled() ? VolumeX : Volume2,
      action: () => {
        zenSound.setEnabled(!zenSound.isEnabled());
        closePalette();
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile (samarkun23)",
      category: "Actions",
      kanji: "庫",
      icon: Github,
      action: () => {
        window.open("https://github.com/samarkun23", "_blank");
        closePalette();
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleArrowNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
      zenSound.playBambooTap();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      zenSound.playBambooTap();
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl rounded-2xl bg-[#0c0e12] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10"
            onKeyDown={handleArrowNav}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#08090a]">
              <Search size={16} className="text-crimson" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or jump to section... (or ESC to close)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm font-mono text-white placeholder:text-muted-text/70 outline-none"
              />
              <span className="font-mono text-[10px] text-muted-text px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03]">
                ESC
              </span>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-8 text-center font-mono text-xs text-muted-text">
                  No matching scrolls or actions found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        zenSound.playBambooTap();
                        item.action();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs transition-colors ${
                        isSelected
                          ? "bg-white/[0.08] text-white border border-white/15"
                          : "text-text-secondary hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-crimson/15 border border-crimson/30 flex items-center justify-center font-serif text-[11px] text-crimson font-bold">
                          {item.kanji}
                        </span>
                        <Icon size={14} className={isSelected ? "text-accent" : "text-muted-text"} />
                        <span className="font-medium text-left">{item.title}</span>
                      </div>
                      <span className="font-mono text-[10px] text-muted-text">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Navigation hints */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/10 bg-[#08090a] font-mono text-[10px] text-muted-text">
              <span>Use ↑↓ to navigate</span>
              <span>Press ENTER to execute</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
