import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken, getAdminCookieName, getAdminCookieOptions } from "@/lib/admin/auth";
import { verifyPasswordHash } from "@/lib/admin/password";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: { email?: string; password?: string; nextPath?: string };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Payload đăng nhập không hợp lệ." }, { status: 400 });
  }

  const email = `${body.email || ""}`.trim().toLowerCase();
  const password = `${body.password || ""}`;
  const configuredEmail = `${process.env.ADMIN_EMAIL || ""}`.trim().toLowerCase();
  const configuredHash = `${process.env.ADMIN_PASSWORD_HASH || ""}`.trim();

  if (!configuredEmail || !configuredHash) {
    return NextResponse.json(
      {
        ok: false,
        error: "Thiếu ADMIN_EMAIL hoặc ADMIN_PASSWORD_HASH trong cấu hình môi trường.",
      },
      { status: 500 },
    );
  }

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Vui lòng nhập email và mật khẩu." }, { status: 400 });
  }

  if (email !== configuredEmail) {
    return NextResponse.json({ ok: false, error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
  }

  let validPassword = false;
  try {
    validPassword = await verifyPasswordHash(password, configuredHash);
  } catch (error) {
    const message = error instanceof Error ? error.message : "ADMIN_PASSWORD_HASH không hợp lệ.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  if (!validPassword) {
    return NextResponse.json({ ok: false, error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
  }

  const token = await createAdminSessionToken({ email: configuredEmail });
  const response = NextResponse.json({ ok: true, nextPath: body.nextPath || "/admin/messages" });
  response.cookies.set(getAdminCookieName(), token, getAdminCookieOptions());
  return response;
}
