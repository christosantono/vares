"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TOOLS } from "./ToolsMenu";

const LINKS = [
  { to: "/explore", label: "Explore" },
  { to: "/models", label: "Models" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/pricing", label: "Pricing" },
  { to: "/developers", label: "Developers" },
  { to: "/faq", label: "FAQ" },
] as const;

export function MobileNavSheet() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display">Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm text-foreground hover:bg-surface"
            >
              {l.label}
            </Link>
          ))}
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="tools" className="border-none">
              <AccordionTrigger className="rounded-md px-3 py-2 text-sm hover:bg-surface hover:no-underline">
                Tools
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="ml-2 flex flex-col gap-1 border-l border-border pl-3">
                  {TOOLS.map((t) => (
                    <Link
                      key={t.to}
                      href={t.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
                    >
                      <t.icon className="h-3.5 w-3.5" />
                      {t.label}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
