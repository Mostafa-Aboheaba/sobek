"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface TestimonialCardProps {
  testimonial: {
    rating: number;
    quote: string;
    name: string;
    title: string;
  };
  index: number;
  uniqueKey: string;
  renderStars: (rating: number) => React.ReactNode;
}

const TestimonialCard = ({ testimonial, index, uniqueKey, renderStars }: TestimonialCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  return (
    <div
      ref={ref}
      key={uniqueKey}
      className={`scroll-animate-up hover-lift bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden w-full sm:w-full ${isVisible ? 'visible' : ''}`}
      style={{
        minHeight: '265px',
        padding: '24px',
        justifyContent: 'space-between',
        transitionDelay: `${index * 0.15}s`,
      }}
    >
      <div className="flex-shrink-0">
        {renderStars(testimonial.rating)}
      </div>
      <p className="text-neutral-dark leading-relaxed flex-1 overflow-hidden text-ellipsis" style={{ marginTop: '16px', marginBottom: '16px' }}>
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="flex-shrink-0">
        <p className="font-semibold text-primary-900 mb-1">
          {testimonial.name}
        </p>
        <p className="text-neutral-light text-sm">
          {testimonial.title}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLDivElement>();
  const testimonials = [
    {
      rating: 4.7,
      quote: "The tracking service was quick and accurate. I received an update within minutes and found exactly where my shipment was.",
      name: "Ahmed Salem",
      title: "Operations Manager, Mantrac Group",
    },
    {
      rating: 4.6,
      quote: "Great experience! Our cargo arrived earlier than expected and in perfect condition.",
      name: "Mustafa Aref",
      title: "Logistics Manager, Alex West",
    },
    {
      rating: 4.8,
      quote: "We ship products internationally every month, and this is one of the most dependable cargo services we've used.",
      name: "Shaimaa Serag",
      title: "Procurement Officer, Enjaz",
    },
    {
      rating: 4.9,
      quote: "Outstanding customer service and reliable shipping. The team always keeps us informed throughout the entire process.",
      name: "Mohamed Hassan",
      title: "Supply Chain Director, El-Araby Group",
    },
    {
      rating: 4.5,
      quote: "Professional handling of our shipments to Russian ports. Very satisfied with their expertise and attention to detail.",
      name: "Nour El-Din",
      title: "Export Manager, Oriental Weavers",
    },
    {
      rating: 4.7,
      quote: "Fast, efficient, and cost-effective. Sobek has become our preferred shipping partner for all our maritime logistics needs.",
      name: "Yasmine Farid",
      title: "International Trade Coordinator, CIB",
    },
    {
      rating: 4.8,
      quote: "Excellent communication and seamless operations. Our goods always arrive on schedule with proper documentation.",
      name: "Karim Abdel Rahman",
      title: "Procurement Manager, Orascom Construction",
    },
    {
      rating: 4.6,
      quote: "The direct route to Russian ports saves us time and money. Highly recommend their services for anyone shipping to Russia.",
      name: "Layla Mahmoud",
      title: "Logistics Specialist, Ezz Steel",
    },
    {
      rating: 4.9,
      quote: "Reliable, professional, and always responsive. Sobek Shipping Agency has exceeded our expectations in every shipment.",
      name: "Omar Khaled",
      title: "Operations Executive, Americana Group",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerPage = 3;

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, testimonials.length - cardsPerPage) : Math.max(0, prev - cardsPerPage)
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev + cardsPerPage >= testimonials.length ? 0 : prev + cardsPerPage
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + cardsPerPage);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const decimal = rating % 1;
    const starId = `star-${currentIndex}-${rating}`;
    const starColor = "#F59E0B";
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          const clipId = `clip-${starId}-${i}`;
          const maskId = `mask-${starId}-${i}`;
          
          if (i < fullStars) {
            // Full star
            return (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath={`url(#${clipId})`}>
                  <path d="M13.73 3.51063L15.49 7.03063C15.73 7.52063 16.37 7.99063 16.91 8.08063L20.1 8.61062C22.14 8.95062 22.62 10.4306 21.15 11.8906L18.67 14.3706C18.25 14.7906 18.02 15.6006 18.15 16.1806L18.86 19.2506C19.42 21.6806 18.13 22.6206 15.98 21.3506L12.99 19.5806C12.45 19.2606 11.56 19.2606 11.01 19.5806L8.02003 21.3506C5.88003 22.6206 4.58003 21.6706 5.14003 19.2506L5.85003 16.1806C5.98003 15.6006 5.75003 14.7906 5.33003 14.3706L2.85003 11.8906C1.39003 10.4306 1.86003 8.95062 3.90003 8.61062L7.09003 8.08063C7.62003 7.99063 8.26003 7.52063 8.50003 7.03063L10.26 3.51063C11.22 1.60063 12.78 1.60063 13.73 3.51063Z" fill={starColor} stroke={starColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id={clipId}>
                    <rect width="24" height="24" fill="none"/>
                  </clipPath>
                </defs>
              </svg>
            );
          } else if (i === fullStars && decimal > 0) {
            // Partial star using SVG mask
            const fillWidth = decimal * 24;
            return (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
                <defs>
                  <mask id={maskId}>
                    <rect x="0" y="0" width={fillWidth} height="24" fill="white" />
                  </mask>
                  <clipPath id={clipId}>
                    <rect width="24" height="24" fill="none"/>
                  </clipPath>
                </defs>
                <g clipPath={`url(#${clipId})`}>
                  <path d="M13.73 3.51063L15.49 7.03063C15.73 7.52063 16.37 7.99063 16.91 8.08063L20.1 8.61062C22.14 8.95062 22.62 10.4306 21.15 11.8906L18.67 14.3706C18.25 14.7906 18.02 15.6006 18.15 16.1806L18.86 19.2506C19.42 21.6806 18.13 22.6206 15.98 21.3506L12.99 19.5806C12.45 19.2606 11.56 19.2606 11.01 19.5806L8.02003 21.3506C5.88003 22.6206 4.58003 21.6706 5.14003 19.2506L5.85003 16.1806C5.98003 15.6006 5.75003 14.7906 5.33003 14.3706L2.85003 11.8906C1.39003 10.4306 1.86003 8.95062 3.90003 8.61062L7.09003 8.08063C7.62003 7.99063 8.26003 7.52063 8.50003 7.03063L10.26 3.51063C11.22 1.60063 12.78 1.60063 13.73 3.51063Z" fill={starColor} mask={`url(#${maskId})`} stroke={starColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            );
          } else {
            // Empty star
            return (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath={`url(#${clipId})`}>
                  <path d="M13.73 3.51063L15.49 7.03063C15.73 7.52063 16.37 7.99063 16.91 8.08063L20.1 8.61062C22.14 8.95062 22.62 10.4306 21.15 11.8906L18.67 14.3706C18.25 14.7906 18.02 15.6006 18.15 16.1806L18.86 19.2506C19.42 21.6806 18.13 22.6206 15.98 21.3506L12.99 19.5806C12.45 19.2606 11.56 19.2606 11.01 19.5806L8.02003 21.3506C5.88003 22.6206 4.58003 21.6706 5.14003 19.2506L5.85003 16.1806C5.98003 15.6006 5.75003 14.7906 5.33003 14.3706L2.85003 11.8906C1.39003 10.4306 1.86003 8.95062 3.90003 8.61062L7.09003 8.08063C7.62003 7.99063 8.26003 7.52063 8.50003 7.03063L10.26 3.51063C11.22 1.60063 12.78 1.60063 13.73 3.51063Z" stroke={starColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </g>
                <defs>
                  <clipPath id={clipId}>
                    <rect width="24" height="24" fill="none"/>
                  </clipPath>
                </defs>
              </svg>
            );
          }
        })}
        <span 
          className="ml-1"
          style={{
            fontFamily: 'var(--font-poppins), sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '160%',
            letterSpacing: '0%',
            color: '#737373'
          }}
        >
          {rating}
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={sectionRef}
          className={`flex flex-col sm:flex-row items-start justify-between mb-12 gap-4 scroll-animate-up ${sectionVisible ? 'visible' : ''}`}
        >
          <div className="text-start flex-1 mb-4 sm:mb-0">
            <p className="mb-2 section-label">Testimonials</p>
            <h2 className="section-heading text-lg sm:text-xl md:text-2xl lg:text-3xl">
              What Our Clients Say About Our Services
            </h2>
          </div>
          
          {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
          <div className="hidden sm:flex gap-2 sm:gap-4 flex-shrink-0">
            <button
              onClick={handlePrevious}
              className="carousel-arrow-left w-12 h-12 rounded-full border-2 border-primary-500 flex items-center justify-center hover:bg-primary-500 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              aria-label="Previous testimonials"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.57 5.92969L3.5 11.9997L9.57 18.0697" stroke="#2A478B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.4999 12H3.66992" stroke="#2A478B" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-600 transition-all duration-300 hover:scale-110 hover:shadow-lg"
              style={{ backgroundColor: '#2A478B' }}
              aria-label="Next testimonials"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4302 5.92969L20.5002 11.9997L14.4302 18.0697" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.5 12H20.33" stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile: Horizontal Scroll Container */}
        <div className="sm:hidden overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {testimonials.map((testimonial, index) => (
              <div key={`mobile-testimonial-${index}`} className="flex-shrink-0" style={{ width: 'calc(100vw - 32px)', maxWidth: '320px' }}>
                <TestimonialCard 
                  testimonial={testimonial} 
                  index={index}
                  uniqueKey={`mobile-testimonial-${index}`}
                  renderStars={renderStars}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout with Navigation */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={`testimonial-${currentIndex}-${index}`} 
              testimonial={testimonial} 
              index={index}
              uniqueKey={`testimonial-${currentIndex}-${index}`}
              renderStars={renderStars}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

