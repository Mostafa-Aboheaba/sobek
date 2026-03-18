"use client";

import SafeImage from "./SafeImage";
import { useScrollAnimation } from "@/lib/useScrollAnimation";

interface ScheduleItem {
  voyage: string;
  date: string;
  day: string;
}

interface ScheduleColumn {
  title: string;
  items: ScheduleItem[];
}

const ShipSchedule = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLDivElement>();

  const schedules: ScheduleColumn[] = [
    {
      title: "S. Kuznetsov in El Dekheila / Alexandria",
      items: [
        { voyage: "13N", date: "31. 12. 2025", day: "Wednesday" },
        { voyage: "14N", date: "18. 01. 2026", day: "Sunday" },
        { voyage: "15N", date: "05. 02. 2026", day: "Thursday" },
      ],
    },
    {
      title: "S. Kuznetsov in Novorossiysk",
      items: [
        { voyage: "13", date: "22. 12. 2025", day: "Monday" },
        { voyage: "14", date: "08. 01. 2026", day: "Thursday" },
        { voyage: "15", date: "26. 01. 2026", day: "Monday" },
      ],
    },
    {
      title: "Barents in El Dekheila / Alexandria",
      items: [
        { voyage: "01N", date: "05. 01. 2026", day: "Monday" },
        { voyage: "02N", date: "23. 01. 2026", day: "Friday" },
        { voyage: "03N", date: "10. 02. 2026", day: "Tuesday" },
      ],
    },
    {
      title: "Barents in Novorossiysk",
      items: [
        { voyage: "02", date: "13. 01. 2026", day: "Tuesday" },
        { voyage: "03", date: "31. 01. 2026", day: "Saturday" },
        { voyage: "04", date: "18. 02. 2026", day: "Wednesday" },
      ],
    },
  ];

  return (
    <section className="relative w-full max-w-[1440px] mx-auto py-6 sm:py-8 md:py-12 px-4 sm:px-6 overflow-hidden mb-8 sm:mb-12 md:mb-16 bg-[#012C4E]" style={{ borderRadius: '40px' }}>
      <div
        ref={sectionRef}
        className={`scroll-animate-up ${sectionVisible ? 'visible' : ''}`}
      >
        {/* Logos Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="flex items-center">
            <SafeImage
              src="/logo/right-white.png"
              alt="RIGHT Line logo"
              width={150}
              height={60}
              className="h-auto object-contain"
              sizes="(max-width: 768px) 120px, 150px"
            />
          </div>
          <div className="flex items-center">
            <SafeImage
              src="/logo/sobek-white.png"
              alt="SOBEK logo"
              width={150}
              height={60}
              className="h-auto object-contain"
              sizes="(max-width: 768px) 120px, 150px"
            />
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-white font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Ship Schedule
          </h2>
          <p className="text-white text-sm sm:text-base md:text-lg opacity-90" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
            Information as of 24. 12. 2025
          </p>
        </div>

        {/* Schedule Grid - 2x2 Layout */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full max-w-4xl">
            {/* Top Left - 1: S. Kuznetsov in El Dekheila / Alexandria */}
            <div
              className="scroll-animate-up text-center sm:text-left"
              style={{ 
                transitionDelay: '0s',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}
            >
              <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {schedules[0].title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {schedules[0].items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-white text-sm sm:text-base md:text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="font-semibold">{item.voyage}</span> – {item.date} ({item.day})
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Right - 3: Barents in El Dekheila / Alexandria */}
            <div
              className="scroll-animate-up text-center sm:text-left"
              style={{ 
                transitionDelay: '0.2s',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}
            >
              <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {schedules[2].title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {schedules[2].items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-white text-sm sm:text-base md:text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="font-semibold">{item.voyage}</span> – {item.date} ({item.day})
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Left - 2: S. Kuznetsov in Novorossiysk */}
            <div
              className="scroll-animate-up text-center sm:text-left"
              style={{ 
                transitionDelay: '0.1s',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}
            >
              <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {schedules[1].title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {schedules[1].items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-white text-sm sm:text-base md:text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="font-semibold">{item.voyage}</span> – {item.date} ({item.day})
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Right - 4: Barents in Novorossiysk */}
            <div
              className="scroll-animate-up text-center sm:text-left"
              style={{ 
                transitionDelay: '0.3s',
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}
            >
              <h3 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-4 sm:mb-6" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                {schedules[3].title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {schedules[3].items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-white text-sm sm:text-base md:text-lg" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>
                    <span className="font-semibold">{item.voyage}</span> – {item.date} ({item.day})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShipSchedule;

