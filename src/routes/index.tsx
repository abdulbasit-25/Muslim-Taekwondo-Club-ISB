import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, MapPin, ShieldCheck, Users } from "lucide-react";
import hero from "@/assets/hero.jpg";
import kids from "@/assets/kids.jpg";
import { achievements, branches, club, programs } from "@/content/site";
import { meta } from "@/components/site/Layout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: meta(
      "Muslim Taekwondo Club ISB | Taekwondo Classes in Islamabad — Book a Free Trial",
      "Taekwondo, kickboxing, self-defense, MMA and boxing in Taramri Chowk, Ghauri Town and Gulberg Greens. Led by 4th Dan coach Shahab ud Din.",
    ),
  }),
  component: Home,
});

function Home() {
  const years = new Date().getFullYear() - club.since;
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src={hero}
          alt="Taekwondo athlete performing a high side kick"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36">
          <div className="trigram mb-6">
            <span />
            <span />
            <span />
          </div>
          <p className="font-bold uppercase tracking-[0.25em] text-sm">
            Islamabad · Since {club.since}
          </p>
          <h1 className="mt-4 max-w-3xl text-6xl md:text-8xl">
            Discipline.
            <br />
            <span className="text-primary">Confidence.</span>
            <br />
            Black belt.
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-85">
            Taekwondo, kickboxing, self-defense, MMA and boxing for kids, teens and adults — taught
            by a Kukkiwon-certified 4th Dan coach.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-primary px-6 py-4 font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90"
            >
              Book a Free Trial <ArrowRight size={18} />
            </Link>
            <Link
              to="/online"
              className="inline-flex items-center gap-2 border-2 border-ink-foreground px-6 py-4 font-bold uppercase tracking-wide hover:bg-ink-foreground hover:text-ink"
            >
              Try an Online Class
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-secondary text-secondary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4">
          {[
            [Award, "4th Dan Black Belt", "Kukkiwon · WT coach"],
            [Users, `${years}+ years`, "Training Islamabad"],
            [MapPin, `${branches.length} locations`, "Across Islamabad"],
            [ShieldCheck, "4 Silver · 3 Bronze", "Islamabad team"],
          ].map(([Icon, t, s], i) => {
            const I = Icon as typeof Award;
            return (
              <div key={i} className="flex items-start gap-3">
                <I className="mt-1 shrink-0 text-primary" />
                <div>
                  <p className="font-display text-xl uppercase">{t as string}</p>
                  <p className="text-sm opacity-75">{s as string}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <p className="eyebrow">Programs</p>
        <h2 className="mt-2 text-5xl">Find your discipline</h2>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3 lg:grid-cols-5">
          {programs.map((p, i) => (
            <Link
              key={p.slug}
              to="/programs"
              hash={p.slug}
              className="group bg-card p-6 transition-colors hover:bg-secondary hover:text-secondary-foreground"
            >
              <span className="font-display text-4xl text-primary">0{i + 1}</span>
              <h3 className="mt-4 text-2xl">{p.name}</h3>
              <p className="mt-2 text-sm opacity-75">{p.ages}</p>
              <p className="mt-4 text-sm">{p.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2">
          <img
            src={kids}
            alt="Children bowing to their coach at the start of class"
            loading="lazy"
            width={1200}
            height={912}
            className="w-full"
          />
          <div>
            <p className="eyebrow">For parents</p>
            <h2 className="mt-2 text-5xl">Safe, supervised, built on respect</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Every class starts and ends with a bow. Children learn focus, manners and fitness
              under qualified coaches, with controlled, age-appropriate sparring. Home classes are
              available for male and female students.
            </p>
            <Link
              to="/parents"
              className="mt-6 inline-flex items-center gap-2 font-bold uppercase text-secondary hover:text-primary"
            >
              Parents' guide & FAQ <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Results</p>
            <h2 className="mt-2 text-5xl">Proven on the mat</h2>
            <ul className="mt-8 space-y-6">
              {achievements.map((a) => (
                <li key={a.title} className="border-l-4 border-primary pl-5">
                  <p className="font-display text-3xl uppercase">{a.title}</p>
                  <p className="text-muted-foreground">{a.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Branches</p>
            <h2 className="mt-2 text-5xl">Train near home</h2>
            <ul className="mt-8 divide-y border-y">
              {branches.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-bold">{b.name}</p>
                    <p className="text-sm text-muted-foreground">{b.area}</p>
                  </div>
                  <MapPin className="text-primary" />
                </li>
              ))}
            </ul>
            <Link
              to="/branches"
              className="mt-6 inline-flex items-center gap-2 font-bold uppercase text-secondary hover:text-primary"
            >
              Addresses & timings <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center">
          <h2 className="text-4xl md:text-5xl">First class is on us.</h2>
          <Link
            to="/book"
            className="bg-ink px-6 py-4 font-bold uppercase tracking-wide text-ink-foreground"
          >
            Book in 60 seconds
          </Link>
        </div>
      </section>
    </>
  );
}
