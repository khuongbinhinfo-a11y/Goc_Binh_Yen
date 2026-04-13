import Image from "next/image";

import { contentPillars } from "@/data/homepageData";

export default function ContentPillarsSection() {
  return (
    <section className="pb-20">
      <div className="site-shell">
        <div className="mb-8">
          <p className="eyebrow">Ba trụ nội dung</p>
          <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">
            Những khoảng nội dung giữ nhịp cảm xúc cho toàn bộ website
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contentPillars.map((pillar) => (
            <article
              key={pillar.id}
              id={pillar.id}
              className="soft-panel group scroll-mt-24 overflow-hidden bg-white/75"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3e281c]/45 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="mb-3 text-3xl font-semibold leading-tight text-[#4a2f20]">{pillar.title}</h3>
                <p className="mb-5 text-sm leading-7 text-[#654939] sm:text-base">
                  {pillar.description}
                </p>
                <a
                  href="#noi-dung-noi-bat"
                  className="inline-flex items-center rounded-full border border-[#c9a282] px-4 py-2 text-sm font-semibold text-[#7a5237] transition hover:bg-[#f5e6d6]"
                >
                  Xem thêm
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
