// All club content lives here so it can be edited without touching layout code.
// Anything marked SAMPLE is a placeholder and must be confirmed by the club.

export const club = {
  name: "Muslim Taekwondo Club ISB",
  short: "MTC ISB",
  since: 2015,
  phoneDisplay: "0341-0012591",
  phoneIntl: "+923410012591",
  whatsapp: "923410012591",
  email: "muslimtkd.isb@gmail.com",
  facebook: "https://www.facebook.com/Muslim.TKD.ISB",
  hours: "5:00 PM – 9:30 PM daily · morning classes on request",
};

export const waLink = (text: string) =>
  `https://wa.me/${club.whatsapp}?text=${encodeURIComponent(text)}`;

export type Program = {
  slug: string;
  name: string;
  ages: string;
  blurb: string;
  learn: string[];
  fee: string;
};

export const programs: Program[] = [
  {
    slug: "taekwondo",
    name: "Taekwondo",
    ages: "Ages 5+ · kids, teens, adults",
    blurb: "World Taekwondo (Kukkiwon) syllabus: kicks, poomsae, sparring and belt grading.",
    learn: [
      "Poomsae (forms)",
      "Kicking technique",
      "Olympic-style sparring",
      "Belt promotion tests",
    ],
    fee: "SAMPLE: replace — fee on request",
  },
  {
    slug: "kickboxing",
    name: "Kickboxing",
    ages: "Ages 12+",
    blurb: "High-energy striking for fitness, stamina and confidence.",
    learn: ["Punch & kick combos", "Pad work", "Conditioning", "Footwork"],
    fee: "SAMPLE: replace — fee on request",
  },
  {
    slug: "self-defense",
    name: "Self-Defense",
    ages: "Ages 10+ · women & girls welcome",
    blurb: "Practical escapes, awareness and real-world scenarios.",
    learn: ["Grab & hold escapes", "Situational awareness", "Basic strikes", "Confidence drills"],
    fee: "SAMPLE: replace — fee on request",
  },
  {
    slug: "mma",
    name: "Mixed Martial Arts",
    ages: "Ages 14+",
    blurb: "Striking, clinch and ground basics combined under supervision.",
    learn: ["Stand-up striking", "Takedown basics", "Ground control", "Controlled sparring"],
    fee: "SAMPLE: replace — fee on request",
  },
  {
    slug: "boxing",
    name: "Professional Boxing",
    ages: "Ages 12+",
    blurb: "Technical boxing from stance and guard to ring craft.",
    learn: ["Stance & guard", "Combinations", "Defense & head movement", "Bag & mitt work"],
    fee: "SAMPLE: replace — fee on request",
  },
];

export type Coach = { name: string; role: string; credentials: string[]; note?: string };

export const coaches: Coach[] = [
  {
    name: "Shahab ud Din",
    role: "CEO & Head Coach",
    credentials: [
      "Black Belt 4th Dan",
      "Kukkiwon 3rd Dan promotion (2017–2019)",
      "International Coach (WT)",
      "Vice President, Islamabad Taekwondo Association",
      "Coach at Pak-Turk Maarif International School",
      "Running the club since 2015",
    ],
  },
  {
    name: "Muhammad Ishaq Khan",
    role: "Senior Coach",
    credentials: ["Senior instructor", "Leads the Ghauri Town Phase 5 branch (opened Jan 2026)"],
    note: "Rank & certificates: to be confirmed",
  },
  {
    name: "Usman Khan",
    role: "Martial Arts Coach",
    credentials: ["Martial arts coach"],
    note: "Rank & certificates: to be confirmed",
  },
];

export type Branch = {
  id: string;
  name: string;
  area: string;
  address: string;
  timings: string;
  mapQuery: string;
  status?: string;
};

export const branches: Branch[] = [
  {
    id: "taramri",
    name: "Head Branch",
    area: "Taramri Chowk / Alipur",
    address: "Taj Corporation, 2nd Floor, opposite Shell Petrol Pump, Taramri Chowk, Islamabad",
    timings: "5:00 PM – 9:30 PM · mornings on request",
    mapQuery: "Taj Corporation Taramri Chowk Islamabad",
  },
  {
    id: "ghauri-b4",
    name: "Ghauri Town",
    area: "Ghauri Town VIP Block",
    address: "B-4, Street No. 2, Ghouri Town VIP Block, Islamabad",
    timings: "From 6:00 PM (Mon) · SAMPLE: confirm",
    mapQuery: "Muslim Taekwondo Martial Arts Club B-4 Ghauri Town Islamabad",
  },
  {
    id: "ghauri-p5",
    name: "Ghauri Town Phase 5",
    area: "Ghauri Town Phase 5",
    address: "Ghauri Town Phase 5, Islamabad · exact address to be confirmed",
    timings: "SAMPLE: confirm timings",
    mapQuery: "Ghauri Town Phase 5 Islamabad",
    status: "Led by Coach Ishaq",
  },
  {
    id: "gulberg",
    name: "Gulberg Greens",
    area: "Gulberg Greens",
    address: "Gulberg Greens, Islamabad · address to be confirmed",
    timings: "SAMPLE: confirm timings",
    mapQuery: "Gulberg Greens Islamabad",
    status: "Status to be confirmed",
  },
];

export const belts = [
  {
    name: "White",
    color: "oklch(0.97 0 0)",
    focus: "Stance, basic blocks, front kick, etiquette",
    form: "Taegeuk Il Jang",
  },
  {
    name: "Yellow",
    color: "oklch(0.86 0.17 95)",
    focus: "Roundhouse kick, middle punches, balance",
    form: "Taegeuk Ee Jang",
  },
  {
    name: "Green",
    color: "oklch(0.6 0.15 150)",
    focus: "Side kick, combinations, step sparring",
    form: "Taegeuk Sam Jang",
  },
  {
    name: "Blue",
    color: "oklch(0.45 0.17 265)",
    focus: "Back kick, footwork, controlled sparring",
    form: "Taegeuk Sa/Oh Jang",
  },
  {
    name: "Red",
    color: "oklch(0.585 0.225 27)",
    focus: "Spinning kicks, competition tactics",
    form: "Taegeuk Yuk/Chil Jang",
  },
  {
    name: "Black (Poom/Dan)",
    color: "oklch(0.2 0 0)",
    focus: "Mastery, Kukkiwon grading, leadership",
    form: "Taegeuk Pal Jang · Koryo",
  },
];

export const achievements = [
  { title: "4 Silver · 3 Bronze", detail: "Islamabad Taekwondo team under Coach Shahab ud Din" },
  { title: "1st Position, KPK", detail: "Student Raheel — province-wide event" },
  { title: "School demonstrations", detail: "Belt-promotion events in partner schools" },
];

export const faqs = [
  {
    q: "Can my child try a class first?",
    a: "Yes. Book a free trial and we will confirm the time on WhatsApp.",
  },
  {
    q: "Are there options for girls and women?",
    a: "The club offers home classes for male and female students. Ask us on WhatsApp about women-only batches — details are being confirmed.",
  },
  {
    q: "What age can children start?",
    a: "Taekwondo usually starts from around 5 years. We group students by age and level.",
  },
  {
    q: "What should my child wear?",
    a: "Comfortable sportswear for the trial. A dobok (uniform) and protective gear are needed later — we can guide you.",
  },
  {
    q: "How is safety handled?",
    a: "Every class is supervised by a qualified coach. Sparring is controlled and age-appropriate, with protective gear.",
  },
  {
    q: "How do I pay fees?",
    a: "Cash, bank transfer, JazzCash or Easypaisa. Share the receipt on WhatsApp for confirmation.",
  },
];
