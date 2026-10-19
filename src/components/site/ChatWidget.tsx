import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, Send, X } from "lucide-react";
import {
  CHAT_GREETING,
  CHAT_OPTIONS,
  getChatAnswer,
  getChatOption,
  matchChatMessage,
  UNKNOWN_ANSWER,
  whatsappChatLink,
  type ChatOptionKey,
} from "@/content/chatbotData";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  action?: "booking" | "whatsapp";
  followUps?: ChatOptionKey[];
};

const STORAGE_KEY = "mtc-isb-chat-open";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "assistant", text: CHAT_GREETING },
  ]);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);

  useEffect(() => {
    try {
      setIsOpen(sessionStorage.getItem(STORAGE_KEY) === "open");
    } catch (error) {
      console.error("Unable to restore chatbot session state.", error);
    } finally {
      setStorageReady(true);
    }
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, isOpen ? "open" : "closed");
    } catch (error) {
      console.error("Unable to save chatbot session state.", error);
    }
  }, [isOpen, storageReady]);

  useEffect(() => {
    if (!isOpen) return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      inputRef.current?.focus();
    } else {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const appendReply = (
    text: string,
    action?: ChatMessage["action"],
    followUps?: ChatOptionKey[],
  ) => {
    const reply: ChatMessage = {
      id: nextMessageId.current++,
      role: "assistant",
      text,
      ...(action ? { action } : {}),
      ...(followUps ? { followUps } : {}),
    };
    setMessages((current) => [...current, reply]);
  };

  const selectOption = (key: ChatOptionKey) => {
    const option = getChatOption(key);
    setMessages((current) => [
      ...current,
      { id: nextMessageId.current++, role: "user", text: option.label },
    ]);
    const answer = getChatAnswer(key);
    appendReply(answer.text, answer.action, answer.followUps);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((current) => [...current, { id: nextMessageId.current++, role: "user", text }]);
    const matchedKey = matchChatMessage(text);
    if (matchedKey) {
      const answer = getChatAnswer(matchedKey);
      appendReply(answer.text, answer.action, answer.followUps);
    } else {
      appendReply(UNKNOWN_ANSWER, "whatsapp", ["trial", "programs"]);
    }
  };

  const latestAssistant = [...messages].reverse().find((message) => message.role === "assistant");

  return (
    <div className="fixed bottom-[4.75rem] right-4 z-[60] md:bottom-6 md:right-6">
      {isOpen && (
        <section
          id="club-chat-panel"
          role="dialog"
          aria-label="Ask Muslim Taekwondo Club ISB"
          className="absolute bottom-[4.5rem] right-0 flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden border bg-background shadow-2xl md:bottom-20"
          style={{ maxHeight: "calc(100dvh - 7rem)", height: "min(36rem, calc(100dvh - 7rem))" }}
        >
          <header className="flex items-center justify-between gap-3 bg-secondary px-4 py-3 text-secondary-foreground">
            <h2 className="font-display text-lg uppercase leading-tight">
              Ask Muslim Taekwondo Club ISB
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="shrink-0 p-2 hover:bg-secondary-foreground/10"
            >
              <X size={20} />
            </button>
          </header>

          <div
            className="flex-1 space-y-3 overflow-y-auto p-3"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`w-fit max-w-[90%] whitespace-pre-line px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto bg-secondary text-secondary-foreground"
                    : "border bg-card text-card-foreground"
                }`}
              >
                {message.text}
                {message.action === "booking" && (
                  <Link
                    to="/book"
                    className="mt-2 block bg-primary px-3 py-2 text-center font-bold text-primary-foreground"
                  >
                    Open booking form
                  </Link>
                )}
                {message.action === "whatsapp" && (
                  <a
                    href={whatsappChatLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block bg-whatsapp px-3 py-2 text-center font-bold text-primary-foreground"
                  >
                    Message us on WhatsApp
                  </a>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="max-h-40 overflow-y-auto border-t p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {messages.length === 1 ? "Choose a topic" : "You can also ask about"}
            </p>
            <div className="flex flex-wrap gap-2">
              {(messages.length === 1
                ? CHAT_OPTIONS
                : (latestAssistant?.followUps ?? []).map(getChatOption)
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => selectOption(option.id)}
                  className="border border-secondary px-2.5 py-1.5 text-left text-xs font-semibold text-secondary hover:bg-accent"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex gap-2 border-t p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <label className="sr-only" htmlFor="club-chat-input">
              Ask a question
            </label>
            <input
              ref={inputRef}
              id="club-chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question…"
              className="min-w-0 flex-1 border bg-card px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="bg-primary px-3 text-primary-foreground"
            >
              <Send size={18} />
            </button>
          </form>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-label={isOpen ? "Close chat" : "Ask Muslim Taekwondo Club ISB"}
        aria-expanded={isOpen}
        aria-controls="club-chat-panel"
        onClick={() => setIsOpen((current) => !current)}
        className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}
