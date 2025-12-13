"use client";

import { useState } from "react";
import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const FindYourCargo = () => {
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();
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
      const params = new URLSearchParams({
        bookingNumber: bookingNumber,
      });
      if (contactInfo) {
        params.append('contactInfo', contactInfo);
      }
      
      const response = await fetch(
        `/api/shipment-reservations?${params.toString()}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to track shipment");
      }

      // Success - emails have been sent
      setTrackingResult({
        found: true,
        data,
        message: data.message || "Tracking request received! We'll send you an update shortly.",
      });
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
    <section id="tracking" className="py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-end">
          {/* Left Side - Form */}
          <div 
            ref={formRef}
            className={`scroll-animate-left ${formVisible ? 'visible' : ''}`}
          >
            <p className="mb-2 section-label">Find Your Cargo</p>
            <h2 className="mb-6 section-heading-lg">
              Drop your <span className="text-highlight">Booking number</span> and <span className="text-highlight">contact method</span>. We&apos;ll track it and send you the latest update.
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
                  placeholder="ex: RDEDK/ALYNVS1125001234"
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
                    className="tracking-button w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <p className="font-semibold">{trackingResult.message}</p>
                  {trackingResult.found && trackingResult.data?.note && (
                    <p className="mt-2 text-sm opacity-90">{trackingResult.data.note}</p>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Image */}
          <div 
            ref={imageRef}
            className={`relative w-full scroll-animate-right hover-lift ${imageVisible ? 'visible' : ''}`}
            style={{ 
              borderRadius: '40px',
              overflow: 'hidden',
              minHeight: '250px'
            }}
          >
            <SafeImage
              src="/images/tracking-container-truck.png"
              alt="Shipping container on truck"
              width={600}
              height={400}
              className="w-full h-auto object-contain"
              style={{ borderRadius: '40px' }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindYourCargo;

