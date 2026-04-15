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

export type LocalizedText = {
  vi: string;
  en?: string;
  todoEn?: boolean;
};

export type LocalizedContentItem = Omit<
  ContentItem,
  "title" | "category" | "excerpt" | "author" | "voiceBy" | "readingTime" | "publishedAt" | "content" | "analysis"
> & {
  title: string;
  category: string;
  excerpt: string;
  author?: string;
  voiceBy: string;
  readingTime: string;
  publishedAt: string;
  content: string;
  analysis: ContentAnalysis;
  i18nStatus: {
    hasFallback: boolean;
    missingEnFields: string[];
  };
};

type LocalizedAnalysisSource = {
  emotionFlow: LocalizedText;
  standoutImages: LocalizedText;
  meaning: LocalizedText;
  memorableLine: LocalizedText;
};

type LocalizedContentSource = Omit<
  ContentItem,
  "title" | "category" | "excerpt" | "author" | "voiceBy" | "readingTime" | "publishedAt" | "content" | "analysis"
> & {
  title: LocalizedText;
  category: LocalizedText;
  excerpt: LocalizedText;
  author?: LocalizedText;
  voiceBy: LocalizedText;
  readingTime: LocalizedText;
  publishedAt: LocalizedText;
  content: LocalizedText;
  analysis: LocalizedAnalysisSource;
};

type ContentOverride = {
  title?: string;
  category?: string;
  excerpt?: string;
  author?: string;
  voiceBy?: string;
  readingTime?: string;
  publishedAt?: string;
  content?: string;
  analysis?: Partial<Record<keyof ContentAnalysis, string>>;
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

const defaultEnCategory: Record<ContentType, string> = {
  poem: "Poetry",
  story: "Stories",
  spiritual: "Spirituality",
};

const enOverrides: Partial<Record<ContentType, Record<string, ContentOverride>>> = {
  poem: {
    "ben-do": {
      title: "Ferry Landing",
      excerpt: "A humble boat carries goods, dreams, and a long, homesick search for a place to rest.",
      publishedAt: "Tan Phong, Oct 13, 2018",
    },
    "ban-tay": {
      title: "Hands",
      excerpt: "A warm love poem about tenderness, home, and the lasting comfort of a familiar touch.",
      publishedAt: "My Tho, Jan 17, 2019",
    },
    "cam-hoa": {
      title: "Arranging Flowers",
      excerpt: "A fragrant poem where white lily blossoms become memory, longing, and devotion.",
      publishedAt: "My Tho, Jun 18, 2019",
    },
    "cam-on-tinh-yeu": {
      title: "Thank You, Love",
      excerpt: "A reflective piece where love rekindles warmth and lets spring return after long, dry seasons.",
      publishedAt: "Jun 12, 1999",
    },
    "mot-thoang": {
      title: "A Brief Glance",
      excerpt: "One fleeting encounter becomes a lifelong echo of longing and unfinished affection.",
      publishedAt: "Sep 4, 2018",
    },
    "hoa-buom": {
      title: "Flower and Butterfly",
      excerpt: "Flower and butterfly imagery weave a dreamy, aching portrait of devoted love.",
      publishedAt: "My Tho, Oct 8, 2019",
    },
    "hue-trang": {
      title: "White Lily",
      excerpt: "The scent of lily revives old memory and carries a deeply nostalgic aftertaste.",
      publishedAt: "My Tho, Aug 8",
    },
    "qua-mien-thuong-nho": {
      title: "A Region of Memory",
      excerpt: "A quiet return to old places where affection lingers in every familiar corner.",
    },
    "chi-can-co-vay": {
      title: "Only Need You Beside Me",
      excerpt: "Simple words, steady feeling: happiness is enough when two hearts remain side by side.",
    },
    "khoang-cach-vo-hinh": {
      title: "Invisible Distance",
      excerpt: "A tender poem about near and far, and the silent distance that only love can cross.",
    },
    "hoa-luc-binh": {
      title: "Water Hyacinth Blossoms",
      excerpt: "Floating flowers drift with river memory, carrying a gentle ache of homeland evenings.",
    },
    "em-mua-xuan-ve": {
      title: "You, As Spring Returns",
      excerpt: "A bright, affectionate piece where the beloved arrives like spring over an old countryside.",
    },
    "em-trong-anh": {
      title: "You Within Me",
      excerpt: "A lush love poem where desire, memory, and dreamlike closeness blend into one.",
      publishedAt: "My Tho, Aug 21, 2019",
    },
    "anh-yeu-em": {
      title: "I Love You",
      excerpt: "A plainspoken declaration of lifelong devotion through everyday, honest images.",
      publishedAt: "Tan Phong, Dec 15, 2018",
    },
    nho: {
      title: "Remembering",
      excerpt: "Brief lines that hold deep longing for a shared home once imagined.",
      publishedAt: "Cai Lay, Jan 1, 2018",
    },
    "tieng-keu-chim-le-ban": {
      title: "Cry of a Lonely Bird",
      excerpt: "A midnight call across the river, where moonlight becomes a promise to find each other again.",
    },
    "ngang-ben-song-xua": {
      title: "Across the Old Riverside Dock",
      excerpt: "Passing an old dock awakens unfinished love and a grief that still leans toward the river.",
    },
    them: {
      title: "More",
      excerpt: "An evening love chant where each breath adds another layer of memory and longing.",
      publishedAt: "My Tho, Mar 5, 2020",
    },
  },
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
      excerpt: "A sleepless night by the porch, where the sound of water leads the heart back to gentler days.",
      readingTime: "8 min",
      publishedAt: "Cai Lay, Feb 2021",
    },
    "mui-khoi-bep-len-tu-xom-nho": {
      title: "Kitchen Smoke from a Small Hamlet",
      category: "Stories",
      excerpt: "A thin line of evening smoke brings back the scent of home, shared meals, and old family warmth.",
      readingTime: "8 min",
      publishedAt: "Tan Phong, Aug 2021",
    },
    "chuyen-nguoi-qua-cau-tre": {
      title: "People Crossing the Bamboo Bridge",
      category: "Stories",
      excerpt: "A small bamboo bridge that once carried footsteps, waiting, and quiet care between two riverbanks.",
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
      excerpt: "An old craftsman repairs wooden boats by the river, keeping everyday journeys afloat with patience and care.",
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
      excerpt: "A light rain, a bell, and a quiet return to inner stillness after long days of noise.",
      readingTime: "8 min",
      publishedAt: "My Tho, Jun 2022",
    },
    "dot-nhang-truoc-hien-nha": {
      title: "Lighting Incense by the Porch",
      category: "Spirituality",
      excerpt: "A simple evening incense ritual that reminds us to live kindly and keep a clear heart.",
      readingTime: "8 min",
      publishedAt: "Cai Lay, Oct 2022",
    },
    "mot-ngay-im-lang-ben-song": {
      title: "A Quiet Day by the River",
      category: "Spirituality",
      excerpt: "One day of speaking less to hear the heart more clearly and let the mind settle.",
      readingTime: "9 min",
      publishedAt: "Tan Phong, Mar 2023",
    },
    "hoc-tho-cham-giua-ngay-dai": {
      title: "Learning to Breathe Slowly Through Long Days",
      category: "Spirituality",
      excerpt: "A short reflection on returning to the breath to stay calm and grounded in busy routines.",
      readingTime: "8 min",
      publishedAt: "My Tho, Nov 2023",
    },
    "mot-sang-quet-la-trong-san-chua": {
      title: "A Morning Sweeping Leaves in the Pagoda Yard",
      category: "Spirituality",
      excerpt: "A simple sweeping routine becomes a quiet lesson in presence, patience, and a lighter heart.",
      readingTime: "9 min",
      publishedAt: "My Tho, Jan 2025",
    },
    "ngoi-yen-nghe-mua-cham-mai-hien": {
      title: "Sitting Still, Listening to Rain on the Eaves",
      category: "Spirituality",
      excerpt: "A long rainy afternoon turns into a gentle practice of stillness, breath, and emotional grounding.",
      readingTime: "9 min",
      publishedAt: "Cai Lay, Feb 2025",
    },
    "thap-den-nho-truoc-khi-ngu": {
      title: "Lighting a Small Lamp Before Sleep",
      category: "Spirituality",
      excerpt: "A small nightly ritual with warm light helps close the day softly and keep the inner flame steady.",
      readingTime: "9 min",
      publishedAt: "Tan Phong, Mar 2025",
    },
  },
};

function normalizeOptionalText(value?: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

function toLocalizedText(vi: string | undefined, en?: string): LocalizedText {
  const viText = (vi ?? "").trim();
  const enText = normalizeOptionalText(en);

  if (!enText) {
    return {
      vi: viText,
      todoEn: true,
    };
  }

  return {
    vi: viText,
    en: enText,
  };
}

function parseMinutes(readingTime: string) {
  const match = readingTime.match(/\d+/);
  if (!match) return undefined;
  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function estimateReadingMinutes(content: string) {
  const words = content
    .replace(/\n/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(2, Math.round(words / 170));
}

function buildReadingTimeValue(item: ContentItem, override?: ContentOverride): LocalizedText {
  const minutes = parseMinutes(item.readingTime) ?? estimateReadingMinutes(item.content);
  const viValue = item.readingTime?.trim().length ? item.readingTime : `${minutes} phút`;
  const enValue = override?.readingTime ?? `${minutes} min`;

  return toLocalizedText(viValue, enValue);
}

function buildLocalizedSource(item: ContentItem): LocalizedContentSource {
  const override = enOverrides[item.contentType]?.[item.slug];

  return {
    ...item,
    title: toLocalizedText(item.title, override?.title),
    category: toLocalizedText(item.category, override?.category ?? defaultEnCategory[item.contentType]),
    excerpt: toLocalizedText(item.excerpt, override?.excerpt),
    author: item.author ? toLocalizedText(item.author, override?.author ?? item.author) : undefined,
    voiceBy: toLocalizedText(item.voiceBy, override?.voiceBy ?? item.voiceBy),
    readingTime: buildReadingTimeValue(item, override),
    publishedAt: toLocalizedText(item.publishedAt, override?.publishedAt),
    content: toLocalizedText(item.content, override?.content),
    analysis: {
      emotionFlow: toLocalizedText(item.analysis.emotionFlow, override?.analysis?.emotionFlow),
      standoutImages: toLocalizedText(item.analysis.standoutImages, override?.analysis?.standoutImages),
      meaning: toLocalizedText(item.analysis.meaning, override?.analysis?.meaning),
      memorableLine: toLocalizedText(item.analysis.memorableLine, override?.analysis?.memorableLine),
    },
  };
}

const localizedContentByType: Record<ContentType, LocalizedContentSource[]> = {
  poem: contentByType.poem.map((item) => buildLocalizedSource(item)),
  story: contentByType.story.map((item) => buildLocalizedSource(item)),
  spiritual: contentByType.spiritual.map((item) => buildLocalizedSource(item)),
};

export function getLocalizedText(value: LocalizedText | string | undefined, locale: Locale) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (locale === "en") return value.en ?? value.vi;
  return value.vi;
}

function resolveLocalizedValue(
  fieldName: string,
  fieldValue: LocalizedText | undefined,
  locale: Locale,
  missingEnFields: Set<string>,
) {
  if (!fieldValue) return "";
  if (locale === "en" && (!fieldValue.en || fieldValue.todoEn)) {
    missingEnFields.add(fieldName);
  }

  return getLocalizedText(fieldValue, locale);
}

function localizeAnalysis(
  analysis: LocalizedAnalysisSource,
  locale: Locale,
  missingEnFields: Set<string>,
): ContentAnalysis {
  return {
    emotionFlow: resolveLocalizedValue("analysis.emotionFlow", analysis.emotionFlow, locale, missingEnFields),
    standoutImages: resolveLocalizedValue("analysis.standoutImages", analysis.standoutImages, locale, missingEnFields),
    meaning: resolveLocalizedValue("analysis.meaning", analysis.meaning, locale, missingEnFields),
    memorableLine: resolveLocalizedValue("analysis.memorableLine", analysis.memorableLine, locale, missingEnFields),
  };
}

function localizeContentItem(item: LocalizedContentSource, locale: Locale): LocalizedContentItem {
  const missingEnFields = new Set<string>();

  return {
    ...item,
    coverImage: getSafeImageSrc(item.coverImage, getContentFallbackImage(item.contentType)),
    title: resolveLocalizedValue("title", item.title, locale, missingEnFields),
    category: resolveLocalizedValue("category", item.category, locale, missingEnFields),
    excerpt: resolveLocalizedValue("excerpt", item.excerpt, locale, missingEnFields),
    author:
      item.contentType === "poem" && item.author
        ? resolveLocalizedValue("author", item.author, locale, missingEnFields)
        : undefined,
    voiceBy: resolveLocalizedValue("voiceBy", item.voiceBy, locale, missingEnFields),
    readingTime: resolveLocalizedValue("readingTime", item.readingTime, locale, missingEnFields),
    publishedAt: resolveLocalizedValue("publishedAt", item.publishedAt, locale, missingEnFields),
    content: resolveLocalizedValue("content", item.content, locale, missingEnFields),
    analysis: localizeAnalysis(item.analysis, locale, missingEnFields),
    i18nStatus: {
      hasFallback: locale === "en" && missingEnFields.size > 0,
      missingEnFields: Array.from(missingEnFields),
    },
  };
}

export function getContentRoutePrefix(contentType: ContentType) {
  return routeByType[contentType];
}

export function getLocalizedContentList(contentType: ContentType, locale: Locale): LocalizedContentItem[] {
  return localizedContentByType[contentType].map((item) => localizeContentItem(item, locale));
}

export function getLocalizedContentBySlug(contentType: ContentType, slug: string, locale: Locale) {
  const source = localizedContentByType[contentType].find((item) => item.slug === slug);
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
