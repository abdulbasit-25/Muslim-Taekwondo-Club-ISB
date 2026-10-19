import { createFileRoute } from "@tanstack/react-router";
import { MonitorPlay, Radio, Layers } from "lucide-react";
import { waLink } from "@/content/site";
import { PageHero } from "@/components/site/Layout";
import { canonicalLink, meta } from "@/lib/seo";

export const Route = createFileRoute("/online")({
  head: () => ({
    links: [canonicalLink("/online")],
    meta: meta(
      "Online Taekwondo Classes | Muslim Taekwondo Club ISB",
      "Live online Taekwondo and fitness sessions plus on-demand lessons organised by belt level from Muslim Taekwondo Club ISB in Islamabad.",
      "/online",
    ),
  }),
  component: Online,
});

const plans = [
  {
    name: "Monthly",
    price: "SAMPLE: PKR —",
    items: ["Live sessions each week", "Lesson library for your belt"],
  },
  {
    name: "Quarterly",
    price: "SAMPLE: PKR —",
    items: ["Everything in Monthly", "Coach feedback on grading prep"],
  },
  {
    name: "Hybrid",
    price: "SAMPLE: PKR —",
    items: ["In-branch classes", "Plus online library access"],
  },
];

function Online() {
  return (
    <>
      <PageHero
        eyebrow="Online classes"
        title="Train with Muslim Taekwondo Club ISB from anywhere"
        intro="Live sessions with our coaches plus lessons organised by belt — for days you can't come in, or if you live outside Islamabad."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-3">
        {[
          [Radio, "Live sessions", "Scheduled group classes on Zoom or Google Meet with a coach."],
          [
            MonitorPlay,
            "On-demand lessons",
            "Stretching, kicks, poomsae, sparring drills and self-defense.",
          ],
          [Layers, "Follows the belt path", "A structured course, not a random video dump."],
        ].map(([I, t, d]) => {
          const Icon = I as typeof Radio;
          return (
            <div key={t as string}>
              <Icon className="text-primary" size={32} />
              <h2 className="mt-4 text-3xl">{t as string}</h2>
              <p className="mt-2 text-muted-foreground">{d as string}</p>
            </div>
          );
        })}
      </section>
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <p className="eyebrow">Plans</p>
          <h2 className="mt-2 text-5xl">Choose how you train</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {plans.map((p, i) => (
              <div
                key={p.name}
                className={`bg-card p-8 ${i === 1 ? "border-t-8 border-primary" : "border-t-8 border-secondary"}`}
              >
                <h3 className="text-3xl">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.price}</p>
                <ul className="mt-6 space-y-2">
                  {p.items.map((x) => (
                    <li key={x}>— {x}</li>
                  ))}
                </ul>
                <a
                  href={waLink(
                    `Assalam o Alaikum MTC ISB, I'm interested in the ${p.name} online plan.`,
                  )}
                  className="mt-8 block bg-primary py-3 text-center font-bold uppercase text-primary-foreground"
                >
                  Enquire
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Before every home session: warm up for 10 minutes, clear the space, and train on a
            non-slip surface. Children should train with an adult nearby.
          </p>
        </div>
      </section>
    </>
  );
}
