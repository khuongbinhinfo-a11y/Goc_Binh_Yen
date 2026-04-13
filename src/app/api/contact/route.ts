import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, message: "Vui long su dung bieu mau lien he o trang chu." },
    { status: 410 },
  );
}
