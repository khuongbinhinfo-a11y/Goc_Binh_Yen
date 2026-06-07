import type { ReactNode } from "react";
import AdminShellNav from "@/components/admin/AdminShellNav";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6ede3] text-[#4a2f20]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6 rounded-[30px] border border-[#dcc3a8] bg-[#fffaf5] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8b5e3c]">Quản trị Hồn Thơ</p>
              <h1 className="mt-1 text-2xl font-semibold text-[#4a2f20]">Bảng điều khiển Admin</h1>
              <p className="mt-2 text-sm text-[#6a4b38]">Chuyển nhanh giữa Lời nhắn, Nội dung và Tích hợp.</p>
            </div>
            <div>
              <AdminShellNav />
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
