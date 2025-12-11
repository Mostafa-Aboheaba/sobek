'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  onError?: () => void;
}

const SafeImage = ({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  style,
  onError,
}: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [basePath, setBasePath] = useState<string>('');

  useEffect(() => {
    // Detect basePath from current URL or use default for GitHub Pages
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const hostname = window.location.hostname;
      
      // Check if we're on GitHub Pages (pathname starts with /sobek or /sobek_v2)
      if (pathname.startsWith('/sobek') || pathname.startsWith('/sobek_v2')) {
        setBasePath(pathname.split('/')[1] ? `/${pathname.split('/')[1]}` : '');
      } else if (hostname.includes('github.io')) {
        // GitHub Pages domain - use basePath
        setBasePath('/sobek_v2');
      } else {
        // cPanel/GoDaddy root domain - no basePath
        setBasePath('');
      }
    }
  }, []);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Try with basePath if not already included
      if (basePath && !imgSrc.startsWith(basePath)) {
        const newSrc = `${basePath}${imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`}`;
        setImgSrc(newSrc);
        setHasError(false); // Reset to try again with basePath
      } else {
        // If still fails, show placeholder
        setImgSrc(`${basePath}/images/placeholder.png`);
      }
      onError?.();
    }
  };

  // If image failed to load, show placeholder
  if (hasError && imgSrc.includes('placeholder.png')) {
    return (
      <div
        className={`bg-neutral-lighter flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <div className="text-center p-4">
          <svg
            className="w-16 h-16 mx-auto mb-2 text-neutral-medium"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-neutral-medium">Image not found</p>
        </div>
      </div>
    );
  }

  // Ensure src has correct basePath for GitHub Pages
  // For static export, Next.js Image doesn't automatically prepend basePath, so we do it manually
  let finalSrc = imgSrc;
  
  if (!imgSrc.startsWith('http') && !imgSrc.startsWith('data:') && !imgSrc.startsWith('//')) {
    // Apply basePath if detected and not already present
    if (basePath && !imgSrc.startsWith(basePath)) {
      finalSrc = `${basePath}${imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`}`;
    }
  }

  if (fill) {
    return (
      <Image
        src={finalSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes}
        style={style}
        onError={handleError}
        unoptimized
      />
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
      style={style}
      onError={handleError}
      unoptimized
    />
  );
};

export default SafeImage;

