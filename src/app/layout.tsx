import type { Metadata } from "next";
import { Be_Vietnam_Pro, Lora } from "next/font/google";

import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { resolveMetadataImageUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

import "./globals.css";

const headingFont = Lora({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  weight: ["400", "600", "700"],
});

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hồn Thơ là nơi câu chữ, giọng đọc và những cảm xúc nhẹ được cất lên giữa sắc chiều quê hương.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Hồn Thơ là nơi câu chữ, giọng đọc và những cảm xúc nhẹ được cất lên giữa sắc chiều quê hương.",
    url: SITE_URL,
    images: [
      {
        url: resolveMetadataImageUrl(LOCAL_IMAGE_MAP.heroHome.fallback),
        width: 1200,
        height: 630,
        alt: "Hồn Thơ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Hồn Thơ là nơi câu chữ, giọng đọc và những cảm xúc nhẹ được cất lên giữa sắc chiều quê hương.",
    images: [resolveMetadataImageUrl(LOCAL_IMAGE_MAP.heroHome.fallback)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#8b5e3c] focus:px-4 focus:py-2 focus:text-white"
        >
          Chuyển đến nội dung chính
        </a>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
