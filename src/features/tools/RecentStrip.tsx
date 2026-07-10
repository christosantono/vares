import { motion } from "motion/react";

export function RecentStrip({
  label = "Recent runs",
  items,
}: {
  label?: string;
  items: { id: string; title: string; meta: string; tone?: string }[];
}) {
  if (!items.length) return null;
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
        <span className="text-xs text-muted-foreground">{items.length} items</span>
      </div>
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]">
        {items.map((it, i) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            className="group relative w-40 shrink-0 snap-start overflow-hidden rounded-2xl border border-border/60 bg-card/40"
          >
            <div
              className="aspect-square w-full"
              style={{
                background: it.tone ?? "linear-gradient(135deg, hsl(var(--primary)/0.35), hsl(var(--muted)/0.6))",
              }}
            />
            <div className="p-3">
              <p className="truncate text-xs font-medium">{it.title}</p>
              <p className="truncate text-[10px] text-muted-foreground">{it.meta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
