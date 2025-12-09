"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface FeatureCardProps {
  feature: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
  index: number;
}

const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  return (
    <div
      ref={ref}
      className={`scroll-animate-up feature-card ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="feature-icon transition-transform duration-300 hover:scale-110">
        {feature.icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold text-accent mb-3">
          {feature.title}
        </h3>
        <p className="feature-description">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

const WhyChooseSobek = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLDivElement>();

  const features = [
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '36px', height: '36px' }}>
          <g clipPath="url(#clip0_gps)">
            <path d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_gps">
              <rect width="24" height="24" fill="none"/>
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Real-time Tracking",
      description: "Know exactly where your cargo is. Anytime, Anywhere.",
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '36px', height: '36px' }}>
          <g clipPath="url(#clip0_flash)">
            <path d="M9.31993 13.2805H12.4099V20.4805C12.4099 21.5405 13.7299 22.0405 14.4299 21.2405L21.9999 12.6405C22.6599 11.8905 22.1299 10.7205 21.1299 10.7205H18.0399V3.52046C18.0399 2.46046 16.7199 1.96046 16.0199 2.76046L8.44994 11.3605C7.79994 12.1105 8.32993 13.2805 9.31993 13.2805Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 4H1.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.5 20H1.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 12H1.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_flash">
              <rect width="24" height="24" fill="none"/>
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Fast & Reliable",
      description: "Direct Egypt - Russia service in just 5 - 7 days.",
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '36px', height: '36px' }}>
          <g clipPath="url(#clip0_ship)">
            <path d="M20.42 12.3697C21.29 12.7197 21.83 13.7497 21.63 14.6597L21.22 16.5197C20.51 19.7197 18 21.9997 14.38 21.9997H9.61998C5.99998 21.9997 3.48999 19.7197 2.77999 16.5197L2.36998 14.6597C2.16998 13.7497 2.70997 12.7197 3.57997 12.3697L4.99999 11.7997L10.51 9.58969C11.47 9.20969 12.53 9.20969 13.49 9.58969L19 11.7997L20.42 12.3697Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 8V11.8L13.49 9.59C12.53 9.21 11.47 9.21 10.51 9.59L5 11.8V8C5 6.35 6.35 5 8 5H16C17.65 5 19 6.35 19 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.5 5H9.5V3C9.5 2.45 9.95 2 10.5 2H13.5C14.05 2 14.5 2.45 14.5 3V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_ship">
              <rect width="24" height="24" fill="none"/>
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Quality & Safety",
      description: "A Brand new 2025 fleet ready to sail.",
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '36px', height: '36px' }}>
          <g clipPath="url(#clip0_message)">
            <path d="M22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.2 4.61959C14.87 3.62959 15.26 2.40959 16.34 2.06959C16.9 1.89959 17.6 2.03959 18 2.56959C18.38 2.01959 19.1 1.89959 19.66 2.06959C20.74 2.39959 21.13 3.62959 20.8 4.61959C20.29 6.18959 18.5 6.99959 18 6.99959C17.5 6.99959 15.73 6.19959 15.2 4.61959Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.9965 11H16.0054" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.9955 11H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.99451 11H8.00349" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_message">
              <rect width="24" height="24" fill="none"/>
            </clipPath>
          </defs>
        </svg>
      ),
      title: "24/7 customer support",
      description: "Round the clock assistance for all inquiries.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={sectionRef}
          className={`text-start mb-12 scroll-animate-up ${sectionVisible ? 'visible' : ''}`}
        >
          <p className="mb-2 section-label">
            Why Choose Sobek Shipping Agency?
          </p>
          <h2 className="mb-4 sm:mb-6 section-heading-lg">
            We are the only authorized agent for <span className="text-highlight">Right Line</span>, ensuring clients receive <span className="text-highlight">genuine,</span><br />
            <span className="text-highlight">direct shipping</span> services with no intermediaries.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSobek;

