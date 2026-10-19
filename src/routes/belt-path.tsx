import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { belts } from "@/content/site";
import { PageHero, meta } from "@/components/site/Layout";

export const Route = createFileRoute("/belt-path")({
  head: () => ({
    meta: meta(
      "Belt Path | Muslim Taekwondo Club ISB Taekwondo Curriculum",
      "From white belt to black belt: see what each Taekwondo belt requires at Muslim Taekwondo Club ISB in Islamabad.",
    ),
  }),
  component: BeltPath,
});

function BeltPath() {
  const [active, setActive] = useState(0);
  const b = belts[active]!;
  return (
    <>
      <PageHero
        eyebrow="Belt Path"
        title="White to black, step by step"
        intro="Tap a belt to see what students learn and which form they grade with. Syllabus details to be confirmed by the coach."
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col gap-2 md:flex-row" role="tablist">
          {belts.map((x, i) => (
            <button
              key={x.name}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex flex-1 items-center gap-3 border-2 p-4 text-left transition-transform ${i === active ? "-translate-y-1 border-ink" : "border-border"}`}
            >
              <span
                className="h-4 w-10 shrink-0 border border-ink/20"
                style={{ background: x.color }}
              />
              <span className="font-display uppercase">{x.name}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-8 border bg-card p-8 md:grid-cols-2">
          <div>
            <p className="eyebrow">
              Step {active + 1} of {belts.length}
            </p>
            <h2 className="mt-2 text-5xl">{b.name} belt</h2>
            <div className="mt-6 h-3 w-full bg-muted">
              <div
                className="h-3 bg-primary transition-all"
                style={{ width: `${((active + 1) / belts.length) * 100}%` }}
              />
            </div>
          </div>
          <dl className="space-y-5">
            <div>
              <dt className="eyebrow">Focus</dt>
              <dd className="mt-1 text-lg">{b.focus}</dd>
            </div>
            <div>
              <dt className="eyebrow">Form (poomsae)</dt>
              <dd className="mt-1 text-lg">{b.form}</dd>
            </div>
            <Link
              to="/book"
              className="inline-block bg-primary px-5 py-3 text-sm font-bold uppercase text-primary-foreground"
            >
              Start your path
            </Link>
          </dl>
        </div>
      </section>
    </>
  );
}
