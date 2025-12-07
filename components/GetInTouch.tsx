"use client";

import { useState } from "react";
import SafeImage from "./SafeImage";

const GetInTouch = () => {
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
    <footer id="contact" className="bg-white py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16">
      <div className="max-w-[1392px] mx-auto">
        {/* Footer Container */}
        <div 
          className="text-white mx-auto"
          style={{
            width: '100%',
            maxWidth: '1392px',
            minHeight: '1001.0001220703125px',
            paddingTop: '96px',
            paddingRight: '96px',
            paddingBottom: '64px',
            paddingLeft: '96px',
            borderRadius: '40px',
            background: '#2A478B',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        <div className="grid md:grid-cols-2 gap-12 flex-1">
          {/* Left Side - Image and Text */}
          <div>
            <p className="text-accent font-semibold mb-2">Get In Touch</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Got questions? <span className="text-highlight">Just fill out</span> <span className="text-highlight">the form</span> and one of our specialists will give you a <span className="text-highlight">quick call</span> to help with anything you need.
            </h2>
            
            {/* Image */}
            <div 
              className="relative overflow-hidden mt-8 w-full"
              style={{
                aspectRatio: '481 / 284.5130615234375',
                borderRadius: '20px',
              }}
            >
              <SafeImage
                src="/images/footer-bg.png"
                alt="Cargo ship"
                fill
                className="object-cover"
                style={{ borderRadius: '20px' }}
              />
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-4">
              <p className="text-gray-500 text-sm mb-4">* all fields are required</p>
              
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />

              <div>
                <p className="text-gray-900 text-sm font-medium mb-2">What can we help you with?</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Cargo Booking", "Customs Documentation", "Port & Vessel Operations", "Others"].map(
                    (option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          name="helpOptions"
                          value={option}
                          checked={formData.helpOptions?.includes(option) || false}
                          onChange={() => handleCheckboxChange(option)}
                          className="custom-checkbox w-4 h-4 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                          style={{
                            accentColor: '#2A478B',
                          }}
                        />
                        <span className="text-gray-900 select-none">{option}</span>
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
                className="w-full bg-accent text-white px-8 py-3 rounded-[50px] hover:bg-accent-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-auto" style={{ paddingTop: '92px' }}>
          <div className="border-t border-white/20" style={{ paddingTop: '92px', paddingBottom: '92px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {/* Logos */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative overflow-hidden" style={{ width: '202.2701416015625px', height: '92.28339385986328px', borderRadius: '12px' }}>
                <SafeImage
                  src="/logo/sobek-white.png"
                  alt="Sobek Logo"
                  width={202.2701416015625}
                  height={92.28339385986328}
                  className="object-contain"
                  style={{ borderRadius: '12px' }}
                />
              </div>
              <div className="relative overflow-hidden" style={{ width: '202.2701416015625px', height: '92.28339385986328px', borderRadius: '12px' }}>
                <SafeImage
                  src="/logo/right-white.png"
                  alt="Right Line Logo"
                  width={202.2701416015625}
                  height={92.28339385986328}
                  className="object-contain"
                  style={{ borderRadius: '12px' }}
                />
              </div>
            </div>

            {/* Navigation Links */}
            <nav>
              <h3 className="text-white font-semibold mb-2">Home</h3>
              <ul className="space-y-2">
                {["About", "Services", "Contact"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/80 hover:text-accent transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Location */}
            <div>
              <h3 className="text-white font-semibold mb-2">Locations</h3>
              <p className="text-white/80">
                36 Banni Abbas street, Al Azarita
              </p>
              <p className="text-white/80">
                Bab sharq, Apartment 1,
              </p>
              <p className="text-white/80">
                Alexandria, Egypt
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-2">Contact Us</h3>
              <p className="text-white/80">Phone: +201016078688</p>
              <p className="text-white/80">cs@sobekegy.com</p>
            </div>

            {/* Social Media Icons - Stacked Vertically */}
            <div className="flex flex-col gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" 
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" 
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" 
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default GetInTouch;

