import { poemAdditions } from "@/data/poemAdditions";
import {
  poems as basePoems,
  type PoemAnalysis,
  type PoemImageResearch,
  type PoemItem,
  type PoemStatus,
} from "@/data/poemsBase";

export type { PoemAnalysis, PoemImageResearch, PoemItem, PoemStatus } from "@/data/poemsBase";

export const poems: PoemItem[] = [...basePoems, ...poemAdditions];

export const featuredPoem = poems.find((item) => item.status === "published") ?? poems[0];

export const publishedPoems = poems.filter((item) => item.status === "published");

export function getPoemBySlug(slug: string) {
  return poems.find((item) => item.slug === slug);
}
