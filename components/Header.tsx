"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";

const Header = () => {
  return (
    <header className="bg-white text-neutral-dark px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-sm animate-fade-in">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Left Side - Logos */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Sobek Logo */}
          <div className="relative h-12 w-auto transition-transform duration-300 hover:scale-105">
            <SafeImage
              src="/logo/sobek.png"
              alt="Sobek Logo"
              width={120}
              height={48}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
          
          {/* Right Line Logo */}
          <div className="relative h-12 w-auto transition-transform duration-300 hover:scale-105">
            <SafeImage
              src="/logo/right.png"
              alt="Right Line Logo"
              width={120}
              height={48}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Center - Navigation */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <Link href="#home" className="text-neutral-dark hover:text-accent transition-all duration-300 font-medium hover:scale-105">
            Home
          </Link>
          <Link href="#about" className="text-neutral-dark hover:text-accent transition-all duration-300 font-medium hover:scale-105">
            About
          </Link>
          <Link href="#services" className="text-neutral-dark hover:text-accent transition-all duration-300 font-medium hover:scale-105">
            Services
          </Link>
          <Link href="#contact" className="text-neutral-dark hover:text-accent transition-all duration-300 font-medium hover:scale-105">
            Contact
          </Link>
        </nav>

        {/* Right Side - Language & CTA */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="#" className="text-sm text-neutral-dark hover:text-accent transition-all duration-300 font-medium hidden sm:block hover:scale-105">
            RUS
          </Link>
          <button className="bg-primary text-white px-4 sm:px-6 py-2 rounded-[50px] hover:bg-primary-dark transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105 hover:shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

