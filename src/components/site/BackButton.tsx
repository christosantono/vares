import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton({
  className = "",
  hideOn = [],
  label = "Back",
}: {
  className?: string;
  hideOn?: string[];
  label?: string;
}) {
  const router = useRouter();
  const path = usePathname();
  if (hideOn.includes(path)) return null;

  const onClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:bg-surface hover:text-foreground ${className}`}
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
