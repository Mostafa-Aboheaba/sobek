"use client";

import { useState } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import SafeImage from "./SafeImage";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const pathname = usePathname();
  const t = useTranslations("header.nav");
  const tCommon = useTranslations("common");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Remove locale from pathname for active check
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/') || '/';

  const isActive = (path: string) => {
    if (path === "/") {
      return pathWithoutLocale === "/";
    }
    return pathWithoutLocale.startsWith(path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white text-neutral-dark px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-sm animate-fade-in">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Side - Logos */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-6 flex-shrink-0">
          {/* Sobek Logo */}
          <Link href="/" className="relative h-6 sm:h-8 md:h-12 w-auto transition-transform duration-300 hover:scale-105">
            <SafeImage
              src="/logo/sobek.png"
              alt="Sobek Logo"
              width={120}
              height={48}
              className="h-full w-auto object-contain"
              priority
            />
          </Link>
          
          {/* Right Line Logo */}
          <a 
            href="https://vr-tamozhnya.ru/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative h-6 sm:h-8 md:h-12 w-auto transition-transform duration-300 hover:scale-105 cursor-pointer"
            aria-label="Visit Right Line website"
          >
            <SafeImage
              src="/logo/right.png"
              alt="Right Line Logo"
              width={120}
              height={48}
              className="h-full w-auto object-contain"
              priority
            />
          </a>
        </div>

        {/* Center - Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 mx-auto">
          <Link 
            href="/" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            {t("home")}
          </Link>
          <Link 
            href="/about" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/about") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            {t("about")}
          </Link>
          <Link 
            href="/services" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/services") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            {t("services")}
          </Link>
          <Link 
            href="/contact" 
            className={`transition-all duration-300 font-medium hover:scale-105 ${
              isActive("/contact") ? "text-accent" : "text-neutral-dark hover:text-accent"
            }`}
          >
            {t("contact")}
          </Link>
        </nav>

        {/* Right Side - Language Switcher & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-6 flex-shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {pathWithoutLocale === "/" ? (
            <a 
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('contact-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="bg-accent text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-[50px] hover:bg-accent-dark transition-all duration-300 font-medium text-xs sm:text-sm md:text-base hover:scale-105 hover:shadow-lg cursor-pointer whitespace-nowrap"
            >
              {tCommon("getQuote")}
            </a>
          ) : (
            <Link 
              href="/#contact-form" 
              className="bg-accent text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-[50px] hover:bg-accent-dark transition-all duration-300 font-medium text-xs sm:text-sm md:text-base hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              {tCommon("getQuote")}
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
              {t("home")}
            </Link>
            <Link 
              href="/about" 
              onClick={closeMobileMenu}
              className={`transition-all duration-300 font-medium py-2 ${
                isActive("/about") ? "text-accent" : "text-neutral-dark hover:text-accent"
              }`}
            >
              {t("about")}
            </Link>
            <Link 
              href="/services" 
              onClick={closeMobileMenu}
              className={`transition-all duration-300 font-medium py-2 ${
                isActive("/services") ? "text-accent" : "text-neutral-dark hover:text-accent"
              }`}
            >
              {t("services")}
            </Link>
            <Link 
              href="/contact" 
              onClick={closeMobileMenu}
              className={`transition-all duration-300 font-medium py-2 ${
                isActive("/contact") ? "text-accent" : "text-neutral-dark hover:text-accent"
              }`}
            >
              {t("contact")}
            </Link>
            {/* Language Switcher in Mobile Menu */}
            <div className="pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-neutral-light mb-2">
                {tCommon("language")}
              </div>
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
