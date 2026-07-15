import WaitlistForm from "./WaitlistForm";

const CITIES = ["Leeds", "Manchester", "Birmingham"];

export default function Waitlist() {
  return (
    <section id="waitlist" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-2 font-mono text-2xs uppercase tracking-label text-mid">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          04 / Join the waitlist
        </p>
        <h2 className="mt-4 font-display text-h2 font-semibold text-ink">
          Get on the list before your final year does.
        </h2>
        <p className="mt-4 text-lg text-mid">
          We&rsquo;ll email you the moment Hiired opens in your city. Graduates and
          employers, same list.
        </p>
      </div>

      <div className="mx-auto mt-9 max-w-xl">
        <WaitlistForm variant="full" />
      </div>

      {/* Honest pre-launch framing — no fake logos, no fake numbers. */}
      <div className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 border-t border-ink/10 pt-6 text-center">
        <p className="font-mono text-2xs uppercase tracking-label text-mid">
          Launching first in
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {CITIES.map((city) => (
            <li
              key={city}
              className="flex items-center gap-1.5 rounded-full border border-ink/12 bg-white px-3 py-1.5 font-mono text-2xs text-ink"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
              {city}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
