import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { BackButton } from "@/components/site/BackButton";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div
        className="hidden md:flex relative flex-col justify-between p-10 hairline-r"
        style={{ background: "var(--gradient-radial)" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <span className="font-display text-lg font-semibold">Zenivra</span>
        </Link>
        <div>
          <p className="font-display text-4xl font-semibold leading-tight max-w-md">
            Generate. Remix. Share. Monetize.
          </p>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            50 free credits daily on signup. No card required.
          </p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">© 2026 Zenivra Labs</p>
      </div>
      <div className="relative flex items-center justify-center px-6 py-12">
        <div className="absolute left-4 top-4">
          <BackButton />
        </div>
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 md:hidden">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-lg font-semibold">Zenivra</span>
          </Link>
          <h1 className="text-3xl font-display font-semibold">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
