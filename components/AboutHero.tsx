"use client";

import SafeImage from "./SafeImage";

const AboutHero = () => {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center px-4 sm:px-6 overflow-hidden mb-8 sm:mb-12 md:mb-16" style={{ borderRadius: '20px' }}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ borderRadius: '20px' }}>
        <SafeImage
          src="/images/about-hero-ship.png"
          alt="Cargo ship sailing on the sea"
          fill
          className="object-fill w-full h-full"
          style={{ objectPosition: 'center' }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay Effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden" style={{ borderRadius: '20px', backgroundColor: '#00000066' }} />

      {/* Overlay Text */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center px-4">
          About
        </h1>
      </div>
    </section>
  );
};

export default AboutHero;

