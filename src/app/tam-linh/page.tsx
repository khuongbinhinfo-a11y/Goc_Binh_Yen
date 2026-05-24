import TamLinhListingClient from "./TamLinhListingClient";

export const metadata = {
  title: "Tâm Linh | Hồn Thơ",
  description: "Những bài viết về tâm linh, triết lý sống, và những suy ngẫm sâu sắc về cuộc đời.",
  openGraph: {
    title: "Tâm Linh | Hồn Thơ",
    description: "Những bài viết về tâm linh, triết lý sống, và những suy ngẫm sâu sắc về cuộc đời.",
    url: "https://www.hontho.com/tam-linh",
    siteName: "Hồn Thơ",
    images: [{ url: "https://www.hontho.com/images/tam-linh/hero-tam-linh.png", width: 1200, height: 630, alt: "Tâm Linh | Hồn Thơ" }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tâm Linh | Hồn Thơ",
    description: "Những bài viết về tâm linh, triết lý sống, và những suy ngẫm sâu sắc về cuộc đời.",
    images: ["https://www.hontho.com/images/tam-linh/hero-tam-linh.png"],
  },
};

export default function TamLinhPage() {
  return <TamLinhListingClient />;
}

