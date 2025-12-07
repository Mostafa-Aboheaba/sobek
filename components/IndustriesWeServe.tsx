import SafeImage from "./SafeImage";

const IndustriesWeServe = () => {
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
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <SafeImage
              src="/images/industries-container.png"
              alt="Shipping containers for various industries"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div>
            <p className="mb-2 section-label">Industries We Serve</p>
            <h2 className="mb-8 section-heading">
              Powering Industries of All Kinds
            </h2>
            <ul>
              {industries.map((industry, index) => (
                <li key={index} className="flex items-start">
                  <span className="industry-item mr-3">{index + 1}.</span>
                  <span className="industry-item">{industry}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;

