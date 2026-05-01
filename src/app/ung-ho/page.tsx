"use client";

import { useEffect, useMemo, useState } from "react";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SafeImage from "@/components/ui/SafeImage";
import { getBrandPagesCopy } from "@/data/brandPagesI18n";
import { useLocale } from "@/hooks/useLocale";
import { IMAGE_FALLBACKS, LOCAL_IMAGE_MAP } from "@/lib/image";

export default function UngHoPage() {
  const { locale } = useLocale();
  const copy = getBrandPagesCopy(locale).support;
  const [copied, setCopied] = useState(false);
  const [contactIdentity, setContactIdentity] = useState("");
  const [contactFullName, setContactFullName] = useState("");
  const [rid, setRid] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState("");

  useEffect(() => {
    setRid(`R${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`.toUpperCase());
  }, []);

  const transferAccountNumber = useMemo(() => {
    const found = copy.transferDetails.find((item) => /số tài khoản/i.test(item.label));
    return (found?.value || copy.accountNumber || "").replaceAll(/\s+/g, "");
  }, [copy.accountNumber, copy.transferDetails]);

  const transferAccountName = useMemo(() => {
    const found = copy.transferDetails.find((item) => /chủ tài khoản/i.test(item.label));
    return found?.value || "";
  }, [copy.transferDetails]);

  const transferBank = useMemo(() => {
    const found = copy.transferDetails.find((item) => /ngân hàng/i.test(item.label));
    return found?.value || "";
  }, [copy.transferDetails]);

  const transferNarrative = useMemo(() => {
    const identity = contactIdentity.trim();
    const fullName = contactFullName.trim().replaceAll(/\s+/g, " ").slice(0, 80);
    const parts = ["UNGHO"];

    if (rid) {
      parts.push(`RID:${rid}`);
    }

    if (identity) {
      parts.push(`CONTACT:${identity}`);
    }

    if (fullName) {
      parts.push(`NAME:${fullName}`);
    }

    return parts.join(" | ");
  }, [contactFullName, contactIdentity, rid]);

  const vietQrDownloadUrl = useMemo(() => {
    const normalizedBank = transferBank.toLowerCase();
    const bankCode = normalizedBank.includes("vietin") ? "970415" : "970415";
    const addInfo = encodeURIComponent(transferNarrative);
    const accountName = encodeURIComponent(transferAccountName);
    return `https://img.vietqr.io/image/${bankCode}-${transferAccountNumber}-compact2.png?amount=&addInfo=${addInfo}&accountName=${accountName}`;
  }, [transferAccountName, transferAccountNumber, transferBank, transferNarrative]);

  const handleCopyAccountNumber = async () => {
    if (!copy.accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(copy.accountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadQr = async () => {
    if (!transferAccountNumber) {
      return;
    }

    try {
      const response = await fetch(vietQrDownloadUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Cannot download QR image");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `ma-qr-hon-tho-${rid}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(vietQrDownloadUrl, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    if (!rid || paymentConfirmed) {
      return;
    }

    let stopped = false;
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/payments/sepay/status?rid=${encodeURIComponent(rid)}`, { cache: "no-store" });
        const payload: { ok?: boolean; paid?: boolean; email?: string } = await response.json().catch(() => ({}));

        if (stopped) {
          return;
        }

        if (response.ok && payload.ok && payload.paid) {
          setPaymentConfirmed(true);
          setCheckedEmail(payload.email || "");
        }
      } catch {
        // Poll again on next interval.
      }
    };

    checkStatus();
    const timer = window.setInterval(checkStatus, 5000);

    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [paymentConfirmed, rid]);

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-[#dec2a7]">
          <div className="absolute inset-0">
            <SafeImage
              src={copy.heroImage}
              srcCandidates={LOCAL_IMAGE_MAP.heroSupport.candidates}
              fallbackSrc={IMAGE_FALLBACKS.global}
              alt={copy.heroAlt}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5b432f]/30 via-[#493428]/46 to-[#241912]/78" />

          <div className="site-shell relative z-10 py-12 sm:py-14">
            <p className="eyebrow text-[#efdcc5]">{copy.heroEyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-white sm:text-5xl">{copy.heroTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#f4e8d7] sm:text-base">{copy.heroDescription}</p>
          </div>
        </section>

        <section className="py-10 pb-16 sm:pb-18 sm:pt-12">
          <div className="site-shell">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <article className="soft-panel relative min-h-[320px] overflow-hidden border-[#dcc0a5] bg-[#ead8c5] sm:min-h-[360px]">
                <div className="absolute inset-0">
                  <SafeImage
                    src={copy.companionImage}
                    fallbackSrc={IMAGE_FALLBACKS.global}
                    alt={copy.companionAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f140d]/68 via-[#2d1f16]/40 to-[#2d1f16]/16" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f4e9de]/50 via-[#f4e9de]/18 to-transparent" />

                <div className="relative z-10 flex min-h-[320px] items-end p-5 sm:min-h-[360px] sm:p-7">
                  <div className="relative max-w-[31rem] rounded-2xl border border-[#fff5ea]/80 bg-[rgba(255,247,238,0.95)] p-4 shadow-[0_14px_36px_rgba(34,22,14,0.28)] backdrop-blur-[2.5px] sm:p-5">
                    <div className="pointer-events-none absolute right-3 top-3 text-[#c68a63]/70">
                      <svg viewBox="0 0 64 64" className="h-8 w-8" fill="none" aria-hidden="true">
                        <path d="M32 14C34 20 38 24 44 26C38 28 34 32 32 38C30 32 26 28 20 26C26 24 30 20 32 14Z" stroke="currentColor" strokeWidth="1.8" />
                        <circle cx="32" cy="26" r="3" fill="currentColor" />
                        <path d="M32 38V52" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        <path d="M32 45C28 42 23 42 19 45C23 48 28 48 32 45Z" fill="currentColor" opacity="0.72" />
                        <path d="M32 43C36 40 41 40 45 43C41 46 36 46 32 43Z" fill="currentColor" opacity="0.72" />
                      </svg>
                    </div>
                    <p className="pr-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b4e34] sm:text-xs">{copy.companionTitle}</p>
                    <p className="mt-2 text-sm leading-7 text-[#372014] sm:text-base">{copy.companionDescription}</p>
                  </div>
                </div>
              </article>

              <article className="soft-panel overflow-hidden border-[#d8b89b] bg-[#f8efe5]">
                <div className="relative h-52 bg-[#f3e0cd] sm:h-60">
                  <SafeImage
                    src={copy.qrCardImage}
                    srcCandidates={LOCAL_IMAGE_MAP.supportQr.candidates}
                    fallbackSrc={IMAGE_FALLBACKS.support}
                    alt={copy.qrCardAlt}
                    fill
                    className="object-contain p-5 sm:p-7"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4a2f20]/8 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm leading-7 text-[#654939] sm:text-base">{copy.qrCardDescription}</p>
                  <dl className="mt-3 space-y-2.5">
                    {copy.transferDetails.map((detail) => (
                      <div key={detail.label} className="flex items-start justify-between gap-3 rounded-xl bg-white/70 px-3 py-2.5">
                        <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b684f]">{detail.label}</dt>
                        <dd className="text-sm font-medium text-[#4a2f20]">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={handleCopyAccountNumber}
                      className="inline-flex rounded-full border border-[#c9a488] px-4 py-2 text-xs font-semibold text-[#7a5236] transition hover:bg-[#f2dfcb] sm:text-sm"
                    >
                      {copied ? copy.copiedButton : copy.copyButton}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-[#8a6a57] sm:text-sm">{copy.helperText}</p>

                  <div className="mt-5 rounded-2xl border border-[#d9bea4] bg-white/70 p-4 sm:p-5">
                    <h3 className="text-sm font-semibold text-[#4a2f20] sm:text-base">Để lại đôi dòng để Hồn Thơ gửi lời cảm ơn</h3>
                    <p className="mt-1 text-xs leading-6 text-[#6a4b38] sm:text-sm">
                      Nếu thuận tiện, bạn có thể để lại thông tin liên hệ để Hồn Thơ gửi lời cảm ơn. Hồn Thơ rất trân trọng từng sự đồng hành.
                    </p>

                    <div className="mt-3 space-y-3">
                      <label className="block space-y-1.5 text-xs text-[#5f4332] sm:text-sm">
                        <span>Email hoặc Số điện thoại (không bắt buộc)</span>
                        <input
                          value={contactIdentity}
                          onChange={(event) => setContactIdentity(event.target.value)}
                          placeholder="ten@email.com hoặc 09xx xxx xxx"
                          className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                        />
                      </label>

                      <label className="block space-y-1.5 text-xs text-[#5f4332] sm:text-sm">
                        <span>Họ và tên (không bắt buộc)</span>
                        <input
                          value={contactFullName}
                          onChange={(event) => setContactFullName(event.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                        />
                      </label>
                    </div>

                    {paymentConfirmed ? (
                      <p className="mt-3 rounded-xl border border-[#c8dfb8] bg-[#f3faee] px-3 py-2 text-xs text-[#3f5f2a] sm:text-sm">
                        Cảm ơn bạn đã ủng hộ Hồn Thơ. {checkedEmail ? `Chúng tôi sẽ gửi lời cảm ơn qua email ${checkedEmail}.` : "Hồn Thơ đã ghi nhận tấm lòng của bạn."}
                      </p>
                    ) : null}

                    <button
                      type="button"
                      onClick={handleDownloadQr}
                      className="mt-3 inline-flex rounded-full bg-[#8b5e3c] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#764f33] sm:text-sm"
                    >
                      Ủng hộ ngay
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <article className="soft-panel relative overflow-hidden border-[#d8b89b] bg-[#f8efe5] p-7 sm:p-9">
              <div className="pointer-events-none absolute -right-4 -top-4 hidden h-36 w-44 opacity-55 sm:block">
                <SafeImage
                  src="/images/brand/footer-ornament.png"
                  fallbackSrc={IMAGE_FALLBACKS.global}
                  alt=""
                  fill
                  className="object-contain object-right-top"
                />
              </div>
              <div className="pointer-events-none absolute -bottom-4 -left-3 h-24 w-32 opacity-40">
                <SafeImage
                  src="/images/brand/footer-ornament.png"
                  fallbackSrc={IMAGE_FALLBACKS.global}
                  alt=""
                  fill
                  className="rotate-180 object-contain object-left-bottom"
                />
              </div>
              <div className="pointer-events-none absolute bottom-5 left-6 text-[#b88966]/45">
                <svg viewBox="0 0 140 70" className="h-12 w-28" fill="none" aria-hidden="true">
                  <path d="M8 56C28 56 44 46 58 30C70 17 87 10 110 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M48 42C41 40 37 35 35 28C42 30 47 34 48 42Z" fill="currentColor" />
                  <path d="M68 31C61 29 57 24 55 17C62 19 67 23 68 31Z" fill="currentColor" />
                  <path d="M88 21C81 19 77 14 75 7C82 9 87 13 88 21Z" fill="currentColor" />
                </svg>
              </div>

              <h2 className="relative text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.closingTitle}</h2>
              {copy.closingDescription ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">{copy.closingDescription}</p>
              ) : null}
              <a
                href={copy.closingAction.href}
                target={copy.closingAction.external ? "_blank" : undefined}
                rel={copy.closingAction.external ? "noreferrer" : undefined}
                className="relative mt-6 inline-flex rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#764a2f]"
              >
                {copy.closingButton}
              </a>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
