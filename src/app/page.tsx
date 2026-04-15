import type { Metadata } from "next";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import BrandClosingSection from "@/components/sections/BrandClosingSection";
import ContactSection from "@/components/sections/ContactSection";
import ContentPillarsSection from "@/components/sections/ContentPillarsSection";
import FeaturedContentSection from "@/components/sections/FeaturedContentSection";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import SocialSection from "@/components/sections/SocialSection";
import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Hồn Thơ",
  description:
    "Hồn Thơ là nơi thơ, chuyện và những xúc cảm nhẹ được cất lên trong sắc chiều bên dòng sông quê.",
  path: "/",
  image: LOCAL_IMAGE_MAP.heroHome.fallback,
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />
      <main>
        <HeroSection />
        <IntroSection />
        <ContentPillarsSection />
        <FeaturedContentSection />
        <BrandClosingSection />
        <ContactSection />
        <SocialSection />
      </main>
      <SiteFooter />
    </div>
  );
}
