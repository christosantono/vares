"use client";

import { AppShell } from "@/components/app/AppShell";
import { mockNotifications } from "@/lib/mock";

export default function NotificationsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl p-6 md:p-10">
        <h1 className="font-display text-3xl font-semibold">Notifications</h1>
        <div className="mt-8 space-y-2">
          {mockNotifications.map((n) => (
            <div key={n.id} className={`rounded-xl border border-border p-4 ${!n.read && "bg-surface"}`}>
              <p className="text-sm">{n.text}</p>
              <p className="font-mono mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                {n.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
