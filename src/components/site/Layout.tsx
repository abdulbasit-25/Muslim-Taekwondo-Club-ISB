import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, Phone, Mail, Facebook } from "lucide-react";
import logo from "@/assets/logo.jpg";
import { club, waLink } from "@/content/site";
import { ChatWidget } from "@/components/site/ChatWidget";

const nav = [
  { to: "/programs", label: "Programs" },
  { to: "/coaches", label: "Coaches" },
  { to: "/branches", label: "Branches" },
  { to: "/belt-path", label: "Belt Path" },
  { to: "/online", label: "Online Classes" },
  { to: "/parents", label: "Parents" },
] as const;

export function Logo({ compactOnMobile = false }: { compactOnMobile?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <img
        src={logo}
        alt="Muslim Taekwondo Club ISB logo"
        width={48}
        height={48}
        className="h-11 w-11 shrink-0 object-contain"
      />
      <span className="leading-tight">
        {compactOnMobile && (
          <span className="block font-display text-lg uppercase tracking-wide sm:hidden">
            {club.short}
          </span>
        )}
        <span
          className={`${compactOnMobile ? "hidden sm:block" : "block"} font-display text-sm uppercase tracking-wide`}
        >
          {club.name}
        </span>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Islamabad · Since {club.since}
        </span>
      </span>
    </span>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" aria-label="Home">
            <Logo compactOnMobile />
          </Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-semibold hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-primary px-4 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
            >
              Book Free Trial
            </Link>
          </nav>
          <button
            className="p-2 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="border-t bg-background px-4 py-4 lg:hidden" aria-label="Mobile">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block py-3 font-semibold"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm opacity-70">
              {club.name}. Taekwondo, kickboxing, self-defense, MMA and boxing in Islamabad.
            </p>
          </div>
          <div className="space-y-3 text-sm">
            <a
              href={`tel:${club.phoneIntl}`}
              className="flex items-center gap-2 hover:text-primary"
            >
              <Phone size={16} /> {club.phoneDisplay}
            </a>
            <a href={`mailto:${club.email}`} className="flex items-center gap-2 hover:text-primary">
              <Mail size={16} /> {club.email}
            </a>
            <a
              href={club.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              <Facebook size={16} /> Follow us on Facebook
            </a>
            <p className="opacity-70">{club.hours}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="opacity-80 hover:text-primary">
                {n.label}
              </Link>
            ))}
            <Link to="/book" className="opacity-80 hover:text-primary">
              Book a class
            </Link>
          </div>
        </div>
        <div className="border-t border-ink-foreground/10 py-4 text-center text-xs opacity-60">
          © {new Date().getFullYear()} {club.name}
        </div>
      </footer>

      {/* Mobile sticky actions */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 md:hidden">
        <a
          href={waLink("Assalam o Alaikum, I'd like to know about classes at MTC ISB.")}
          className="flex items-center justify-center gap-2 bg-whatsapp py-4 font-bold text-primary-foreground"
        >
          <MessageCircle size={18} /> WhatsApp
        </a>
        <Link
          to="/book"
          className="flex items-center justify-center bg-primary py-4 font-bold uppercase text-primary-foreground"
        >
          Free Trial
        </Link>
      </div>
      <ChatWidget />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="trigram mb-5">
          <span />
          <span />
          <span />
        </div>
        <p className="font-bold uppercase tracking-[0.2em] text-sm opacity-80">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl text-5xl md:text-7xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg opacity-85">{intro}</p>}
      </div>
    </section>
  );
}
