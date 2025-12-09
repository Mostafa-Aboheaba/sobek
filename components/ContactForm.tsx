"use client";

import React, { useState } from "react";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const ContactForm = () => {
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation<HTMLDivElement>();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    message: "",
    helpOptions: ["Cargo Booking"], // Default checked
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData((prev) => {
      const currentOptions = prev.helpOptions || [];
      if (currentOptions.includes(option)) {
        // Don't allow unchecking if it's the only option
        if (currentOptions.length === 1) {
          return prev;
        }
        return {
          ...prev,
          helpOptions: currentOptions.filter((opt) => opt !== option),
        };
      } else {
        return {
          ...prev,
          helpOptions: [...currentOptions, option],
        };
      }
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          helpOption: formData.helpOptions?.join(', ') || '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll contact you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        email: "",
        message: "",
        helpOptions: ["Cargo Booking"],
      });
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={formRef}
      className={`scroll-animate-right ${formVisible ? 'visible' : ''}`}
    >
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 space-y-4 hover-lift shadow-lg" style={{ borderRadius: '20px' }}>
        <p className="text-gray-500 text-sm mb-4">* all fields are required</p>
        
        {/* Name and Phone Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            style={{ borderRadius: '50px' }}
          />
          
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            style={{ borderRadius: '50px' }}
          />
        </div>
        
        {/* Address and Email Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            style={{ borderRadius: '50px' }}
          />
          
          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            style={{ borderRadius: '50px' }}
          />
        </div>
        
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          style={{ borderRadius: '24px' }}
        />

        <div>
          <p className="text-gray-900 text-sm font-medium mb-2">What can we help you with?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {["Cargo Booking", "Customs Documentation", "Port & Vessel Operations", "Others"].map(
              (option) => (
                <label key={option} className="flex items-start sm:items-center gap-2 cursor-pointer select-none min-w-0">
                  <input
                    type="checkbox"
                    name="helpOptions"
                    value={option}
                    checked={formData.helpOptions?.includes(option) || false}
                    onChange={() => handleCheckboxChange(option)}
                    className="custom-checkbox w-4 h-4 border-gray-300 rounded focus:ring-primary-500 focus:ring-2 flex-shrink-0 mt-0.5 sm:mt-0"
                    style={{
                      accentColor: '#2A478B',
                    }}
                  />
                  <span className="select-none text-xs sm:text-sm break-words min-w-0 flex-1" style={{ color: '#2A478B' }}>{option}</span>
                </label>
              )
            )}
          </div>
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
          className="w-full text-white px-8 py-3 rounded transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{ backgroundColor: '#A6823A' }}
        >
          {isSubmitting ? "Sending..." : "Send Request"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

