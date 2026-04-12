import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond } from "next/font/google";

import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

const headingFont = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Góc Bình Yên",
  description:
    "Góc Bình Yên là nơi thơ, chuyện và những xúc cảm nhẹ nhàng được cất lên giữa sắc chiều quê hương.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${bodyFont.variable} ${headingFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
