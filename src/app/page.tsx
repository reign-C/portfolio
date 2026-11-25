import { Hero } from "@/components/hero";
import { MoreWork } from "@/components/more-work";
import { SkillsTable } from "@/components/skills-table";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <MoreWork />
      <SkillsTable />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
