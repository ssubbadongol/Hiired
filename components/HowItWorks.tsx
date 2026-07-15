import SectionHeader from "./SectionHeader";

const STEPS = [
  {
    n: "01",
    title: "Tell us about you",
    body: "Your degree, university and the roles you're after. Onboarding turns that into matches — not a keyword search you have to babysit.",
  },
  {
    n: "02",
    title: "Swipe to apply",
    body: "Swipe right on a role and your application lands in that employer's Hiired dashboard. Because they post here, it's a real apply — no external site, no bot.",
  },
  {
    n: "03",
    title: "Practise the tests",
    body: "Numerical, verbal and logical reasoning drills so you walk into the online assessments employers use already warmed up.",
  },
  {
    n: "04",
    title: "Track everything",
    body: "Your CV lives in one profile, and every application you send on Hiired shows its status — applied, in review, offer — in one place.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <SectionHeader
        index="01"
        label="How it works"
        title="Four steps from sign-up to sent."
        intro="A genuine sequence — each step feeds the next."
      />

      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <li key={step.n} className="flex flex-col bg-paper p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-2xl font-semibold tabular-nums text-signal">
                {step.n}
              </span>
              <span
                aria-hidden="true"
                className="font-mono text-2xs uppercase tracking-label text-mid/60"
              >
                Step
              </span>
            </div>
            <h3 className="mt-6 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-mid">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
