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
// - Local build (npm run build): No basePath - for testing locally
// - GitHub Pages build: Uses basePath from GITHUB_REPOSITORY_NAME env var
const repoName = process.env.GITHUB_REPOSITORY_NAME || '/sobek_v2';

// Only use basePath when explicitly building for GitHub Pages
// Check if GITHUB_REPOSITORY_NAME is set (which happens in GitHub Actions)
// This ensures:
// - Dev mode works without basePath (localhost)
// - Local builds work without basePath (for testing)
// - GitHub Pages builds work with basePath
const useBasePath = !!process.env.GITHUB_REPOSITORY_NAME;

const nextConfig = {
  output: 'export',
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

