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

const normalizeText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

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
  } catch {
    return NextResponse.json({ ok: false, message: "Du lieu gui len chua hop le." }, { status: 400 });
  }

  const full_name = normalizeText(payload.full_name);
  const phone = normalizeText(payload.phone);
  const emailToValidate = normalizeEmail(payload.email);
  const subject = normalizeText(payload.subject);
  const message = normalizeText(payload.message);
  const contact_type = normalizeText(payload.contact_type);
  const page_url = normalizeText(payload.page_url);
  const website = normalizeText(payload.website);

  if (!full_name) {
    return NextResponse.json({ ok: false, message: "Vui long nhap ho va ten." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ ok: false, message: "Vui long nhap noi dung." }, { status: 400 });
  }

  if (emailToValidate !== "" && !validateEmail(emailToValidate)) {
    return NextResponse.json({ ok: false, message: "Email chua dung dinh dang." }, { status: 400 });
  }

  if (website) {
    return NextResponse.json({ ok: false, message: "Khong the gui thong tin. Vui long thu lai." }, { status: 400 });
  }

  const formBody = new URLSearchParams();
  formBody.set("full_name", full_name);
  formBody.set("phone", phone);
  formBody.set("email", emailToValidate);
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
        status: appsScriptResponse.status,
        responseText,
      });
      return NextResponse.json(
        { ok: false, message: "Apps Script khong tra ve phan hoi hop le." },
        { status: 502 },
      );
    }

    if (data.ok === true) {
      return NextResponse.json({ ok: true, message: data.message || "Gui thanh cong" });
    }

    console.error("[api/contact] Apps Script returned failure:", {
      status: appsScriptResponse.status,
      responseText,
    });

    return NextResponse.json(
      { ok: false, message: data.message || "Gui that bai." },
      { status: appsScriptResponse.ok ? 400 : 502 },
    );
  } catch (error) {
    console.error("[api/contact] Unable to reach Apps Script:", error);
    return NextResponse.json(
      { ok: false, message: "Khong the ket noi toi dich vu tiep nhan." },
      { status: 502 },
    );
  }
}
