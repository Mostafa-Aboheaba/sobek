"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface AboutSobekProps {
  showImage?: boolean;
}

const AboutSobek = ({ showImage = true }: AboutSobekProps) => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Left Side - Image or Content */}
          {showImage ? (
            <>
              <div 
                ref={contentRef}
                className={`scroll-animate-left ${contentVisible ? 'visible' : ''}`}
              >
                <p className="mb-2 section-label">About Sobek</p>
                <h2 className="mb-4 sm:mb-6 section-heading">
                  Sobek Shipping Agency, <span className="text-highlight">The Exclusive Agent of Right Line</span> – Russian Shipping Line, Your Trusted Partner in Global Maritime Logistics.
                </h2>
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  At Sobek, we offer more than just shipping services, we build bridges of trust and efficiency across global markets. We are your dependable logistics partner, connecting you to the world through precise, secure, and fast shipping lines, with a special focus on major Russian ports.
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-[50px] hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
                >
                  Read More
                </Link>
              </div>

              {/* Right Side - Image */}
              <div 
                ref={imageRef}
                className={`relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden scroll-animate-right ${imageVisible ? 'visible' : ''}`}
              >
                <SafeImage
                  src="/images/right-line-containers.png"
                  alt="Right Line shipping containers"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </>
          ) : (
            <>
              {/* Left Side - Heading */}
              <div 
                ref={contentRef}
                className={`scroll-animate-left ${contentVisible ? 'visible' : ''}`}
              >
                <p className="mb-2 section-label">About Sobek</p>
                <h2 className="mb-4 sm:mb-6 section-heading">
                  Sobek Shipping Agency, <span className="text-highlight">The Exclusive Agent of Right Line</span> – Russian Shipping Line, Your Trusted Partner in Global Maritime Logistics.
                </h2>
              </div>

              {/* Right Side - Content */}
              <div 
                ref={imageRef}
                className={`scroll-animate-right ${imageVisible ? 'visible' : ''}`}
              >
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  Sobek Shipping Agency is a leading maritime service provider dedicated to delivering reliable, efficient, and cost-effective shipping solutions across key international trade routes. With a commitment to operational excellence and customer-focused service, we support importers, exporters, and logistics partners with end-to-end maritime expertise.
                </p>
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  As the exclusive agent for Right Line, a distinguished Russian shipping line, Sobek Shipping Agency provides direct access to high-performance liner services, competitive transit times, and seamless cargo handling across major ports.
                </p>
                <p className="text-neutral-dark leading-relaxed">
                  Our goal is simple: To move your cargo safely, efficiently, and on schedule—every time.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSobek;

