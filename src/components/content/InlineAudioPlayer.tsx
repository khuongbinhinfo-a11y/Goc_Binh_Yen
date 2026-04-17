"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import type { AudioQueueItem } from "@/lib/audio";

type Props = {
  audioUrl: string;
  queue: AudioQueueItem[];
  currentSlug: string;
  routePrefix: string;
  labels: {
    previousTrack: string;
    nextTrack: string;
    autoplayNext: string;
  };
};

export default function InlineAudioPlayer({ audioUrl, queue, currentSlug, routePrefix, labels }: Props) {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [autoplay, setAutoplay] = useState(false);

  const currentIndex = queue.findIndex((q) => q.slug === currentSlug);
  const prevItem = currentIndex > 0 ? queue[currentIndex - 1] : null;
  const nextItem = currentIndex < queue.length - 1 ? queue[currentIndex + 1] : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = () => {
      if (autoplay && nextItem) {
        router.push(`${routePrefix}/${nextItem.slug}`);
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [autoplay, nextItem, routePrefix, router]);

  return (
    <div className="space-y-3">
      <audio ref={audioRef} controls preload="metadata" src={audioUrl} className="w-full" />
      {queue.length > 1 && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => prevItem && router.push(`${routePrefix}/${prevItem.slug}`)}
            disabled={!prevItem}
            className="inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← {labels.previousTrack}
          </button>
          <button
            type="button"
            onClick={() => nextItem && router.push(`${routePrefix}/${nextItem.slug}`)}
            disabled={!nextItem}
            className="inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {labels.nextTrack} →
          </button>
          {nextItem && (
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#7d5439]">
              <input
                type="checkbox"
                checked={autoplay}
                onChange={(e) => setAutoplay(e.target.checked)}
                className="h-3.5 w-3.5 cursor-pointer accent-[#7d5439]"
              />
              {labels.autoplayNext}
            </label>
          )}
        </div>
      )}
    </div>
  );
}
