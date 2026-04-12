import Image from "next/image";

import { moodboardItems } from "@/data/homepageData";

export default function MoodboardSection() {
  return (
    <section className="py-20">
      <div className="site-shell">
        <div className="mb-8 text-center">
          <p className="eyebrow">Mood quê hương</p>
          <h2 className="text-4xl text-[#3f2b20] sm:text-5xl">Những nhóm hình ảnh chốt hồn thương hiệu</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {moodboardItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[1.7rem] border border-[#d8b89b] bg-white shadow-soft"
            >
              <div className="relative h-64">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <p className="min-h-[82px] p-4 text-sm font-medium leading-6 text-[#5a3d2d] sm:text-base">
                {item.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
