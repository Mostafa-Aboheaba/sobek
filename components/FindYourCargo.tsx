"use client";

import { useState } from "react";
import Image from "next/image";

const FindYourCargo = () => {
  const [bookingNumber, setBookingNumber] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<{
    found: boolean;
    data?: any;
    message?: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    setTrackingResult(null);

    try {
      const response = await fetch(
        `/api/shipment-reservations?bookingNumber=${encodeURIComponent(bookingNumber)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to track shipment");
      }

      if (data) {
        setTrackingResult({
          found: true,
          data,
          message: `Status: ${data.status.toUpperCase()}`,
        });
      } else {
        setTrackingResult({
          found: false,
          message: "No reservation found with this booking number.",
        });
      }
    } catch (error: any) {
      setTrackingResult({
        found: false,
        message: error.message || "Failed to track shipment. Please try again.",
      });
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <section id="tracking" className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end">
          {/* Left Side - Form */}
          <div>
            <p className="mb-2 section-label">Find Your Cargo</p>
            <h2 className="mb-6 section-heading-lg">
              Drop your <span className="text-highlight">Booking number and</span><br />
              <span className="text-highlight">contact method</span>. We&apos;ll track it and<br />
              send you the <span className="text-highlight">latest update</span>.
            </h2>
            
            <form onSubmit={handleSubmit} className="mt-8" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label htmlFor="booking" className="tracking-label">
                  Enter your Booking number or Bill of lading number
                </label>
                <input
                  type="text"
                  id="booking"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value)}
                  placeholder="ex: REDALYNVS11223344"
                  className="tracking-input"
                />
              </div>
              
              <div>
                <label htmlFor="contact" className="tracking-label">
                  Enter your Phone number or Email
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    id="contact"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="+201233445566 / user@mail.com"
                    className="tracking-input flex-1"
                  />
                  <button
                    type="submit"
                    disabled={isTracking}
                    className="tracking-button w-full sm:w-auto"
                  >
                    {isTracking ? "Tracking..." : "Track"}
                  </button>
                </div>
              </div>
              
              {trackingResult && (
                <div
                  className={`p-4 rounded ${
                    trackingResult.found
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {trackingResult.message}
                  {trackingResult.found && trackingResult.data && (
                    <div className="mt-2 text-sm">
                      <p>Origin: {trackingResult.data.origin}</p>
                      <p>Destination: {trackingResult.data.destination}</p>
                      <p>Cargo Type: {trackingResult.data.cargoType}</p>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/tracking-container-truck.png"
              alt="Shipping container on truck"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourCargo;

