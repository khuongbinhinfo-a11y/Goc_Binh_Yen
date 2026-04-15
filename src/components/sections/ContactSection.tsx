"use client";

import { CONTACT_FORM_URL, POET_BOOKCASE_URL, SUPPORT_HON_THO_URL } from "@/data/homepageData";
import { useLocale } from "@/hooks/useLocale";

type ContactActionId = "contact" | "bookcase" | "support";

const ACTION_LINKS: Record<ContactActionId, { href: string; external?: boolean }> = {
  contact: { href: CONTACT_FORM_URL, external: true },
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

export default function ContactSection() {
  const { t } = useLocale();

  return (
    <section id="lien-he" className="scroll-mt-24 bg-[#f7efe6] py-20">
      <div className="site-shell">
        <div className="soft-panel overflow-hidden bg-gradient-to-br from-[#f8efe5] to-[#f3e7d9] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-7 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <p className="eyebrow">{t.contact.eyebrow}</p>
              <h2 className="mb-4 text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl sm:leading-tight">
                {t.contact.title}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[#654939] sm:text-base">{t.contact.description}</p>
            </div>

            <div className="space-y-3.5">
              <div
                className="relative overflow-hidden rounded-[1.5rem] border border-[#d8b89b] shadow-soft"
                style={{
                  backgroundImage: "url('/images/4.webp')",
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,233,218,0.22),rgba(55,34,24,0.58))]" />
                <div className="relative flex min-h-[240px] flex-col justify-end p-4 sm:min-h-[268px] sm:p-6">
                  <div className="max-w-md rounded-2xl border border-white/35 bg-[#fff9f1]/85 p-4 backdrop-blur-[1px] sm:p-5">
                    <p className="text-sm font-semibold text-[#5f4332]">{t.contact.cardTitle}</p>
                    <p className="mt-2 text-sm leading-6 text-[#6e4f3b]">{t.contact.cardDescription}</p>
                    <a
                      href={CONTACT_FORM_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(74,47,32,0.2)] transition hover:bg-[#7b5234] sm:w-auto"
                    >
                      {t.contact.button}
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                        <path d="M7 5h8v8M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </a>
                    <p className="mt-2 text-xs text-[#8a6851]">{t.contact.helper}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.4rem] border border-[#d7b89b] bg-[#fff8ef]/90 p-4 sm:p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8f684c]">{t.contact.quickLinksTitle}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {t.contact.quickLinks.map((item, index) => {
                    const action = ACTION_LINKS[item.id];
                    const isExternal = action.external ?? false;

                    return (
                      <article
                        key={item.id}
                        className={`rounded-2xl border border-[#e3c8ad] bg-white/85 p-3.5 shadow-[0_8px_20px_rgba(89,59,40,0.06)] ${
                          index === 2 ? "sm:col-span-2" : ""
                        }`}
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f2dfcc] text-[#7f573b]">
                          <ContactActionIcon id={item.id} />
                        </span>
                        <h3 className="mt-2.5 text-base font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-6 text-[#6b4e3c]">{item.description}</p>
                        <a
                          href={action.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="mt-3 inline-flex items-center text-sm font-semibold text-[#7a5237] transition hover:text-[#5f3d2a]"
                        >
                          {item.button}
                        </a>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
