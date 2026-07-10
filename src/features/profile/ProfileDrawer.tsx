"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BadgeCheck, Camera, Check, LogOut, Mail, Pencil, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth";
import { getMyProfile, updateProfile, uploadAvatar } from "@/lib/api/profile";

type Props = { open: boolean; onOpenChange: (v: boolean) => void };

const GENDERS = ["male", "female", "non-binary", "prefer not to say"] as const;

export function ProfileDrawer({ open, onOpenChange }: Props) {
  const { user, signOut } = useAuth();
  const qc = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["my-profile"],
    queryFn: () => getMyProfile(),
    enabled: open && !!user,
  });

  const profile = profileQuery.data;
  const email = user?.email ?? "";
  const fullName = profile?.display_name || email.split("@")[0] || "User";
  const bio = profile?.bio || "";
  const gender = profile?.gender || "";
  const genderPublic = profile?.gender_public ?? false;
  const avatarUrl = profile?.avatar_url || "";

  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function save(patch: Record<string, unknown>) {
    try {
      await updateProfile(patch);
      await qc.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile updated");
    } catch (e: any) {
      toast.error("Could not save", { description: e?.message });
      throw e;
    }
  }

  async function onAvatarFile(file: File) {
    if (file.size > 4 * 1024 * 1024) {
      toast.error("Image too large", { description: "Max 4 MB." });
      return;
    }
    setUploading(true);
    try {
      const data_url = await new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.onerror = () => rej(r.error);
        r.readAsDataURL(file);
      });
      const ext =
        (file.name.split(".").pop()?.toLowerCase() as "png" | "jpg" | "jpeg" | "webp") || "png";
      await uploadAvatar({
        data_url,
        ext: ["png", "jpg", "jpeg", "webp"].includes(ext) ? ext : "png",
      });
      await qc.invalidateQueries({ queryKey: ["my-profile"] });
      toast.success("Profile photo updated");
    } catch (e: any) {
      toast.error("Upload failed", { description: e?.message });
    } finally {
      setUploading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="text-left">
          <SheetTitle className="font-display text-xl">Your account</SheetTitle>
          <SheetDescription>Manage profile and preferences.</SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex items-center gap-4">
          <div className="relative">
            <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-foreground text-background text-xl font-display">
              {avatarUrl ? (
                <img src={avatarUrl} alt={fullName} className="h-full w-full object-cover" />
              ) : (
                (fullName[0] ?? "U").toUpperCase()
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              aria-label="Change profile photo"
              className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm hover:bg-surface"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onAvatarFile(f);
                e.target.value = "";
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-lg font-semibold">{fullName}</p>
            <p className="truncate text-sm text-muted-foreground flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5" />
              {email}
              <BadgeCheck className="h-4 w-4 text-foreground" />
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <section className="space-y-4">
          <EditableText
            label="Full name"
            value={fullName}
            placeholder="Your name"
            onSave={(v) => save({ display_name: v.trim() })}
          />

          <ReadOnlyRow label="Email" value={email} />

          <EditableGender
            value={gender}
            isPublic={genderPublic}
            onSave={(g, p) => save({ gender: g || null, gender_public: p })}
          />

          <EditableText
            label="Bio"
            value={bio}
            placeholder="Tell the world what you create."
            multiline
            onSave={(v) => save({ bio: v.trim() || null })}
          />
        </section>

        <Separator className="my-6" />

        <div className="space-y-2">
          <Button asChild variant="secondary" className="w-full justify-start">
            <Link href="/app/settings" onClick={() => onOpenChange(false)}>
              Account settings
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full justify-start">
            <Link href="/app/billing" onClick={() => onOpenChange(false)}>
              Billing & credits
            </Link>
          </Button>
          <Button asChild variant="secondary" className="w-full justify-start">
            <Link href="/auth/reset-password" onClick={() => onOpenChange(false)}>
              Change password
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={async () => {
              await signOut();
              onOpenChange(false);
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ReadOnlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-right text-sm break-all">{value}</span>
    </div>
  );
}

function EditableText({
  label,
  value,
  placeholder,
  multiline,
  onSave,
}: {
  label: string;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  onSave: (v: string) => Promise<void> | void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  async function commit() {
    if (draft === value) {
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
    } catch {
      // Toast handled by caller.
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-2">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        {editing ? (
          <div className="mt-1.5 space-y-2">
            {multiline ? (
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={placeholder}
                rows={3}
                maxLength={500}
              />
            ) : (
              <Input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={placeholder}
                maxLength={80}
              />
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={commit} disabled={saving}>
                <Check className="mr-1 h-3.5 w-3.5" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setDraft(value);
                  setEditing(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-1 break-words text-sm">
            {value || <span className="text-muted-foreground">{placeholder || "-"}</span>}
          </p>
        )}
      </div>
      {!editing && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label={`Edit ${label}`}
          className="mt-5 grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function EditableGender({
  value,
  isPublic,
  onSave,
}: {
  value: string;
  isPublic: boolean;
  onSave: (gender: string, isPublic: boolean) => Promise<void> | void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [pub, setPub] = useState(isPublic);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) {
      setDraft(value);
      setPub(isPublic);
    }
  }, [value, isPublic, editing]);

  async function commit() {
    setSaving(true);
    try {
      await onSave(draft, pub);
      setEditing(false);
    } catch {
      // Toast handled by caller.
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto] items-start gap-2">
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Gender</p>
        {editing ? (
          <div className="mt-1.5 space-y-3">
            <Select
              value={draft || "unset"}
              onValueChange={(v) => setDraft(v === "unset" ? "" : v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unset">Not specified</SelectItem>
                {GENDERS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center justify-between rounded-md border border-border bg-surface/50 px-3 py-2">
              <span className="flex items-center gap-2 text-sm">
                {pub ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                {pub ? "Public on profile" : "Private"}
              </span>
              <Switch checked={pub} onCheckedChange={setPub} />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={commit} disabled={saving}>
                <Check className="mr-1 h-3.5 w-3.5" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-1 flex items-center gap-2 text-sm">
            <span className={value ? "" : "text-muted-foreground"}>{value || "Not specified"}</span>
            <Badge variant="secondary" className="gap-1">
              {isPublic ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              {isPublic ? "Public" : "Private"}
            </Badge>
          </p>
        )}
      </div>
      {!editing && (
        <button
          type="button"
          onClick={() => setEditing(true)}
          aria-label="Edit gender"
          className="mt-5 grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
