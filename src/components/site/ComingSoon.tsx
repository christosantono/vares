import Link from "next/link";

export function ComingSoon({
  title,
  description,
  back = "/",
}: {
  title: string;
  description: string;
  back?: string;
}) {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Coming soon
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
        <Link
          href={back}
          className="mt-8 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
