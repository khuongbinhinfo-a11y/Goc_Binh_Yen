import type { NextConfig } from "next";

function getR2Hostname() {
  const raw = process.env.R2_PUBLIC_DEV_URL?.trim();
  if (!raw) return "pub-a9e671dd309348caa85e940ff8ac8226.r2.dev";

  try {
    return new URL(raw).hostname;
  } catch {
    return "pub-a9e671dd309348caa85e940ff8ac8226.r2.dev";
  }
}

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: getR2Hostname(),
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
