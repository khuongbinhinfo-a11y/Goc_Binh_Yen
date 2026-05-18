type AppHubBannerProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
};

export function AppHubBanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
}: AppHubBannerProps) {
  return (
    <aside className="mt-6 rounded-2xl border border-[#c9a97a] bg-gradient-to-br from-[#fdf5e8] to-[#f8eedb] px-5 py-5 shadow-sm sm:px-6 sm:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8a6340]">
            Khu ứng dụng
          </p>
          <h2 className="mt-1 text-lg font-semibold leading-snug text-[#3f2b1a] sm:text-xl">
            {title}
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#5e4030]">{description}</p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#a07240] bg-[#7a5030] px-4 py-2 text-sm font-semibold text-[#fdf5e8] transition hover:bg-[#6a4228] sm:whitespace-nowrap"
          >
            {primaryLabel}
            <span aria-hidden="true" className="text-[#d4a96a]">↗</span>
          </a>
          <p className="text-center text-xs text-[#8a6340] sm:text-right">{secondaryLabel}</p>
        </div>
      </div>
    </aside>
  );
}
