import Header from "@/components/Header";
import ShipSchedule from "@/components/ShipSchedule";
import Footer from "@/components/Footer";

export default function SchedulePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
        <ShipSchedule />
      </div>
      <Footer />
    </main>
  );
}

