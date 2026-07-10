"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { me, logout as apiLogout } from "@/lib/api/auth";
import { setAccessToken } from "@/lib/api/client";
import type { ApiUser } from "@/lib/api/types";

type AuthCtx = {
  user: ApiUser | null;
  loading: boolean;
  setSession: (user: ApiUser, accessToken: string) => void;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null,
  loading: true,
  setSession: () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    me()
      .then((session) => {
        if (active) setUser(session.user);
      })
      .catch(() => {
        if (!active) return;
        setAccessToken(null);
        setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Ctx.Provider
      value={{
        user,
        loading,
        setSession: (nextUser, accessToken) => {
          setAccessToken(accessToken);
          setUser(nextUser);
        },
        signOut: async () => {
          await apiLogout();
          setUser(null);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
