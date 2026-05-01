import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest, hasPermission, type AdminPermission } from "@/lib/admin/auth";

export async function requireAdminApiPermission(request: NextRequest, permission: AdminPermission) {
  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!hasPermission(session, permission)) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 }),
    };
  }

  return {
    ok: true as const,
    session,
  };
}
