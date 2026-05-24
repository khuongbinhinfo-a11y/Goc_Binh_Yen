import KeChuyenListingClient from "./KeChuyenListingClient";

export const metadata = {
  title: "Kể Chuyện | Hồn Thơ",
  description: "Những câu chuyện nhỏ về miền Tây, về quê hương, về tình người - được kể bằng giọng văn giản dị và ấm áp.",
  openGraph: {
    title: "Kể Chuyện | Hồn Thơ",
    description: "Những câu chuyện nhỏ về miền Tây, về quê hương, về tình người - được kể bằng giọng văn giản dị và ấm áp.",
    url: "https://www.hontho.com/ke-chuyen",
    siteName: "Hồn Thơ",
    images: [{ url: "https://www.hontho.com/images/ke-chuyen/ke-chuyen-hero.png", width: 1200, height: 630, alt: "Kể Chuyện | Hồn Thơ" }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kể Chuyện | Hồn Thơ",
    description: "Những câu chuyện nhỏ về miền Tây, về quê hương, về tình người - được kể bằng giọng văn giản dị và ấm áp.",
    images: ["https://www.hontho.com/images/ke-chuyen/ke-chuyen-hero.png"],
  },
};

export default function KeChuyenPage() {
  return <KeChuyenListingClient />;
}

