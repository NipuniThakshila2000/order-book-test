import { Link } from "@tanstack/react-router";
import { ContinueLink } from "@/components/continue-link";
import { cn } from "@/lib/cn";
import { useWalkProgress } from "@/lib/progress";
import { useSanctuary } from "@/lib/store";

export function ProgressRail() {
  const p = useWalkProgress();
  const last = useSanctuary((s) => s.last);

  const items = [
    { to: "/stillness" as const, label: "Stillness", done: p.stillness, mark: p.stillness ? "sat" : "" },
    {
      to: "/battlefield" as const,
      label: "Chambers",
      done: p.chambersLit === p.chambersTotal,
      mark: `${p.chambersLit}/${p.chambersTotal}`,
    },
    { to: "/assessment" as const, label: "Assess", done: p.assessDone, mark: p.assessDone ? "named" : "" },
    {
      to: "/authority" as const,
      label: "Authority",
      done: p.stepsSealed === p.stepsTotal,
      mark: `${p.stepsSealed}/${p.stepsTotal}`,
    },
    { to: "/light" as const, label: "The Light", done: p.lightSeen, mark: p.lightSeen ? "kept" : "" },
  ];

  return (
    <div className="no-print border-t border-border/50 bg-surface/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2 md:px-6">
        <nav aria-label="Walk progress" className="flex min-w-0 flex-1 flex-wrap items-center gap-x-3 gap-y-1">
          {items.map((it, i) => (
            <span key={it.to} className="flex items-center gap-3">
              {i > 0 ? <span className="text-border">·</span> : null}
              <Link
                to={it.to}
                className={cn(
                  "text-xs tracking-[0.14em] uppercase",
                  it.done ? "text-gold" : "text-muted hover:text-ivory",
                )}
              >
                {it.label}
                {it.mark ? <span className="ml-1 tabular-nums tracking-normal normal-case"> {it.mark}</span> : null}
              </Link>
            </span>
          ))}
        </nav>
        {last ? <ContinueLink place={last} prefix="Resume" compact /> : null}
      </div>
    </div>
  );
}
