"use client";

import { useScrollAnimation } from "@/lib/useScrollAnimation";
import { useCMSContent } from "./CMSContentProvider";

interface ServiceCardProps {
  service: {
    number: string;
    title: string;
    description: string;
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  
  return (
    <div
      ref={ref}
      className={`scroll-animate-up feature-card ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="service-number">
        {service.number}.
      </div>
      <div className="service-card-content-wrapper">
        <h3 className="service-card-heading text-accent">
          {service.title}
        </h3>
        <p className="service-card-content">{service.description}</p>
      </div>
    </div>
  );
};

const OurServices = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLDivElement>();
  const { getSection, getSectionWithFallback } = useCMSContent();

  // Get services list from CMS (stored as JSON)
  const servicesJSON = getSection("services-list");
  const defaultServices = [
    {
      number: "1",
      title: "Cargo Booking & Space Management",
      description: "Fast, accurate booking processes and guaranteed space allocation on Right Line vessels.",
    },
    {
      number: "2",
      title: "Port & Vessel Operations",
      description: "Comprehensive port agency support, including berthing arrangements, stevedoring coordination, and documentation handling.",
    },
    {
      number: "3",
      title: "Container Services",
      description: "Full support for dry, reefer, and special containers, including tracking, storage, and maintenance coordination.",
    },
    {
      number: "4",
      title: "Customs Documentation & Support",
      description: "Expert assistance in customs, regulatory compliance, and required shipping documentation.",
    },
    {
      number: "5",
      title: "Freight Forwarding Support",
      description: "Integrated logistics solutions, combining sea transport with inland delivery options.",
    },
    {
      number: "6",
      title: "Captain Receipt",
      description: "We rely on our dedicated Captain Receipt Delivery Service to ensure all documents and letters reach their destinations securely and without delay.",
    },
  ];

  // Parse services from CMS or use defaults
  let services = defaultServices;
  if (servicesJSON) {
    try {
      services = JSON.parse(servicesJSON);
    } catch (e) {
      console.error("Error parsing services JSON:", e);
    }
  }

  const sectionLabel = getSectionWithFallback("services-label", "Our Services");
  const heading = getSectionWithFallback(
    "services-heading",
    "As the <span class=\"text-highlight\">sole representative of Right Line in the region</span>, we manage all <span class=\"text-highlight\">shipping line operations</span> with precision and professionalism."
  );

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={sectionRef}
          className={`text-start mb-12 scroll-animate-up ${sectionVisible ? 'visible' : ''}`}
        >
          <p className="mb-2 section-label">
            {sectionLabel}
          </p>
          <h2 
            className="mb-4 sm:mb-6 section-heading-lg"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;

