import type { Metadata } from "next";

export const SITE_NAME = "Hồn Thơ";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hon-tho.vercel.app";

type RouteMetadataInput = {
  title: string;
  description: string;
  path: string;
  image: string;
};

function toAbsoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value;
  return new URL(value, SITE_URL).toString();
}

export function createRouteMetadata({ title, description, path, image }: RouteMetadataInput): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = toAbsoluteUrl(canonicalPath);
  const imageUrl = toAbsoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
