import { motion } from "motion/react";
import type { ReactNode } from "react";

export function ToolShell({
  controls,
  preview,
  footer,
}: {
  controls: ReactNode;
  preview: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-8">
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="lg:sticky lg:top-24 lg:self-start"
      >
        <div className="rounded-3xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm sm:p-6">
          {controls}
        </div>
      </motion.aside>
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="min-w-0 space-y-6"
      >
        {preview}
        {footer}
      </motion.section>
    </div>
  );
}
