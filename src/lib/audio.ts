export function isDirectAudioUrl(url?: string): boolean {
  if (!url) return false;
  if (url.startsWith("/audio/")) return true;
  return /\.(mp3|m4a|wav|ogg|aac|flac)$/i.test(url);
}

export type AudioQueueItem = {
  slug: string;
  title: string;
  audioUrl: string;
};

export function buildAudioQueue(
  items: Array<{ slug: string; title: string; audioUrl?: string; hasAudio: boolean }>,
): AudioQueueItem[] {
  return items
    .filter((item) => item.hasAudio && isDirectAudioUrl(item.audioUrl))
    .map((item) => ({ slug: item.slug, title: item.title, audioUrl: item.audioUrl! }));
}
