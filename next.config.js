/** @type {import('next').NextConfig} */
// IMPORTANT: Update this to match your GitHub repository name
// If your repo is 'username.github.io', set repoName to empty string ''
// If your repo is 'sobek_v2', set repoName to '/sobek_v2'
// If your repo is 'sobek', set repoName to '/sobek'
// The GITHUB_REPOSITORY_NAME env var is set automatically in GitHub Actions
// For local builds, update the default value below to match your repo name
const repoName = process.env.GITHUB_REPOSITORY_NAME || '/sobek_v2';

const nextConfig = {
  output: 'export',
  basePath: repoName,
  assetPrefix: repoName,
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

