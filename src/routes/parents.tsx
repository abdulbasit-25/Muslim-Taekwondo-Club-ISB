import { createFileRoute } from "@tanstack/react-router";
import { faqs } from "@/content/site";
import { PageHero } from "@/components/site/Layout";
import { canonicalLink, meta } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/parents")({
  head: () => ({
    links: [canonicalLink("/parents")],
    meta: meta(
      "Parents' Guide & FAQ | Muslim Taekwondo Club ISB",
      "Safety, supervision, uniforms, fees and the questions parents ask about Taekwondo classes for children in Islamabad.",
      "/parents",
    ),
  }),
  component: Parents,
});

const pillars = [
  ["Supervised", "Every class is led by a qualified coach. Children are never left unattended."],
  ["Controlled contact", "Sparring is age-appropriate and done with protective gear."],
  ["Respect first", "Etiquette, punctuality and good manners are part of the syllabus."],
  ["Privacy", "We never publish a child's name or photo without parent consent."],
];

function Parents() {
  return (
    <>
      <PageHero
        eyebrow="Parents"
        title="Your child is in safe hands"
        intro="What to expect, what to bring, and answers to the questions parents ask most."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-4">
        {pillars.map(([t, d]) => (
          <div key={t} className="border-t-4 border-primary pt-4">
            <h2 className="text-2xl">{t}</h2>
            <p className="mt-2 text-muted-foreground">{d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-4 pb-20">
        <h2 className="text-4xl">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`}>
              <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
