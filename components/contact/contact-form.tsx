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
  return { name: "", email: "", company: "", message: "" };
}

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(createInitialFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [focused, setFocused] = useState<keyof ContactFields | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );
  const [formError, setFormError] = useState<string | null>(null);

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
    setFormError(null);

    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
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
        setStatus("success");
        setFields(createInitialFields());
        return;
      }

      if (body && !body.ok) {
        if (body.fieldErrors) {
          setErrors(body.fieldErrors);
        }
        setFormError(body.error);
      } else {
        setFormError("Something went wrong. Please try again.");
      }
      setStatus("idle");
    } catch {
      setStatus("idle");
      setFormError(
        "We couldn't reach the server. Check your connection and try again.",
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-success/40 bg-success/10 p-10 text-center">
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
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jordan Rivera"
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
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Company name (optional)"
          value={fields.company}
          onChange={(e) => update("company", e.target.value)}
          {...focusProps("company")}
          className={fieldClass("company")}
        />
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

      {formError && (
        <p
          role="alert"
          className="rounded-lg border border-expense/40 bg-expense/10 px-3 py-2 text-sm text-expense"
        >
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} aria-busy={isSubmitting}>
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
