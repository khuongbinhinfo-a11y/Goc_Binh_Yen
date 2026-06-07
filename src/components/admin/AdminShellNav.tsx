"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { label: "Lời nhắn", href: "/admin/messages" },
  { label: "Nội dung", href: "/admin/content" },
  { label: "Tích hợp", href: "/admin/integrations" },
];

export default function AdminShellNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Admin navigation">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href || pathname?.startsWith(`${tab.href}/`);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-[#8b5e3c] bg-[#8b5e3c] text-white"
                : "border-[#d9bea4] bg-white text-[#4a2f20] hover:border-[#b88763] hover:bg-[#f3e4d4]"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
