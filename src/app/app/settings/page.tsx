"use client";

import { AppShell } from "@/components/app/AppShell";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth";

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <AppShell>
      <div className="mx-auto max-w-2xl p-6 md:p-10">
        <h1 className="font-display text-3xl font-semibold">Settings</h1>

        <section className="mt-8 rounded-2xl border border-border p-6">
          <h2 className="font-display text-lg font-semibold">Account</h2>
          <p className="mt-2 text-sm text-muted-foreground">{user?.email}</p>
        </section>

        <section className="mt-4 rounded-2xl border border-border p-6 space-y-4">
          <h2 className="font-display text-lg font-semibold">Preferences</h2>
          <label className="flex items-center justify-between">
            <span className="text-sm">Dark theme</span>
            <Switch defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Allow NSFW content</span>
            <Switch />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm">Private profile</span>
            <Switch />
          </label>
        </section>
      </div>
    </AppShell>
  );
}
