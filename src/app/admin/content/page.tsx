import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminCookieName, getVerifiedAdminSession } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const cookieStore = await cookies();
  const session = await getVerifiedAdminSession(cookieStore.get(getAdminCookieName())?.value);

  if (!session) {
    redirect("/admin/login?next=/admin/content");
  }

  if (!session.permissions.includes("content:read")) {
    return (
      <main className="min-h-screen px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[30px] border border-[#dcc3a8] bg-[#fffaf5] p-6 text-[#4a2f20]">
          <h1 className="text-2xl font-semibold">Nội dung</h1>
          <p className="mt-3 text-sm text-[#6a4b38]">Tài khoản hiện tại không có quyền truy cập trang nội dung.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[30px] border border-[#dcc3a8] bg-[#fffaf5] p-6">
          <h1 className="text-2xl font-semibold text-[#4a2f20]">Nội dung</h1>
          <p className="mt-3 text-sm leading-6 text-[#6a4b38]">
            Đây là tab Nội dung của admin. Trang hiện tại cung cấp điểm vào để quản lý nội dung Hồn Thơ.
          </p>
          <p className="mt-4 text-sm text-[#6a4b38]">
            Nếu cần mở rộng quản trị nội dung, trang này sẽ là nơi thêm các chức năng cập nhật bài viết, danh sách nội dung và trình soạn thảo.
          </p>
        </section>
      </div>
    </main>
  );
}
