"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";

const AboutRightLine = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Heading */}
          <div 
            ref={contentRef}
            className={`scroll-animate-left ${contentVisible ? 'visible' : ''}`}
          >
            <h2 className="mb-6 section-heading">
              Right Line is a trusted name in global maritime transport, known for its <span className="text-highlight">reliability, strong fleet capacity, and consistent service performance</span>.
            </h2>
          </div>

          {/* Right Side - Description with Bullet Points */}
          <div 
            ref={imageRef}
            className={`scroll-animate-right ${imageVisible ? 'visible' : ''}`}
          >
            <p className="text-neutral-dark mb-6 leading-relaxed">
              With a modern fleet and extensive network, Right Line operates efficient shipping routes connecting major ports worldwide. As Sobek Shipping Agency, we serve as the exclusive representative of Right Line, optimizing routes and ensuring smooth, secure, and cost-effective cargo movement for our clients.
            </p>
            <p className="text-neutral-dark mb-4 leading-relaxed">
              Our regional operations managed by Sobek Shipping Agency include:
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
              We offer optimized routes connecting Russia with international trade hubs, ensuring your cargo reaches its destination efficiently and on time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRightLine;

