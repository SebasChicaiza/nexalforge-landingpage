import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/politicas-privacidad",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/politica-privacidad",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terminos",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terminos-y-condiciones",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/reembolsos",
        destination: "/refunds",
        permanent: true,
      },
      {
        source: "/politica-de-reembolsos",
        destination: "/refunds",
        permanent: true,
      },
      {
        source: "/refund-policy",
        destination: "/refunds",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
