import Header from "@/components/Header";
import ServicesHero from "@/components/ServicesHero";
import OurServices from "@/components/OurServices";
import FindYourCargo from "@/components/FindYourCargo";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import GetInTouch from "@/components/GetInTouch";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - Sobek Shipping Agency",
  description: "Discover our comprehensive shipping and logistics services.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="px-4 md:px-8 lg:px-16 pt-8">
        <ServicesHero />
      </div>

      {/* Our Services Section */}
      <OurServices />

      {/* Find Your Cargo Section */}
      <FindYourCargo />

      {/* Industries We Serve Section */}
      <IndustriesWeServe />

      {/* Get In Touch Section */}
      <GetInTouch />
    </main>
  );
}

