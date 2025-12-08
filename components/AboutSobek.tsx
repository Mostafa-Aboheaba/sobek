"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";

const AboutSobek = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Heading */}
          <div 
            ref={contentRef}
            className={`scroll-animate-left ${contentVisible ? 'visible' : ''}`}
          >
            <h2 className="mb-6 section-heading">
              Sobek Shipping Agency, <span className="text-highlight">The Exclusive Agent of Right Line</span> – Russian Shipping Line, Your Trusted Partner in Global Maritime Logistics.
            </h2>
          </div>

          {/* Right Side - Description */}
          <div 
            ref={imageRef}
            className={`scroll-animate-right ${imageVisible ? 'visible' : ''}`}
          >
            <p className="text-neutral-dark mb-6 leading-relaxed">
              Sobek Shipping Agency stands as a dependable logistics partner, connecting the world through precise, secure, and fast shipping lines. As the exclusive agent of Right Line, we specialize in facilitating seamless cargo movement to Russian ports, ensuring your shipments reach their destination efficiently and safely.
            </p>
            <p className="text-neutral-dark mb-6 leading-relaxed">
              Our commitment to operational excellence and customer satisfaction drives everything we do. We provide direct access to Right Line's high-performance liner services, eliminating intermediaries and ensuring transparent, reliable shipping solutions. Our goal: To move your cargo safely, efficiently, and on schedule—every time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSobek;

