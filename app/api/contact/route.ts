import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import {
  toContactPayload,
  validateContact,
  type ContactResponse,
} from "@/lib/contact";
import { siteConfig } from "@/lib/site-config";

// Sends email at request time via SMTP; must run on the Node.js runtime.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  to: string;
  from: string;
}

/** Read SMTP settings from the environment; null when not fully configured. */
function readSmtpConfig(): SmtpConfig | null {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;

  if (!user || !password) {
    return null;
  }

  return {
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? "465"),
    user,
    password,
    to: process.env.CONTACT_TO ?? siteConfig.email,
    from: process.env.CONTACT_FROM ?? user,
  };
}

/** Escape user-supplied text before embedding it in the HTML email body. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * POST /api/contact
 *
 * Validates a contact submission and emails it to the firm's inbox. Every
 * step (JSON parsing, validation, SMTP transport) is wrapped in try/catch and
 * always returns a typed `ContactResponse` envelope (per .cursorrules).
 */
export async function POST(
  request: Request,
): Promise<NextResponse<ContactResponse>> {
  let payload;
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

  const smtp = readSmtpConfig();
  if (!smtp) {
    console.warn(
      "[POST /api/contact] SMTP is not configured (set SMTP_USER / SMTP_PASSWORD).",
    );
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
    const transporter = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.password },
    });

    const company = payload.company.trim();
    const subject = `New inquiry from ${payload.name.trim()}${
      company ? ` (${company})` : ""
    }`;

    const lines = [
      `Name: ${payload.name.trim()}`,
      `Email: ${payload.email.trim()}`,
      company ? `Company: ${company}` : "Company: —",
      "",
      payload.message.trim(),
    ];

    await transporter.sendMail({
      from: `"${siteConfig.name} Website" <${smtp.from}>`,
      to: smtp.to,
      replyTo: `"${payload.name.trim()}" <${payload.email.trim()}>`,
      subject,
      text: lines.join("\n"),
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 12px">New website inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.name.trim())}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email.trim())}</p>
          <p><strong>Company:</strong> ${company ? escapeHtml(company) : "—"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(payload.message.trim())}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[POST /api/contact] Failed to send email:", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  }
}
