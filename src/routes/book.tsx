import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MessageCircle } from "lucide-react";
import { branches, programs, waLink } from "@/content/site";
import { PageHero } from "@/components/site/Layout";
import { canonicalLink, meta } from "@/lib/seo";

const search = z.object({ program: z.string().optional() });

export const Route = createFileRoute("/book")({
  validateSearch: search,
  head: () => ({
    links: [canonicalLink("/book")],
    meta: meta(
      "Book a Free Trial | Muslim Taekwondo Club ISB",
      "Book a free Taekwondo or martial arts trial class with Muslim Taekwondo Club ISB and confirm on WhatsApp.",
      "/book",
    ),
  }),
  component: Book,
});

const types = [
  "Free trial class",
  "Admission inquiry",
  "Home / private class",
  "School or institution",
  "Belt test / tournament",
];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const field =
  "w-full border-2 border-input bg-card px-4 py-3 focus:border-secondary focus:outline-none";

function Book() {
  const { program } = Route.useSearch();
  const [step, setStep] = useState(0);
  const [f, setF] = useState({
    type: types[0],
    program: program ?? programs[0]!.slug,
    branch: branches[0]!.id,
    day: "",
    time: "Evening",
    name: "",
    age: "",
    guardian: "",
    phone: "",
  });
  const [err, setErr] = useState("");
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));
  const minor = Number(f.age) > 0 && Number(f.age) < 18;

  const next = () => {
    setErr("");
    if (step === 1 && !f.day) return setErr("Please choose a preferred day.");
    if (step === 2) {
      if (f.name.trim().length < 2) return setErr("Please enter the student's name.");
      if (!/^\d{1,2}$/.test(f.age)) return setErr("Please enter a valid age.");
      if (minor && f.guardian.trim().length < 2)
        return setErr("A parent or guardian name is required for under-18s.");
      if (!/^(\+92|0)3\d{9}$/.test(f.phone.replace(/[\s-]/g, "")))
        return setErr("Please enter a Pakistani mobile number, e.g. 0300 1234567.");
    }
    setStep(step + 1);
  };

  const prog = programs.find((p) => p.slug === f.program)?.name;
  const br = f.branch === "online" ? "Online" : branches.find((b) => b.id === f.branch)?.name;
  const message = `Assalam o Alaikum MTC ISB,\nI'd like to book: ${f.type}\nProgram: ${prog}\nBranch: ${br}\nPreferred: ${f.day}, ${f.time}\nStudent: ${f.name} (age ${f.age})${minor ? `\nGuardian: ${f.guardian}` : ""}\nPhone: ${f.phone}`;
  const steps = ["Service", "When & where", "Student", "Confirm"];

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Book in 60 seconds"
        intro="No account needed. We'll confirm your slot on WhatsApp."
      />
      <section className="mx-auto max-w-2xl px-4 py-14">
        <ol className="mb-10 grid grid-cols-4 gap-2" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s}>
              <div className={`h-1.5 ${i <= step ? "bg-primary" : "bg-muted"}`} />
              <p
                className={`mt-2 text-xs font-bold uppercase ${i === step ? "text-foreground" : "text-muted-foreground"}`}
              >
                {s}
              </p>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-3 font-bold">What would you like to book?</legend>
              <div className="grid gap-2">
                {types.map((t) => (
                  <label
                    key={t}
                    className={`cursor-pointer border-2 p-4 font-semibold ${f.type === t ? "border-secondary bg-accent" : "border-input"}`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      checked={f.type === t}
                      onChange={() => set("type", t)}
                    />
                    {t}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="block">
              <span className="mb-2 block font-bold">Program</span>
              <select
                className={field}
                value={f.program}
                onChange={(e) => set("program", e.target.value)}
              >
                {programs.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <label className="block">
              <span className="mb-2 block font-bold">Branch</span>
              <select
                className={field}
                value={f.branch}
                onChange={(e) => set("branch", e.target.value)}
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} — {b.area}
                  </option>
                ))}
                <option value="online">Online class</option>
              </select>
            </label>
            <fieldset>
              <legend className="mb-3 font-bold">Preferred day</legend>
              <div className="grid grid-cols-7 gap-1">
                {days.map((d) => (
                  <button
                    type="button"
                    key={d}
                    onClick={() => set("day", d)}
                    aria-pressed={f.day === d}
                    className={`border-2 py-3 text-sm font-bold ${f.day === d ? "border-secondary bg-secondary text-secondary-foreground" : "border-input"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-3 font-bold">Time</legend>
              <div className="grid grid-cols-2 gap-2">
                {["Morning", "Evening"].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => set("time", t)}
                    aria-pressed={f.time === t}
                    className={`border-2 py-3 font-bold ${f.time === t ? "border-secondary bg-secondary text-secondary-foreground" : "border-input"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block font-bold">Student name</span>
              <input
                className={field}
                value={f.name}
                maxLength={80}
                onChange={(e) => set("name", e.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-2 block font-bold">Age</span>
              <input
                className={field}
                inputMode="numeric"
                value={f.age}
                maxLength={2}
                onChange={(e) => set("age", e.target.value)}
              />
            </label>
            {minor && (
              <label className="block">
                <span className="mb-2 block font-bold">Parent / guardian name</span>
                <input
                  className={field}
                  value={f.guardian}
                  maxLength={80}
                  onChange={(e) => set("guardian", e.target.value)}
                />
              </label>
            )}
            <label className="block">
              <span className="mb-2 block font-bold">WhatsApp / phone</span>
              <input
                className={field}
                inputMode="tel"
                placeholder="0300 1234567"
                value={f.phone}
                maxLength={16}
                onChange={(e) => set("phone", e.target.value)}
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="border-2 border-secondary p-6">
            <h2 className="text-3xl">Almost done</h2>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-sm">{message}</pre>
            <a
              href={waLink(message)}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-center gap-2 bg-whatsapp py-4 font-bold uppercase text-primary-foreground"
            >
              <MessageCircle size={20} /> Confirm on WhatsApp
            </a>
          </div>
        )}

        {err && (
          <p role="alert" className="mt-4 font-semibold text-destructive">
            {err}
          </p>
        )}

        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="px-4 py-3 font-bold uppercase">
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 && (
            <button
              onClick={next}
              className="bg-primary px-8 py-3 font-bold uppercase text-primary-foreground"
            >
              Continue
            </button>
          )}
        </div>
      </section>
    </>
  );
}
