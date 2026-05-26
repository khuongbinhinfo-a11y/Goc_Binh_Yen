"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import type { AudioQueueItem } from "@/lib/audio";

type Props = {
  audioUrl: string;
  queue: AudioQueueItem[];
  currentSlug: string;
  routePrefix: string;
  autoPlayOnMount?: boolean;
  labels: {
    previousTrack: string;
    nextTrack: string;
    autoplayNext: string;
  };
};

export default function InlineAudioPlayer({
  audioUrl,
  queue,
  currentSlug,
  routePrefix,
  autoPlayOnMount = false,
  labels,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const shouldAutoplayRef = useRef(false);
  const [autoplay, setAutoplay] = useState(false);

  const shouldAutoPlayFromQuery = searchParams.get("autoplay") === "1";
  const shouldAutoNextFromQuery = searchParams.get("autonext") === "1";

  const currentIndex = queue.findIndex((q) => q.slug === currentSlug);
  const prevItem = currentIndex > 0 ? queue[currentIndex - 1] : null;
  const nextItem = currentIndex < queue.length - 1 ? queue[currentIndex + 1] : null;

  function buildTrackHref(targetSlug: string, options?: { autoplayOnMount?: boolean; autoNext?: boolean }) {
    const query = new URLSearchParams(searchParams.toString());

    if (options?.autoplayOnMount) {
      query.set("autoplay", "1");
    } else {
      query.delete("autoplay");
    }

    if (options?.autoNext) {
      query.set("autonext", "1");
    } else {
      query.delete("autonext");
    }

    const queryString = query.toString();
    return `${routePrefix}/${targetSlug}${queryString ? `?${queryString}` : ""}#nghe-xem`;
  }

  useEffect(() => {
    setAutoplay(shouldAutoNextFromQuery);
  }, [shouldAutoNextFromQuery, currentSlug]);

  useEffect(() => {
    shouldAutoplayRef.current = autoPlayOnMount || shouldAutoPlayFromQuery;
  }, [autoPlayOnMount, shouldAutoPlayFromQuery, currentSlug]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldAutoplayRef.current) return;

    shouldAutoplayRef.current = false;

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch {
        // Browser may block autoplay without a gesture; keep UI stable and playable by user.
      }
    };

    void tryPlay();
  }, [audioUrl, currentSlug]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (autoplay && nextItem) {
        router.push(buildTrackHref(nextItem.slug, { autoplayOnMount: true, autoNext: true }));
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [autoplay, nextItem, router, searchParams, routePrefix]);

  return (
    <div className="space-y-3">
      <audio ref={audioRef} controls preload="metadata" src={audioUrl} className="w-full" />
      {queue.length > 1 && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (!prevItem) return;
              const inListeningMode = autoplay || Boolean(audioRef.current && !audioRef.current.paused);
              router.push(
                buildTrackHref(prevItem.slug, {
                  autoplayOnMount: inListeningMode,
                  autoNext: autoplay,
                }),
              );
            }}
            disabled={!prevItem}
            className="inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← {labels.previousTrack}
          </button>
          <button
            type="button"
            onClick={() => {
              if (!nextItem) return;
              const inListeningMode = autoplay || Boolean(audioRef.current && !audioRef.current.paused);
              router.push(
                buildTrackHref(nextItem.slug, {
                  autoplayOnMount: inListeningMode,
                  autoNext: autoplay,
                }),
              );
            }}
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
