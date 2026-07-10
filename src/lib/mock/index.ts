// Realistic seeded mock data. Single source of truth so we can later
// swap individual modules to real backend without touching components.

export type MockCreator = {
  handle: string;
  name: string;
  avatar: string;
  followers: number;
  generations: number;
  verified: boolean;
};

export type MockImage = {
  id: string;
  prompt: string;
  creator: string;
  src: string;
  likes: number;
  remixes: number;
  aspect: "1:1" | "16:9" | "9:16" | "4:5" | "3:2";
};

export type MockListing = {
  id: string;
  title: string;
  type: "prompt" | "style" | "lora" | "workflow";
  creator: string;
  price: number;
  sales: number;
  cover: string;
};

export type MockModel = {
  id: string;
  name: string;
  family: string;
  description: string;
  speed: "fast" | "balanced" | "quality";
  badge?: string;
};

const seededImages = [
  "https://cdn.pixabay.com/photo/2024/06/25/13/12/woman-8852664_1280.jpg?w=900&q=80",
  "https://cdn.pixabay.com/photo/2024/06/06/22/19/piece-8813495_1280.png?w=900&q=80",
  "https://cdn.pixabay.com/photo/2026/05/14/03/06/03-06-32-708_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/07/24/17/48/woman-8918982_1280.jpg",
  "https://cdn.pixabay.com/photo/2023/11/10/02/30/woman-8378634_1280.jpg",
  "https://cdn.pixabay.com/photo/2026/03/01/23/16/23-16-29-429_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/02/02/01/10/picadilly-circus-256501_1280.jpg",
  "https://cdn.pixabay.com/photo/2025/09/23/05/50/girl-9849748_1280.jpg",
  "https://images.unsplash.com/photo-1717501218385-55bc3a95be94?w=900&q=80",
  "https://images.unsplash.com/photo-1682687982107-14492010e05e?w=900&q=80",
  "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?w=900&q=80",
  "https://media.istockphoto.com/id/1002079442/photo/attractive-girl-with-tattoos-looking-away-and-posing-at-street.jpg?s=612x612&w=0&k=20&c=eR2S5-FTvWDflbE1RcNFsAWqA2gjn_AeQ_0vFBMeeKs=",
];

const prompts = [
  "cinematic portrait, neon rain, 85mm, kodak portra",
  "isometric cyberpunk village, soft fog, octane render",
  "anime girl with silver hair, studio lighting, vibrant",
  "brutalist concrete cathedral, harsh sunlight",
  "macro shot of a dewdrop on a leaf, hyper real",
  "vintage 1960s travel poster of Mars colony",
  "low-poly samurai duel, sunset, dramatic shadows",
  "studio ghibli forest spirit, watercolor",
  "abstract liquid metal sculpture, monochrome",
  "fashion editorial, oversized coat, brutalist set",
  "thumb-sized robot bee pollinating a tulip",
  "noir detective in rainy alley, chiaroscuro",
];

const creators = ["nyra", "kestrel", "vex_void", "aoi", "marble.io", "renra", "zane", "sora"];

export const mockCreators: MockCreator[] = creators.map((handle, i) => ({
  handle,
  name: handle.replace(/\W/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${handle}`,
  followers: 1200 + i * 870,
  generations: 340 + i * 211,
  verified: i % 3 === 0,
}));

const aspects: MockImage["aspect"][] = ["1:1", "16:9", "9:16", "4:5", "3:2"];

export const mockGallery: MockImage[] = Array.from({ length: 48 }).map((_, i) => ({
  id: `img-${i}`,
  prompt: prompts[i % prompts.length],
  creator: creators[i % creators.length],
  src: seededImages[i % seededImages.length],
  likes: 100 + ((i * 37) % 4000),
  remixes: ((i * 13) % 200) + 4,
  aspect: aspects[i % aspects.length],
}));

export const mockMarketplace: MockListing[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `m-${i}`,
  title: [
    "Neo-Tokyo Cyberpunk Pack",
    "Ghibli Forest LoRA",
    "Brutalist Architecture Prompts",
    "Vintage Film Style Pack",
    "Anime Studio Workflow",
    "Editorial Portrait Bundle",
  ][i % 6],
  type: (["prompt", "style", "lora", "workflow"] as const)[i % 4],
  creator: creators[i % creators.length],
  price: [99, 199, 299, 499, 999][i % 5],
  sales: 50 + ((i * 91) % 800),
  cover: seededImages[(i + 3) % seededImages.length],
}));

export const mockModels: MockModel[] = [
  { id: "imagine-v3", name: "Imagine v3", family: "Imagine", description: "Versatile general-purpose model. Strong on photorealism and concept art.", speed: "balanced", badge: "Popular" },
  { id: "imagine-turbo", name: "Imagine Turbo", family: "Imagine", description: "Fast iterations. 2 seconds per image. Lower fidelity.", speed: "fast" },
  { id: "zenivra-pro", name: "Zenivra Pro", family: "Zenivra", description: "Premium quality, slower. Best for finished art.", speed: "quality", badge: "Pro" },
  { id: "anime-mix", name: "Anime Mix v2", family: "Style", description: "Tuned for anime, manga, and illustration.", speed: "balanced" },
  { id: "photo-real", name: "PhotoReal", family: "Style", description: "Hyper-realistic photography aesthetic.", speed: "quality" },
  { id: "vector-flat", name: "Vector Flat", family: "Style", description: "Clean vector and flat-design output.", speed: "fast" },
];

export const mockNotifications = [
  { id: "n1", text: "vex_void remixed your image “neon rain portrait”", time: "12m ago", read: false },
  { id: "n2", text: "Your “Neo-Tokyo Pack” listing made 3 sales", time: "1h ago", read: false },
  { id: "n3", text: "Weekly recap: 84 generations, 12 favorites", time: "Yesterday", read: true },
  { id: "n4", text: "New model available: Zenivra Pro", time: "2d ago", read: true },
];

export function liveFeedItems(n = 8) {
  return Array.from({ length: n }).map((_, i) => ({
    id: `live-${i}`,
    creator: creators[(i + 1) % creators.length],
    prompt: prompts[(i + 2) % prompts.length],
    src: seededImages[(i + 5) % seededImages.length],
    ago: `${(i + 1) * 7}s`,
  }));
}
