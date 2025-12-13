"use client";

import React, { useState } from "react";
import Link from "next/link";
import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const GetInTouchLeftContent = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  return (
    <div 
      ref={ref}
      className={`scroll-animate-left ${isVisible ? 'visible' : ''}`}
    >
      <p className="text-white font-semibold mb-2">Get In Touch</p>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
        Got questions? <span style={{ color: '#EAD292' }}>Just fill out</span> <span style={{ color: '#EAD292' }}>the form</span> and one of our specialists will give you a <span style={{ color: '#EAD292' }}>quick call</span> to help with anything you need.
      </h2>
      
      {/* Image */}
      <div 
        className="relative overflow-hidden mt-8 w-full hover-lift"
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
  );
};

const GetInTouch = () => {
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
      // Try API first (works in development)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api/contact";
      let response: Response;
      let data: any;

      try {
        // Try API route first
        response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            helpOption: formData.helpOptions?.join(', ') || '',
          }),
        });

        data = await response.json();

        if (response.ok) {
          // API worked!
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
          setIsSubmitting(false);
          return;
        }
      } catch (apiError) {
        // API failed, try FormSubmit
        console.log("API not available, using FormSubmit...");
      }

      // Fallback: Use Web3Forms (more reliable than FormSubmit)
      const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_WEB3FORMS_KEY";
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "info@sobek-egy.com";
      
      // Try Web3Forms first (more reliable)
      if (web3formsAccessKey && web3formsAccessKey !== "YOUR_WEB3FORMS_KEY") {
        try {
          const web3formsData = {
            access_key: web3formsAccessKey,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address || "",
            message: formData.message || "",
            helpOption: formData.helpOptions?.join(', ') || "",
            subject: `New Contact Form Submission from ${formData.name}`,
            from_name: formData.name,
            to: adminEmail,
          };

          console.log("Sending form to Web3Forms...");
          
          response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(web3formsData),
          });

          data = await response.json();
          console.log("Web3Forms response:", data);

          if (data.success) {
            setSubmitStatus({
              type: "success",
              message: "Thank you! We'll contact you soon.",
            });

            setFormData({
              name: "",
              phone: "",
              address: "",
              email: "",
              message: "",
              helpOptions: ["Cargo Booking"],
            });
            setIsSubmitting(false);
            return;
          }
        } catch (web3Error) {
          console.log("Web3Forms failed, trying FormSubmit...", web3Error);
        }
      }

      // Fallback: Use FormSubmit
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address || "");
      formDataToSend.append("message", formData.message || "");
      formDataToSend.append("helpOption", formData.helpOptions?.join(', ') || "");
      formDataToSend.append("_subject", `New Contact Form Submission from ${formData.name}`);
      formDataToSend.append("_replyto", formData.email);
      formDataToSend.append("_template", "box");
      formDataToSend.append("_captcha", "false");
      formDataToSend.append("_autoresponse", `Thank you ${formData.name} for contacting Sobek Shipping Agency. We'll get back to you soon!`);

      console.log("Sending form to FormSubmit:", adminEmail);
      
      response = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      });

      const responseText = await response.text();
      console.log("FormSubmit response status:", response.status);
      console.log("FormSubmit response:", responseText);
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        // FormSubmit sometimes returns HTML instead of JSON
        if (response.ok || response.status === 200) {
          // Success - FormSubmit accepted the form
          data = { success: true };
        } else {
          throw new Error("Failed to submit form");
        }
      }

      // FormSubmit returns success even if email needs confirmation
      // So we show success message
      if (response.ok || response.status === 200 || data.success) {
        console.log("Form submitted successfully");
      } else {
        throw new Error(data.message || "Failed to submit form");
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
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: error.message || "Failed to submit form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-white py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-[1392px] mx-auto">
        {/* Footer Container */}
        <div 
          className="text-white mx-auto overflow-hidden"
            style={{
            width: '100%',
            maxWidth: '1392px',
            minHeight: 'auto',
            paddingTop: 'clamp(48px, 8vw, 96px)',
            paddingRight: 'clamp(16px, 6vw, 96px)',
            paddingBottom: 'clamp(32px, 6vw, 64px)',
            paddingLeft: 'clamp(16px, 6vw, 96px)',
            borderRadius: 'clamp(20px, 4vw, 40px)',
            background: '#2A478B',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 flex-1 items-end">
          {/* Left Side - Image and Text */}
          <GetInTouchLeftContent />

          {/* Right Side - Contact Form */}
          <div 
            ref={formRef}
            className={`scroll-animate-right ${formVisible ? 'visible' : ''}`}
          >
            <form id="contact-form" onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 space-y-4 hover-lift" style={{ borderRadius: '20px' }}>
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
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  style={{ borderRadius: '50px' }}
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
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
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  style={{ borderRadius: '50px' }}
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
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
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
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
                className="w-full bg-accent text-white px-8 py-3 rounded-[50px] hover:bg-accent-dark transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-auto" style={{ paddingTop: 'clamp(48px, 8vw, 92px)' }}>
          <div className="border-t border-white/20" style={{ paddingTop: 'clamp(48px, 8vw, 92px)' }}>
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 md:gap-8 overflow-hidden">
              {/* Small & Medium screens: Logos and Links Vertically */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 w-full lg:w-auto">
                {/* Logos */}
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap sm:flex-nowrap lg:mr-8">
                  <SafeImage
                    src="/logo/sobek-white.png"
                    alt="Sobek Logo"
                    width={202}
                    height={92}
                    className="object-contain max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-full h-auto flex-shrink-0"
                    style={{ borderRadius: '12px' }}
                  />
                  <a 
                    href="https://vr-tamozhnya.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-transform duration-300 hover:scale-105 cursor-pointer"
                    aria-label="Visit Right Line website"
                  >
                    <SafeImage
                      src="/logo/right-white.png"
                      alt="Right Line Logo"
                      width={202}
                      height={92}
                      className="object-contain max-w-[120px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-full h-auto flex-shrink-0"
                      style={{ borderRadius: '12px' }}
                    />
                  </a>
                </div>

                {/* Navigation Links - Vertical on small & medium screens, hidden on large */}
                <nav className="min-w-0 lg:hidden">
                  <ul className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { name: "Home", path: "/" },
                      { name: "About", path: "/about" },
                      { name: "Services", path: "/services" },
                      { name: "Contact", path: "/contact" },
                    ].map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.path} 
                          className="footer-links-text hover:text-white/90 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Text Sections Group */}
              <div className="flex flex-col md:flex-row items-start md:items-start gap-4 sm:gap-6 md:gap-8 flex-wrap lg:flex-nowrap w-full lg:w-auto min-w-0">
                {/* Navigation Links - Hidden on small & medium screens, shown on large */}
                <nav className="hidden lg:block min-w-0 flex-shrink-0">
                  <ul className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { name: "Home", path: "/" },
                      { name: "About", path: "/about" },
                      { name: "Services", path: "/services" },
                      { name: "Contact", path: "/contact" },
                    ].map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.path} 
                          className="footer-links-text hover:text-white/90 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Location */}
                <div className="min-w-0 flex-shrink-0">
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
                <div className="min-w-0 flex-shrink-0">
                  <h3 className="text-white font-semibold mb-2">Get in Touch</h3>
                  <p className="text-white/80">Phone: +201016078688</p>
                  <p className="text-white/80">info@sobekegy.com</p>
                </div>

                {/* Social Media Icons - Row on small & medium screens, column on large */}
                <div className="flex flex-row lg:flex-col gap-2 flex-shrink-0">
                  <a 
                    href="https://www.linkedin.com/company/sobek-agency/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors flex-shrink-0" 
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/sobek_agency?igsh=MWQweTRkNXNpMjh3dQ==" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors flex-shrink-0" 
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/share/17kwUY7fqR/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors flex-shrink-0" 
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
      </div>
    </footer>
  );
};

export default GetInTouch;

