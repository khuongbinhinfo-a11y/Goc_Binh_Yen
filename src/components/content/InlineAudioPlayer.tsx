"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [autoplayNext, setAutoplayNext] = useState(false);

  const currentIndex = queue.findIndex((item) => item.slug === currentSlug);
  const queueHasNavigation = queue.length > 1;
  const normalizedIndex = currentIndex >= 0 ? currentIndex : 0;
  const prevItem = queueHasNavigation ? queue[(normalizedIndex - 1 + queue.length) % queue.length] : null;
  const nextItem = queueHasNavigation ? queue[(normalizedIndex + 1) % queue.length] : null;

  function getCurrentQuery() {
    if (typeof window === "undefined") {
      return new URLSearchParams();
    }

    return new URLSearchParams(window.location.search);
  }

  function buildTrackHref(targetSlug: string, options?: { autoplay?: boolean; autonext?: boolean }) {
    const query = getCurrentQuery();

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
    const query = getCurrentQuery();
    setAutoplayNext(query.get("autonext") === "1");
  }, [currentSlug]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (!autoplayNext || !nextItem) return;

      audio.src = nextItem.audioUrl;
      audio.load();
      void audio.play().catch(() => {
        // Keep the player interactive if the follow-up play is blocked.
      });
      window.history.replaceState(null, "", buildTrackHref(nextItem.slug, { autoplay: false, autonext: true }));
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [autoplayNext, nextItem, routePrefix]);

  return (
    <div className="space-y-3">
      <audio
        ref={audioRef}
        controls
        preload="metadata"
        playsInline
        autoPlay={autoPlayOnMount}
        src={audioUrl}
        className="w-full"
      />
      {autoPlayOnMount && (
        <p className="text-xs text-[#865a3c]">Nhan play de nghe tren mobile neu trinh duyet chan tu phat.</p>
      )}
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
