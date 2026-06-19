"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  validateContact,
  type ContactFieldErrors,
  type ContactPayload,
  type ContactResponse,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type ContactFields = ContactPayload;
type FieldErrors = ContactFieldErrors;

function createInitialFields(): ContactFields {
  return { name: "", email: "", phone: "", message: "" };
}

/** Format Kosovo phone numbers as "+383 XX XXX XXX" while typing or pasting. */
function formatKosovoPhone(input: string): string {
  let digits = input.replace(/\D/g, "");

  if (digits.length === 0) {
    return "";
  }

  if (!digits.startsWith("383")) {
    digits = `383${digits}`;
  }

  digits = digits.slice(0, 11);

  const rest = digits.slice(3);
  let formatted = "+383";

  if (rest.length > 0) {
    formatted += ` ${rest.slice(0, 2)}`;
  }
  if (rest.length > 2) {
    formatted += ` ${rest.slice(2, 5)}`;
  }
  if (rest.length > 5) {
    formatted += ` ${rest.slice(5, 8)}`;
  }

  return formatted;
}

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(createInitialFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focused, setFocused] = useState<keyof ContactFields | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const update = <K extends keyof ContactFields>(
    key: K,
    value: ContactFields[K],
  ): void => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const focusProps = (field: keyof ContactFields) => ({
    onFocus: () => setFocused(field),
    onBlur: () =>
      setFocused((current) => (current === field ? null : current)),
  });

  const fieldClass = (field: keyof ContactFields): string =>
    cn(
      focused === field && "fk-input-active border-primary",
      errors[field] && "border-expense",
    );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    setErrorMessage(null);

    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      let body: ContactResponse | null = null;
      try {
        body = (await response.json()) as ContactResponse;
      } catch {
        body = null;
      }

      if (response.ok && body?.ok) {
        setIsSuccess(true);
        setFields(createInitialFields());
        return;
      }

      if (body && !body.ok) {
        if (body.fieldErrors) {
          setErrors(body.fieldErrors);
        }
        setErrorMessage(body.error);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch {
      setErrorMessage(
        "We couldn't reach the server. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fk-glass flex flex-col items-center gap-4 rounded-2xl border-success/40 p-10 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-accent-neutral">
            Thanks—we&apos;ll be in touch.
          </h3>
          <p className="text-sm text-muted-foreground">
            A Finkont advisor will reach out within one business day.
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name and Surname</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Name and Surname"
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            {...focusProps("name")}
            className={fieldClass("name")}
          />
          {errors.name && <p className="text-xs text-expense">{errors.name}</p>}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jordan@company.com"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            {...focusProps("email")}
            className={fieldClass("email")}
          />
          {errors.email && (
            <p className="text-xs text-expense">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+383 XX XXX XXX"
          value={fields.phone}
          onChange={(e) => update("phone", formatKosovoPhone(e.target.value))}
          aria-invalid={Boolean(errors.phone)}
          {...focusProps("phone")}
          className={fieldClass("phone")}
        />
        {errors.phone && <p className="text-xs text-expense">{errors.phone}</p>}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your business and what you're looking for…"
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          {...focusProps("message")}
          className={fieldClass("message")}
        />
        {errors.message && (
          <p className="text-xs text-expense">{errors.message}</p>
        )}
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="rounded-lg border border-expense/40 bg-expense/10 px-3 py-2 text-sm text-expense"
        >
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
