import Logo from "./Logo";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#practice", label: "Practice" },
  { href: "#employers", label: "For employers" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-md"
          aria-label="Hiired — home"
        >
          <Logo className="h-6 w-6" />
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Hiired
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md text-sm text-mid transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#waitlist"
          className="rounded-lg bg-signal px-4 py-2 font-mono text-2xs uppercase tracking-label text-paper transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}
