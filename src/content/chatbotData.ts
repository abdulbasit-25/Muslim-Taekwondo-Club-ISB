import { belts, branches, club, faqs, programs, waLink } from "@/content/site";

export type ChatOptionKey =
  "trial" | "programs" | "branches" | "fees" | "belts" | "safety" | "online" | "whatsapp";

export type ChatOption = { id: ChatOptionKey; label: string };
export type ChatAnswer = {
  text: string;
  followUps: ChatOptionKey[];
  action?: "booking" | "whatsapp";
};

export const CHAT_GREETING = `Welcome to ${club.name}. How can we help?`;

export const CHAT_OPTIONS: ChatOption[] = [
  { id: "trial", label: "Book a Free Trial" },
  { id: "programs", label: "Programs" },
  { id: "branches", label: "Branches & Timings" },
  { id: "fees", label: "Fees" },
  { id: "belts", label: "Belt System" },
  { id: "safety", label: "Parents & Safety" },
  { id: "online", label: "Online Classes" },
  { id: "whatsapp", label: "Talk to a Coach on WhatsApp" },
];

const feeNeedsConfirmation = programs.some((program) => /SAMPLE:\s*replace/i.test(program.fee));

const confirmedBranchDetails = branches.map((branch) => {
  const address = /SAMPLE|to be confirmed/i.test(branch.address)
    ? "Please confirm on WhatsApp."
    : branch.address;
  const timings = /SAMPLE|to be confirmed/i.test(branch.timings)
    ? "Please confirm on WhatsApp."
    : branch.timings;

  return `${branch.name} (${branch.area}) — Address: ${address} Timings: ${timings}`;
});

export const CHAT_ANSWERS: Record<ChatOptionKey, ChatAnswer> = {
  trial: {
    text: "Use our booking form to choose a service, program, branch, preferred time, and add the student's details. We will confirm the slot on WhatsApp.",
    followUps: ["programs", "branches", "whatsapp"],
    action: "booking",
  },
  programs: {
    text: programs
      .map((program) => `${program.name} (${program.ages}): ${program.blurb}`)
      .join("\n"),
    followUps: ["trial", "fees", "online"],
  },
  branches: {
    text: `Current branch information:\n${confirmedBranchDetails.join("\n")}`,
    followUps: ["trial", "whatsapp"],
  },
  fees: {
    text: feeNeedsConfirmation
      ? "Current program fees have not been confirmed. Please confirm on WhatsApp."
      : "Please message our coach on WhatsApp to confirm current fees.",
    followUps: ["programs", "trial", "whatsapp"],
    action: "whatsapp",
  },
  belts: {
    text: belts.map((belt) => `${belt.name}: ${belt.focus}`).join("\n"),
    followUps: ["programs", "trial", "safety"],
  },
  safety: {
    text: `${faqs.find((faq) => /safety/i.test(faq.q))?.a ?? "Please message our coach for current safety information."}\n${faqs.find((faq) => /age/i.test(faq.q))?.a ?? ""}\n${faqs.find((faq) => /girls and women/i.test(faq.q))?.a ?? ""}`.trim(),
    followUps: ["trial", "branches", "whatsapp"],
  },
  online: {
    text: "The club lists live online sessions and on-demand lessons organised by belt level. Current plans and fees need confirmation. Please confirm on WhatsApp.",
    followUps: ["trial", "fees", "whatsapp"],
  },
  whatsapp: {
    text: "Message our coach on WhatsApp and they can help with your question.",
    followUps: ["trial", "branches"],
    action: "whatsapp",
  },
};

const keywords: Array<{ words: string[]; answer: ChatOptionKey }> = [
  { words: ["fee", "fees", "price", "cost", "payment"], answer: "fees" },
  { words: ["belt", "poom", "dan", "grading"], answer: "belts" },
  {
    words: ["branch", "branches", "timing", "time", "location", "address", "where"],
    answer: "branches",
  },
  { words: ["online", "zoom", "virtual"], answer: "online" },
  {
    words: [
      "safe",
      "safety",
      "parent",
      "parents",
      "kid",
      "kids",
      "child",
      "children",
      "age",
      "girl",
      "girls",
      "women",
    ],
    answer: "safety",
  },
  {
    words: ["program", "programs", "taekwondo", "kickboxing", "boxing", "mma", "class", "classes"],
    answer: "programs",
  },
  { words: ["trial", "book", "booking", "admission"], answer: "trial" },
  { words: ["coach", "whatsapp", "person", "human"], answer: "whatsapp" },
];

export function getChatOption(key: ChatOptionKey): ChatOption {
  return CHAT_OPTIONS.find((option) => option.id === key)!;
}

export function getChatAnswer(key: ChatOptionKey): ChatAnswer {
  return CHAT_ANSWERS[key];
}

export function matchChatMessage(message: string): ChatOptionKey | null {
  const normalized = message.toLowerCase();
  return (
    keywords.find(({ words }) =>
      words.some((word) => new RegExp(`\\b${word}\\b`, "i").test(normalized)),
    )?.answer ?? null
  );
}

export const UNKNOWN_ANSWER = "I'm not sure about that. Please message our coach on WhatsApp,";

export const whatsappChatLink = waLink(
  "Assalam o Alaikum MTC ISB, I'd like to ask a question about classes.",
);
