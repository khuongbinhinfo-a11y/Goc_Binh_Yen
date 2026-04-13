"use client";

import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { CONTACT_FORM_URL } from "@/data/homepageData";
import { useLocale } from "@/hooks/useLocale";

export default function SampleArticlePage() {
  const { t } = useLocale();
  const article = t.articleSample;

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/4.webp" alt={article.title} fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5a3a28]/36 via-[#4c3022]/48 to-[#2b1b14]/78" />

          <div className="site-shell relative z-10 py-16 sm:py-20 lg:py-24">
            <article className="max-w-4xl rounded-[2rem] border border-[#f2dcc3]/35 bg-[#4b2f20]/38 p-6 text-[#f6eadb] shadow-[0_24px_56px_rgba(34,22,16,0.38)] backdrop-blur-[5px] sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#f3ddc2]">
                <Link href="/" className="transition hover:text-white">
                  {article.breadcrumbHome}
                </Link>
                <span aria-hidden="true">/</span>
                <span>{article.breadcrumbCurrent}</span>
              </div>

              <p className="mb-3 inline-flex rounded-full border border-[#f7e3cb]/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4dcc0]">
                {article.category}
              </p>

              <h1 className="mb-4 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{article.title}</h1>

              <p className="max-w-3xl text-base leading-8 text-[#f6e8d8] sm:text-lg">{article.summary}</p>

              <div className="mt-6 grid gap-2 text-sm text-[#f2dbc2] sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{article.meta.authorLabel}:</span> {article.meta.authorValue}
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{article.meta.voiceLabel}:</span> {article.meta.voiceValue}
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{article.meta.readTimeLabel}:</span> {article.meta.readTimeValue}
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{article.meta.publishDateLabel}:</span> {article.meta.publishDateValue}
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="border-y border-[#dfc3a8] bg-[#efe0cf] py-4">
          <div className="site-shell">
            <nav className="flex flex-wrap gap-2" aria-label={article.breadcrumbCurrent}>
              <a
                href="#noi-dung-bai"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                {article.actionBar.read}
              </a>
              <a
                href="#nghe-xem"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                {article.actionBar.listen}
              </a>
              <a
                href="#nghe-xem"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                {article.actionBar.watch}
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgoc-binh-yen.vercel.app%2Fbai-viet-mau"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                {article.actionBar.share}
              </a>
            </nav>
          </div>
        </section>

        <section id="noi-dung-bai" className="py-16">
          <div className="site-shell">
            <article className="mx-auto max-w-3xl rounded-[1.8rem] border border-[#d9ba9d] bg-[#fffaf4] p-6 shadow-soft sm:p-8 lg:p-10">
              <p className="text-lg leading-9 text-[#51392b]">{article.body.paragraph1}</p>
              <p className="mt-6 text-lg leading-9 text-[#51392b]">{article.body.paragraph2}</p>

              <blockquote className="mt-8 rounded-2xl border-l-4 border-[#b87b50] bg-[#f7ede1] px-5 py-4 text-lg leading-8 text-[#5a3f2f]">
                “{article.body.quote}”
              </blockquote>

              <h2 className="mt-10 text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{article.body.subheading}</h2>

              <p className="mt-4 text-lg leading-9 text-[#51392b]">{article.body.paragraph3}</p>
            </article>
          </div>
        </section>

        <section id="nghe-xem" className="bg-[#e9dac9] py-16">
          <div className="site-shell">
            <div className="mb-6">
              <p className="eyebrow">{article.media.eyebrow}</p>
              <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{article.media.title}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {article.media.cards.map((card) => (
                <article key={card.title} className="soft-panel bg-[#fffaf5] p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#916448]">{card.label}</p>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20]">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{card.description}</p>
                  <p className="mt-2 text-sm font-medium text-[#7b563c]">{card.duration}</p>
                  <a
                    href="#"
                    className="mt-5 inline-flex rounded-full bg-[#8b5e3c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#75492c]"
                  >
                    {card.button}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="lien-quan" className="py-16">
          <div className="site-shell">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{article.related.title}</h2>
              <Link href="/" className="text-sm font-semibold text-[#8b5e3c] transition hover:text-[#6e442b]">
                {article.related.backHome}
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {article.related.items.map((post) => (
                <article key={post.title} className="soft-panel bg-white/80 p-5">
                  <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#82573a]">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20]">{post.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#654939]">{post.description}</p>
                  <a href={post.href} className="mt-4 inline-flex text-sm font-semibold text-[#8b5e3c] transition hover:text-[#70472f]">
                    {article.related.readMore}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <div className="rounded-[1.8rem] border border-[#d8b89b] bg-[#f8efe5] p-7 shadow-soft sm:p-9">
              <p className="eyebrow mb-2">{article.closing.eyebrow}</p>
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{article.closing.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">{article.closing.description}</p>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#764a2f]"
              >
                {article.closing.button}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}