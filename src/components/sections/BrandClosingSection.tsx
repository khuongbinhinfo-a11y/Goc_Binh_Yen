"use client";

import Image from "next/image";

import { getHomepageBrandCopy } from "@/data/homepageBrandI18n";
import { POET_BOOKCASE_URL, SUPPORT_HON_THO_URL } from "@/data/homepageData";
import { useLocale } from "@/hooks/useLocale";

export default function BrandClosingSection() {
  const { locale } = useLocale();
  const copy = getHomepageBrandCopy(locale).closing;

  return (
    <section className="bg-[#f5ede3] py-20">
      <div className="site-shell">
        <div className="mb-7 max-w-3xl">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-sm leading-8 text-[#604536] sm:text-base">{copy.description}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="soft-panel group relative overflow-hidden border-[#d8b89b]/70 bg-[#f7efe5] p-0">
            <div className="absolute inset-0">
              <Image
                src="/images/poems/em-mua-xuan-ve.jpeg"
                alt={copy.poetBookcase.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#6a4631]/18 via-[#4a2f20]/38 to-[#2d1d15]/72" />
            <div className="relative min-h-[290px] p-6 sm:p-7">
              <div className="max-w-sm rounded-[1.2rem] border border-[#f4ddc4]/35 bg-[#fff7ee]/84 p-5 backdrop-blur-[1px]">
                <h3 className="text-3xl font-semibold leading-tight text-[#4a2f20]">{copy.poetBookcase.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#654939]">{copy.poetBookcase.description}</p>
                <a
                  href={POET_BOOKCASE_URL}
                  className="mt-5 inline-flex rounded-full bg-[#8b5e3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#764a2f]"
                >
                  {copy.poetBookcase.button}
                </a>
              </div>
            </div>
          </article>

          <article className="soft-panel relative overflow-hidden border-[#d8b89b]/70 bg-[#f9f1e8] p-0">
            <div className="absolute inset-0">
              <Image src="/images/4.webp" alt={copy.support.title} fill className="object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#7d553c]/12 via-[#533626]/30 to-[#2d1e16]/64" />
            <div className="relative min-h-[290px] p-6 sm:p-7">
              <div className="max-w-sm rounded-[1.2rem] border border-[#f4ddc4]/35 bg-[#fff7ee]/84 p-5 backdrop-blur-[1px]">
                <h3 className="text-3xl font-semibold leading-tight text-[#4a2f20]">{copy.support.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#654939]">{copy.support.description}</p>
                <a
                  href={SUPPORT_HON_THO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex rounded-full border border-[#c8a07f] bg-[#f6e7d7] px-5 py-2.5 text-sm font-semibold text-[#7a5237] transition hover:bg-[#efdcc8]"
                >
                  {copy.support.button}
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
