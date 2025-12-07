"use client";

import { useState } from "react";

const ShipmentReservationForm = () => {
  const [formData, setFormData] = useState({
    bookingNumber: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    origin: "",
    destination: "",
    cargoType: "",
    cargoWeight: "",
    cargoDescription: "",
    preferredDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/shipment-reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cargoWeight: formData.cargoWeight ? parseFloat(formData.cargoWeight) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit reservation");
      }

      setSubmitStatus({
        type: "success",
        message: "Reservation submitted successfully! We'll contact you soon.",
      });

      // Reset form
      setFormData({
        bookingNumber: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        origin: "",
        destination: "",
        cargoType: "",
        cargoWeight: "",
        cargoDescription: "",
        preferredDate: "",
      });
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit reservation. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="bookingNumber" className="block text-neutral mb-2">
            Booking Number *
          </label>
          <input
            type="text"
            id="bookingNumber"
            name="bookingNumber"
            value={formData.bookingNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="customerName" className="block text-neutral mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="customerEmail" className="block text-neutral mb-2">
            Email *
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="customerPhone" className="block text-neutral mb-2">
            Phone *
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="origin" className="block text-neutral mb-2">
            Origin Port *
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
            placeholder="e.g., Alexandria, Egypt"
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-neutral mb-2">
            Destination Port *
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
            placeholder="e.g., Novorossiysk, Russia"
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cargoType" className="block text-neutral mb-2">
            Cargo Type *
          </label>
          <select
            id="cargoType"
            name="cargoType"
            value={formData.cargoType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select cargo type</option>
            <option value="Agriculture & Food Products">Agriculture & Food Products</option>
            <option value="Construction Materials">Construction Materials</option>
            <option value="Machinery & Equipment">Machinery & Equipment</option>
            <option value="Automotive">Automotive</option>
            <option value="Consumer Goods">Consumer Goods</option>
            <option value="Chemicals (non-hazardous)">Chemicals (non-hazardous)</option>
            <option value="Chemicals (hazardous)">Chemicals (hazardous)</option>
            <option value="Retail & FMCG">Retail & FMCG</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="cargoWeight" className="block text-neutral mb-2">
            Cargo Weight (tons)
          </label>
          <input
            type="number"
            id="cargoWeight"
            name="cargoWeight"
            value={formData.cargoWeight}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredDate" className="block text-neutral mb-2">
          Preferred Shipment Date *
        </label>
        <input
          type="date"
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
          className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="cargoDescription" className="block text-neutral mb-2">
          Cargo Description
        </label>
        <textarea
          id="cargoDescription"
          name="cargoDescription"
          value={formData.cargoDescription}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-neutral-lighter rounded focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {submitStatus.type && (
        <div
          className={`p-4 rounded ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white px-8 py-3 rounded-[50px] hover:bg-primary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Reservation"}
      </button>
    </form>
  );
};

export default ShipmentReservationForm;

