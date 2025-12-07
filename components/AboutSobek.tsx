import Link from "next/link";
import SafeImage from "./SafeImage";

const AboutSobek = () => {
  return (
    <section id="about" className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <SafeImage
              src="/images/right-line-containers.png"
              alt="Sobek shipping containers"
              fill
              className="object-contain rounded-lg"
            />
          </div>
     

          {/* Right Side - Content */}
          <div>
            <p className="mb-2 section-label">
              About Sobek
            </p>
            <h2 className="mb-6 section-heading">
              Sobek Shipping Agency, <span className="text-highlight">The Exclusive Agent of Right Line</span> – Russian Shipping Line, Your Trusted Partner in Global Maritime Logistics.
            </h2>
            <p className="text-neutral-dark mb-6 leading-relaxed">
              Sobek Shipping Agency stands as a dependable logistics partner, connecting the world through precise, secure, and fast shipping lines. As the exclusive agent of Right Line, we specialize in facilitating seamless cargo movement to Russian ports, ensuring your shipments reach their destination efficiently and safely.
            </p>
            <Link
              href="#about"
              className="inline-block bg-primary text-white px-8 py-3 rounded-[50px] hover:bg-primary-dark transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSobek;

