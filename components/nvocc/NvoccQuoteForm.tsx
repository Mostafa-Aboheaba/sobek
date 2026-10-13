"use client";

import { useState, type FormEvent } from "react";
import { cargoTypes, nvoccDestinationLabel, nvoccDestinations } from "@/lib/nvocc";

const inputClassName =
  "w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-full";

const NvoccQuoteForm = () => {
  const [origin, setOrigin] = useState("Alexandria, Egypt");
  const [destination, setDestination] = useState(nvoccDestinationLabel(nvoccDestinations[0]));
  const [cargoType, setCargoType] = useState<(typeof cargoTypes)[number]>("FCL");
  const [volume, setVolume] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const message = [
      "NVOCC quote request",
      `Origin: ${origin}`,
      `Destination: ${destination}`,
      `Cargo type: ${cargoType}`,
      `Volume / weight: ${volume}`,
    ].join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address: origin,
          message,
          helpOption: "NVOCC Quote",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send quote request");
      }

      setStatus({ type: "success", message: "Thank you. Our commercial team will contact you shortly." });
      setVolume("");
      setName("");
      setEmail("");
      setPhone("");
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Failed to send quote request. Please try again.";
      setStatus({ type: "error", message: messageText });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="scroll-mt-28 px-4 md:px-8 lg:px-16 pb-16 sm:pb-20" aria-labelledby="nvocc-quote-heading">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
        <div>
          <p className="section-label mb-2">Request a quote</p>
          <h2 id="nvocc-quote-heading" className="section-heading-lg mb-4">
            Tell us the lane and the cargo.
          </h2>
          <p className="text-neutral-dark leading-relaxed mb-6">
            Share origin, destination, and cargo details. The commercial team replies with space and a Sobek bill of lading option.
          </p>
          <a
            href="tel:+201016078688"
            className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Talk to our commercial team
          </a>
          <p className="mt-3 text-sm text-neutral-light">+20 101 607 8688 · info@sobek-egy.com</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-background p-5 sm:p-8 rounded-[24px] space-y-4" aria-describedby="quote-status">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-neutral-dark">
              Origin
              <input
                type="text"
                name="origin"
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                required
                className={`${inputClassName} mt-2`}
              />
            </label>
            <label className="block text-sm font-medium text-neutral-dark">
              Destination
              <select
                name="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                required
                className={`${inputClassName} mt-2`}
              >
                {nvoccDestinations.map((item) => {
                  const label = nvoccDestinationLabel(item);
                  return (
                    <option key={item.id} value={label}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-sm font-medium text-neutral-dark">
              Cargo type
              <select
                name="cargoType"
                value={cargoType}
                onChange={(event) => setCargoType(event.target.value as (typeof cargoTypes)[number])}
                required
                className={`${inputClassName} mt-2`}
              >
                {cargoTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-neutral-dark">
              Volume / weight
              <input
                type="text"
                name="volume"
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
                required
                placeholder="e.g. 1 x 40HC or 8 CBM"
                className={`${inputClassName} mt-2`}
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <label className="block text-sm font-medium text-neutral-dark">
              Contact name
              <input
                type="text"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                autoComplete="name"
                className={`${inputClassName} mt-2`}
              />
            </label>
            <label className="block text-sm font-medium text-neutral-dark">
              Email
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className={`${inputClassName} mt-2`}
              />
            </label>
            <label className="block text-sm font-medium text-neutral-dark">
              Phone
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                autoComplete="tel"
                className={`${inputClassName} mt-2`}
              />
            </label>
          </div>

          {status && (
            <p
              id="quote-status"
              role="status"
              className={`text-sm font-medium ${status.type === "success" ? "text-primary" : "text-red-700"}`}
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-white px-8 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Request a Quote"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NvoccQuoteForm;
