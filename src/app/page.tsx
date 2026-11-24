import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Fit } from "@/components/fit";
import { Experience } from "@/components/experience";
import { Capabilities } from "@/components/capabilities";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Fit />
      <Experience />
      <Capabilities />
      <About />
      <Contact />
    </>
  );
}
