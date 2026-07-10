"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Image as ImageIcon,
  Video,
  Brush,
  Workflow,
  LayoutGrid,
  CreditCard,
  Settings,
  Bell,
  LogOut,
  Mic,
  Maximize2,
  Scissors,
} from "lucide-react";
import type { ReactNode } from "react";

import { useAuth } from "@/lib/auth";
import { BackButton } from "@/components/site/BackButton";

const NAV = [
  { to: "/app/generate", label: "Generate", icon: Sparkles },
  { to: "/app/video", label: "Video", icon: Video },
  { to: "/app/canvas", label: "Canvas", icon: Brush },
  { to: "/app/workflows", label: "Workflows", icon: Workflow },
  { to: "/app/gallery", label: "Gallery", icon: ImageIcon },
] as const;

const TOOLS = [
  { to: "/app/voice", label: "Text to Voice", icon: Mic },
  { to: "/app/upscale", label: "Upscale / 4K", icon: Maximize2 },
  { to: "/app/remove-bg", label: "Remove BG", icon: Scissors },
] as const;

const SECONDARY = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/app/billing", label: "Billing", icon: CreditCard },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children, credits }: { children: ReactNode; credits?: number | null }) {
  const path = usePathname();
  const { user, signOut } = useAuth();
  const isActive = (to: string) => path === to;

  return (
    <div className="min-h-screen bg-background md:pl-16">
      {/* Sidebar — collapsed 64px, expands on hover to 240px */}
      <aside
        className="group/sidebar fixed inset-y-0 left-0 z-40 hidden w-16 flex-col overflow-hidden border-r border-border transition-[width] duration-200 ease-out hover:w-60 md:flex"
        style={{ background: "var(--color-sidebar)" }}
      >
        <Link href="/" className="flex h-16 items-center gap-2 px-4 border-b border-border">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-foreground text-background">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="whitespace-nowrap font-display text-lg font-semibold opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100">
            Zenivra
          </span>
        </Link>

        <nav className="flex-1 overflow-y-auto p-2 scrollbar-thin">
          <SidebarLabel>Create</SidebarLabel>
          {NAV.map((n) => (
            <SidebarItem key={n.to} {...n} active={isActive(n.to)} />
          ))}
          <SidebarLabel className="mt-6">Tools</SidebarLabel>
          {TOOLS.map((n) => (
            <SidebarItem key={n.to} {...n} active={isActive(n.to)} />
          ))}
          <SidebarLabel className="mt-6">Account</SidebarLabel>
          {SECONDARY.map((n) => (
            <SidebarItem key={n.to} {...n} active={isActive(n.to)} />
          ))}
        

        <div className="border-t border-border p-1">
          
          <div className="flex items-center gap-2 rounded-lg py-1.5">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-elevated text-sm font-medium">
              {(user?.email?.[0] ?? "U").toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100">
              <p className="truncate text-xs">{user?.email ?? "Guest"}</p>
            </div>
            <button
              onClick={signOut}
              aria-label="Sign out"
              className="rounded p-1.5 text-muted-foreground opacity-0 transition-opacity duration-200 hover:bg-surface hover:text-foreground group-hover/sidebar:opacity-100"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
        </nav>
      </aside>

      {/* Topbar (mobile) */}
      <header className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-6 w-6 place-items-center rounded bg-foreground text-background">
            <Sparkles className="h-3 w-3" />
          </div>
          <span className="font-display font-semibold">Zenivra</span>
        </Link>
        {credits != null && (
          <span className="font-mono text-xs text-muted-foreground">{credits} cr</span>
        )}
      </header>

      <main className="min-h-screen pb-20 md:pb-0">
        {path !== "/app/generate" && (
          <div className="px-4 pt-4 md:px-8 md:pt-6">
            <BackButton />
          </div>
        )}
        {children}
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background md:hidden">
        {NAV.map((n) => (
          <Link
            key={n.to}
            href={n.to}
            className={`flex flex-col items-center gap-1 py-2.5 text-[10px] ${isActive(n.to) ? "text-foreground" : "text-muted-foreground"}`}
          >
            <n.icon className="h-4 w-4" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function SidebarLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100 ${className}`}
    >
      {children}
    </p>
  );
}

function SidebarItem({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <Link
      href={to}
      title={label}
      className={`mt-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-surface-elevated text-foreground"
          : "text-muted-foreground hover:bg-surface hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="whitespace-nowrap opacity-0 transition-opacity duration-200 group-hover/sidebar:opacity-100">
        {label}
      </span>
    </Link>
  );
}
