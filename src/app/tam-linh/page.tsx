"use client";

import Image from "next/image";
import Link from "next/link";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { spiritualPosts } from "@/data/contentLibrary";
import { useLocale } from "@/hooks/useLocale";

export default function TamLinhPage() {
  const { locale } = useLocale();

  const labels =
    locale === "en"
      ? {
          eyebrow: "Spiritual library",
          title: "Spirituality",
          description:
            "Quiet pieces for contemplation, where breath slows down and the heart finds stillness.",
          intro:
            "Each piece is a gentle pause for reflection, carrying the calm tone of riverside evenings and inward listening.",
          featuredTag: "Featured piece",
          gridTitle: "Spiritual selections",
          readButton: "Read piece",
        }
      : {
          eyebrow: "Thư viện tâm linh",
          title: "Tâm linh",
          description:
            "Những bài viết lắng sâu cho khoảng chiêm nghiệm nhẹ, nơi nhịp thở chậm lại và lòng người tìm được sự an tĩnh.",
          intro:
            "Mỗi nội dung là một khoảng dừng vừa đủ để nhìn vào bên trong, giữ tinh thần chậm, ấm và sâu của Hồn Thơ.",
          featuredTag: "Nội dung nổi bật",
          gridTitle: "Tuyển chọn tâm linh",
          readButton: "Đọc bài",
        };

  const featured = spiritualPosts.find((item) => item.isFeatured) ?? spiritualPosts[0];
  const listItems = spiritualPosts.filter((item) => item.slug !== featured.slug);

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-[#dec2a7] bg-gradient-to-b from-[#f8efe4] to-[#f1e3d4] py-12 sm:py-14">
          <div className="site-shell">
            <p className="eyebrow">{labels.eyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-[#3f2b20] sm:text-5xl">{labels.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#664a3a] sm:text-base">{labels.description}</p>
          </div>
        </section>

        <section className="py-8">
          <div className="site-shell">
            <div className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-5 sm:p-6">
              <p className="text-sm leading-7 text-[#654939] sm:text-base">{labels.intro}</p>
            </div>
          </div>
        </section>

        <section className="pb-12 sm:pb-14">
          <div className="site-shell">
            <article className="soft-panel overflow-hidden bg-white/80 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <div className="relative min-h-[260px]">
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3f271b]/38 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                  {labels.featuredTag}
                </span>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{featured.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{featured.excerpt}</p>
                <p className="mt-1 text-xs text-[#876756]">{featured.publishedAt}</p>
                <Link href={`/tam-linh/${featured.slug}`} className="soft-button mt-6 inline-flex">
                  {labels.readButton}
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{labels.gridTitle}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {listItems.map((item) => (
                <article key={item.slug} className="soft-panel overflow-hidden bg-white/85">
                  <div className="relative h-56">
                    <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#654939]">{item.excerpt}</p>
                    <p className="mt-3 text-xs text-[#876756]">{item.publishedAt}</p>
                    <Link
                      href={`/tam-linh/${item.slug}`}
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
