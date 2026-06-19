import { NextResponse } from "next/server";

import {
  toContactPayload,
  validateContact,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";

// Forwards contact submissions to Formspree at request time; must not be
// statically prerendered.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function splitName(fullName: string): { name: string; surname: string } {
  const trimmed = fullName.trim();
  const spaceIndex = trimmed.indexOf(" ");

  if (spaceIndex === -1) {
    return { name: trimmed, surname: "" };
  }

  return {
    name: trimmed.slice(0, spaceIndex),
    surname: trimmed.slice(spaceIndex + 1).trim(),
  };
}

function toFormspreePayload(payload: ContactPayload): Record<string, string> {
  const { name, surname } = splitName(payload.name);
  const email = payload.email.trim();

  return {
    Name: name,
    Surname: surname,
    Email: email,
    Phone: payload.phone.trim(),
    Message: payload.message.trim(),
    _replyto: email,
  };
}

/**
 * POST /api/send
 *
 * Validates a contact submission and forwards it to Formspree. Every step
 * (JSON parsing, validation, transport) is wrapped in try/catch and always
 * returns a typed `ContactResponse` envelope.
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

  const formspreeUrl = process.env.FORMSPREE_URL;
  if (!formspreeUrl) {
    console.warn("[POST /api/send] FORMSPREE_URL is not configured.");
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
    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toFormspreePayload(payload)),
    });

    if (response.ok) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    let formspreeError: unknown = null;
    try {
      formspreeError = await response.json();
    } catch {
      formspreeError = null;
    }

    console.error(
      "[POST /api/send] Formspree error:",
      response.status,
      formspreeError,
    );
    return NextResponse.json(
      { ok: false, error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  } catch (error) {
    console.error("[POST /api/send] Unexpected error:", error);
    return NextResponse.json(
      { ok: false, error: "Couldn't send your message. Please try again." },
      { status: 502 },
    );
  }
}
