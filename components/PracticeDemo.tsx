"use client";

import { useEffect, useId, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

const SECONDS = 45;

const QUESTION = {
  prompt:
    "A graduate scheme received 4,500 applications. 12% were invited to an assessment day, and one third of those invited received an offer. How many offers were made?",
  options: ["540", "180", "162", "200"],
  answer: 1, // index of "180"
  explanation: "12% of 4,500 = 540 invited. A third of 540 = 180 offers.",
};

const LETTERS = ["A", "B", "C", "D"];
const pad = (n: number) => n.toString().padStart(2, "0");

type Status = "idle" | "answered" | "timeout";

export default function PracticeDemo() {
  const questionId = useId();
  const resultId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [timeLeft, setTimeLeft] = useState(SECONDS);
  // The clock only runs while the question is actually on screen — it
  // shouldn't drain before a visitor scrolls down to it.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || status !== "idle") return;
    if (timeLeft <= 0) {
      setStatus("timeout");
      return;
    }
    const id = window.setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => window.clearTimeout(id);
  }, [inView, status, timeLeft]);

  const revealed = status !== "idle";
  const isCorrect = status === "answered" && selected === QUESTION.answer;

  function choose(i: number) {
    if (revealed) return;
    setSelected(i);
    setStatus("answered");
  }

  function reset() {
    setSelected(null);
    setStatus("idle");
    setTimeLeft(SECONDS);
  }

  return (
    <section
      id="practice"
      ref={sectionRef}
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionHeader
        index="02"
        label="Practice"
        title="Warm up for the reasoning tests employers use."
        intro="Numerical, verbal and logical drills under a timer — so the real online assessment isn't the first one you sit. Here's one to try."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        {/* Quiet framing on the left */}
        <div className="rounded-2xl border border-ink/12 bg-white p-6 shadow-card">
          <p className="font-mono text-2xs uppercase tracking-label text-mid">
            Question type
          </p>
          <p className="mt-2 text-lg font-semibold text-ink">Numerical reasoning</p>
          <p className="mt-3 text-sm text-mid">
            Percentages, ratios and multi-step arithmetic against the clock. The full
            app cycles verbal and logical sets too, and explains every answer.
          </p>
          <dl className="mt-6 space-y-3 border-t border-ink/10 pt-5">
            <Row k="Format" v="4 options · single answer" />
            <Row k="Time" v={`${SECONDS}s per question`} />
            <Row k="Marking" v="Instant, with a worked reason" />
          </dl>
        </div>

        {/* The live question */}
        <div className="rounded-2xl border border-ink/12 bg-white p-6 shadow-card sm:p-7">
          {/* Timer */}
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-2xs uppercase tracking-label text-mid">
              Q1 · Numerical
            </span>
            <span
              className="font-mono text-sm font-medium tabular-nums text-ink"
              aria-label={`${timeLeft} seconds remaining`}
            >
              {revealed && status === "timeout" ? "00:00" : `00:${pad(timeLeft)}`}
            </span>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
            <div
              className="h-full rounded-full bg-signal"
              style={{ width: `${(Math.max(0, timeLeft) / SECONDS) * 100}%` }}
            />
          </div>

          <p id={questionId} className="mt-6 text-lg font-medium leading-snug text-ink">
            {QUESTION.prompt}
          </p>

          <div role="group" aria-labelledby={questionId} className="mt-5 space-y-2.5">
            {QUESTION.options.map((option, i) => {
              const correct = i === QUESTION.answer;
              const chosen = i === selected;
              const showCorrect = revealed && correct;
              const showWrong = revealed && chosen && !correct;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => choose(i)}
                  disabled={revealed}
                  aria-pressed={chosen}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                    showCorrect
                      ? "border-signal bg-signal/8"
                      : showWrong
                        ? "border-ink/30 bg-paper"
                        : revealed
                          ? "border-ink/10 opacity-55"
                          : "border-ink/15 hover:border-signal hover:bg-signal/5",
                  ].join(" ")}
                >
                  <Bubble
                    letter={LETTERS[i]}
                    state={showCorrect ? "correct" : showWrong ? "wrong" : "idle"}
                  />
                  <span
                    className={`font-mono text-base tabular-nums ${
                      showWrong ? "text-mid line-through" : "text-ink"
                    }`}
                  >
                    {option}
                  </span>
                  {showCorrect && (
                    <span className="ml-auto font-mono text-2xs uppercase tracking-label text-signal">
                      Correct
                    </span>
                  )}
                  {showWrong && (
                    <span className="ml-auto font-mono text-2xs uppercase tracking-label text-mid">
                      Your answer
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Result / explanation */}
          <div id={resultId} aria-live="polite" className="mt-5 min-h-[3.5rem]">
            {revealed && (
              <div className="rounded-xl border border-ink/12 bg-paper/70 p-4">
                <p className="font-mono text-2xs uppercase tracking-label text-ink">
                  {status === "timeout"
                    ? "Time's up — here's the worked answer"
                    : isCorrect
                      ? "Correct"
                      : "Not quite"}
                </p>
                <p className="mt-1.5 text-sm text-mid">{QUESTION.explanation}</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-white px-3 py-2 font-mono text-2xs uppercase tracking-label text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  Try it again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="font-mono text-2xs uppercase tracking-label text-mid">{k}</dt>
      <dd className="text-right font-mono text-sm text-ink">{v}</dd>
    </div>
  );
}

function Bubble({
  letter,
  state,
}: {
  letter: string;
  state: "idle" | "correct" | "wrong";
}) {
  if (state === "correct") {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-signal text-paper">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (state === "wrong") {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink/40 text-ink">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink/25 font-mono text-2xs font-semibold text-mid">
      {letter}
    </span>
  );
}
