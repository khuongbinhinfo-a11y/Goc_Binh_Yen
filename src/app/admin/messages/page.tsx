import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminMessagesClient from "@/components/admin/AdminMessagesClient";
import { getAdminCookieName, getVerifiedAdminSession } from "@/lib/admin/auth";
import { listMessages, type AdminMessage } from "@/lib/admin/messages-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const cookieStore = await cookies();
  const session = await getVerifiedAdminSession(cookieStore.get(getAdminCookieName())?.value);

  if (!session) {
    redirect("/admin/login?next=/admin/messages");
  }

  if (!session.permissions.includes("message:read")) {
    return (
      <main className="min-h-screen bg-[#f6ede3] px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-[#dcc3a8] bg-[#fffaf5] p-5 sm:p-6">
          <h1 className="text-2xl font-semibold text-[#4a2f20]">Admin Messages</h1>
          <p className="mt-2 text-sm text-red-700">Tài khoản hiện tại không có quyền xem lời nhắn.</p>
        </div>
      </main>
    );
  }

  let items: AdminMessage[] = [];
  let loadError = "";

  try {
    items = await listMessages();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Không đọc được danh sách lời nhắn.";
  }

  return (
    <main className="min-h-screen bg-[#f6ede3] px-4 py-6 sm:px-6">
      <div className="mx-auto w-full max-w-7xl space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dcc3a8] bg-[#fffaf5] p-4 sm:p-5">
          <div>
            <h1 className="text-2xl font-semibold text-[#4a2f20]">Hòm thư liên hệ Hồn Thơ</h1>
            <p className="mt-1 text-sm text-[#6a4b38]">Theo dõi lời nhắn, cập nhật trạng thái và phản hồi email.</p>
          </div>
          <form action="/api/admin/auth/logout" method="post">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full border border-[#b88763] px-4 py-2 text-sm font-semibold text-[#7a4f32] transition hover:bg-[#f3e4d4]"
            >
              Đăng xuất
            </button>
          </form>
        </header>

        {loadError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{loadError}</div>
        ) : (
          <AdminMessagesClient initialItems={items} sessionEmail={session.email} permissions={session.permissions} />
        )}
      </div>
    </main>
  );
}
