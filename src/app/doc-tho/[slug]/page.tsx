"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { getPoemBySlug, publishedPoems } from "@/data/poems";
import { useLocale } from "@/hooks/useLocale";

export default function PoemDetailPage() {
  const params = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const poem = getPoemBySlug(slug);

  const relatedPoems = useMemo(
    () => publishedPoems.filter((item) => item.slug !== slug).slice(0, 3),
    [slug]
  );

  const labels =
    locale === "en"
      ? {
          breadcrumb: "Poetry",
          notFound: "This poem is not available yet.",
          notFoundBack: "Back to Poetry",
          author: "Author",
          analysisTitle: "Poem reflection",
          analysisEmotion: "Emotional flow",
          analysisImages: "Key imagery",
          analysisMeaning: "Meaning and aftertaste",
          analysisLine: "Memorable line",
          mediaEyebrow: "Listen and watch",
          mediaTitle: "Listen to or watch this piece",
          audioTitle: "Voice reading",
          audioText: "Audio will be added soon after final recording is approved.",
          videoTitle: "Visual storytelling",
          videoText: "Video version will be updated in the next production round.",
          relatedTitle: "Related poems",
          readButton: "Read poem",
          licenseTitle: "Image mood note",
        }
      : {
          breadcrumb: "Đọc thơ",
          notFound: "Bài thơ này chưa sẵn sàng hiển thị.",
          notFoundBack: "Quay về Đọc thơ",
          author: "Tác giả",
          analysisTitle: "Phân tích bài thơ",
          analysisEmotion: "Mạch cảm xúc",
          analysisImages: "Hình ảnh nổi bật",
          analysisMeaning: "Ý nghĩa / dư vị",
          analysisLine: "Câu thơ đáng nhớ",
          mediaEyebrow: "Nghe và xem",
          mediaTitle: "Nghe và xem nội dung này",
          audioTitle: "Nghe bản đọc",
          audioText: "Bản đọc audio sẽ được cập nhật sau khi hoàn tất thu âm chính thức.",
          videoTitle: "Xem bản kể",
          videoText: "Bản kể bằng hình ảnh sẽ được bổ sung ở vòng sản xuất kế tiếp.",
          relatedTitle: "Bài thơ liên quan",
          readButton: "Đọc bài",
          licenseTitle: "Ghi chú mood ảnh",
        };

  if (!poem || poem.status !== "published") {
    return (
      <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
        <SiteHeader />
        <main className="site-shell py-16 sm:py-20">
          <div className="soft-panel max-w-2xl bg-[#fff9f2] p-6 sm:p-8">
            <p className="text-base leading-7 text-[#654939]">{labels.notFound}</p>
            <Link
              href="/doc-tho"
              className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
            >
              {labels.notFoundBack}
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src={poem.heroImage} alt={poem.title} fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5a3a28]/30 via-[#4c3022]/46 to-[#2b1b14]/76" />

          <div className="site-shell relative z-10 py-16 sm:py-20 lg:py-24">
            <article className="max-w-4xl rounded-[2rem] border border-[#f2dcc3]/35 bg-[#4b2f20]/38 p-6 text-[#f6eadb] shadow-[0_24px_56px_rgba(34,22,16,0.38)] backdrop-blur-[5px] sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#f3ddc2]">
                <Link href="/doc-tho" className="transition hover:text-white">
                  {labels.breadcrumb}
                </Link>
                <span aria-hidden="true">/</span>
                <span>{poem.title}</span>
              </div>

              <p className="mb-3 inline-flex rounded-full border border-[#f7e3cb]/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4dcc0]">
                {poem.tag}
              </p>

              <h1 className="mb-4 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{poem.title}</h1>
              <p className="max-w-3xl text-base leading-8 text-[#f6e8d8] sm:text-lg">{poem.summary}</p>
            </article>
          </div>
        </section>

        <section className="py-12 sm:py-14">
          <div className="site-shell">
            <article className="mx-auto max-w-3xl rounded-[1.8rem] border border-[#d9ba9d] bg-[#fffaf4] p-6 shadow-soft sm:p-8 lg:p-10">
              <div className="whitespace-pre-line text-[18px] leading-9 text-[#51392b]">{poem.content}</div>

              <div className="mt-8 border-t border-[#e4cdb7] pt-6 text-sm text-[#654939]">
                <p>
                  <span className="font-semibold text-[#4a2f20]">{labels.author}:</span> {poem.author}
                </p>
                <p className="mt-1">{poem.locationDate}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-[#efe1d1] py-14">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{labels.analysisTitle}</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="soft-panel bg-[#fff9f1] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#916448]">{labels.analysisEmotion}</h3>
                <p className="mt-2 text-sm leading-7 text-[#654939]">{poem.analysis.emotionFlow}</p>
              </article>

              <article className="soft-panel bg-[#fff9f1] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#916448]">{labels.analysisImages}</h3>
                <p className="mt-2 text-sm leading-7 text-[#654939]">{poem.analysis.standoutImages}</p>
              </article>

              <article className="soft-panel bg-[#fff9f1] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#916448]">{labels.analysisMeaning}</h3>
                <p className="mt-2 text-sm leading-7 text-[#654939]">{poem.analysis.meaning}</p>
              </article>

              <article className="soft-panel bg-[#fff9f1] p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#916448]">{labels.analysisLine}</h3>
                <p className="mt-2 text-sm leading-7 text-[#654939]">“{poem.analysis.memorableLine}”</p>
              </article>
            </div>

            <article className="soft-panel mt-5 bg-[#fff9f1] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#916448]">{labels.licenseTitle}</h3>
              <p className="mt-2 text-sm leading-7 text-[#654939]">{poem.imageResearch.licenseNote}</p>
            </article>
          </div>
        </section>

        <section className="py-14">
          <div className="site-shell">
            <p className="eyebrow">{labels.mediaEyebrow}</p>
            <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{labels.mediaTitle}</h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="soft-panel bg-[#fffaf5] p-6">
                <h3 className="text-2xl font-semibold leading-tight text-[#4a2f20]">{labels.audioTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-[#654939]">{labels.audioText}</p>
              </article>
              <article className="soft-panel bg-[#fffaf5] p-6">
                <h3 className="text-2xl font-semibold leading-tight text-[#4a2f20]">{labels.videoTitle}</h3>
                <p className="mt-3 text-sm leading-7 text-[#654939]">{labels.videoText}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{labels.relatedTitle}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedPoems.map((item) => (
                <article key={item.slug} className="soft-panel overflow-hidden bg-white/85">
                  <div className="relative h-48">
                    <Image src={item.cardImage} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                      {item.tag}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#654939]">{item.summary}</p>
                    <Link
                      href={`/doc-tho/${item.slug}`}
                      className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                    >
                      {labels.readButton}
                    </Link>
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
