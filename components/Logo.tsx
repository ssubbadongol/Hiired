// A marking mark: a squared answer box with a signal-indigo tick.
// Ties the wordmark to the exam-sheet world without a literal graduation cap.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Hiired"
      fill="none"
    >
      <rect
        x="1.5"
        y="1.5"
        width="21"
        height="21"
        rx="5"
        className="fill-paper stroke-ink"
        strokeWidth="1.5"
      />
      <path
        d="M6.5 12.5l3.4 3.4L18 7.8"
        className="stroke-signal"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
