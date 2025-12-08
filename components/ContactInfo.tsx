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
        className="mb-6"
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontWeight: 500,
          fontSize: '20px',
          lineHeight: '100%',
          letterSpacing: '-2%',
          textTransform: 'capitalize',
          color: '#012C4E',
        }}
      >
        Get In Touch
      </h2>
      
      <p 
        className="mb-8"
        style={{
          fontFamily: 'var(--font-poppins), Poppins, sans-serif',
          fontWeight: 600,
          fontSize: '32px',
          lineHeight: '130%',
          letterSpacing: '0%',
          color: '#012C4E',
        }}
      >
        Got questions? <span style={{ color: '#EAD292' }}>Just fill out the form</span> and one of our specialists will give you a <span style={{ color: '#EAD292' }}>quick call</span> to help with anything you need.
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
              href="mailto:cs@sobekegy.com" 
              className="text-primary hover:text-primary-dark transition-colors"
            >
              cs@sobekegy.com
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
              36 Banni Abbas street, Al Azarita Bab sharq, Apartment 1, Alexandria, Egypt
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
              className="text-primary hover:text-primary-dark transition-colors"
            >
              +201016078688
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

