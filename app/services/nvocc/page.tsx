import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NvoccPageContent from "@/components/nvocc/NvoccPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NVOCC Services - Sobek Shipping Agency",
  description:
    "Ship FCL and LCL from Alexandria under one Sobek bill of lading. NVOCC services to 10+ destinations with one contract and one point of contact.",
};

export default function NvoccPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <NvoccPageContent />
      <Footer />
    </main>
  );
}
