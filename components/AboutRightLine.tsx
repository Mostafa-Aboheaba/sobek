import Image from "next/image";
import Link from "next/link";

const AboutRightLine = () => {
  return (
    <section className="py-16 sm:py-20 md:py-[120px] px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <p className="mb-2 section-label">
              About Right Line
            </p>
            <h2 className="mb-6 section-heading">
              Right Line is a trusted name in global maritime transport, known for its <span className="text-highlight">reliability, strong fleet capacity, and consistent service performance</span>.
            </h2>
            <p className="text-neutral-dark mb-6 leading-relaxed">
              With a modern fleet and extensive network, Right Line operates efficient shipping routes connecting major ports worldwide. As Sobek Shipping Agency, we serve as the exclusive representative of Right Line, optimizing routes and ensuring smooth, secure, and cost-effective cargo movement for our clients.
            </p>
            <Link
              href="#about"
              className="inline-block bg-primary text-white px-8 py-3 rounded-[50px] hover:bg-primary-dark transition-colors"
            >
              Read More
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/about-sobek-ship.png"
              alt="Right Line shipping vessel"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRightLine;

