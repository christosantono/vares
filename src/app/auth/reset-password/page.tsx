"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
    toast.info("Password reset email is not configured for this backend yet.");
  };

  return (
    <AuthShell
      title="Reset password"
      subtitle="Password reset email will be added after the first backend auth pass."
      footer={
        <Link href="/auth/login" className="text-foreground underline-offset-4 hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={sendReset} className="space-y-4">
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
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Checking..." : "Request reset"}
        </Button>
      </form>
    </AuthShell>
  );
}
