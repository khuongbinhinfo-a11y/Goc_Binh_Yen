"use client";

import Image from "next/image";

import { useLocale } from "@/hooks/useLocale";

export default function MoodboardSection() {
  const { t } = useLocale();

  return (
    <section className="py-20">
      <div className="site-shell">
        <div className="mb-8 text-center">
          <p className="eyebrow">{t.moodboard.eyebrow}</p>
          <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{t.moodboard.title}</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {t.moodboard.items.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[1.7rem] border border-[#d8b89b] bg-white shadow-soft">
              <div className="relative h-64">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <p className="min-h-[82px] p-4 text-sm font-medium leading-6 text-[#5a3d2d] sm:text-base">{item.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}