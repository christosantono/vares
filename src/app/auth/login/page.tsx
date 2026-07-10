"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth";

function getRedirect() {
  if (typeof window === "undefined") return "/";
  const r = new URLSearchParams(window.location.search).get("redirect");
  return r && r.startsWith("/") ? r : "/";
}

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const session = await login({ email, password });
      setSession(session.user, session.accessToken);
      toast.success("Welcome back");
      router.push(getRedirect());
    } catch (error: any) {
      toast.error(error?.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Sign in"
      subtitle="Welcome back to your creator workspace."
      footer={
        <>
          No account?{" "}
          <Link href="/auth/signup" className="text-foreground underline-offset-4 hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <button
        disabled
        className="mb-6 flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-lg border border-border px-4 py-2.5 text-sm font-medium opacity-60"
      >
        Google sign-in coming soon
      </button>
      <div className="relative mb-6 text-center">
        <span className="bg-background relative z-10 px-3 text-xs text-muted-foreground">or</span>
        <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
      </div>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/reset-password"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
