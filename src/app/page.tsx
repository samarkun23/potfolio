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
import data from "@/data/portfolio.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Hero personal={data.personal} />
        <About personal={data.personal} skills={data.skills} />
        <Projects projects={data.projects} />
        <RustSystems systems={data.rustSystems} />
        <SystemDesign designs={data.systemDesign} />
        <TechStack stack={data.techStack} />
        <GitHubActivity username="samarkun23" />
        <Contact personal={data.personal} />
      </div>
      <Footer personal={data.personal} />
    </main>
  );
}
