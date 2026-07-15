"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JOBS, type Job } from "@/lib/jobs";

const THRESHOLD = 90; // px of drag before a swipe counts
const FLING = 680; // px the released card travels off-screen
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

type Dir = -1 | 1; // -1 = pass (left), 1 = apply (right)

// Fixed offsets for the cards behind the top one, so the stack reads as depth.
const DEPTH = [
  { y: 0, scale: 1, rotate: 0 },
  { y: 12, scale: 0.965, rotate: -2.4 },
  { y: 24, scale: 0.93, rotate: 2.6 },
  { y: 34, scale: 0.9, rotate: -1.2 },
];

export default function SwipeStack() {
  const [deck, setDeck] = useState<Job[]>(JOBS);
  const [sent, setSent] = useState(0);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exit, setExit] = useState<0 | Dir>(0);

  const startX = useRef(0);
  const pointer = useRef<number | null>(null);
  // Guards against committing the same card twice (transitionend + fallback).
  const pending = useRef<0 | Dir>(0);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (reduced.current = mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  const top = deck[0];

  const commit = useCallback((dir: Dir) => {
    if (pending.current === 0) return;
    pending.current = 0;
    setDeck((d) => d.slice(1));
    if (dir === 1) setSent((s) => s + 1);
    setDx(0);
    setExit(0);
    setDragging(false);
    pointer.current = null;
  }, []);

  const decide = useCallback(
    (dir: Dir) => {
      if (!top || pending.current !== 0) return;
      pending.current = dir;
      setDragging(false);
      if (reduced.current) {
        commit(dir);
      } else {
        setExit(dir);
        // Safety net if the transitionend event is missed.
        window.setTimeout(() => commit(dir), 460);
      }
    },
    [top, commit],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (pending.current !== 0 || !top) return;
    pointer.current = e.pointerId;
    startX.current = e.clientX;
    setDragging(true);
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // Some environments reject capture for a non-primary/synthetic pointer.
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || e.pointerId !== pointer.current) return;
    setDx(e.clientX - startX.current);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerId !== pointer.current) return;
    pointer.current = null;
    setDragging(false);
    if (dx > THRESHOLD) decide(1);
    else if (dx < -THRESHOLD) decide(-1);
    else setDx(0); // spring back
  };

  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "transform") return;
    if (exit !== 0) commit(exit);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      decide(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      decide(-1);
    }
  };

  const reset = () => {
    pending.current = 0;
    setDeck(JOBS);
    setSent(0);
    setDx(0);
    setExit(0);
  };

  const applyProgress = exit === 1 ? 1 : clamp01(dx / THRESHOLD);
  const passProgress = exit === -1 ? 1 : clamp01(-dx / THRESHOLD);
  const empty = deck.length === 0;

  return (
    <div className="mx-auto w-full max-w-card">
      {/* Deck ------------------------------------------------------------- */}
      <div
        role="group"
        tabIndex={0}
        aria-roledescription="Job swipe deck"
        aria-label="Job matches. Press the right arrow key to apply, the left arrow key to pass. The buttons below do the same."
        onKeyDown={onKeyDown}
        className="relative h-[20.5rem] w-full rounded-[1.6rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      >
        {empty ? (
          <EmptyState onReset={reset} />
        ) : (
          deck.slice(0, DEPTH.length).map((job, i) => {
            const isTop = i === 0;
            const d = DEPTH[i];
            const tx = isTop ? (exit !== 0 ? exit * FLING : dx) : 0;
            const rotate = isTop
              ? exit !== 0
                ? exit * 14
                : Math.max(-14, Math.min(14, dx * 0.06))
              : d.rotate;
            const opacity = isTop && exit !== 0 ? 0 : 1;
            const transition =
              isTop && dragging
                ? "none"
                : "transform 0.4s cubic-bezier(0.22,0.61,0.36,1), opacity 0.4s ease";

            return (
              <article
                key={job.id}
                aria-hidden={!isTop}
                onPointerDown={isTop ? onPointerDown : undefined}
                onPointerMove={isTop ? onPointerMove : undefined}
                onPointerUp={isTop ? onPointerUp : undefined}
                onPointerCancel={isTop ? onPointerUp : undefined}
                onTransitionEnd={isTop ? onTransitionEnd : undefined}
                style={{
                  transform: `translate3d(${tx}px, ${d.y}px, 0) rotate(${rotate}deg) scale(${d.scale})`,
                  transition,
                  opacity,
                  zIndex: DEPTH.length - i,
                  touchAction: "pan-y",
                  cursor: isTop ? (dragging ? "grabbing" : "grab") : "default",
                }}
                className="absolute inset-0 select-none overflow-hidden rounded-[1.6rem] border border-ink/12 bg-white shadow-card"
              >
                {/* Swipe tints — the only place --apply / --pass appear. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-apply"
                  style={{ opacity: isTop ? applyProgress * 0.16 : 0 }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-pass"
                  style={{ opacity: isTop ? passProgress * 0.16 : 0 }}
                />

                {/* Rubber-stamp verdicts */}
                {isTop && (
                  <>
                    <Stamp label="APPLY" tone="apply" rotate={-11} className="left-5 top-5" opacity={applyProgress} />
                    <Stamp label="PASS" tone="pass" rotate={11} className="right-5 top-5" opacity={passProgress} />
                  </>
                )}

                <CardFace job={job} />
              </article>
            );
          })
        )}
      </div>

      {/* Counter ---------------------------------------------------------- */}
      <div className="mt-6 flex items-center justify-between">
        <p aria-live="polite" className="font-mono text-sm text-ink">
          <span className="tabular-nums">{sent}</span>{" "}
          <span className="text-mid">application{sent === 1 ? "" : "s"} sent</span>
        </p>
        <p aria-hidden="true" className="font-mono text-2xs uppercase tracking-label text-mid/70">
          ← pass · apply →
        </p>
      </div>

      {/* Buttons — the drag is never the only way in. --------------------- */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => decide(-1)}
          disabled={empty}
          aria-label={top ? `Pass on ${top.title} at ${top.employer}` : "Pass"}
          className="group flex items-center justify-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-3 font-mono text-2xs uppercase tracking-label text-ink transition-colors hover:border-pass hover:text-pass disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-ink/15 disabled:hover:text-ink"
        >
          <IconCross className="h-3.5 w-3.5" />
          Pass
        </button>
        <button
          type="button"
          onClick={() => decide(1)}
          disabled={empty}
          aria-label={top ? `Apply to ${top.title} at ${top.employer}` : "Apply"}
          className="flex items-center justify-center gap-2 rounded-xl bg-apply px-4 py-3 font-mono text-2xs uppercase tracking-label text-white transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
        >
          <IconCheck className="h-3.5 w-3.5" />
          Apply
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
 * Presentational pieces
 * ------------------------------------------------------------------------ */

function CardFace({ job }: { job: Job }) {
  return (
    <div className="relative z-10 flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-2xs uppercase tracking-label text-mid">
          Graduate role
        </span>
        <span className="font-mono text-sm font-medium text-ink tabular-nums">
          {job.salary}
        </span>
      </div>

      <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink">
        {job.title}
      </h3>
      <p className="mt-1.5 text-base text-mid">
        {job.employer} · {job.location}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-ink/12 bg-paper/70 px-2.5 py-1 font-mono text-2xs text-ink"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-ink/10 pt-4">
        <span className="font-mono text-2xs uppercase tracking-label text-signal">
          Matched
        </span>
        <span className="font-mono text-2xs text-ink/80">{job.matched}</span>
      </div>
    </div>
  );
}

function Stamp({
  label,
  tone,
  rotate,
  opacity,
  className,
}: {
  label: string;
  tone: "apply" | "pass";
  rotate: number;
  opacity: number;
  className: string;
}) {
  const color = tone === "apply" ? "text-apply" : "text-pass";
  const border = tone === "apply" ? "border-apply" : "border-pass";
  return (
    <span
      aria-hidden="true"
      style={{ opacity, transform: `rotate(${rotate}deg)` }}
      className={`pointer-events-none absolute z-20 rounded-lg border-[3px] px-3 py-1 font-mono text-lg font-bold tracking-wide ${color} ${border} ${className}`}
    >
      {label}
    </span>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-ink/20 bg-white/60 p-8 text-center">
      <span className="font-mono text-2xs uppercase tracking-label text-mid">
        Deck cleared
      </span>
      <p className="mt-3 text-xl font-semibold text-ink">
        That&rsquo;s the demo — just five roles.
      </p>
      <p className="mt-2 max-w-xs text-sm text-mid">
        On Hiired your feed is built from your degree, university and the roles you
        actually want — and it refills as employers post.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-4 py-2.5 font-mono text-2xs uppercase tracking-label text-ink transition-colors hover:border-signal hover:text-signal"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
          <path
            d="M4 5v5h5M20 19v-5h-5M19 9a7.5 7.5 0 0 0-13-3L4 8m1 7a7.5 7.5 0 0 0 13 3l2-2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Reset the deck
      </button>
    </div>
  );
}

function IconCheck({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12.5l4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCross({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
