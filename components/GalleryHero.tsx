"use client";

import SafeImage from "./SafeImage";
import { galleryHeroSrc } from "@/lib/gallery";

const GalleryHero = () => {
  return (
    <section
      className="relative w-full max-w-[1440px] mx-auto h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center px-4 sm:px-6 overflow-hidden mb-8 sm:mb-12 md:mb-16"
      style={{ borderRadius: "20px" }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ borderRadius: "20px" }}>
        <SafeImage
          src={galleryHeroSrc}
          alt="Port crane lifting a Sobek container"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0 z-[1] overflow-hidden"
        style={{ borderRadius: "20px", backgroundColor: "#00000066" }}
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white">
          Gallery
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto">
          Vessels, cargo, and the work that keeps shipments moving.
        </p>
      </div>
    </section>
  );
};

export default GalleryHero;
