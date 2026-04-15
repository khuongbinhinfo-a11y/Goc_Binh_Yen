import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

import "./globals.css";

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
        url: LOCAL_IMAGE_MAP.heroHome.fallback,
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
    images: [LOCAL_IMAGE_MAP.heroHome.fallback],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} antialiased`}>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
