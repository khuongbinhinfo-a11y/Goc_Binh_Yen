"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin/messages";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, nextPath }),
      });

      const payload: { ok?: boolean; error?: string; nextPath?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        setError(payload.error ?? "Đăng nhập thất bại.");
        return;
      }

      router.replace(payload.nextPath || nextPath);
      router.refresh();
    } catch {
      setError("Không kết nối được hệ thống đăng nhập.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block space-y-1.5 text-sm text-[#5f4332]">
        <span>Email admin</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
          placeholder="admin@hontho.com"
          required
        />
      </label>

      <label className="block space-y-1.5 text-sm text-[#5f4332]">
        <span>Mật khẩu</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
          placeholder="********"
          required
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#8b5e3c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
