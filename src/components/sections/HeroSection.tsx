import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="trang-chu" className="relative min-h-[84vh] overflow-hidden scroll-mt-24">
      <Image
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
        alt="Sông nước quê hương lúc chiều tà"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#4c3122]/35 via-[#3f281d]/45 to-[#301f17]/78" />

      <div className="site-shell relative z-10 flex min-h-[84vh] items-center py-14">
        <article className="max-w-3xl rounded-[2rem] border border-white/20 bg-[#4b2f20]/35 p-7 text-[#f9ead8] shadow-2xl backdrop-blur-sm sm:p-9">
          <p className="eyebrow text-[#f4d8b8]">Sông nước · chiều tà · ký ức quê hương</p>
          <h1 className="mb-4 text-5xl leading-[1.06] text-white sm:text-6xl lg:text-7xl">
            Một góc lắng lại giữa dòng đời vội
          </h1>
          <p className="max-w-2xl text-base leading-8 text-[#f4e2cf] sm:text-lg">
            Góc Bình Yên là nơi thơ, chuyện và những xúc cảm nhẹ nhàng được cất lên giữa sắc chiều quê hương.
            Không gian này được tạo ra để người xem có thể thở chậm, đọc sâu và lắng nghe chính mình.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#noi-dung-noi-bat" className="soft-button">
              Khám phá nội dung
            </a>
            <a
              href="#lien-he"
              className="rounded-full border border-[#f5dabc]/40 bg-white/10 px-6 py-3 text-sm font-semibold text-[#fff1e0] transition hover:bg-white/20"
            >
              Gửi lời nhắn
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
