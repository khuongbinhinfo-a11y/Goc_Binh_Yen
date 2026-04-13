"use client";

import Image from "next/image";

import { useLocale } from "@/hooks/useLocale";

export default function FeaturedContentSection() {
  const { t } = useLocale();

  return (
    <section id="noi-dung-noi-bat" className="scroll-mt-24 bg-[#e9dac9] py-20">
      <div className="site-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">{t.featured.eyebrow}</p>
            <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{t.featured.title}</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#604536] sm:text-base">{t.featured.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.featured.items.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-[2rem] border border-[#d7b89b]/60 bg-white shadow-soft"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="mb-3 inline-flex rounded-full bg-[#f1e0cd] px-3 py-1 text-xs font-semibold text-[#84583a]">
                  {card.tag}
                </span>
                <h3 className="mb-2 text-3xl font-semibold leading-tight text-[#4a2f20]">{card.title}</h3>
                <p className="text-sm leading-7 text-[#654939] sm:text-base">{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}