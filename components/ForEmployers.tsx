import SectionHeader from "./SectionHeader";

const POINTS = [
  "Post a role directly — no agency, no reposting to five job boards.",
  "Matched graduates apply by swipe, and land straight in your dashboard.",
  "They arrive having practised the numerical, verbal and logical reasoning tests employers use.",
];

export default function ForEmployers() {
  return (
    <section id="employers" className="bg-ink text-paper">
      <div className="grid-invert">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
            <div>
              <SectionHeader
                index="03"
                label="For employers"
                title="Post once. Meet graduates who’ve done the homework."
                intro="Hiired is built for small teams doing their own hiring. You’re on the platform, so every swipe-right is a real application in your inbox — not a lead to chase."
                invert
              />
              <a
                href="#waitlist"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-signal px-6 py-3 font-mono text-2xs uppercase tracking-label text-paper transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
              >
                Register interest as an employer
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <ul className="space-y-px overflow-hidden rounded-2xl border border-paper/15 bg-paper/15">
              {POINTS.map((point, i) => (
                <li key={i} className="flex gap-4 bg-ink p-5">
                  <span className="font-mono text-sm font-semibold tabular-nums text-signal">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="text-base text-paper/85">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
