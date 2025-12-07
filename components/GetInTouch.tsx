"use client";

import { useState } from "react";
import Image from "next/image";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    helpOption: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      helpOption: option,
    }));
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
        body: JSON.stringify(formData),
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
        email: "",
        company: "",
        subject: "",
        message: "",
        helpOption: "",
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
    <footer id="contact" className="bg-primary text-white py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Image and Text */}
          <div>
            <p className="text-accent font-semibold mb-2">Get In Touch</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
              Got questions? Just fill out the form and one of our specialists will give you a quick call to help with anything you need.
            </h2>
            
            {/* Image */}
            <div 
              className="relative overflow-hidden mt-8 w-full"
              style={{
                aspectRatio: '481 / 284.5130615234375',
                borderRadius: '20px',
              }}
            >
              <Image
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-dark border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-dark border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-primary-dark border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-primary-dark border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-primary-dark border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-primary-dark border border-white/20 rounded text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-accent"
              />

              <div className="space-y-2">
                <p className="text-sm mb-2">What can we help you with?</p>
                {["Cargo Booking", "Port & Vessel Operations", "Customs Documentation", "Others"].map(
                  (option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="helpOption"
                        value={option}
                        checked={formData.helpOption === option}
                        onChange={() => handleRadioChange(option)}
                        className="w-4 h-4"
                      />
                      <span>{option}</span>
                    </label>
                  )
                )}
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
        <div className="mt-8 sm:mt-12 md:mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Logos */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative h-12 w-auto">
                <Image
                  src="/logo/sobek.png"
                  alt="Sobek Logo"
                  width={120}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
              <div className="relative h-12 w-auto">
                <Image
                  src="/logo/right.png"
                  alt="Right Line Logo"
                  width={120}
                  height={48}
                  className="h-full w-auto object-contain"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <nav>
              <ul className="space-y-2">
                {["Home", "About", "Services", "Contact"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="hover:text-accent transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Location */}
            <div>
              <p className="text-white/80">
                36 Gamal Abdel street, El-Azarita, Bab sharq, Apartment 1, Alexandria, Egypt
              </p>
            </div>

            {/* Contact */}
            <div>
              <p className="text-white/80">Phone: +201231579088</p>
              <p className="text-white/80">Email: info@sobekegy.com</p>
              
              {/* Social Media */}
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-accent transition-colors" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                  Instagram
                </a>
                <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GetInTouch;

