import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";

import { LocaleProvider } from "@/components/providers/LocaleProvider";

import "./globals.css";

const bodyFont = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hồn Thơ",
  description: "Hồn Thơ là nơi câu chữ, giọng đọc và những cảm xúc nhẹ được cất lên giữa sắc chiều quê hương.",
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