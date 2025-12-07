import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full max-w-[1440px] mx-auto h-[400px] sm:h-[500px] md:h-[550px] lg:h-[617px] flex items-center px-4 sm:px-6 rounded-lg overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 rounded-lg overflow-hidden">
        <Image
          src="/images/hero-ship-sea.png"
          alt="Cargo ship sailing on the sea"
          fill
          className="object-contain"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Container - Max width 1440px with 24px padding */}
      <div className="relative z-10 w-full h-full flex">
        <div className="max-w-2xl flex flex-col gap-[10px] hero-content">
          <h1 className="text-white hero-heading">
            Ship smarter with Sobek
          </h1>
          <p className="text-white hero-tagline">
            Fast reliable sea freight solution
          </p>
          
          <div className="flex flex-col sm:flex-row gap-[10px] mt-4">
            <Link
              href="#contact"
              className="bg-accent text-white px-8 py-3 rounded-[50px] hover:bg-accent-dark transition-colors text-center hero-button"
            >
              Get a Free Quote
            </Link>
            <Link
              href="#services"
              className="border-2 border-white text-white px-8 py-3 rounded-[50px] hover:bg-white/10 transition-colors text-center bg-transparent hero-button"
            >
              View Our Services
            </Link>
          </div>
          
          <p className="text-white max-w-xl mt-4 hero-paragraph">
            We provide reliable, efficient, and cost-effective global maritime and logistics solutions, services that ensure smooth vessel operations and seamless cargo movement across international waters, of deep sea to Russian Ports.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

