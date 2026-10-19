import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, MapPin, Navigation } from "lucide-react";
import { branches, club } from "@/content/site";
import { PageHero, meta } from "@/components/site/Layout";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: meta(
      "Branches & Timings | Muslim Taekwondo Club ISB",
      "Taekwondo classes at Taramri Chowk / Alipur, Ghauri Town and Gulberg Greens, Islamabad. Evening classes 5:00–9:30 PM.",
    ),
  }),
  component: Branches,
});

function Branches() {
  return (
    <>
      <PageHero
        eyebrow="Branches"
        title="Train near home"
        intro="Evening classes from 5:00 PM to 9:30 PM, with morning classes on request."
      />
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <a
          href={club.facebook}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 font-bold text-secondary hover:text-primary"
        >
          <Facebook size={18} /> Follow us on Facebook
        </a>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2">
        {branches.map((b) => (
          <article key={b.id} className="flex flex-col border bg-card p-6">
            <p className="eyebrow">{b.area}</p>
            <h2 className="mt-2 text-3xl">{b.name}</h2>
            {b.status && (
              <span className="mt-2 w-fit bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                {b.status}
              </span>
            )}
            <p className="mt-4 flex gap-2">
              <MapPin className="shrink-0 text-primary" size={20} />
              {b.address}
            </p>
            <p className="mt-2 flex gap-2">
              <Clock className="shrink-0 text-primary" size={20} />
              {b.timings}
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 bg-secondary px-4 py-3 text-sm font-bold uppercase text-secondary-foreground"
            >
              <Navigation size={16} /> Open in Maps
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
