/**
 * Shared contact-form contract used by both the client form and the server
 * API route, so validation stays identical on both sides.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactPayload, string>>;

/** Typed response envelope returned by `POST /api/send`. */
export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate a contact submission; returns per-field error messages. */
export function validateContact(input: ContactPayload): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (input.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  // Phone is optional, but if provided it must look like a phone number.
  const phone = input.phone.trim();
  if (phone.length > 0 && !/^[+\d][\d\s().-]{5,}$/.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (input.message.trim().length < 10) {
    errors.message = "Please share a little more detail (10+ characters).";
  }

  return errors;
}

/** Coerce unknown JSON (e.g. a parsed request body) into a ContactPayload. */
export function toContactPayload(value: unknown): ContactPayload {
  const record =
    typeof value === "object" && value !== null
      ? (value as Record<string, unknown>)
      : {};

  const asString = (v: unknown): string => (typeof v === "string" ? v : "");

  return {
    name: asString(record.name),
    email: asString(record.email),
    phone: asString(record.phone),
    message: asString(record.message),
  };
}
