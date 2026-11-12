import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutSobek from "@/components/AboutSobek";
import WhyChooseSobek from "@/components/WhyChooseSobek";
import GetInTouch from "@/components/GetInTouch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Sobek Shipping Agency",
  description: "Learn about Sobek Shipping Agency, a maritime and logistics partner based in Alexandria.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="px-4 md:px-8 lg:px-16 pt-8">
        <AboutHero />
      </div>

      {/* About Sobek Section */}
      <AboutSobek showImage={false} />

      {/* Why Choose Sobek Section */}
      <WhyChooseSobek />

      {/* Get In Touch Section */}
      <GetInTouch />
    </main>
  );
}

