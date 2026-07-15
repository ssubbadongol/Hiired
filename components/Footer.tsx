import Logo from "./Logo";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#practice", label: "Practice" },
  { href: "#employers", label: "For employers" },
  { href: "#waitlist", label: "Waitlist" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Logo className="h-6 w-6" />
              <span className="font-display text-xl font-bold tracking-tight text-ink">
                Hiired
              </span>
            </div>
            <p className="mt-3 text-sm text-mid">
              Real graduate applications, reasoning practice, and one place to track
              it all. Built for UK graduates and the small employers hiring them.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md text-sm text-mid transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xs uppercase tracking-label text-mid">
            Made for UK graduates · Pre-launch 2026
          </p>
          <p className="font-mono text-2xs text-mid/70">
            © {new Date().getFullYear()} Hiired
          </p>
        </div>
      </div>
    </footer>
  );
}
