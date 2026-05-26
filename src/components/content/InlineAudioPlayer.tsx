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
  const [playbackNotice, setPlaybackNotice] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const shouldAutoPlayFromQuery = searchParams.get("autoplay") === "1";
  const shouldAutoNextFromQuery = searchParams.get("autonext") === "1";
  const AUTOPLAY_NOTICE = "Trình duyệt chặn tự phát. Bấm Nghe để phát.";
  const AUDIO_ERROR_MESSAGE = "Lỗi file âm thanh. Vui lòng thử lại hoặc chuyển bài khác.";
  const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;
  const MEDIA_ERR_NETWORK = 2;
  const NETWORK_NO_SOURCE = 3;

  function isAutoplayBlockedError(error: unknown) {
    if (!error || typeof error !== "object") return false;
    const name = "name" in error ? String((error as { name?: unknown }).name) : "";
    return name === "NotAllowedError" || name === "AbortError";
  }

  function hasRealAudioSourceError(audio: HTMLAudioElement) {
    const mediaError = audio.error;
    if (!mediaError) return false;
    if (mediaError.code === MEDIA_ERR_SRC_NOT_SUPPORTED) return true;
    if (mediaError.code === MEDIA_ERR_NETWORK) return true;
    if (audio.networkState === NETWORK_NO_SOURCE) return true;
    if (!audio.currentSrc) return true;
    return false;
  }

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
    setPlaybackNotice(null);
    setPlaybackError(null);
  }, [autoPlayOnMount, shouldAutoPlayFromQuery, currentSlug]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldAutoplayRef.current) return;
    setPlaybackNotice(AUTOPLAY_NOTICE);

    const tryPlay = async () => {
      shouldAutoplayRef.current = false;
      try {
        await audio.play();
        setPlaybackNotice(null);
      } catch (error) {
        if (isAutoplayBlockedError(error)) {
          setPlaybackNotice(AUTOPLAY_NOTICE);
          setPlaybackError(null);
          return;
        }

        if (hasRealAudioSourceError(audio)) {
          setPlaybackError(AUDIO_ERROR_MESSAGE);
          setPlaybackNotice(null);
        }
      }
    };

    const handleLoadedMetadata = () => {
      void tryPlay();
    };

    let rafId = 0;
    let noticeTimer = 0;
    let cancelled = false;
    const pollUntilReady = () => {
      if (cancelled || !shouldAutoplayRef.current) return;
      if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
        void tryPlay();
        return;
      }

      rafId = window.requestAnimationFrame(pollUntilReady);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata, { once: true });
    const handleTimeUpdate = () => {
      if (audio.currentTime <= 0 || audio.paused) return;
      setPlaybackNotice(null);
      if (!hasRealAudioSourceError(audio)) {
        setPlaybackError(null);
      }
    };
    const handleAudioError = () => {
      if (hasRealAudioSourceError(audio)) {
        setPlaybackError(AUDIO_ERROR_MESSAGE);
        setPlaybackNotice(null);
      }
    };

    audio.addEventListener("playing", handleTimeUpdate);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("error", handleAudioError);
    rafId = window.requestAnimationFrame(pollUntilReady);
    noticeTimer = window.setTimeout(() => {
      if (cancelled || playbackError) return;
      if (hasRealAudioSourceError(audio)) return;
      if (audio.currentTime > 0 || !audio.paused) return;
      setPlaybackNotice((current) => current ?? AUTOPLAY_NOTICE);
    }, 1200);
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(noticeTimer);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("playing", handleTimeUpdate);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("error", handleAudioError);
    };
  }, [audioUrl, currentSlug, playbackError]);

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
      {(playbackNotice || playbackError) && (
        <p className={`text-sm leading-6 ${playbackError ? "text-[#9c382f]" : "text-[#7d5439]"}`}>
          {playbackError ?? playbackNotice}
        </p>
      )}
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
