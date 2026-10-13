"use client";

import { useEffect, useMemo, useState } from "react";
import SafeImage from "./SafeImage";
import {
  galleryCategories,
  galleryImages,
  type GalleryCategory,
} from "@/lib/gallery";

const CompanyGallery = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((image) => image.category === activeCategory);
  }, [activeCategory]);

  const activeImage = activeIndex === null ? null : visibleImages[activeIndex];

  const handleCategoryChange = (category: GalleryCategory) => {
    setActiveCategory(category);
    setActiveIndex(null);
  };

  const handleOpen = (index: number) => {
    setActiveIndex(index);
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  const handlePrevious = () => {
    setActiveIndex((current) => {
      if (current === null || visibleImages.length === 0) return current;
      return (current - 1 + visibleImages.length) % visibleImages.length;
    });
  };

  const handleNext = () => {
    setActiveIndex((current) => {
      if (current === null || visibleImages.length === 0) return current;
      return (current + 1) % visibleImages.length;
    });
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
      if (event.key === "ArrowLeft") handlePrevious();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, visibleImages.length]);

  return (
    <section className="px-4 md:px-8 lg:px-16 pb-16 sm:pb-20 md:pb-28" aria-label="Company gallery">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">
              Sobek in pictures
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-dark">
              Company gallery
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
            {galleryCategories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-white shadow-md"
                      : "bg-background text-neutral-dark hover:bg-primary/10"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {visibleImages.length === 0 ? (
          <p className="text-neutral-light">No photos in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 auto-rows-[220px] sm:auto-rows-[260px]">
            {visibleImages.map((image, index) => {
              const isFeatured = index === 0 && visibleImages.length > 1;
              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => handleOpen(index)}
                  className={`group relative h-full w-full overflow-hidden text-left rounded-[20px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    isFeatured ? "sm:col-span-2 lg:row-span-2" : ""
                  }`}
                  aria-label={`Open ${image.title}`}
                >
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={isFeatured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="text-white/80 text-xs font-medium uppercase tracking-wide">
                      {image.category}
                    </p>
                    <h3 className="text-white text-lg sm:text-xl font-semibold mt-1">
                      {image.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeImage && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[80] bg-black/85 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          onClick={handleClose}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            aria-label="Close gallery"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handlePrevious();
            }}
            className="hidden sm:flex absolute left-4 md:left-6 w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white/25 items-center justify-center transition-colors"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <figure
            className="relative w-full max-w-5xl max-h-[85vh] flex flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full h-[52vh] sm:h-[62vh] rounded-[20px] overflow-hidden bg-black">
              <SafeImage
                key={activeImage.id}
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 text-white">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg sm:text-xl font-semibold">{activeImage.title}</h3>
                <p className="text-sm text-white/70">
                  {activeIndex + 1} / {visibleImages.length}
                </p>
              </div>
              <p className="mt-1 text-sm sm:text-base text-white/80">{activeImage.caption}</p>
            </figcaption>
            <div className="mt-4 flex sm:hidden justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                className="px-4 py-2 rounded-full bg-white/15 text-white text-sm"
                aria-label="Previous photo"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-full bg-white/15 text-white text-sm"
                aria-label="Next photo"
              >
                Next
              </button>
            </div>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleNext();
            }}
            className="hidden sm:flex absolute right-4 md:right-6 w-11 h-11 rounded-full bg-white/15 text-white hover:bg-white/25 items-center justify-center transition-colors"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default CompanyGallery;
