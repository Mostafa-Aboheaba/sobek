"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { nvoccPath } from "@/lib/nvocc";

const announcement =
  "Launching Sobek NVOCC: Direct services from Alexandria to 10+ global destinations with one B/L.";

const NvoccAnnouncementBar = () => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const updateHeight = () => {
      const nextHeight = bar.offsetHeight;
      setBarHeight(nextHeight);
      document.documentElement.style.setProperty("--nvocc-bar-height", `${nextHeight}px`);
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(bar);

    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty("--nvocc-bar-height", "0px");
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[60] bg-primary text-white"
        role="region"
        aria-label="NVOCC announcement"
      >
        {isOpen ? (
          <div className="flex items-center gap-3 px-3 sm:px-4 py-2">
            <div className="nvocc-ticker min-w-0 flex-1 overflow-hidden">
              <div className="nvocc-ticker-track">
                {[0, 1].map((copy) => (
                  <p
                    key={copy}
                    className="px-8 text-xs sm:text-sm whitespace-nowrap"
                    aria-hidden={copy === 1}
                  >
                    <span aria-hidden="true">🚀 </span>
                    {announcement}
                  </p>
                ))}
              </div>
            </div>
            <Link
              href={nvoccPath}
              className="shrink-0 bg-accent text-white text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full hover:bg-accent-dark transition-colors whitespace-nowrap"
            >
              Discover NVOCC
            </Link>
            <button
              type="button"
              onClick={handleToggle}
              className="shrink-0 h-8 px-3 rounded-full text-xs font-medium text-white/90 hover:bg-white/15 transition-colors"
              aria-expanded={true}
              aria-label="Hide announcement"
            >
              Hide
            </button>
          </div>
        ) : (
          <div className="flex justify-center px-3 py-1.5">
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white hover:text-white/80 transition-colors"
              aria-expanded={false}
              aria-label="Show announcement"
            >
              Show announcement
              <span aria-hidden="true">▾</span>
            </button>
          </div>
        )}
      </div>
      <div aria-hidden="true" style={{ height: barHeight }} />
    </>
  );
};

export default NvoccAnnouncementBar;
