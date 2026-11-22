import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { Capabilities } from "@/components/capabilities";
import { Fit } from "@/components/fit";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Work />
        <Experience />
        <Capabilities />
        <Fit />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
