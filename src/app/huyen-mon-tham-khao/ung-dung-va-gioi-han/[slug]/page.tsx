import { promises as fs } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  coHocUngDungGioiHanArticles,
  getCoHocUngDungRelatedArticles,
} from "@/data/coHocUngDungGioiHanArticles";
import { getSafeImageSrc } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return coHocUngDungGioiHanArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = coHocUngDungGioiHanArticles.find((item) => item.slug === slug);
  if (!article) return {};
  return createRouteMetadata({
    title: `${article.title} · Ứng dụng và giới hạn · Cổ học`,
    description: article.description,
    path: `/huyen-mon-tham-khao/ung-dung-va-gioi-han/${slug}`,
    image: article.coverImage,
  });
}

export default async function CoHocUngDungGioiHanArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = coHocUngDungGioiHanArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const articlePath = path.join(
    process.cwd(),
    "content_exports",
    "hon-tho",
    "huyen-mon-tham-khao",
    "ung-dung-va-gioi-han",
    `${slug}.md`,
  );

  let markdown = "";
  try {
    markdown = await fs.readFile(articlePath, "utf8");
  } catch {
    notFound();
  }

  const body = markdown
    .replace(/^#\s.*\r?\n\r?\n/, "")
    .replace(/^Ảnh bìa đề xuất:\s.*\r?\n\r?\n/, "")
    .trim();

  const lines = body.split(/\r?\n/);
  const contentBlocks: ReactNode[] = [];
  let pendingList: string[] = [];
  let blockIndex = 0;

  const flushList = () => {
    if (pendingList.length === 0) {
      return;
    }

    contentBlocks.push(
      <ul key={`list-${blockIndex++}`} className="my-4 list-disc space-y-2 pl-6 text-sm leading-8 text-[#5e4332] sm:text-base">
        {pendingList.map((item, index) => (
          <li key={`item-${index}`}>{item}</li>
        ))}
      </ul>,
    );

    pendingList = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      contentBlocks.push(
        <h2 key={`h2-${blockIndex++}`} className="mt-8 text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">
          {line.replace(/^##\s*/, "")}
        </h2>,
      );
      return;
    }

    if (line.startsWith("- ")) {
      pendingList.push(line.replace(/^-\s*/, ""));
      return;
    }

    flushList();
    contentBlocks.push(
      <p key={`p-${blockIndex++}`} className="mt-4 text-sm leading-8 text-[#5e4332] sm:text-base">
        {line}
      </p>,
    );
  });

  flushList();

  const related = getCoHocUngDungRelatedArticles(slug, 4);

  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell max-w-4xl">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          /{" "}
          <Link href="/huyen-mon-tham-khao/ung-dung-va-gioi-han" className="hover:text-[#4a2f20]">
            Ứng dụng và giới hạn
          </Link>
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-8">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{article.title}</h1>

          <p className="mt-4 text-sm leading-8 text-[#654939] sm:text-base">{article.description}</p>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#e3d1be]">
            <Image
              src={getSafeImageSrc(article.coverImage)}
              alt={article.title}
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <aside className="mt-6 rounded-lg border border-[#e3d1be] bg-[#fff5eb] p-4 text-sm leading-7 text-[#5e4332] sm:text-base">
            {article.disclaimer}
          </aside>

          <div className="mt-6">{contentBlocks}</div>

          <div className="mt-10 border-t border-[#e3d1be] pt-8">
            <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">Câu hỏi suy ngẫm</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-8 text-[#5e4332] sm:text-base">
              {article.reflectionQuestions.map((q, idx) => (
                <li key={`reflection-${idx}`}>{q}</li>
              ))}
            </ul>
          </div>
        </article>

        {related.length > 0 ? (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-[#4a2f20] sm:text-2xl">Bài cùng nhóm</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {related.map((item) => (
                <article key={item.slug} className="soft-panel overflow-hidden bg-[#fffaf4]">
                  <Link href={`/huyen-mon-tham-khao/ung-dung-va-gioi-han/${item.slug}`} className="block">
                    <div className="border-b border-[#e9d8c6]">
                      <Image
                        src={getSafeImageSrc(item.coverImage)}
                        alt={item.title}
                        width={640}
                        height={360}
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-base font-semibold leading-snug text-[#4a2f20]">{item.title}</h3>
                      <p className="mt-2 text-xs font-semibold text-[#7b5437]">Đọc tiếp →</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
