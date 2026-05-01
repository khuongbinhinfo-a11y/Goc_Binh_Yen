"use client";

import SafeImage from "@/components/ui/SafeImage";
import PublicContactForm from "@/components/forms/PublicContactForm";
import { CONTACT_FORM_URL, POET_BOOKCASE_URL, SUPPORT_HON_THO_URL } from "@/data/homepageData";
import { useLocale } from "@/hooks/useLocale";
import { IMAGE_FALLBACKS } from "@/lib/image";

type ContactActionId = "contact" | "bookcase" | "support";

const ACTION_LINKS: Record<ContactActionId, { href: string; external?: boolean }> = {
  contact: { href: CONTACT_FORM_URL },
  bookcase: { href: POET_BOOKCASE_URL },
  support: { href: SUPPORT_HON_THO_URL },
};

function ContactActionIcon({ id }: { id: ContactActionId }) {
  if (id === "bookcase") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
        <path d="M5.5 4.75h8.25a1 1 0 0 1 1 1v9.5H6.5a1 1 0 0 0-1 1V4.75Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="M6.5 15.25V4.75a1 1 0 0 0-1-1H4.25v11.5h2.25Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }

  if (id === "support") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
        <path
          d="M10 15.75 4.9 10.9a3.2 3.2 0 1 1 4.52-4.52L10 6.95l.58-.57A3.2 3.2 0 1 1 15.1 10.9L10 15.75Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path
        d="M4 5.5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 16 5.5v9A1.5 1.5 0 0 1 14.5 16h-9A1.5 1.5 0 0 1 4 14.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="m5.5 6.75 4.5 3.5 4.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactTextCueIcon({ type }: { type: "eyebrow" | "card" | "quick" }) {
  if (type === "card") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path
          d="M4 5.5a1.5 1.5 0 0 1 1.5-1.5h9A1.5 1.5 0 0 1 16 5.5v9A1.5 1.5 0 0 1 14.5 16h-9A1.5 1.5 0 0 1 4 14.5v-9Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="m5.5 6.75 4.5 3.5 4.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "quick") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path d="M4.25 15.5h11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M6.25 14.5V5.75a1 1 0 0 1 1-1h6.5a1 1 0 0 1 1 1v8.75H6.25Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
      <path
        d="M10 15.75 4.9 10.9a3.2 3.2 0 1 1 4.52-4.52L10 6.95l.58-.57A3.2 3.2 0 1 1 15.1 10.9L10 15.75Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactSection() {
  const { t } = useLocale();

  const cardStyles: Record<ContactActionId, { card: string; icon: string; button: string }> = {
    contact: {
      card: "bg-[#fff9f1]",
      icon: "bg-[#f4dfc9] text-[#7d5438]",
      button: "text-[#7a5237] hover:text-[#5f3d2a]",
    },
    bookcase: {
      card: "bg-[#fdf4e8]",
      icon: "bg-[#efdbc5] text-[#6d4a34]",
      button: "text-[#7a5237] hover:text-[#5f3d2a]",
    },
    support: {
      card: "bg-[#f9efe4]",
      icon: "bg-[#ecd3bc] text-[#6f4731]",
      button: "text-[#7a5237] hover:text-[#5f3d2a]",
    },
  };

  return (
    <section id="lien-he" className="scroll-mt-24 bg-[#f7efe6] py-20">
      <div className="site-shell">
        <div className="space-y-6 sm:space-y-7">
          <article className="soft-panel overflow-hidden border-[#d7b89b] bg-[#fbf2e8] p-0">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="eyebrow inline-flex items-center gap-1.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f1dcc7] text-[#7a5236]">
                    <ContactTextCueIcon type="eyebrow" />
                  </span>
                  <span>{t.contact.eyebrow}</span>
                </p>
                <h2 className="max-w-lg text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{t.contact.title}</h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-[#654939] sm:text-base">{t.contact.description}</p>

                <a
                  href={CONTACT_FORM_URL}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(74,47,32,0.18)] transition hover:bg-[#7b5234]"
                >
                  {t.contact.button}
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                    <path d="M7 5h8v8M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </a>
                <p className="mt-2 text-[11px] text-[#8a6851] sm:text-xs">{t.contact.helper}</p>
              </div>

              <div className="relative min-h-[240px] sm:min-h-[300px] lg:min-h-[360px]">
                <SafeImage
                  src="/images/poems/em-mua-xuan-ve.jpeg"
                  fallbackSrc={IMAGE_FALLBACKS.bookcase}
                  alt={t.contact.cardTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3f2a1d]/36 via-[#4f3525]/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/35 bg-[#fff7ed]/86 p-4 backdrop-blur-[1px] sm:max-w-sm">
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5f4332]">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f2dcc6] text-[#7d563c]">
                      <ContactTextCueIcon type="card" />
                    </span>
                    <span>{t.contact.cardTitle}</span>
                  </p>
                  <p className="mt-1.5 text-sm leading-6 text-[#6b4e3c]">{t.contact.cardDescription}</p>
                </div>
              </div>
            </div>
          </article>

          <div>
            <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#8f684c]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f2dfcb] text-[#7a5238]">
                <ContactTextCueIcon type="quick" />
              </span>
              <span>{t.contact.quickLinksTitle}</span>
            </p>
            <div className="grid gap-3 md:grid-cols-3">
              {t.contact.quickLinks.map((item) => {
                const action = ACTION_LINKS[item.id];
                const isExternal = action.external ?? false;
                const visual = cardStyles[item.id];

                return (
                  <article key={item.id} className={`soft-panel border-[#dfc3a8] p-4 sm:p-5 ${visual.card}`}>
                    <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${visual.icon}`}>
                      <ContactActionIcon id={item.id} />
                    </span>
                    <h3 className="mt-3 text-xl font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#664a3a]">{item.description}</p>
                    <a
                      href={action.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className={`mt-4 inline-flex items-center text-sm font-semibold transition ${visual.button}`}
                    >
                      {item.button}
                    </a>
                  </article>
                );
              })}
            </div>
          </div>

          <div id="hontho-contact-form" className="scroll-mt-24">
            <PublicContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
