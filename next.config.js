/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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

