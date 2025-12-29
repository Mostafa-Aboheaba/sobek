/** @type {import('next').NextConfig} */
// IMPORTANT: Update this to match your GitHub repository name
// If your repo is 'username.github.io', set repoName to empty string ''
// If your repo is 'sobek_v2', set repoName to '/sobek_v2'
// If your repo is 'sobek', set repoName to '/sobek'
// 
// The GITHUB_REPOSITORY_NAME env var is set automatically in GitHub Actions
// For local builds, update the default value below to match your repo name
// 
// HOW IT WORKS:
// - Development (npm run dev): No basePath - works on localhost
// - Local build (npm run build): No basePath - for cPanel/GoDaddy root domain
// - cPanel build (npm run build:cpanel): Explicitly no basePath - for sobek-egy.com
// - GitHub Pages build: Uses basePath from GITHUB_REPOSITORY_NAME env var
const repoName = process.env.GITHUB_REPOSITORY_NAME || '/sobek_v2';

// Only use basePath when explicitly building for GitHub Pages
// Check if GITHUB_REPOSITORY_NAME is set (which happens in GitHub Actions)
// This ensures:
// - Dev mode works without basePath (localhost)
// - Local builds work without basePath (for testing)
// - GitHub Pages builds work with basePath
const useBasePath = !!process.env.GITHUB_REPOSITORY_NAME;

// Debug logging (only in CI/CD)
if (process.env.CI || process.env.GITHUB_ACTIONS) {
  console.log('🔧 Next.js Config Debug:');
  console.log('  GITHUB_ACTIONS:', process.env.GITHUB_ACTIONS);
  console.log('  GITHUB_REPOSITORY_NAME:', process.env.GITHUB_REPOSITORY_NAME);
  console.log('  NODE_ENV:', process.env.NODE_ENV);
  console.log('  repoName:', repoName);
  console.log('  useBasePath:', useBasePath);
}

const nextConfig = {
  // Only use static export for GitHub Pages or cPanel builds when explicitly requested
  // For Vercel or when CMS dashboard is needed, don't use static export
  // CMS dashboard requires SSR and API routes, which don't work with static export
  // Set ENABLE_STATIC_EXPORT=true to force static export (public site only, no CMS)
  ...(process.env.VERCEL || process.env.ENABLE_CMS ? {} : 
      process.env.ENABLE_STATIC_EXPORT === 'true' ? { output: 'export' } : {}),
  
  // Enable next-intl plugin for i18n (only when CMS is enabled)
  ...(process.env.ENABLE_CMS === 'true' || process.env.NODE_ENV === 'development' ? {
    plugins: [
      require('next-intl/plugin')('./i18n/request.ts')
    ]
  } : {}),
  // Only set basePath and assetPrefix when building for GitHub Pages
  // This ensures dev server and local builds work without basePath
  ...(useBasePath ? {
    basePath: repoName,
    assetPrefix: repoName,
  } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Skip API routes during static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Exclude API routes from build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

module.exports = nextConfig

