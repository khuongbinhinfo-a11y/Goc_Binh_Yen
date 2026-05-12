import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getNguThuatArticle,
  getRelatedNguThuatArticles,
  nguThuatArticleHref,
  nguThuatGroupDisclaimer,
  type NguThuatGroupId,
  nguThuatGroupLabel,
} from "@/data/coHocNguThuatArticles";
import { getSafeImageSrc } from "@/lib/image";

type Props = {
  group: NguThuatGroupId;
  slug: string;
};

export function NguThuatArticleView({ group, slug }: Props) {
  const article = getNguThuatArticle(group, slug);

  if (!article) {
    notFound();
  }

  const disclaimer = nguThuatGroupDisclaimer[group];
  const related = getRelatedNguThuatArticles(article);

  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell max-w-4xl">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          /{" "}
          <Link href="/huyen-mon-tham-khao/ngu-thuat" className="hover:text-[#4a2f20]">
            Ngũ thuật
          </Link>{" "}
          /{" "}
          <Link href={`/huyen-mon-tham-khao/ngu-thuat/${group}`} className="hover:text-[#4a2f20]">
            {nguThuatGroupLabel(group)}
          </Link>
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-8">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">{article.description}</p>

          <div className="mt-6 rounded-xl border border-[#e6d8c8] bg-[#fdf7ee] p-4 text-sm leading-7 text-[#5e4332]">
            <p className="font-semibold text-[#4a2f20]">Lưu ý nhóm {nguThuatGroupLabel(group)}</p>
            <p className="mt-2">{disclaimer}</p>
          </div>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#e9d8c6] bg-[#f7efe3] sm:aspect-[2/1]">
            <Image
              src={getSafeImageSrc(article.coverImage)}
              alt=""
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-contain object-center"
              priority
            />
          </div>

          <div className="mt-8 space-y-8 text-sm leading-8 text-[#5e4332] sm:text-base">
            <p>{article.content.intro}</p>
            {article.content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-[#4a2f20]">{section.heading}</h2>
                <p className="mt-3">{section.body}</p>
              </section>
            ))}
          </div>

          {article.reflectionQuestions.length > 0 ? (
            <div className="mt-10 rounded-xl border border-[#dcc5ae] bg-[#fff6ea] p-5">
              <h2 className="text-lg font-semibold text-[#4a2f20]">Câu hỏi suy ngẫm</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[#5e4332] sm:text-base">
                {article.reflectionQuestions.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-10 border-t border-[#e0d5ca] pt-8">
              <h2 className="text-lg font-semibold text-[#4a2f20]">Cùng nhóm {nguThuatGroupLabel(group)}</h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={nguThuatArticleHref(group, item.slug)}
                      className="text-sm font-semibold text-[#7f5e49] underline-offset-4 hover:text-[#4a2f20] hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
