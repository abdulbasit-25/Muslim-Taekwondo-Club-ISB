import { createFileRoute } from "@tanstack/react-router";
import { coaches } from "@/content/site";
import { PageHero } from "@/components/site/Layout";
import { canonicalLink, meta } from "@/lib/seo";

export const Route = createFileRoute("/coaches")({
  head: () => ({
    links: [canonicalLink("/coaches")],
    meta: meta(
      "Coaches | Muslim Taekwondo Club ISB",
      "Meet head coach Shahab ud Din (4th Dan, Kukkiwon, WT international coach) and the Muslim Taekwondo Club ISB coaching team.",
      "/coaches",
    ),
  }),
  component: Coaches,
});

function Coaches() {
  return (
    <>
      <PageHero
        eyebrow="Coaches"
        title="Led by a 4th Dan black belt"
        intro="Qualified, experienced coaches who also train students in public and private schools across Islamabad."
      />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3">
        {coaches.map((c, i) => (
          <article
            key={c.name}
            className={
              i === 0
                ? "border-t-8 border-primary bg-card p-8 shadow-sm md:col-span-3 md:grid md:grid-cols-[240px_1fr] md:gap-10"
                : "border-t-8 border-secondary bg-card p-8 shadow-sm"
            }
          >
            <div className="mb-6 grid aspect-square place-items-center bg-muted text-center text-xs uppercase tracking-widest text-muted-foreground">
              Photo
              <br />
              coming soon
            </div>
            <div>
              <p className="eyebrow">{c.role}</p>
              <h2 className="mt-2 text-4xl">{c.name}</h2>
              <ul className="mt-5 space-y-2">
                {c.credentials.map((cr) => (
                  <li key={cr} className="border-l-2 border-primary pl-3">
                    {cr}
                  </li>
                ))}
              </ul>
              {c.note && <p className="mt-4 text-sm text-muted-foreground">{c.note}</p>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
