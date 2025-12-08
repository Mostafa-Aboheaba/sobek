import Header from "@/components/Header";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Sobek Shipping Agency",
  description: "Get in touch with Sobek Shipping Agency for all your shipping and logistics needs.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="px-4 md:px-8 lg:px-16 pt-8">
        <ContactHero />
      </div>

      {/* Main Content - Two Columns */}
      <div className="px-4 md:px-8 lg:px-16 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {/* Left Column - Contact Info */}
            <ContactInfo />

            {/* Right Column - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}

