"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useMemo, useState } from "react";

import { getSafeImageSrc, IMAGE_FALLBACKS } from "@/lib/image";

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export default function SafeImage({ src, fallbackSrc, onError, ...props }: SafeImageProps) {
  const resolvedFallback = useMemo(
    () => getSafeImageSrc(fallbackSrc, IMAGE_FALLBACKS.global),
    [fallbackSrc],
  );

  const [currentSrc, setCurrentSrc] = useState(() => getSafeImageSrc(src, resolvedFallback));

  useEffect(() => {
    setCurrentSrc(getSafeImageSrc(src, resolvedFallback));
  }, [src, resolvedFallback]);

  return (
    <Image
      {...props}
      src={currentSrc}
      onError={(event) => {
        if (currentSrc !== resolvedFallback) {
          setCurrentSrc(resolvedFallback);
        }
        onError?.(event);
      }}
    />
  );
}
