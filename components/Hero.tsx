"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full max-w-[1440px] mx-auto h-[400px] sm:h-[500px] md:h-[550px] lg:h-[617px] flex items-center px-4 sm:px-6 rounded-lg overflow-hidden"
    >
      {/* Background Image with floating animation */}
      <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
        <SafeImage
          src="/images/hero-ship-sea.png"
          alt="Cargo ship sailing on the sea"
          fill
          className="object-contain animate-float"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Container - Max width 1440px with 24px padding */}
      <div className="relative z-10 w-full h-full flex">
        <div className="max-w-2xl flex flex-col gap-[10px] hero-content">
          <h1 className="text-white hero-heading animate-fade-in-up">
            Ship smarter with Sobek
          </h1>
          <p className="text-white hero-tagline animate-fade-in-up delay-200">
            Fast reliable sea freight solution
          </p>
          
          <div className="flex flex-col sm:flex-row gap-[10px] mt-4 animate-fade-in-up delay-300">
            <Link
              href="#contact"
              className="bg-accent text-white px-8 py-3 rounded-[50px] hover:bg-accent-dark transition-all duration-300 hover:scale-105 hover:shadow-lg text-center hero-button"
            >
              Get a Free Quote
            </Link>
            <Link
              href="#services"
              className="border-2 border-white text-white px-8 py-3 rounded-[50px] hover:bg-white/10 transition-all duration-300 hover:scale-105 text-center bg-transparent hero-button"
            >
              View Our Services
            </Link>
          </div>
          
          <p className="text-white max-w-xl mt-4 hero-paragraph animate-fade-in-up delay-400">
            We provide reliable, efficient, and cost-effective global maritime and logistics solutions, services that ensure smooth vessel operations and seamless cargo movement across international waters, of deep sea to Russian Ports.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

