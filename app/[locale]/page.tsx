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
 * Home Page (Locale-aware)
 * 
 * Fetches CMS content for homepage sections based on locale.
 * Falls back to hardcoded content if CMS content is not available.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Fetch CMS content for homepage with locale
  const cmsContent = await getCMSSections("home", locale);

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

