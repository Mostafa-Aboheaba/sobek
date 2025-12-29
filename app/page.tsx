import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSobek from "@/components/AboutSobek";
import WhyChooseSobek from "@/components/WhyChooseSobek";
import AboutRightLine from "@/components/AboutRightLine";
import OurServices from "@/components/OurServices";
import FindYourCargo from "@/components/FindYourCargo";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import GetInTouch from "@/components/GetInTouch";
import { initializeContent } from "@/lib/content";

// Force dynamic rendering in development to get fresh CMS content on each request
export const dynamic = process.env.NODE_ENV === "development" ? "force-dynamic" : "auto";

export default async function Home() {
  // Ensure content is initialized before rendering client components
  // This is critical for client components to get fresh content from CMS
  await initializeContent();
  
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutSobek />
      <WhyChooseSobek />
      <AboutRightLine />
      <OurServices />
      <FindYourCargo />
      <IndustriesWeServe />
      <GetInTouch />
    </main>
  );
}

