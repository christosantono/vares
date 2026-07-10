import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export function ToolHeader({
  eyebrow,
  title,
  subtitle,
  badge,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 lg:mb-12"
    >
      <div className="flex items-center gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </p>
        {badge ? (
          <Badge variant="secondary" className="rounded-full text-[10px] uppercase tracking-widest">
            {badge}
          </Badge>
        ) : null}
      </div>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{subtitle}</p>
    </motion.header>
  );
}
