import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import RustSystems from "@/components/sections/RustSystems";
import SystemDesign from "@/components/sections/SystemDesign";
import TechStack from "@/components/sections/TechStack";
import GitHubActivity from "@/components/sections/GitHubActivity";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import KatanaDivider from "@/components/ui/KatanaDivider";
import BladeCursor from "@/components/effects/BladeCursor";
import CommandPalette from "@/components/ui/CommandPalette";
import data from "@/data/portfolio.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden zen-grid-pattern">
      {/* Interactive Katana Blade Cursor Trail */}
      <BladeCursor />

      {/* Developer Command Palette (Cmd + K or /) */}
      <CommandPalette />

      {/* Zen Ambient Mist Breathing Glow */}
      <div className="zen-mist-top" />

      <Nav />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <Hero personal={data.personal} />
        
        <KatanaDivider kanji="道" label="Philosophy" />
        <About personal={data.personal} skills={data.skills} />

        <KatanaDivider kanji="刃" label="The Forged Blades" />
        <RustSystems systems={data.rustSystems} />

        <KatanaDivider kanji="作" label="Living Canvases" />
        <Projects projects={data.projects} />

        <KatanaDivider kanji="構" label="Architectural Scrolls" />
        <SystemDesign designs={data.systemDesign} />

        <KatanaDivider kanji="具" label="Tools of the Craft" />
        <TechStack stack={data.techStack} />

        <KatanaDivider kanji="錬" label="The Daily Discipline" />
        <GitHubActivity username="samarkun23" />

        <KatanaDivider kanji="庵" label="Sanctuary" />
        <Contact personal={data.personal} />
      </div>
      <Footer personal={data.personal} />
    </main>
  );
}
