"use client";

import { AppShell } from "@/components/app/AppShell";
import { ComingSoon } from "@/components/site/ComingSoon";

export default function CanvasPage() {
  return (
    <AppShell>
      <ComingSoon
        title="AI Canvas Editor"
        description="Inpaint, outpaint, upscale and remove background â€” all in the browser."
        back="/app/generate"
      />
    </AppShell>
  );
}
