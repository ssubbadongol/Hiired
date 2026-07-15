import type { ReactNode } from "react";

// Exam-paper section header: a mono index + label ("SECTION 02 · HOW IT WORKS")
// over a display headline. Used to open each section with the same rhythm.
export default function SectionHeader({
  index,
  label,
  title,
  intro,
  invert = false,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  invert?: boolean;
}) {
  return (
    <header className="max-w-2xl">
      <p
        className={`flex items-center gap-2 font-mono text-2xs uppercase tracking-label ${
          invert ? "text-paper/60" : "text-mid"
        }`}
      >
        <span className={invert ? "text-paper" : "text-signal"}>{index}</span>
        <span aria-hidden="true" className={invert ? "text-paper/30" : "text-mid/40"}>
          /
        </span>
        <span>{label}</span>
      </p>
      <h2
        className={`mt-4 font-display text-h2 font-semibold ${
          invert ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-lg ${invert ? "text-paper/70" : "text-mid"}`}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}
