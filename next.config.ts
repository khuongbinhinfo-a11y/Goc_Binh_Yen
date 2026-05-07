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
};

export default nextConfig;
