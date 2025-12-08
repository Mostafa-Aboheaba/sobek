import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutSobek from "@/components/AboutSobek";
import AboutRightLine from "@/components/AboutRightLine";
import WhyChooseSobek from "@/components/WhyChooseSobek";
import GetInTouch from "@/components/GetInTouch";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Sobek Shipping Agency",
  description: "Learn about Sobek Shipping Agency, the exclusive agent of Right Line - Russian Shipping Line.",
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
      <AboutSobek />

      {/* About Right Line Section */}
      <AboutRightLine />

      {/* Why Choose Sobek Section */}
      <WhyChooseSobek />

      {/* Get In Touch Section */}
      <GetInTouch />

      {/* Footer */}
      <Footer />
    </main>
  );
}

