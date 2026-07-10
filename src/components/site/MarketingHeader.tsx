"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Wand2 } from "lucide-react";

import { useAuth } from "@/lib/auth";
import { UserProfileButton } from "@/features/profile";
import { ToolsMenu } from "@/components/site/ToolsMenu";
import { MobileNavSheet } from "@/components/site/MobileNavSheet";
import { BackButton } from "@/components/site/BackButton";

const NAV = [
  { to: "/explore", label: "Explore" },
  { to: "/models", label: "Models" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
] as const;

export function MarketingHeader() {
  const { user, loading } = useAuth();
  const authed = !!user;
  const path = usePathname();
  const showBack = path !== "/";

  return (
    <>
      
      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Zenivra</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <ToolsMenu />
            {NAV.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                className={`text-sm transition-colors hover:text-foreground ${
                  path === n.to ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <MobileNavSheet />
            {loading ? (
              <div className="h-9 w-32 animate-pulse rounded-full bg-surface" />
            ) : authed ? (
              <>
                <Link
                  href="/app/generate"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  Start Generate
                </Link>
                <UserProfileButton />
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline"
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Start creating
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {showBack && (
        <div className="mx-auto flex max-w-7xl items-center px-6 pt-4">
          <BackButton />
        </div>
      )}
    </>
  );
}

export function MarketingFooter() {
  return (
    <footer className="hairline-t mt-32">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-lg font-semibold">Zenivra</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The creator-first AI platform. Generate, remix, share, and monetize.
          </p>
        </div>
        {[
          {
            title: "Product",
            links: [
              ["Generator", "/auth/signup"],
              ["Explore", "/explore"],
              ["Models", "/models"],
              ["Marketplace", "/marketplace"],
            ],
          },
          {
            title: "Company",
            links: [
              ["Pricing", "/pricing"],
              ["Developers", "/developers"],
              ["Terms", "/legal/terms"],
              ["Privacy", "/legal/privacy"],
            ],
          },
        ].map((c) => (
          <div key={c.title}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {c.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map(([label, to]) => (
                <li key={to}>
                  <Link href={to} className="text-sm text-foreground/80 hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Built with
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Zenivra</p>
        </div>
      </div>
      <div className="hairline-t mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
        <span>© 2026 Zenivra Labs</span>
        <span className="font-mono">v1.0 · all systems operational</span>
      </div>
    </footer>
  );
}
