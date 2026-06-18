import { NextResponse } from "next/server";
import { Resend } from "resend";

import {
  toContactPayload,
  validateContact,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";

// Sends email at request time via Resend; must run on the Node.js runtime and
// never be statically prerendered.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FROM = "Finkont Digital <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO ?? "fin.kont2023@gmail.com";

/** Escape user-supplied text before embedding it in the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(payload: ContactPayload): string {
  const name = escapeHtml(payload.name.trim());
  const email = escapeHtml(payload.email.trim());
  const phone = payload.phone.trim() ? escapeHtml(payload.phone.trim()) : "—";
  const message = escapeHtml(payload.message.trim());

  return `
  <div style="margin:0;padding:24px;background:#121212;font-family:Inter,system-ui,Arial,sans-serif;color:#f4f3ef">
    <div style="max-width:560px;margin:0 auto;background:#1e1e1e;border:1px solid #2a2a2a;border-radius:16px;overflow:hidden">
      <div style="padding:20px 24px;background:linear-gradient(135deg,#ae7be5,#8b5cf6);color:#121212">
        <h1 style="margin:0;font-size:18px;font-weight:700">New Corporate Inquiry</h1>
      </div>
      <div style="padding:24px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr>
            <td style="padding:8px 0;color:#9ca3af;width:110px">Name</td>
            <td style="padding:8px 0;color:#f4f3ef;font-weight:600">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#9ca3af">Email</td>
            <td style="padding:8px 0"><a href="mailto:${email}" style="color:#ae7be5;text-decoration:none">${email}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#9ca3af">Phone</td>
            <td style="padding:8px 0;color:#f4f3ef">${phone}</td>
          </tr>
        </table>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #2a2a2a">
          <p style="margin:0 0 8px;color:#9ca3af;font-size:14px">Message</p>
          <p style="margin:0;color:#f4f3ef;font-size:15px;line-height:1.6;white-space:pre-wrap">${message}</p>
        </div>
      </div>
    </div>
  </div>`;
}

function buildText(payload: ContactPayload): string {
  return [
    `Name: ${payload.name.trim()}`,
    `Email: ${payload.email.trim()}`,
    `Phone: ${payload.phone.trim() || "—"}`,
    "",
    payload.message.trim(),
  ].join("\n");
}

/**
 * POST /api/send
 *
 * Validates a contact submission and emails it to the firm via Resend. Every
 * step (JSON parsing, validation, transport) is wrapped in try/catch and always
 * returns a typed `ContactResponse` envelope (per .cursorrules). Resend is
 * instantiated lazily inside the handler so the secret is never read during the
 * build / static-prerender phase.
 */
export async function POST(
  request: Request,
): Promise<NextResponse<ContactResponse>> {
  let payload: ContactPayload;
  try {
    payload = toContactPayload(await request.json());
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request format." },
      { status: 400 },
    );
  }

  const fieldErrors = validateContact(payload);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[POST /api/send] RESEND_API_KEY is not configured.");
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact service isn't configured yet. Please email us directly.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: `${payload.name.trim()} <${payload.email.trim()}>`,
      subject: `New Corporate Inquiry: ${payload.name.trim()}`,
      html: buildHtml(payload),
      text: buildText(payload),
    });

    if (error) {
      console.error("[POST /api/send] Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Couldn't send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[POST /api/send] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  }
}
