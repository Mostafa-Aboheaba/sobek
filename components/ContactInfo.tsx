"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";

const ContactInfo = () => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`scroll-animate-left ${isVisible ? 'visible' : ''}`}
    >
      <h2
        className="mb-4 sm:mb-6 text-base sm:text-lg md:text-xl"
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontWeight: 500,
          lineHeight: '100%',
          letterSpacing: '-2%',
          textTransform: 'capitalize',
          color: '#012C4E',
        }}
      >
        Get In Touch
      </h2>

      <p
        className="mb-6 sm:mb-8 text-lg sm:text-2xl md:text-3xl lg:text-[32px]"
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontWeight: 600,
          lineHeight: '130%',
          letterSpacing: '0%',
          color: '#012C4E',
        }}
      >
        Got questions? <span style={{ color: '#A6823A' }}>Just fill out the form</span> and one of our specialists will give you a <span style={{ color: '#A6823A' }}>quick call</span> to help with anything you need.
      </p>

      <div className="space-y-6">
        {/* Chat with us */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 6l-10 7L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-neutral-dark font-medium mb-1">Chat with us</p>
            <a
              href="mailto:info@sobek-egy.com"
              className="text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0">
                <g clipPath="url(#clip0_655_9378)">
                  <path d="M21.54 13.51C21.7261 13.3937 21.99 13.5191 21.99 13.7386V19.02C21.99 20.67 20.65 22 18.99 22H5C3.34 22 2 20.67 2 19.02V13.7432C2 13.5249 2.27189 13.3993 2.46 13.51L9.95 17.97C10.58 18.34 11.29 18.53 12 18.53C12.71 18.53 13.42 18.34 14.05 17.97L21.54 13.51Z"/>
                  <path d="M22.0002 10.96C22.0002 10.96 22.0002 11.05 21.9902 11.09L22.0002 10.96Z"/>
                  <path d="M20.87 8.21L13.87 2.65C12.77 1.78 11.23 1.78 10.13 2.65L3.13 8.21C2.41 8.78 2 9.63 2 10.53V10.96C2 11.65 2.37 12.3 2.97 12.65L10.46 17.11C11.41 17.67 12.59 17.67 13.54 17.11L21.03 12.65C21.59 12.32 21.95 11.73 21.99 11.09V10.53C21.99 9.63 21.58 8.78 20.87 8.21ZM14.97 10.85C15.33 11.06 15.45 11.52 15.24 11.87C15.1 12.11 14.85 12.25 14.59 12.25C14.46 12.25 14.33 12.22 14.22 12.15L12.75 11.3V13C12.75 13.41 12.41 13.75 12 13.75C11.59 13.75 11.25 13.41 11.25 13V11.3L9.78 12.15C9.66 12.22 9.53 12.25 9.41 12.25C9.15 12.25 8.9 12.12 8.76 11.87C8.55 11.51 8.68 11.05 9.03 10.85L10.5 10L9.03 9.15C8.67 8.94 8.55 8.48 8.76 8.13C8.97 7.77 9.42 7.65 9.78 7.86L11.25 8.71V7.01C11.25 6.6 11.59 6.26 12 6.26C12.41 6.26 12.75 6.6 12.75 7.01V8.71L14.22 7.86C14.58 7.65 15.04 7.78 15.24 8.13C15.45 8.49 15.32 8.95 14.97 9.15L13.5 10L14.97 10.85Z"/>
                </g>
                <defs>
                  <clipPath id="clip0_655_9378">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              info@sobek-egy.com
            </a>
          </div>
        </div>

        {/* Our office */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="10"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-neutral-dark font-medium mb-1">Our office</p>
            <p className="text-neutral">
              36 Bani Al-Abbas Street
              Apartment 1, Ground Floor
              Al-Azareeta, Bab Sharq District
              Alexandria, Egypt
            </p>
          </div>
        </div>

        {/* Call us */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-neutral-dark font-medium mb-1">Call us</p>
            <a
              href="tel:+201016078688"
              className="text-primary hover:text-primary-dark transition-colors flex items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0">
                <g clipPath="url(#clip0_4418_5166)">
                  <path opacity="0.4" d="M11.79 14.21L8.52 17.48C8.16 17.16 7.81 16.83 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.09 13.57 11.44 13.91 11.79 14.21Z"/>
                  <path d="M21.9701 18.3291C21.9701 18.6091 21.9201 18.8991 21.8201 19.1791C21.7901 19.2591 21.7601 19.3391 21.7201 19.4191C21.5501 19.7791 21.3301 20.1191 21.0401 20.4391C20.5501 20.9791 20.0101 21.3691 19.4001 21.6191C19.3901 21.6191 19.3801 21.6291 19.3701 21.6291C18.7801 21.8691 18.1401 21.9991 17.4501 21.9991C16.4301 21.9991 15.3401 21.7591 14.1901 21.2691C13.0401 20.7791 11.8901 20.1191 10.7501 19.2891C10.3601 18.9991 9.9701 18.7091 9.6001 18.3991L12.8701 15.1291C13.1501 15.3391 13.4001 15.4991 13.6101 15.6091C13.6601 15.6291 13.7201 15.6591 13.7901 15.6891C13.8701 15.7191 13.9501 15.7291 14.0401 15.7291C14.2101 15.7291 14.3401 15.6691 14.4501 15.5591L15.2101 14.8091C15.4601 14.5591 15.7001 14.3691 15.9301 14.2491C16.1601 14.1091 16.3901 14.0391 16.6401 14.0391C16.8301 14.0391 17.0301 14.0791 17.2501 14.1691C17.4701 14.2591 17.7001 14.3891 17.9501 14.5591L21.2601 16.9091C21.5201 17.0891 21.7001 17.2991 21.8101 17.5491C21.9101 17.7991 21.9701 18.0491 21.9701 18.3291Z"/>
                </g>
                <defs>
                  <clipPath id="clip0_4418_5166">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              +20 101 607 8688
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

