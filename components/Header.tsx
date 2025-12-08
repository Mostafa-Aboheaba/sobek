"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SafeImage from "./SafeImage";

const Header = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white text-neutral-dark px-4 sm:px-6 py-4 sticky top-0 z-50 shadow-sm animate-fade-in">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Left Side - Logos */}
        <Link href="/" className="flex items-center gap-3 sm:gap-6">
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
        </Link>

        {/* Center - Navigation */}
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
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="#" className="text-sm text-neutral-dark hover:text-accent transition-all duration-300 font-medium hidden sm:block hover:scale-105">
            RUS
          </Link>
          <Link 
            href="/contact" 
            className="bg-primary text-white px-4 sm:px-6 py-2 rounded-[50px] hover:bg-primary-dark transition-all duration-300 font-medium text-sm sm:text-base hover:scale-105 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

