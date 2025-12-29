import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSobek from "@/components/AboutSobek";
import WhyChooseSobek from "@/components/WhyChooseSobek";
import AboutRightLine from "@/components/AboutRightLine";
import OurServices from "@/components/OurServices";
import FindYourCargo from "@/components/FindYourCargo";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import GetInTouch from "@/components/GetInTouch";
import { getCMSSections } from "@/lib/cms-content";
import CMSContentProvider from "@/components/CMSContentProvider";

/**
 * Home Page
 * 
 * Fetches CMS content for homepage sections and provides it to components.
 * Falls back to hardcoded content if CMS content is not available.
 */
export default async function Home() {
  // Fetch CMS content for homepage
  // If no CMS page exists, content will be empty and components use fallbacks
  const cmsContent = await getCMSSections("home");

  return (
    <main className="min-h-screen">
      <CMSContentProvider content={cmsContent}>
        <Header />
        <Hero />
        <AboutSobek />
        <WhyChooseSobek />
        <AboutRightLine />
        <OurServices />
        <FindYourCargo />
        <IndustriesWeServe />
        <GetInTouch />
      </CMSContentProvider>
    </main>
  );
}

