import { nvoccValueProps } from "@/lib/nvocc";

const NvoccValueProps = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16 pb-12 sm:pb-16" aria-labelledby="nvocc-value-heading">
      <div className="max-w-[1440px] mx-auto">
        <p className="section-label mb-2">Why Sobek NVOCC</p>
        <h2 id="nvocc-value-heading" className="section-heading-lg mb-8 max-w-3xl">
          One carrier relationship for the lanes that leave Alexandria.
        </h2>
        <div className="grid items-stretch md:grid-cols-3 gap-4 sm:gap-6">
          {nvoccValueProps.map((item, index) => (
            <article key={item.title} className="feature-card h-full !justify-start">
              <div className="service-number">{index + 1}.</div>
              <div className="service-card-content-wrapper flex-1">
                <h3 className="service-card-heading text-accent !leading-snug min-h-[2.75em]">
                  {item.title}
                </h3>
                <p className="service-card-content text-neutral-dark">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NvoccValueProps;
