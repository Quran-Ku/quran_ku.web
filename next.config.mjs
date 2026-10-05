/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.islamic.network",
      },
      {
        protocol: "https",
        hostname: "ia802609.us.archive.org",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/terms",
        destination: "/terms-and-condition",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms-and-condition",
        permanent: true,
      },
      {
        source: "/snk/quran-ku",
        destination: "/terms-and-condition",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/kebijakan-privasi",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
