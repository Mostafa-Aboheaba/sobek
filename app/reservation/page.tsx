import Header from "@/components/Header";
import ShipmentReservationForm from "@/components/ShipmentReservationForm";

export default function ReservationPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold mb-2">Shipment Reservation</p>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Reserve Your Cargo Space
            </h1>
            <p className="text-neutral max-w-2xl mx-auto">
              Fill out the form below to reserve space on our ships. Our team will contact you to confirm your reservation and provide further details.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <ShipmentReservationForm />
          </div>
        </div>
      </section>
    </main>
  );
}

