import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

export function EmptyCanvas({
  icon: Icon,
  title,
  hint,
  aspect = "aspect-video",
}: {
  icon: LucideIcon;
  title: string;
  hint: string;
  aspect?: string;
}) {
  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-muted/40 via-background to-muted/20`}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 grid place-items-center px-6 text-center"
      >
        <div>
          <motion.span
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-border/60 bg-background/60 text-primary shadow-sm backdrop-blur"
          >
            <Icon className="h-6 w-6" />
          </motion.span>
          <p className="mt-4 font-display text-lg font-medium">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{hint}</p>
        </div>
      </motion.div>
    </div>
  );
}
