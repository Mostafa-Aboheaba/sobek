import Link from "next/link";
import { nvoccPath } from "@/lib/nvocc";

const NvoccPromo = () => {
  return (
    <section className="px-4 md:px-8 lg:px-16 pt-6 sm:pt-8" aria-label="NVOCC service">
      <div className="max-w-[1440px] mx-auto rounded-[24px] bg-primary text-white px-6 py-8 sm:px-10 sm:py-10 md:px-12 md:py-12">
        <p className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold tracking-wide uppercase">
          New service
        </p>
        <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight max-w-3xl">
          Sobek NVOCC – Ship from Alexandria with one Sobek Bill of Lading
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
          Consolidated FCL & LCL cargo, guaranteed vessel space, and a single point of contact.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link
            href={nvoccPath}
            className="bg-accent text-white text-center px-6 py-3 rounded-full font-medium hover:bg-accent-dark transition-colors"
          >
            Discover NVOCC
          </Link>
          <Link
            href={`${nvoccPath}#quote`}
            className="border-2 border-white text-white text-center px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NvoccPromo;
