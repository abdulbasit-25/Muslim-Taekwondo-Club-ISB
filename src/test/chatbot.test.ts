import { describe, expect, it } from "vitest";
import {
  CHAT_ANSWERS,
  CHAT_OPTIONS,
  UNKNOWN_ANSWER,
  matchChatMessage,
} from "@/content/chatbotData";

describe("chatbot content", () => {
  it("starts with the requested quick replies", () => {
    expect(CHAT_OPTIONS.map((option) => option.label)).toEqual([
      "Book a Free Trial",
      "Programs",
      "Branches & Timings",
      "Fees",
      "Belt System",
      "Parents & Safety",
      "Online Classes",
      "Talk to a Coach on WhatsApp",
    ]);
  });

  it.each([
    ["How much are the fees?", "fees"],
    ["What age can kids start?", "safety"],
    ["Where is your branch?", "branches"],
    ["Can I join online?", "online"],
    ["How does the belt system work?", "belts"],
    ["Can I book a trial?", "trial"],
  ])("matches %s to %s", (message, expected) => {
    expect(matchChatMessage(message)).toBe(expected);
  });

  it("directs unknown questions to WhatsApp", () => {
    expect(matchChatMessage("Do you sell uniforms?")).toBeNull();
    expect(UNKNOWN_ANSWER).toBe("I'm not sure about that. Please message our coach on WhatsApp,");
  });

  it("does not expose fee or branch placeholders", () => {
    expect(CHAT_ANSWERS.fees.text).toContain("Please confirm on WhatsApp.");
    expect(CHAT_ANSWERS.fees.text).not.toMatch(/SAMPLE|PKR\s*[—\d]/i);
    expect(CHAT_ANSWERS.branches.text).not.toMatch(/SAMPLE|to be confirmed/i);
    expect(CHAT_ANSWERS.branches.text).toContain("Please confirm on WhatsApp.");
    expect(CHAT_ANSWERS.online.text).toContain("Please confirm on WhatsApp.");
  });
});
