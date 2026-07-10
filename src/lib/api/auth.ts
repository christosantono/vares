import { api, getAccessToken, setAccessToken } from "./client";
import type { ApiUser, AuthResponse } from "./types";

export async function signup(input: { name: string; email: string; password: string }) {
  const session = await api<AuthResponse>("/api/auth/signup", { method: "POST", body: input });
  setAccessToken(session.accessToken);
  return session;
}

export async function login(input: { email: string; password: string }) {
  const session = await api<AuthResponse>("/api/auth/login", { method: "POST", body: input });
  setAccessToken(session.accessToken);
  return session;
}

export async function logout() {
  await api<{ ok: true }>("/api/auth/logout", { method: "POST" }).catch(() => undefined);
  setAccessToken(null);
}

export async function me() {
  try {
    const session = await api<AuthResponse>("/api/auth/me");
    setAccessToken(session.accessToken);
    return session;
  } catch (error) {
    const accessToken = getAccessToken();
    if (!accessToken) throw error;

    const session = await api<{ user: ApiUser }>("/api/auth/session");
    return { user: session.user, accessToken };
  }
}
