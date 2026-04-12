import { NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbysc5ICahR4FZ52E1SY4CRWGjLbS0on_1MQ8QUqKkFgfl4bVLlStZsF3WrFVO3Wk79n/exec";

type ContactPayload = {
  full_name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  contact_type?: string;
  page_url?: string;
  website?: string;
};

const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalize = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const normalizeEmail = (value: unknown) =>
  typeof value === "string"
    ? value
        .normalize("NFKC")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\s+/g, "")
        .trim()
        .toLowerCase()
    : "";

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch (error) {
    console.error("[api/contact] Invalid JSON body:", error);
    return NextResponse.json(
      { ok: false, message: "Dữ liệu gửi lên chưa hợp lệ." },
      { status: 400 },
    );
  }

  const full_name = normalize(payload.full_name);
  const phone = normalize(payload.phone);
  const email = normalizeEmail(payload.email);
  const subject = normalize(payload.subject);
  const message = normalize(payload.message);
  const contact_type = normalize(payload.contact_type);
  const page_url = normalize(payload.page_url);
  const website = normalize(payload.website);

  if (!full_name) {
    return NextResponse.json({ ok: false, message: "Vui lòng nhập họ và tên." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ ok: false, message: "Vui lòng nhập nội dung." }, { status: 400 });
  }

  if (email && !validateEmail(email)) {
    return NextResponse.json({ ok: false, message: "Email chưa đúng định dạng." }, { status: 400 });
  }

  if (website) {
    return NextResponse.json(
      { ok: false, message: "Không thể gửi thông tin. Vui lòng thử lại." },
      { status: 400 },
    );
  }

  const formBody = new URLSearchParams();
  formBody.set("full_name", full_name);
  formBody.set("phone", phone);
  formBody.set("email", email);
  formBody.set("subject", subject);
  formBody.set("message", message);
  formBody.set("contact_type", contact_type);
  formBody.set("page_url", page_url);
  formBody.set("website", website);

  try {
    const appsScriptResponse = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody.toString(),
      cache: "no-store",
    });

    const responseText = await appsScriptResponse.text();

    let data: { ok?: boolean; message?: string } | null = null;
    try {
      data = JSON.parse(responseText) as { ok?: boolean; message?: string };
    } catch (error) {
      console.error("[api/contact] Apps Script invalid JSON response:", {
        error,
        responseText,
      });
      return NextResponse.json(
        { ok: false, message: "Apps Script không trả về phản hồi hợp lệ" },
        { status: 502 },
      );
    }

    if (data?.ok === true) {
      return NextResponse.json({
        ok: true,
        message: data.message || "Gửi thành công",
      });
    }

    console.error("[api/contact] Apps Script returned failure:", {
      status: appsScriptResponse.status,
      responseText,
    });

    return NextResponse.json(
      { ok: false, message: data?.message || "Gửi thất bại" },
      { status: 400 },
    );
  } catch (error) {
    console.error("[api/contact] Unable to reach Apps Script:", error);
    return NextResponse.json(
      { ok: false, message: "Không thể kết nối tới dịch vụ tiếp nhận" },
      { status: 502 },
    );
  }
}
