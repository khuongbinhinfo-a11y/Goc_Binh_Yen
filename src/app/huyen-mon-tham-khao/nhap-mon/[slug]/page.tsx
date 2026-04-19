import { promises as fs } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { coHocIntroArticles } from "@/data/coHocIntroArticles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return coHocIntroArticles.map((article) => ({ slug: article.slug }));
}

export default async function CoHocIntroArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = coHocIntroArticles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const articlePath = path.join(
    process.cwd(),
    "content_exports",
    "hon-tho",
    "huyen-mon-tham-khao",
    "nhap-mon",
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

  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell max-w-4xl">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          /{" "}
          <Link href="/huyen-mon-tham-khao/nhap-mon" className="hover:text-[#4a2f20]">
            Nhập môn
          </Link>
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-8">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{article.title}</h1>

          <div className="mt-6 overflow-hidden rounded-xl border border-[#e3d1be]">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-6">{contentBlocks}</div>
        </article>
      </div>
    </section>
  );
}
