"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { ProfileDrawer } from "./ProfileDrawer";

export function UserProfileButton() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const initial = (user?.email?.[0] ?? "U").toUpperCase();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open profile"
        className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background text-sm font-medium ring-1 ring-border transition-transform hover:scale-105"
      >
        {initial}
      </button>
      <ProfileDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
