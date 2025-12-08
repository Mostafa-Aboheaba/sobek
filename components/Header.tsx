"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SafeImage from "./SafeImage";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white text-neutral-dark px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-sm animate-fade-in">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Left Side - Logos */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-6">
          {/* Sobek Logo */}
          <div className="relative h-8 sm:h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105">
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
          <div className="relative h-8 sm:h-10 md:h-12 w-auto transition-transform duration-300 hover:scale-105">
            <SafeImage
              src="/logo/right.png"
              alt="Right Line Logo"
              width={120}
              height={48}
              className="h-full w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center - Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <Link 
            href="/" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/about") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            About
          </Link>
          <Link 
            href="/services" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/services") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            Services
          </Link>
          <Link 
            href="/contact" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/contact") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Side - Language & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-6">
          <Link href="#" className="text-sm text-neutral-dark hover:text-accent transition-all duration-300 font-medium hidden sm:block hover:scale-105">
            RUS
          </Link>
          {pathname === "/" ? (
            <a 
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-primary text-white px-3 sm:px-4 md:px-6 py-2 rounded-[50px] hover:bg-primary-dark transition-all duration-300 font-medium text-xs sm:text-sm md:text-base hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Get a Free Quote
            </a>
          ) : (
            <Link 
              href="/#contact-form" 
              className="bg-primary text-white px-3 sm:px-4 md:px-6 py-2 rounded-[50px] hover:bg-primary-dark transition-all duration-300 font-medium text-xs sm:text-sm md:text-base hover:scale-105 hover:shadow-lg"
            >
              Get a Free Quote
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-neutral-dark hover:text-accent transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
          <div className="flex flex-col gap-4 pt-4">
            <Link 
              href="/" 
              onClick={closeMobileMenu}
              className={`transition-all duration-300 font-medium py-2 ${
                isActive("/") ? "text-accent" : "text-neutral-dark hover:text-accent"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className={`transition-all duration-300 font-medium py-2 ${
                isActive("/about") ? "text-accent" : "text-neutral-dark hover:text-accent"
              }`}
            >
              About
            </Link>
            <Link 
              href="/services" 
              onClick={closeMobileMenu}
              className={`transition-all duration-300 font-medium py-2 ${
                isActive("/services") ? "text-accent" : "text-neutral-dark hover:text-accent"
              }`}
            >
              Services
            </Link>
            <Link 
              href="/contact" 
              onClick={closeMobileMenu}
              className={`transition-all duration-300 font-medium py-2 ${
                isActive("/contact") ? "text-accent" : "text-neutral-dark hover:text-accent"
              }`}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

