/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repoName = 'sobek' // Change this if your repo name is different

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only add basePath in production for GitHub Pages
  ...(isProd && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}`,
  }),
}

module.exports = nextConfig

