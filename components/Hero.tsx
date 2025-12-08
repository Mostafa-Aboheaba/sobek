"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full max-w-[1440px] mx-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[617px] flex items-center px-3 sm:px-4 md:px-6 rounded-lg overflow-hidden"
    >
      {/* Background Image with floating animation */}
      <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
        <SafeImage
          src="/images/hero-ship-sea.png"
          alt="Cargo ship sailing on the sea"
          fill
          className="object-cover animate-float"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Container - Max width 1440px with 24px padding */}
      <div className="relative z-10 w-full h-full flex">
        <div className="max-w-2xl flex flex-col gap-1.5 sm:gap-2 md:gap-[10px] hero-content">
          <h1 className="text-white hero-heading animate-fade-in-up sm:whitespace-nowrap leading-tight">
            Ship smarter with Sobek
          </h1>
          <p className="text-white hero-tagline animate-fade-in-up delay-200 leading-tight">
            Fast reliable sea freight solution
          </p>
          
          <div className="flex flex-row gap-2 sm:gap-[10px] mt-1.5 sm:mt-2 md:mt-4 animate-fade-in-up delay-300">
            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-accent text-white px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 rounded-[50px] hover:bg-accent-dark transition-all duration-300 hover:scale-105 hover:shadow-lg text-center hero-button text-xs sm:text-sm md:text-base flex-1 sm:flex-initial cursor-pointer"
            >
              Get Quote
            </a>
            <Link
              href="#services"
              className="border-2 border-white text-white px-3 sm:px-4 md:px-6 lg:px-8 py-1.5 sm:py-2 md:py-3 rounded-[50px] hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center bg-transparent hero-button text-xs sm:text-sm md:text-base flex-1 sm:flex-initial whitespace-nowrap"
            >
              View Our Services
            </Link>
          </div>
          
          <p className="text-white max-w-xl mt-1.5 sm:mt-2 md:mt-4 hero-paragraph animate-fade-in-up delay-400">
            We provide reliable, efficient, and cost-effective global maritime and logistics solutions, services that ensure smooth vessel operations and seamless cargo movement across international waters, of deep sea to Russian Ports.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

