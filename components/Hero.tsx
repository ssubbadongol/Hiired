import SwipeStack from "./SwipeStack";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left — the pitch */}
        <div className="max-w-xl">
          <p className="flex items-center gap-2 font-mono text-2xs uppercase tracking-label text-mid">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            Pre-launch · UK graduate hiring
          </p>

          <h1 className="mt-5 font-display text-hero font-extrabold text-ink">
            Swipe right.
            <br />
            You&rsquo;ve actually
            <br />
            applied.
          </h1>

          <p className="mt-6 text-lg text-mid sm:text-xl">
            Hiired matches UK graduates to roles from employers who post directly
            here. Swipe right and your application lands in their dashboard — a real
            apply, not a bot filling forms on someone else&rsquo;s site.
          </p>

          <div className="mt-8 max-w-lg">
            <WaitlistForm variant="hero" />
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Stat value="Real applies" label="employers are on Hiired" />
            <Stat value="Reasoning practice" label="ready before the assessment" />
            <Stat value="One profile" label="every status tracked" />
          </dl>
        </div>

        {/* Right — the signature swipe stack */}
        <div className="relative">
          <p className="mb-4 text-center font-mono text-2xs uppercase tracking-label text-mid lg:text-left">
            Try it — drag a card, or use the buttons
          </p>
          <SwipeStack />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="max-w-[10rem]">
      <dt className="font-mono text-sm font-medium text-ink">{value}</dt>
      <dd className="mt-0.5 text-sm text-mid">{label}</dd>
    </div>
  );
}
