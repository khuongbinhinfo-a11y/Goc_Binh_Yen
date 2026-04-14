import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import BrandClosingSection from "@/components/sections/BrandClosingSection";
import ContactSection from "@/components/sections/ContactSection";
import ContentPillarsSection from "@/components/sections/ContentPillarsSection";
import FeaturedContentSection from "@/components/sections/FeaturedContentSection";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import SocialSection from "@/components/sections/SocialSection";

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
