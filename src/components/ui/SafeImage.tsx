"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getSafeImageCandidates, getSafeImageSrc, IMAGE_FALLBACKS } from "@/lib/image";

const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U4ZDhjYSIvPjwvc3ZnPg==";

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

export default function SafeImage({ src, fallbackSrc, srcCandidates, onError, placeholder, blurDataURL, ...props }: SafeImageProps) {
  const resolvedPlaceholder = placeholder ?? (props.fill ? undefined : "blur");
  const resolvedBlurDataURL = blurDataURL ?? BLUR_DATA_URL;
  const resolvedFallback = useMemo(
    () => getSafeImageSrc(fallbackSrc, IMAGE_FALLBACKS.global),
    [fallbackSrc],
  );

  const orderedCandidates = useMemo(() => {
    const raw = [
      toCandidate(src),
      ...(srcCandidates ?? []).map(toCandidate),
    ].filter(Boolean) as string[];

    const expandedCandidates = uniqueCandidates(raw).flatMap((candidate) =>
      getSafeImageCandidates(candidate, resolvedFallback),
    );

    return uniqueCandidates(expandedCandidates.map((candidate) => getSafeImageSrc(candidate, resolvedFallback)));
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
      placeholder={resolvedPlaceholder}
      blurDataURL={resolvedPlaceholder === "blur" ? resolvedBlurDataURL : undefined}
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
