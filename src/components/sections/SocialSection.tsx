"use client";

import { FACEBOOK_URL, YOUTUBE_URL } from "@/data/homepageData";
import { useLocale } from "@/hooks/useLocale";

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a20.2 20.2 0 0 0-2.5-.1c-2.5 0-4.1 1.5-4.1 4.3V10H7.5v3h2.6v8h3.3Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M21.2 8.5a2.8 2.8 0 0 0-2-2c-1.8-.5-7.2-.5-7.2-.5s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2C2.3 10.3 2.3 12 2.3 12s0 1.7.5 3.5a2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-3.5.5-3.5s0-1.7-.5-3.5ZM10.2 14.5V9.5l4.6 2.5-4.6 2.5Z" />
    </svg>
  );
}

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
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="soft-button inline-flex items-center gap-2">
              <FacebookIcon />
              {t.social.button}
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="soft-button inline-flex items-center gap-2">
              <YoutubeIcon />
              {t.social.youtubeButton}
            </a>
            <p className="text-sm text-[#e4c9af]">{t.social.note}</p>
          </div>
        </article>
      </div>
    </section>
  );
}