export type FaqItem = { q: string; a: string };
export type FaqCategory = { title: string; items: FaqItem[] };

export const FAQ: FaqCategory[] = [
  {
    title: "Getting Started",
    items: [
      { q: "What is Zenivra?", a: "Zenivra is a creator-first AI platform for generating images, video, voice and more — all in one place." },
      { q: "Do I need an account?", a: "Yes. Sign up with email or Google to get 50 free credits that refresh every 24 hours." },
      { q: "Is there a free plan?", a: "Yes. The free plan includes a daily allowance of credits and access to all core tools." },
    ],
  },
  {
    title: "Credits & Billing",
    items: [
      { q: "How do credits work?", a: "Each generation costs a small number of credits. Free-plan credits refresh every 24 hours; paid plans add a larger monthly pool." },
      { q: "What happens if I run out?", a: "Wait for the next daily refresh or upgrade your plan in Billing to keep creating without interruption." },
      { q: "Can I get a refund?", a: "Failed generations automatically refund credits. For billing questions, contact support within 14 days of purchase." },
      { q: "Which payment methods are accepted?", a: "All major cards via our payment provider. Invoicing is available for team plans." },
    ],
  },
  {
    title: "Generation",
    items: [
      { q: "Which model powers image generation?", a: "We use Google Gemini's image preview through the Lovable AI Gateway. More models are rolling out." },
      { q: "Can I choose an aspect ratio?", a: "Yes — 1:1, 16:9, 9:16, 4:3, 3:4 and 21:9 are supported." },
      { q: "How long does a generation take?", a: "Most images return within 5–15 seconds depending on size and load." },
      { q: "Do I own what I create?", a: "You retain rights to your generations subject to the model provider's terms and our Terms of Service." },
    ],
  },
  {
    title: "Account & Privacy",
    items: [
      { q: "Are my generations public?", a: "No by default. You choose per-image whether to make it public, and you can keep your whole profile private." },
      { q: "How do I delete my account?", a: "Open Settings → Account → Delete account. This permanently removes your profile and generations." },
      { q: "Where is my data stored?", a: "On secure managed infrastructure with row-level security. Only you can read your private content." },
    ],
  },
  {
    title: "Developers",
    items: [
      { q: "Is there an API?", a: "A public API is in private beta. Join the waitlist on the Developers page." },
      { q: "Can I self-host?", a: "Not today. We focus on a managed experience so you can ship faster." },
    ],
  },
];
