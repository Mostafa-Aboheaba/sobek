"use client";

import Link from "next/link";
import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useCMSContent } from "./CMSContentProvider";

interface AboutRightLineProps {
  showImage?: boolean;
}

const AboutRightLine = ({ showImage = true }: AboutRightLineProps) => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();
  const { getSection, getSectionWithFallback } = useCMSContent();

  const sectionLabel = getSectionWithFallback("about-right-line-label", "About Right Line");
  const heading = getSectionWithFallback(
    "about-right-line-title",
    "Right Line is a trusted name in <span class=\"text-highlight\">global maritime transport</span>, known for its <span class=\"text-highlight\">reliability, strong fleet capacity, and consistent service performance</span>."
  );
  const text = getSectionWithFallback(
    "about-right-line-text",
    "As its exclusive agent, Sobek Shipping Agency manages all regional operations. Through this partnership, clients gain access to optimized routes connecting Russia with key international trade hubs, enabling smooth, secure, and cost-effective cargo movement."
  );
  const buttonText = getSectionWithFallback("about-right-line-button", "Read More");
  const imageURL = getSectionWithFallback("about-right-line-image", "/images/about-sobek-ship.png");

  // Parse features list if available
  const featuresJSON = getSection("about-right-line-features");
  const defaultFeatures = [
    "Vessel coordination and port operations",
    "Container booking and space management",
    "Shipping documentation and compliance",
    "Cargo handling, tracking, and customer support",
    "Freight quotations and schedule updates",
  ];
  
  let features = defaultFeatures;
  if (featuresJSON) {
    try {
      features = JSON.parse(featuresJSON);
    } catch (e) {
      console.error("Error parsing features JSON:", e);
    }
  }

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
                <p className="mb-2 section-label">{sectionLabel}</p>
                <h2 
                  className="mb-4 sm:mb-6 section-heading"
                  dangerouslySetInnerHTML={{ __html: heading }}
                />
                <p className="text-neutral-dark mb-6 leading-relaxed">
                  {text}
                </p>
                <Link
                  href="/about"
                  className="inline-block bg-primary text-white px-6 py-3 rounded-[50px] hover:bg-primary-dark transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold"
                >
                  {buttonText}
                </Link>
              </>
            ) : (
              <>
                <p className="mb-2 section-label">{sectionLabel}</p>
                <h2 
                  className="mb-4 sm:mb-6 section-heading"
                  dangerouslySetInnerHTML={{ __html: heading }}
                />
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
                  src={imageURL}
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
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-neutral-dark leading-relaxed">
                  {text}
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

