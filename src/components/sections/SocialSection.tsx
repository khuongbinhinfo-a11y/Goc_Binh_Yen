"use client";

import { FACEBOOK_URL } from "@/data/homepageData";
import { useLocale } from "@/hooks/useLocale";

export default function SocialSection() {
  const { t } = useLocale();

  return (
    <section className="py-16">
      <div className="site-shell">
        <article className="soft-panel bg-[#4a2f20] px-6 py-10 text-[#f8ead8] sm:px-8">
          <p className="eyebrow text-[#ddb897]">{t.social.eyebrow}</p>
          <h2 className="mb-3 text-4xl font-semibold leading-tight text-[#fbe9d5] sm:text-5xl">{t.social.title}</h2>
          <p className="max-w-3xl text-sm leading-8 text-[#efd9c5] sm:text-base">{t.social.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="soft-button">
              {t.social.button}
            </a>
            <p className="text-sm text-[#e4c9af]">{t.social.note}</p>
          </div>
        </article>
      </div>
    </section>
  );
}