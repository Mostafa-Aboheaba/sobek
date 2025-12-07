/**
 * Utility function to get the correct image path for static export
 * Handles basePath for GitHub Pages deployment
 */
export const getImagePath = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // In production with basePath, Next.js handles this automatically
  // But for static export, we need to ensure the path is correct
  // The basePath is already configured in next.config.js
  return `/${cleanPath}`;
};

/**
 * Get the base path for assets (empty in dev, /sobek in production)
 */
export const getBasePath = (): string => {
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on GitHub Pages
    const pathname = window.location.pathname;
    if (pathname.startsWith('/sobek')) {
      return '/sobek';
    }
  }
  
  // Server-side or development
  return process.env.NODE_ENV === 'production' ? '/sobek' : '';
};

