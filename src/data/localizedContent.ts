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
    "mot-buoi-cho-que-tan-muon": {
      title: "A Late-Close Village Market",
      category: "Stories",
      excerpt:
        "After market hours, a few warm lights remain and reveal the quiet kindness that keeps a riverside community close.",
      readingTime: "9 min",
      publishedAt: "Cai Be, Jul 2024",
    },
    "nguoi-va-xuong-o-me-song": {
      title: "The Boat Mender by the Riverside",
      category: "Stories",
      excerpt:
        "An old craftsman repairs wooden boats by the river, keeping everyday journeys afloat with patience and care.",
      readingTime: "9 min",
      publishedAt: "My Tho, Sep 2024",
    },
    "anh-den-truoc-san-nha-dem-mat-dien": {
      title: "Porch Light on Power-Out Nights",
      category: "Stories",
      excerpt:
        "When the neighborhood goes dark, one porch light gathers people, stories, and gentle support through the night.",
      readingTime: "9 min",
      publishedAt: "Tan Phong, Nov 2024",
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
    "mot-sang-quet-la-trong-san-chua": {
      title: "A Morning Sweeping Leaves in the Pagoda Yard",
      category: "Spirituality",
      excerpt:
        "A simple sweeping routine becomes a quiet lesson in presence, patience, and a lighter heart.",
      readingTime: "9 min",
      publishedAt: "My Tho, Jan 2025",
    },
    "ngoi-yen-nghe-mua-cham-mai-hien": {
      title: "Sitting Still, Listening to Rain on the Eaves",
      category: "Spirituality",
      excerpt:
        "A long rainy afternoon turns into a gentle practice of stillness, breath, and emotional grounding.",
      readingTime: "9 min",
      publishedAt: "Cai Lay, Feb 2025",
    },
    "thap-den-nho-truoc-khi-ngu": {
      title: "Lighting a Small Lamp Before Sleep",
      category: "Spirituality",
      excerpt:
        "A small nightly ritual with warm light helps close the day softly and keep the inner flame steady.",
      readingTime: "9 min",
      publishedAt: "Tan Phong, Mar 2025",
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
