"use client";

import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface IndustryItemProps {
  industry: string;
  index: number;
}

const IndustryItem = ({ industry, index }: IndustryItemProps) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <li 
      ref={ref}
      key={index}
      className={`flex items-start scroll-animate-up ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="industry-item mr-3 transition-colors duration-300 hover:text-accent">{index + 1}.</span>
      <span className="industry-item transition-colors duration-300 hover:text-accent">{industry}</span>
    </li>
  );
};

const IndustriesWeServe = () => {
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();
  const industries = [
    "Agriculture & Food Products",
    "Construction Materials",
    "Machinery & Equipment",
    "Automotive",
    "Consumer Goods",
    "Chemicals (non-hazardous)/hazardous",
    "Retail & FMCG",
  ];

  return (
    <section className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          {/* Left Side - Image */}
          <div 
            ref={imageRef}
            className={`relative h-[400px] rounded-lg overflow-hidden scroll-animate-left hover-lift ${imageVisible ? 'visible' : ''}`}
          >
            <SafeImage
              src="/images/industries-container.png"
              alt="Shipping containers for various industries"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div 
            ref={contentRef}
            className={`scroll-animate-right ${contentVisible ? 'visible' : ''}`}
          >
            <p className="mb-2 section-label">Industries We Serve</p>
            <h2 className="mb-8 section-heading">
              Powering Industries of All Kinds
            </h2>
            <ul>
              {industries.map((industry, index) => (
                <IndustryItem key={index} industry={industry} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;

