import Image from "next/image";

import { HERO_IMAGE } from "@/data/homepageData";

export default function HeroSection() {
  return (
    <section id="trang-chu" className="relative min-h-[82vh] overflow-hidden scroll-mt-24">
      <Image
        src={HERO_IMAGE}
        alt="Chiều tà bên dòng sông quê"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#5a3a28]/24 via-[#4d3022]/42 to-[#2e1e16]/72" />

      <div className="site-shell relative z-10 flex min-h-[82vh] items-center py-14">
        <article className="max-w-3xl rounded-[2rem] border border-[#ffe7ce]/30 bg-gradient-to-br from-[#5a3a2a]/30 to-[#3e281d]/34 p-7 text-[#f9ead8] shadow-[0_22px_48px_rgba(34,22,16,0.35)] backdrop-blur-[5px] sm:p-9">
          <p className="eyebrow text-[#f2d6b7]">Sông nước quê · nắng cuối ngày · chạm vào ký ức</p>
          <h1 className="mb-4 text-5xl font-bold leading-[1.1] tracking-[-0.01em] text-white sm:text-6xl lg:text-7xl">
            Một góc lắng lại giữa dòng đời vội
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#f7e7d5] sm:text-lg">
            Góc Bình Yên là nơi thơ, chuyện và những xúc cảm nhẹ được cất lên trong sắc chiều bên dòng sông quê,
            để mỗi người có thể thở chậm và tìm lại một khoảng yên cho riêng mình.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#noi-dung-noi-bat" className="soft-button">
              Khám phá nội dung
            </a>
            <a
              href="#lien-he"
              className="rounded-full border border-[#f0d5ba]/45 bg-[#fff9f0]/10 px-6 py-3 text-sm font-semibold text-[#fff4e7] transition hover:bg-[#fff8ef]/18"
            >
              Gửi lời nhắn
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
