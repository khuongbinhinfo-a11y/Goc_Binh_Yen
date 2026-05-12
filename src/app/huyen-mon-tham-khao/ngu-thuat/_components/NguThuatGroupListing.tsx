import Link from "next/link";
import Image from "next/image";

import {
  getNguThuatArticlesByGroup,
  nguThuatArticleHref,
  nguThuatGroupDisclaimer,
  nguThuatGroupListingMeta,
  type NguThuatGroupId,
  nguThuatGroupLabel,
} from "@/data/coHocNguThuatArticles";
import { getSafeImageSrc } from "@/lib/image";

type Props = {
  group: NguThuatGroupId;
};

export function NguThuatGroupListing({ group }: Props) {
  const meta = nguThuatGroupListingMeta[group];
  const articles = getNguThuatArticlesByGroup(group);
  const disclaimer = nguThuatGroupDisclaimer[group];

  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/ngu-thuat" className="hover:text-[#4a2f20]">
            Ngũ thuật
          </Link>{" "}
          / {nguThuatGroupLabel(group)}
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{meta.pageTitle}</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">{meta.intro}</p>

          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#e9d8c6] bg-[#f7efe3] sm:aspect-[2/1]">
            <Image
              src={getSafeImageSrc(meta.heroImage)}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-contain object-center"
              priority
            />
          </div>

          <div className="mt-6 rounded-xl border border-[#e6d8c8] bg-[#fdf7ee] p-4 text-sm leading-7 text-[#5e4332]">
            <p className="font-semibold text-[#4a2f20]">Lưu ý</p>
            <p className="mt-2">{disclaimer}</p>
          </div>
        </article>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {articles.map((article) => (
            <article key={article.slug} className="soft-panel overflow-hidden bg-[#fffaf4]">
              <Link href={nguThuatArticleHref(group, article.slug)} className="block">
                <div className="overflow-hidden rounded-t-xl border-b border-[#e9d8c6] bg-[#f7efe3]">
                  <div className="relative aspect-[3/1] w-full">
                    <Image
                      src={getSafeImageSrc(article.coverImage)}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold leading-snug text-[#4a2f20]">{article.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#654939]">{article.description}</p>
                  <p className="mt-4 text-sm font-semibold text-[#7b5437]">Đọc bài →</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
