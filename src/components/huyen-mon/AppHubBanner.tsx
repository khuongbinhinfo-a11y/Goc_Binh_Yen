type AppHubBannerProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  icon?: "compass" | "book";
};

function CompassIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
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
      width="20"
      height="20"
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
  secondaryLabel,
  icon = "compass",
}: AppHubBannerProps) {
  return (
    <aside className="mt-5 sm:float-right sm:clear-right sm:ml-6 sm:mb-2 sm:mt-0 sm:w-72">
      <div className="rounded-2xl border border-[#c9a97a] bg-[#fdf6e8] shadow-[0_2px_12px_rgba(90,55,20,0.08)]">
        <div className="flex items-start gap-3 px-4 pt-4">
          <span className="mt-0.5 shrink-0 text-[#8a6340]">
            {icon === "book" ? <BookIcon /> : <CompassIcon />}
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a6340]">
              Khu ứng dụng
            </p>
            <h2 className="mt-0.5 text-sm font-semibold leading-snug text-[#3f2b1a]">
              {title}
            </h2>
          </div>
        </div>

        <p className="mt-2 px-4 text-xs leading-6 text-[#5e4030]">{description}</p>

        <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#e8d4b8] px-4 py-3">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full border border-[#a07240] bg-[#7a5030] px-3 py-1.5 text-xs font-semibold text-[#fdf5e8] transition hover:bg-[#6a4228]"
          >
            {primaryLabel}
            <span aria-hidden="true">↗</span>
          </a>
          <p className="text-right text-[11px] text-[#9a7255]">{secondaryLabel}</p>
        </div>
      </div>
    </aside>
  );
}
