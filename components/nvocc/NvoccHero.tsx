"use client";

import type { MouseEvent } from "react";
import SafeImage from "@/components/SafeImage";

const handleScrollTo = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const NvoccHero = () => {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto overflow-hidden mb-8 sm:mb-12" style={{ borderRadius: "20px" }}>
      <div className="relative min-h-[420px] sm:min-h-[480px] md:min-h-[540px] flex items-end">
        <SafeImage
          src="/gallery/crane-over-truck.jpeg"
          alt="Crane loading a Sobek container beside a vessel in Alexandria"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-black/20" />
        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16 max-w-3xl">
          <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-3">
            Sobek NVOCC
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Ship from Alexandria with one contract and one Sobek bill of lading
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
            Sobek books space with leading ocean carriers, then manages FCL and LCL cargo as your NVOCC. You work with one desk, one contract, and one bill of lading from Alexandria to the discharge port.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#quote"
              onClick={handleScrollTo("quote")}
              className="bg-accent text-white text-center px-6 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
            >
              Request a Quote
            </a>
            <a
              href="tel:+201016078688"
              className="border-2 border-white text-white text-center px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              Talk to our commercial team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NvoccHero;
