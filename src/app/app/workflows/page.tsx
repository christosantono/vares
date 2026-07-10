"use client";

import { AppShell } from "@/components/app/AppShell";
import { ComingSoon } from "@/components/site/ComingSoon";

export default function WorkflowsPage() {
  return (
    <AppShell>
      <ComingSoon
        title="Workflow Builder"
        description="Chain models, conditions and outputs into reusable visual workflows."
        back="/app/generate"
      />
    </AppShell>
  );
}
