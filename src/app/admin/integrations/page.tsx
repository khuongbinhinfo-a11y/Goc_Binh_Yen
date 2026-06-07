import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminIntegrationsClient from "@/components/admin/AdminIntegrationsClient";
import { getAdminCookieName, getVerifiedAdminSession } from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminIntegrationsPage() {
  const cookieStore = await cookies();
  const session = await getVerifiedAdminSession(cookieStore.get(getAdminCookieName())?.value);

  if (!session) {
    redirect("/admin/login?next=/admin/integrations");
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[30px] border border-[#dcc3a8] bg-[#fffaf5] p-6">
          <h1 className="text-2xl font-semibold text-[#4a2f20]">Tích hợp</h1>
          <p className="mt-3 text-sm leading-6 text-[#6a4b38]">
            Cấu hình Chatbot tư vấn và Telegram thông báo cho hệ thống Hồn Thơ.
          </p>
        </section>

        <AdminIntegrationsClient />
      </div>
    </main>
  );
}
