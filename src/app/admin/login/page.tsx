import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getAdminCookieName, getVerifiedAdminSession } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const session = await getVerifiedAdminSession(cookieStore.get(getAdminCookieName())?.value);

  if (session) {
    redirect("/admin/messages");
  }

  return (
    <main className="min-h-screen bg-[#f6ede3] px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-[#dcc3a8] bg-[#fffaf5] p-5 sm:p-6">
        <h1 className="text-2xl font-semibold text-[#4a2f20]">Đăng nhập Admin Hồn Thơ</h1>
        <p className="mt-1 text-sm text-[#6a4b38]">Dành cho quản trị lời nhắn và phản hồi email nội bộ.</p>
        <div className="mt-5">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
