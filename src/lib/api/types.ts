export type ApiUser = {
  id: string;
  email: string;
};

export type AuthResponse = {
  user: ApiUser;
  accessToken: string;
};

export type Profile = {
  id: string;
  display_name: string;
  handle: string;
  bio: string | null;
  avatar_url: string | null;
  gender: string | null;
  gender_public: boolean;
};

export type CreditBalance = {
  balance: number;
  daily_allowance: number;
  plan: string;
  daily_reset_at: string;
};

export type Generation = {
  id: string;
  prompt: string;
  negative_prompt: string | null;
  model: string;
  aspect_ratio: string;
  seed: number | null;
  cfg: number | null;
  nsfw: boolean;
  image_url: string;
  is_favorite: boolean;
  is_public: boolean;
  credits_spent: number;
  created_at: string;
};

export type DashboardStats = {
  totalImages: number;
  spent7d: number;
  images7d: number;
  credits: CreditBalance | null;
};
