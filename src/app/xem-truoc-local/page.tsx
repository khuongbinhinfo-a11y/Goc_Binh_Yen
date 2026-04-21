"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PreviewItem = {
  label: string;
  href: string;
  note: string;
};

const previewItems: PreviewItem[] = [
  {
    label: "Trang chu",
    href: "/",
    note: "Kiem tra menu co muc Co hoc",
  },
  {
    label: "Co hoc",
    href: "/huyen-mon-tham-khao",
    note: "Trang tong voi 4 nhanh cap 1",
  },
  {
    label: "Nhap mon",
    href: "/huyen-mon-tham-khao/nhap-mon",
    note: "Trang khung gioi thieu",
  },
  {
    label: "Ngu thuat",
    href: "/huyen-mon-tham-khao/ngu-thuat",
    note: "Khung 5 nhanh con",
  },
  {
    label: "Tam thuc",
    href: "/huyen-mon-tham-khao/tam-thuc",
    note: "Khung 8 cum: nhap mon, cach tiep can, 3 he, so sanh, ung dung, chuyen sau",
  },
  {
    label: "Ung dung va gioi han",
    href: "/huyen-mon-tham-khao/ung-dung-va-gioi-han",
    note: "Nguyen tac su dung than trong",
  },
  {
    label: "Ngu thuat / Son",
    href: "/huyen-mon-tham-khao/ngu-thuat/son",
    note: "Placeholder nhanh Son",
  },
  {
    label: "Ngu thuat / Y",
    href: "/huyen-mon-tham-khao/ngu-thuat/y",
    note: "Placeholder nhanh Y",
  },
  {
    label: "Ngu thuat / Boc",
    href: "/huyen-mon-tham-khao/ngu-thuat/boc",
    note: "Placeholder nhanh Boc",
  },
  {
    label: "Ngu thuat / Menh",
    href: "/huyen-mon-tham-khao/ngu-thuat/menh",
    note: "Placeholder nhanh Menh",
  },
  {
    label: "Ngu thuat / Tuong",
    href: "/huyen-mon-tham-khao/ngu-thuat/tuong",
    note: "Placeholder nhanh Tuong",
  },
  {
    label: "Tam thuc",
    href: "/huyen-mon-tham-khao/tam-thuc",
    note: "Khung trang chinh voi 8 cum",
  },
  {
    label: "Tam thuc / Nhap mon",
    href: "/huyen-mon-tham-khao/tam-thuc/nhap-mon-tam-thuc",
    note: "Nen tang khong niem tin mu quang",
  },
  {
    label: "Tam thuc / Cach tiep can",
    href: "/huyen-mon-tham-khao/tam-thuc/cach-tiep-can",
    note: "Phan biet he thong va dien giai",
  },
  {
    label: "Tam thuc / So sanh va dinh vi",
    href: "/huyen-mon-tham-khao/tam-thuc/so-sanh-va-dinh-vi",
    note: "Ba loi quan sat khac nhau",
  },
  {
    label: "Tam thuc / Thai At Than Kinh",
    href: "/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh",
    note: "He quan sat vi mo - tam nhin rong",
  },
  {
    label: "Tam thuc / Ky Mon Don Giap",
    href: "/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap",
    note: "He quan sat tinh huong cu the",
  },
  {
    label: "Tam thuc / Luc Nham Than Khoa",
    href: "/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa",
    note: "He mo ta dien bien - chieu sau",
  },
  {
    label: "Tam thuc / Ung dung va gioi han",
    href: "/huyen-mon-tham-khao/tam-thuc/ung-dung-va-gioi-han-tam-thuc",
    note: "Cach su dung than trong",
  },
  {
    label: "Tam thuc / Chuyen sau",
    href: "/huyen-mon-tham-khao/tam-thuc/chuyen-sau-dinh-huong",
    note: "Chieu sau hoc thuat va di ban",
  },
];

export default function LocalPreviewPage() {
  const [activeHref, setActiveHref] = useState<string>(previewItems[0].href);

  const activeItem = useMemo(
    () => previewItems.find((item) => item.href === activeHref) ?? previewItems[0],
    [activeHref],
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#cde7f9] via-[#dff0fb] to-[#f8f1e6] py-8">
      <div className="site-shell">
        <div className="soft-panel overflow-hidden border border-[#9ec9e6] bg-white/80 backdrop-blur">
          <div className="border-b border-[#b8d8eb] bg-[#e9f6ff] px-5 py-4 sm:px-7">
            <p className="eyebrow">Local Preview Board</p>
            <h1 className="text-2xl font-bold leading-tight text-[#1f4f77] sm:text-3xl">Xem truoc nhanh truoc khi push</h1>
            <p className="mt-2 text-sm text-[#355f80]">
              Chon route ben trai de xem live ben phai. Ban co the mo tab rieng neu can so sanh layout.
            </p>
          </div>

          <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
            <aside className="border-r border-[#d3e7f5] bg-[#f4fbff] p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-[#3a5f79]">Danh sach route</h2>
                <Link
                  href={activeItem.href}
                  target="_blank"
                  className="rounded-full border border-[#83b4d7] px-3 py-1 text-xs font-semibold text-[#2b6794] hover:bg-[#e5f3ff]"
                >
                  Mo tab moi
                </Link>
              </div>

              <div className="max-h-[68vh] space-y-2 overflow-auto pr-1">
                {previewItems.map((item) => {
                  const isActive = activeHref === item.href;

                  return (
                    <button
                      key={item.href}
                      type="button"
                      onClick={() => setActiveHref(item.href)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        isActive
                          ? "border-[#5aa5d9] bg-[#dff2ff]"
                          : "border-[#d5e7f4] bg-white hover:border-[#94c2e0] hover:bg-[#f6fbff]"
                      }`}
                    >
                      <p className="text-sm font-semibold text-[#214f74]">{item.label}</p>
                      <p className="mt-1 text-xs leading-5 text-[#587892]">{item.note}</p>
                      <p className="mt-1 text-[11px] text-[#6d8fa9]">{item.href}</p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div className="bg-[#f7fcff] p-4 sm:p-5">
              <div className="mb-3 rounded-xl border border-[#c8e1f1] bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-[#668aa4]">Dang xem</p>
                <p className="text-sm font-semibold text-[#1c4f78]">{activeItem.label}</p>
                <p className="text-xs text-[#6d8fa9]">{activeItem.href}</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#8ec0e2] bg-white shadow-sm">
                <iframe
                  key={activeItem.href}
                  title={`preview-${activeItem.href}`}
                  src={activeItem.href}
                  className="h-[72vh] w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
