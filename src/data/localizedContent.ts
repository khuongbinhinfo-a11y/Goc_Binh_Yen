import {
  ContentAnalysis,
  ContentItem,
  ContentType,
  poetryPosts,
  spiritualPosts,
  storyPosts,
} from "@/data/contentLibrary";
import { Locale } from "@/data/i18n";
import { getContentFallbackImage, getSafeImageSrc } from "@/lib/image";

export type LocalizedContentItem = ContentItem & {
  i18nStatus: {
    hasFallback: boolean;
    missingEnFields: string[];
  };
};

type ContentOverride = Partial<
  Pick<
    ContentItem,
    | "title"
    | "category"
    | "excerpt"
    | "author"
    | "voiceBy"
    | "readingTime"
    | "publishedAt"
    | "content"
  >
> & {
  analysis?: Partial<ContentAnalysis>;
};

const contentByType: Record<ContentType, ContentItem[]> = {
  poem: poetryPosts,
  story: storyPosts,
  spiritual: spiritualPosts,
};

const routeByType: Record<ContentType, string> = {
  poem: "/doc-tho",
  story: "/ke-chuyen",
  spiritual: "/tam-linh",
};

const enOverrides: Partial<Record<ContentType, Record<string, ContentOverride>>> = {
  story: {
    "ben-do-cu-qua-mot-mua-mua": {
      title: "Old Dock Through a Rainy Season",
      category: "Stories",
      excerpt:
        "On a rainy afternoon, the narrator returns to an old dock and meets familiar memories of childhood and kindness.",
      readingTime: "9 min",
      publishedAt: "My Tho, Oct 2020",
    },
    "dem-nghe-tieng-nuoc-chay": {
      title: "Night Listening to Water",
      category: "Stories",
      excerpt:
        "A sleepless night by the porch, where the sound of water leads the heart back to gentler days.",
      readingTime: "8 min",
      publishedAt: "Cai Lay, Feb 2021",
    },
    "mui-khoi-bep-len-tu-xom-nho": {
      title: "Kitchen Smoke from a Small Hamlet",
      category: "Stories",
      excerpt:
        "A thin line of evening smoke brings back the scent of home, shared meals, and old family warmth.",
      readingTime: "8 min",
      publishedAt: "Tan Phong, Aug 2021",
    },
    "chuyen-nguoi-qua-cau-tre": {
      title: "People Crossing the Bamboo Bridge",
      category: "Stories",
      excerpt:
        "A small bamboo bridge that once carried footsteps, waiting, and quiet care between two riverbanks.",
      readingTime: "9 min",
      publishedAt: "My Tho, Mar 2022",
    },
  },
  spiritual: {
    "mua-chuong-chieu-trong-san-chua-nho": {
      title: "Evening Bell in a Small Pagoda Yard",
      category: "Spirituality",
      excerpt:
        "A light rain, a bell, and a quiet return to inner stillness after long days of noise.",
      readingTime: "8 min",
      publishedAt: "My Tho, Jun 2022",
    },
    "dot-nhang-truoc-hien-nha": {
      title: "Lighting Incense by the Porch",
      category: "Spirituality",
      excerpt:
        "A simple evening incense ritual that reminds us to live kindly and keep a clear heart.",
      readingTime: "8 min",
      publishedAt: "Cai Lay, Oct 2022",
    },
    "mot-ngay-im-lang-ben-song": {
      title: "A Quiet Day by the River",
      category: "Spirituality",
      excerpt:
        "One day of speaking less to hear the heart more clearly and let the mind settle.",
      readingTime: "9 min",
      publishedAt: "Tan Phong, Mar 2023",
    },
    "hoc-tho-cham-giua-ngay-dai": {
      title: "Learning to Breathe Slowly Through Long Days",
      category: "Spirituality",
      excerpt:
        "A short reflection on returning to the breath to stay calm and grounded in busy routines.",
      readingTime: "8 min",
      publishedAt: "My Tho, Nov 2023",
    },
  },
};

function resolveLocalizedField(
  locale: Locale,
  fieldName: string,
  originalValue: string | undefined,
  overrideValue: string | undefined,
  missingEnFields: string[],
) {
  if (locale !== "en") return originalValue;
  if (typeof overrideValue === "string" && overrideValue.trim().length > 0) return overrideValue;
  if ((originalValue ?? "").trim().length > 0) {
    missingEnFields.push(fieldName);
  }
  return originalValue;
}

function localizeAnalysis(
  locale: Locale,
  analysis: ContentAnalysis,
  override: ContentOverride | undefined,
  missingEnFields: string[],
): ContentAnalysis {
  const analysisOverride = override?.analysis;

  return {
    emotionFlow: resolveLocalizedField(
      locale,
      "analysis.emotionFlow",
      analysis.emotionFlow,
      analysisOverride?.emotionFlow,
      missingEnFields,
    ) ?? "",
    standoutImages: resolveLocalizedField(
      locale,
      "analysis.standoutImages",
      analysis.standoutImages,
      analysisOverride?.standoutImages,
      missingEnFields,
    ) ?? "",
    meaning: resolveLocalizedField(
      locale,
      "analysis.meaning",
      analysis.meaning,
      analysisOverride?.meaning,
      missingEnFields,
    ) ?? "",
    memorableLine: resolveLocalizedField(
      locale,
      "analysis.memorableLine",
      analysis.memorableLine,
      analysisOverride?.memorableLine,
      missingEnFields,
    ) ?? "",
  };
}

function localizeContentItem(item: ContentItem, locale: Locale): LocalizedContentItem {
  const missingEnFields: string[] = [];
  const override = locale === "en" ? enOverrides[item.contentType]?.[item.slug] : undefined;

  const localizedItem: LocalizedContentItem = {
    ...item,
    coverImage: getSafeImageSrc(item.coverImage, getContentFallbackImage(item.contentType)),
    title: resolveLocalizedField(locale, "title", item.title, override?.title, missingEnFields) ?? item.title,
    category: resolveLocalizedField(locale, "category", item.category, override?.category, missingEnFields) ?? item.category,
    excerpt: resolveLocalizedField(locale, "excerpt", item.excerpt, override?.excerpt, missingEnFields) ?? item.excerpt,
    author:
      item.contentType === "poem"
        ? resolveLocalizedField(locale, "author", item.author, override?.author, missingEnFields)
        : item.author,
    voiceBy: resolveLocalizedField(locale, "voiceBy", item.voiceBy, override?.voiceBy, missingEnFields) ?? item.voiceBy,
    readingTime:
      resolveLocalizedField(locale, "readingTime", item.readingTime, override?.readingTime, missingEnFields) ??
      item.readingTime,
    publishedAt:
      resolveLocalizedField(locale, "publishedAt", item.publishedAt, override?.publishedAt, missingEnFields) ??
      item.publishedAt,
    content: resolveLocalizedField(locale, "content", item.content, override?.content, missingEnFields) ?? item.content,
    analysis: localizeAnalysis(locale, item.analysis, override, missingEnFields),
    i18nStatus: {
      hasFallback: locale === "en" && missingEnFields.length > 0,
      missingEnFields,
    },
  };

  return localizedItem;
}

export function getContentRoutePrefix(contentType: ContentType) {
  return routeByType[contentType];
}

export function getLocalizedContentList(contentType: ContentType, locale: Locale): LocalizedContentItem[] {
  return contentByType[contentType].map((item) => localizeContentItem(item, locale));
}

export function getLocalizedContentBySlug(contentType: ContentType, slug: string, locale: Locale) {
  const source = contentByType[contentType].find((item) => item.slug === slug);
  return source ? localizeContentItem(source, locale) : undefined;
}

export function getLocalizedRelatedContent(
  item: Pick<ContentItem, "contentType" | "slug" | "relatedPosts">,
  locale: Locale,
  limit = 3,
) {
  const localizedList = getLocalizedContentList(item.contentType, locale);
  const byRelatedSlugs = item.relatedPosts
    .map((relatedSlug) => localizedList.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is LocalizedContentItem => Boolean(candidate));

  if (byRelatedSlugs.length > 0) return byRelatedSlugs.slice(0, limit);

  return localizedList.filter((candidate) => candidate.slug !== item.slug).slice(0, limit);
}
