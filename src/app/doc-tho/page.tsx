"use client";

import Image from "next/image";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { useLocale } from "@/hooks/useLocale";

export default function DocThoPage() {
  const { t } = useLocale();
  const poetry = t.poetryPage;

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-[#dec2a7] bg-gradient-to-b from-[#f8efe4] to-[#f1e3d4] py-14 sm:py-16">
          <div className="site-shell">
            <p className="eyebrow">{poetry.heroEyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-[#3f2b20] sm:text-5xl">{poetry.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#664a3a] sm:text-base">{poetry.description}</p>
          </div>
        </section>

        <section className="py-12 sm:py-14">
          <div className="site-shell">
            <article className="soft-panel overflow-hidden bg-white/80 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <div className="relative min-h-[260px]">
                <Image
                  src={poetry.featured.image}
                  alt={poetry.featured.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3f271b]/38 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                  {poetry.featured.tag}
                </span>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{poetry.featured.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{poetry.featured.description}</p>
                <a href={poetry.featured.href} className="soft-button mt-6 inline-flex">
                  {poetry.featured.button}
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{poetry.gridTitle}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {poetry.items.map((item) => (
                <article key={item.title} className="soft-panel overflow-hidden bg-white/85">
                  <div className="relative h-56">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                      {item.tag}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#654939]">{item.description}</p>
                    <a href={item.href} className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]">
                      {poetry.cardButton}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}