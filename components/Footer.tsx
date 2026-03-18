"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ 
    threshold: 0.01,
    rootMargin: '0px 0px -100px 0px'
  });
  
  return (
    <footer 
      className="bg-primary py-12 sm:py-16 md:py-20 lg:py-[120px] px-4 md:px-8 lg:px-16"
      style={{
        borderRadius: 'clamp(20px, 4vw, 40px)',
        marginTop: 'clamp(24px, 4vw, 48px)',
        marginBottom: 'clamp(24px, 4vw, 48px)',
        marginLeft: 'clamp(16px, 4vw, 32px)',
        marginRight: 'clamp(16px, 4vw, 32px)',
      }}
    >
      <div className="max-w-[1392px] mx-auto">
        <div 
          ref={ref}
          className={`flex flex-col lg:flex-row items-start justify-between gap-6 md:gap-8 overflow-hidden scroll-animate-up ${isVisible ? 'visible' : ''}`}
        >
          {/* Logos */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap sm:flex-nowrap">
            <SafeImage
              src="/logo/sobek-white.png"
              alt="Sobek Logo"
              width={202}
              height={92}
              className="object-contain max-w-[120px] sm:max-w-[150px] md:max-w-full h-auto"
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
                className="object-contain max-w-[120px] sm:max-w-[150px] md:max-w-full h-auto"
                style={{ borderRadius: '12px' }}
              />
            </a>
          </div>

          {/* Text Sections Group */}
          <div className="flex flex-col sm:flex-row items-start sm:items-start gap-6 md:gap-8 flex-wrap lg:flex-nowrap">
            {/* Navigation Links */}
            <nav className="min-w-0">
              <ul className="space-y-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/about" },
                  { name: "Services", path: "/services" },
                  { name: "Ship Schedule", path: "/schedule" },
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
            <div className="min-w-0">
              <h3 className="text-white font-semibold mb-2">Location</h3>
              <p className="text-white/80">
              36 Bani Al-Abbas Street
              </p>
              <p className="text-white/80">
                Bab sharq, Apartment 1, Ground Floor
              </p>
              <p className="text-white/80">
              Al-Azareeta, Bab Sharq District
              </p>
              <p className="text-white/80">
                Alexandria, Egypt
              </p>
            </div>

            {/* Contact */}
            <div className="min-w-0">
              <h3 className="text-white font-semibold mb-2">Get in Touch</h3>
              <p className="text-white/80 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0">
                  <g clipPath="url(#clip0_4418_5166_footer_call)">
                    <path opacity="0.4" d="M11.79 14.21L8.52 17.48C8.16 17.16 7.81 16.83 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.09 13.57 11.44 13.91 11.79 14.21Z"/>
                    <path d="M21.9701 18.3291C21.9701 18.6091 21.9201 18.8991 21.8201 19.1791C21.7901 19.2591 21.7601 19.3391 21.7201 19.4191C21.5501 19.7791 21.3301 20.1191 21.0401 20.4391C20.5501 20.9791 20.0101 21.3691 19.4001 21.6191C19.3901 21.6191 19.3801 21.6291 19.3701 21.6291C18.7801 21.8691 18.1401 21.9991 17.4501 21.9991C16.4301 21.9991 15.3401 21.7591 14.1901 21.2691C13.0401 20.7791 11.8901 20.1191 10.7501 19.2891C10.3601 18.9991 9.9701 18.7091 9.6001 18.3991L12.8701 15.1291C13.1501 15.3391 13.4001 15.4991 13.6101 15.6091C13.6601 15.6291 13.7201 15.6591 13.7901 15.6891C13.8701 15.7191 13.9501 15.7291 14.0401 15.7291C14.2101 15.7291 14.3401 15.6691 14.4501 15.5591L15.2101 14.8091C15.4601 14.5591 15.7001 14.3691 15.9301 14.2491C16.1601 14.1091 16.3901 14.0391 16.6401 14.0391C16.8301 14.0391 17.0301 14.0791 17.2501 14.1691C17.4701 14.2591 17.7001 14.3891 17.9501 14.5591L21.2601 16.9091C21.5201 17.0891 21.7001 17.2991 21.8101 17.5491C21.9101 17.7991 21.9701 18.0491 21.9701 18.3291Z"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_5166_footer_call">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                +20 101 607 8688
              </p>
              <p className="text-white/80 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0">
                  <g clipPath="url(#clip0_655_9378_footer_email)">
                    <path d="M21.54 13.51C21.7261 13.3937 21.99 13.5191 21.99 13.7386V19.02C21.99 20.67 20.65 22 18.99 22H5C3.34 22 2 20.67 2 19.02V13.7432C2 13.5249 2.27189 13.3993 2.46 13.51L9.95 17.97C10.58 18.34 11.29 18.53 12 18.53C12.71 18.53 13.42 18.34 14.05 17.97L21.54 13.51Z"/>
                    <path d="M22.0002 10.96C22.0002 10.96 22.0002 11.05 21.9902 11.09L22.0002 10.96Z"/>
                    <path d="M20.87 8.21L13.87 2.65C12.77 1.78 11.23 1.78 10.13 2.65L3.13 8.21C2.41 8.78 2 9.63 2 10.53V10.96C2 11.65 2.37 12.3 2.97 12.65L10.46 17.11C11.41 17.67 12.59 17.67 13.54 17.11L21.03 12.65C21.59 12.32 21.95 11.73 21.99 11.09V10.53C21.99 9.63 21.58 8.78 20.87 8.21ZM14.97 10.85C15.33 11.06 15.45 11.52 15.24 11.87C15.1 12.11 14.85 12.25 14.59 12.25C14.46 12.25 14.33 12.22 14.22 12.15L12.75 11.3V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V11.3L9.78 12.15C9.66 12.22 9.53 12.25 9.41 12.25C9.15 12.25 8.9 12.12 8.76 11.87C8.55 11.51 8.68 11.05 9.03 10.85L10.5 10L9.03 9.15C8.67 8.94 8.55 8.48 8.76 8.13C8.97 7.77 9.42 7.65 9.78 7.86L11.25 8.71V7.01C11.25 6.6 11.59 6.26 12 6.26C12.41 6.26 12.75 6.6 12.75 7.01V8.71L14.22 7.86C14.58 7.65 15.04 7.78 15.24 8.13C15.45 8.49 15.32 8.95 14.97 9.15L13.5 10L14.97 10.85Z"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_655_9378_footer_email">
                      <rect width="24" height="24" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                info@sobek-egy.com
              </p>
            </div>

            {/* Social Media Icons - Stacked Vertically */}
            <div className="flex flex-col gap-2">
              <a 
                href="https://www.linkedin.com/company/sobek-agency/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" 
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
                className="w-10 h-10 rounded-lg bg-primary-500 hover:bg-primary-600 flex items-center justify-center transition-colors" 
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
    </footer>
  );
};

export default Footer;

