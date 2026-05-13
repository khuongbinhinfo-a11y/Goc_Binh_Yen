import Image from "next/image";
import Link from "next/link";

import { getSafeImageSrc } from "@/lib/image";

type CoHocRelatedArticle = {
  slug: string;
  title: string;
  description?: string;
  coverImage?: string;
  href: string;
};

type Props = {
  title: string;
  currentSlug: string;
  items: CoHocRelatedArticle[];
};

export function CoHocRelatedArticles({ title, currentSlug, items }: Props) {
  const suggestions = items.filter((item) => item.slug !== currentSlug).slice(0, 4);
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 border-t border-[#e0d5ca] pt-8">
      <h2 className="text-lg font-semibold text-[#4a2f20]">{title}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((item) => (
          <article key={item.slug} className="group overflow-hidden rounded-[1.75rem] border border-[#e6d8c8] bg-[#fffaf4] shadow-sm transition hover:shadow-lg">
            <Link href={item.href} className="block h-full">
              {item.coverImage ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7efe3]">
                  <Image
                    src={getSafeImageSrc(item.coverImage)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center transition duration-200 group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <h3 className="text-base font-semibold leading-6 text-[#3f2b20]">{item.title}</h3>
                {item.description ? (
                  <p className="mt-2 text-sm leading-6 text-[#6a5240]">{item.description}</p>
                ) : null}
                <p className="mt-4 text-sm font-semibold text-[#7b5437]">Đọc tiếp →</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
