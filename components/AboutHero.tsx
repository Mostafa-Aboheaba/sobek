"use client";

import SafeImage from "./SafeImage";

const AboutHero = () => {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center px-4 sm:px-6 overflow-hidden mb-12 md:mb-16" style={{ borderRadius: '40px' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ borderRadius: '40px' }}>
        <SafeImage
          src="/images/about-hero-ship.png"
          alt="Cargo ship sailing on the sea"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay Effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden" style={{ borderRadius: '40px', backgroundColor: '#00000066' }} />

      {/* Overlay Text */}
      <div className="relative z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white text-center">
          About
        </h1>
      </div>
    </section>
  );
};

export default AboutHero;

