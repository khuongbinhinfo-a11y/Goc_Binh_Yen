"use client";

import Link from "next/link";

import SafeImage from "@/components/ui/SafeImage";
import { LocalizedContentItem } from "@/data/localizedContent";
import { getContentFallbackImage } from "@/lib/image";

type EditorialListingGridProps = {
  items: LocalizedContentItem[];
  routePrefix: string;
  readButtonLabel: string;
  showAuthor?: boolean;
};

export default function EditorialListingGrid({
  items,
  routePrefix,
  readButtonLabel,
  showAuthor = false,
}: EditorialListingGridProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        const isLead = index === 0;
        const isWide = index > 1 && index % 4 === 2;
        const cardClass = isWide
          ? "soft-panel overflow-hidden bg-white/85 md:col-span-2 xl:col-span-3"
          : isLead
            ? "soft-panel overflow-hidden bg-white/85 md:col-span-2 xl:col-span-2"
            : "soft-panel overflow-hidden bg-white/85";
        const imageClass = isWide
          ? "relative h-56 md:h-full md:min-h-[260px]"
          : isLead
            ? "relative h-64 sm:h-72"
            : index % 2 === 0
              ? "relative h-56"
              : "relative h-60";

        return (
          <article key={item.slug} className={cardClass}>
            <div className={isWide ? "md:grid md:grid-cols-[1.12fr_0.88fr]" : ""}>
              <div className={imageClass}>
                <SafeImage
                  src={item.coverImage}
                  fallbackSrc={getContentFallbackImage(item.contentType)}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                  {item.category}
                </span>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#654939]">{item.excerpt}</p>
                {showAuthor && item.author ? <p className="mt-2 text-sm text-[#745646]">{item.author}</p> : null}
                <p className="mt-2 text-xs text-[#876756]">{item.publishedAt}</p>
                <Link
                  href={`${routePrefix}/${item.slug}`}
                  className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  {readButtonLabel}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
