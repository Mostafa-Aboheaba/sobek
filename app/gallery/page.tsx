import Header from "@/components/Header";
import GalleryHero from "@/components/GalleryHero";
import CompanyGallery from "@/components/CompanyGallery";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Sobek Shipping Agency",
  description:
    "Browse photos of Sobek Shipping Agency vessels, cargo, and port operations.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="px-4 md:px-8 lg:px-16 pt-8">
        <GalleryHero />
      </div>

      <CompanyGallery />
      <Footer />
    </main>
  );
}
