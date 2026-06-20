/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The portal (apply.) and verify (verify.) are SEPARATE hosts handled by their
  // own deploys / middleware; this app is the institutional apex. Keep it lean.
  poweredByHeader: false,
}

export default nextConfig
