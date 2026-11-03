/** @type {import('next').NextConfig} */
// STATIC_EXPORT=1 builds a static copy for the quota-free preview address (raw.githack.com, branch `static`).
// BASE_PATH is the folder it is served from; Vercel builds without either.
const base = process.env.BASE_PATH || ''
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  env: { NEXT_PUBLIC_BASE_PATH: base },
  ...(process.env.STATIC_EXPORT
    ? { output: 'export', basePath: base, trailingSlash: true, images: { unoptimized: true } }
    : {}),
}

module.exports = nextConfig
