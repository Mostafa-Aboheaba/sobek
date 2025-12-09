"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface AboutRightLineProps {
  showImage?: boolean;
}

const AboutRightLine = ({ showImage = true }: AboutRightLineProps) => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start">
          {/* Left Side - Heading */}
          <div 
            ref={contentRef}
            className={`scroll-animate-left ${contentVisible ? 'visible' : ''}`}
          >
            {showImage ? (
              <>
                <p className="mb-2 section-label">About Right Line</p>
                <h2 className="mb-4 sm:mb-6 section-heading">
                  Right Line is a trusted name in <span className="text-highlight">global maritime transport</span>, known for its <span className="text-highlight">reliability, strong fleet capacity, and consistent service performance</span>.
                </h2>
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  As its exclusive agent, Sobek Shipping Agency manages all regional operations. Through this partnership, clients gain access to optimized routes connecting Russia with key international trade hubs, enabling smooth, secure, and cost-effective cargo movement.
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-[50px] hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
                >
                  Read More
                </Link>
              </>
            ) : (
              <>
                <p className="mb-2 section-label">About Right Line</p>
                <h2 className="mb-4 sm:mb-6 section-heading">
                  Right Line is a trusted name in <span className="text-highlight">global maritime transport</span>, known for its <span className="text-highlight">reliability, strong fleet capacity, and consistent service performance</span>.
                </h2>
              </>
            )}
          </div>

          {/* Right Side - Image or Description */}
          <div 
            ref={imageRef}
            className={`scroll-animate-right ${imageVisible ? 'visible' : ''}`}
          >
            {showImage ? (
              <div className={`relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden`}>
                <SafeImage
                  src="/images/about-sobek-ship.png"
                  alt="Sobek cargo ship"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <>
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  Right Line is a trusted name in global maritime transport, known for its reliability, strong fleet capacity, and consistent service performance. As its exclusive agent, Sobek Shipping Agency manages all regional operations, including:
                </p>
                <ul className="text-neutral-dark space-y-3 mb-6 leading-relaxed">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Vessel coordination and port operations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Container booking and space management</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Shipping documentation and compliance</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Cargo handling, tracking, and customer support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Freight quotations and schedule updates</span>
                  </li>
                </ul>
                <p className="text-neutral-dark leading-relaxed">
                  Through this partnership, clients gain access to optimized routes connecting Russia with key international trade hubs, enabling smooth, secure, and cost-effective cargo movement.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRightLine;

