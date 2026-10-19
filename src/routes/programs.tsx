import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { programs } from "@/content/site";
import { PageHero } from "@/components/site/Layout";
import { canonicalLink, meta } from "@/lib/seo";

export const Route = createFileRoute("/programs")({
  head: () => ({
    links: [canonicalLink("/programs")],
    meta: meta(
      "Programs | Muslim Taekwondo Club ISB",
      "Taekwondo, kickboxing, self-defense, MMA and professional boxing classes in Islamabad for kids, teens and adults.",
      "/programs",
    ),
  }),
  component: Programs,
});

function Programs() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Five disciplines. One standard."
        intro="Every program is taught by qualified coaches and grouped by age and level."
      />
      <div className="mx-auto max-w-7xl divide-y px-4">
        {programs.map((p, i) => (
          <section
            key={p.slug}
            id={p.slug}
            className="grid scroll-mt-20 gap-8 py-14 md:grid-cols-[1fr_2fr]"
          >
            <div>
              <span className="font-display text-6xl text-primary">0{i + 1}</span>
              <h2 className="mt-2 text-4xl">{p.name}</h2>
              <p className="mt-2 font-semibold text-muted-foreground">{p.ages}</p>
            </div>
            <div>
              <p className="text-lg">{p.blurb}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.learn.map((l) => (
                  <li key={l} className="flex gap-2">
                    <Check className="text-primary" size={20} />
                    {l}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <span className="bg-muted px-3 py-1 text-sm">{p.fee}</span>
                <Link
                  to="/book"
                  search={{ program: p.slug }}
                  className="bg-primary px-5 py-3 text-sm font-bold uppercase text-primary-foreground"
                >
                  Book a trial
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
