"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { useCMSContent } from "./CMSContentProvider";

const Hero = () => {
  const { getSectionWithFallback } = useCMSContent();
  
  const heading = getSectionWithFallback(
    "hero-heading",
    "Right Line Sails,<br />Sobek Delivers"
  );
  const tagline = getSectionWithFallback(
    "hero-tagline",
    "Fast reliable sea freight solution"
  );
  const paragraph = getSectionWithFallback(
    "hero-paragraph",
    "We provide reliable, efficient, and cost-effective global maritime and logistics solutions, services that ensure smooth vessel operations and seamless cargo movement across international waters, of deep sea to Russian Ports."
  );
  const heroImage = getSectionWithFallback("hero-image", "/images/hero-ship-sea.png");

  return (
    <section
      id="home"
      className="relative w-full max-w-[1440px] mx-auto h-[575px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[617px] flex items-center px-4 md:px-8 lg:px-16 overflow-hidden"
      style={{ borderRadius: '40px' }}
    >
      {/* Background Image */}
      <div className="absolute top-0 bottom-0 left-4 right-4 sm:left-6 sm:right-6 z-0 overflow-hidden" style={{ borderRadius: '40px' }}>
        <SafeImage
          src={heroImage}
          alt="Cargo ship sailing on the sea"
          fill
          className="lg:object-contain"
          style={{ borderRadius: '40px' }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center sm:items-start sm:justify-start">
        <div className="w-[343px] sm:w-full max-w-2xl flex flex-col gap-6 sm:gap-3 md:gap-4 lg:gap-5 hero-content items-center sm:items-start text-center sm:text-left pr-4 pb-12 pl-4 sm:pr-0 sm:pb-0 sm:pl-0">
          <h1 
            className="text-white hero-heading animate-fade-in-up leading-tight"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-white hero-tagline animate-fade-in-up delay-200 leading-tight">
            {tagline}
          </p>
          
          <div className="flex flex-row gap-3 sm:gap-[10px] animate-fade-in-up delay-300 justify-center sm:justify-start">
            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-accent text-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2 md:py-3 rounded-[50px] hover:bg-accent-dark transition-all duration-300 hover:scale-105 hover:shadow-lg text-center hero-button cursor-pointer whitespace-nowrap"
            >
              Get Quote
            </a>
            <Link
              href="#services"
              className="border-2 border-white text-white px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2 md:py-3 rounded-[50px] hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center bg-transparent hero-button whitespace-nowrap"
            >
              View Our Services
            </Link>
          </div>
          
          <p className="text-white w-full max-w-xl mt-2 sm:mt-1 md:mt-2 lg:mt-3 hero-paragraph animate-fade-in-up delay-400">
            {paragraph}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

