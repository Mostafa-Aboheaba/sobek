/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'sobek' // Change this if your repo name is different

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Skip API routes during static export
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Only add basePath in production for GitHub Pages
  ...(isProd && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}`,
  }),
  // Exclude API routes from build
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

module.exports = nextConfig

