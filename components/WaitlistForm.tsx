"use client";

import { useId, useState } from "react";

// Basic but honest email check — enough to catch typos client-side.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Variant = "hero" | "full";

export default function WaitlistForm({ variant = "full" }: { variant?: Variant }) {
  const emailId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("error");
      return;
    }

    // TODO(backend): POST { email: value } to the waitlist endpoint here.
    // e.g. await fetch("/api/waitlist", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: value }),
    // });
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-2xl border border-signal/30 bg-white p-5 shadow-card"
      >
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-signal text-paper"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <path
              d="M5 12.5l4 4L19 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="font-display text-h3 font-semibold text-ink">You&rsquo;re on the list.</p>
          <p className="mt-1 text-sm text-mid">
            We&rsquo;ll email <span className="font-mono text-ink">{email}</span> the moment Hiired opens.
          </p>
        </div>
      </div>
    );
  }

  const isError = status === "error";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label
        htmlFor={emailId}
        className="mb-2 block font-mono text-2xs uppercase tracking-label text-mid"
      >
        {variant === "hero" ? "Get early access" : "Your email"}
      </label>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          id={emailId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@university.ac.uk"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (isError) setStatus("idle");
          }}
          aria-invalid={isError}
          aria-describedby={isError ? errorId : undefined}
          className={`min-w-0 flex-1 rounded-xl border bg-white px-4 py-3 text-base text-ink placeholder:text-mid/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
            isError ? "border-ink ring-2 ring-ink/10" : "border-ink/15"
          }`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-signal px-6 py-3 font-mono text-2xs uppercase tracking-label text-paper transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
        >
          Join the waitlist
        </button>
      </div>

      {isError ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-sm font-medium text-ink"
        >
          <span aria-hidden="true" className="font-mono text-2xs uppercase tracking-label text-mid">
            Check
          </span>
          Enter a valid email address so we can reach you.
        </p>
      ) : (
        <p className="mt-2 text-sm text-mid">
          No spam. One email when we launch, then you decide.
        </p>
      )}
    </form>
  );
}
