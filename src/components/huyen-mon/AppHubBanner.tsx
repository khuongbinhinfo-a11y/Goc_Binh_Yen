"use client";

import React, { useEffect, useState } from "react";

type AppHubBannerProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  icon?: "compass" | "book";
  dismissKey: string;
};

function CompassIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function AppHubBanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  icon = "compass",
  dismissKey,
}: AppHubBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const dismissed = sessionStorage.getItem(dismissKey);
      if (!dismissed) setVisible(true);
    }
  }, [dismissKey]);

  function handleDismiss() {
    setVisible(false);
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(dismissKey, "1");
    }
  }

  if (!visible) return null;

  const cardStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #5c3418 0%, #7a4f2b 100%)",
    borderColor: "rgba(226,190,128,0.35)",
  };

  return (
    <div
      role="complementary"
      aria-label={title}
      className="fixed z-40 bottom-3 left-3 right-3 sm:bottom-6 sm:left-auto sm:right-6 sm:w-72"
    >
      {/* ── MOBILE: pill bar ── */}
      <div
        className="flex items-center gap-2 rounded-full border px-3 py-2 shadow-[0_4px_20px_rgba(20,8,2,0.4)] sm:hidden"
        style={cardStyle}
      >
        <span className="shrink-0" style={{ color: "#e2be80" }}>
          {icon === "book" ? <BookIcon /> : <CompassIcon />}
        </span>

        <p className="min-w-0 flex-1 truncate text-xs font-semibold" style={{ color: "#fff8ec" }}>
          {title}
        </p>

        <a
          href={primaryHref}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition hover:opacity-90"
          style={{ background: "#e2be80", color: "#3d1f0a" }}
        >
          Mở
        </a>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Đóng thông báo"
          className="flex h-5 w-5 shrink-0 items-center justify-center text-base leading-none transition"
          style={{ color: "rgba(230,200,160,0.55)" }}
        >
          ×
        </button>
      </div>

      {/* ── DESKTOP: full card ── */}
      <div
        className="hidden rounded-2xl border shadow-[0_8px_32px_rgba(30,12,4,0.35)] sm:block"
        style={cardStyle}
      >
        <div className="flex items-start justify-between gap-2 px-4 pt-4">
          <div className="flex items-center gap-2">
            <span style={{ color: "#e2be80" }}>
              {icon === "book" ? <BookIcon /> : <CompassIcon />}
            </span>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#e2be80" }}>
              Khu ứng dụng
            </p>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Đóng thông báo"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-sm transition"
            style={{ color: "rgba(230,200,160,0.6)" }}
          >
            ×
          </button>
        </div>

        <div className="px-4 pt-2 pb-1">
          <h2 className="text-sm font-semibold leading-snug" style={{ color: "#fff8ec" }}>
            {title}
          </h2>
          <p className="mt-1 text-xs leading-5" style={{ color: "rgba(246,234,212,0.75)" }}>
            {description}
          </p>
        </div>

        <div className="px-4 pb-4 pt-3">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition hover:opacity-90"
            style={{ background: "#e2be80", color: "#3d1f0a" }}
          >
            {primaryLabel}
            <span aria-hidden="true" className="text-[10px]">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
