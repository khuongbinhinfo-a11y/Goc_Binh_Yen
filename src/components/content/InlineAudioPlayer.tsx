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
  const autoplayNextRef = useRef(false);
  const [autoplayNext, setAutoplayNext] = useState(false);

  const currentIndex = queue.findIndex((item) => item.slug === currentSlug);
  const queueHasNavigation = queue.length > 1;
  const normalizedIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevItem = queueHasNavigation ? queue[(normalizedIndex - 1 + queue.length) % queue.length] : null;
  const nextItem = queueHasNavigation ? queue[(normalizedIndex + 1) % queue.length] : null;
  const shouldAutoplayFromQuery = searchParams.get("autoplay") === "1";
  const shouldAutoNextFromQuery = searchParams.get("autonext") === "1";

  function buildTrackHref(targetSlug: string, options?: { autoplay?: boolean; autonext?: boolean }) {
    const query = new URLSearchParams(searchParams.toString());

    if (options?.autoplay) {
      query.set("autoplay", "1");
    } else {
      query.delete("autoplay");
    }

    if (options?.autonext) {
      query.set("autonext", "1");
    } else {
      query.delete("autonext");
    }

    const queryString = query.toString();
    return `${routePrefix}/${targetSlug}${queryString ? `?${queryString}` : ""}#nghe-xem`;
  }

  useEffect(() => {
    setAutoplayNext(shouldAutoNextFromQuery);
  }, [shouldAutoNextFromQuery, currentSlug]);

  useEffect(() => {
    autoplayNextRef.current = autoPlayOnMount || shouldAutoplayFromQuery;
    const audio = audioRef.current;
    if (!audio || !autoplayNextRef.current) return;

    let cancelled = false;

    const tryPlay = async () => {
      if (cancelled) return;
      try {
        await audio.play();
      } catch {
        // Ignore autoplay blocking or transient navigation aborts.
      }
    };

    const handleLoadedMetadata = () => {
      void tryPlay();
    };

    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      void tryPlay();
    } else {
      audio.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    }

    return () => {
      cancelled = true;
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioUrl, autoPlayOnMount, currentSlug, shouldAutoplayFromQuery]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (!autoplayNext || !nextItem) return;
      router.push(buildTrackHref(nextItem.slug, { autoplay: true, autonext: true }));
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [autoplayNext, nextItem, router, searchParams, routePrefix]);

  return (
    <div className="space-y-3">
      <audio ref={audioRef} controls preload="metadata" src={audioUrl} className="w-full" />
      {queueHasNavigation && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              const inListeningMode = autoplayNext || Boolean(audioRef.current && !audioRef.current.paused);
              router.push(
                buildTrackHref(prevItem?.slug ?? queue[0].slug, {
                  autoplay: inListeningMode,
                  autonext: autoplayNext,
                }),
              );
            }}
            className="inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
          >
            ← {labels.previousTrack}
          </button>
          <button
            type="button"
            onClick={() => {
              const inListeningMode = autoplayNext || Boolean(audioRef.current && !audioRef.current.paused);
              router.push(
                buildTrackHref(nextItem?.slug ?? queue[0].slug, {
                  autoplay: inListeningMode,
                  autonext: autoplayNext,
                }),
              );
            }}
            className="inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
          >
            {labels.nextTrack} →
          </button>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#7d5439]">
            <input
              type="checkbox"
              checked={autoplayNext}
              onChange={(e) => setAutoplayNext(e.target.checked)}
              className="h-3.5 w-3.5 cursor-pointer accent-[#7d5439]"
            />
            {labels.autoplayNext}
          </label>
        </div>
      )}
    </div>
  );
}
