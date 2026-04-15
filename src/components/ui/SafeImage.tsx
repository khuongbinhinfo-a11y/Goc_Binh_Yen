"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getSafeImageSrc, IMAGE_FALLBACKS } from "@/lib/image";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
  srcCandidates?: string[];
};

function toCandidate(value: string | null | undefined) {
  const normalized = (value ?? "").trim();
  return normalized.length > 0 ? normalized : null;
}

function uniqueCandidates(values: string[]) {
  const seen = new Set<string>();
  const output: string[] = [];

  values.forEach((value) => {
    if (!value || seen.has(value)) return;
    seen.add(value);
    output.push(value);
  });

  return output;
}

export default function SafeImage({ src, fallbackSrc, srcCandidates, onError, ...props }: SafeImageProps) {
  const resolvedFallback = useMemo(
    () => getSafeImageSrc(fallbackSrc, IMAGE_FALLBACKS.global),
    [fallbackSrc],
  );

  const orderedCandidates = useMemo(() => {
    const raw = [
      toCandidate(src),
      ...(srcCandidates ?? []).map(toCandidate),
    ].filter(Boolean) as string[];

    return uniqueCandidates(raw).map((candidate) => getSafeImageSrc(candidate, resolvedFallback));
  }, [resolvedFallback, src, srcCandidates]);

  const [candidateIndex, setCandidateIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(() => orderedCandidates[0] ?? resolvedFallback);

  useEffect(() => {
    setCandidateIndex(0);
    setCurrentSrc(orderedCandidates[0] ?? resolvedFallback);
  }, [orderedCandidates, resolvedFallback]);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={(event) => {
        const nextIndex = candidateIndex + 1;
        if (nextIndex < orderedCandidates.length) {
          setCandidateIndex(nextIndex);
          setCurrentSrc(orderedCandidates[nextIndex]);
        } else if (currentSrc !== resolvedFallback) {
          setCurrentSrc(resolvedFallback);
        }
        onError?.(event);
      }}
    />
  );
}
