import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { getMemberSummary, type MemberSummary } from "@/lib/platform";
import { placeLabel } from "@/lib/resume";
import { useWalkProgress } from "@/lib/progress";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

const startLinks = [
  { label: "Begin with Stillness", to: "/stillness", help: "Short breathing preparation" },
  { label: "Open Journey Map", to: "/path", help: "See every section in order" },
  { label: "Read Chambers", to: "/battlefield", help: "Main book reading area" },
] as const;

const workLinks = [
  { label: "Journal", to: "/journal", help: "Write or edit your private entries" },
  { label: "My Saved Pages", to: "/record", help: "See all answers you typed" },
  { label: "Assessment", to: "/assessment", help: "Continue guided questions" },
  { label: "Seven Steps", to: "/authority", help: "Continue step practice" },
] as const;

const resourceLinks = [
  { label: "Prayers", to: "/prayers", help: "Open prayers and decrees" },
  { label: "Search", to: "/find", help: "Find something in the book" },
  { label: "Glossary", to: "/glossary", help: "Understand important words" },
  { label: "Downloads", to: "/experience/downloads", help: "PDF and resources" },
] as const;

function DashboardPage() {
  const [summary, setSummary] = useState<MemberSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const progress = useWalkProgress();
  const last = useSanctuary((s) => s.last);
  const route =
    summary?.progress?.route ??
    (last?.kind === "chamber"
      ? `/battlefield/${last.slug}`
      : last?.kind === "step"
        ? `/authority/${last.slug}`
        : last?.kind === "assess"
          ? "/assessment"
          : last?.kind === "light"
            ? "/light"
            : last?.kind === "stillness"
              ? "/stillness"
              : "/path");
  const totalUnits = progress.chambersTotal + progress.stepsTotal + 4;
  const completeUnits =
    progress.chambersLit +
    progress.stepsSealed +
    (progress.stillness ? 1 : 0) +
    (progress.assessDone ? 1 : 0) +
    (progress.lightSeen ? 1 : 0);
  const percent = Math.round((completeUnits / totalUnits) * 100);

  useEffect(() => {
    void getMemberSummary()
      .then((data) => setSummary(data as MemberSummary))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load dashboard"));
  }, []);

  return (
    <main className="bg-bg px-5 py-10">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Simple home</p>
        <h1 className="mt-3 font-display text-5xl text-ivory">Your Dashboard</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Start here. Use the large button to continue, or open one group below.
        </p>
        {error ? <p className="mt-4 rounded-lg border border-border bg-surface p-4 text-muted">{error}</p> : null}

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-xl border border-gold/30 bg-surface p-6 shadow-sm">
            <p className="text-xs tracking-[0.24em] text-gold uppercase">Next step</p>
            <h2 className="mt-3 font-display text-4xl text-ivory">Continue where you stopped</h2>
            <p className="mt-3 text-muted">
              Last place: {summary?.progress?.content_id ?? (last ? placeLabel(last) : "Begin the journey")}
            </p>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-gold" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-2 text-sm text-muted">{percent}% complete</p>
            <a
              href={route}
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
            >
              Continue
            </a>
          </article>

          <article className="rounded-xl border border-border bg-surface p-6">
            <p className="text-xs tracking-[0.24em] text-gold uppercase">At a glance</p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <Metric label="Chambers" value={`${progress.chambersLit}/${progress.chambersTotal}`} />
              <Metric label="Steps" value={`${progress.stepsSealed}/${progress.stepsTotal}`} />
              <Metric label="Journal" value={`${summary?.counts?.journal ?? 0}`} />
              <Metric label="Answers" value={`${summary?.counts?.responses ?? 0}`} />
            </dl>
          </article>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <LinkGroup title="Start Here" links={startLinks} open />
          <LinkGroup title="My Work" links={workLinks} />
          <LinkGroup title="Resources" links={resourceLinks} />
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <dt className="text-xs tracking-[0.16em] text-gold uppercase">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-ivory">{value}</dd>
    </div>
  );
}

function LinkGroup({
  title,
  links,
  open,
}: {
  title: string;
  links: readonly { label: string; to: string; help: string }[];
  open?: boolean;
}) {
  return (
    <details open={open} className="rounded-xl border border-border bg-surface">
      <summary className="flex min-h-14 list-none items-center justify-between px-5 py-4">
        <span className="font-display text-2xl text-ivory">{title}</span>
        <ChevronDown className="size-5 text-gold" />
      </summary>
      <div className="border-t border-border p-3">
        {links.map((link) => (
          <a key={link.to} href={link.to} className="block rounded-lg px-4 py-3 hover:bg-bg">
            <span className="block text-sm font-medium text-ivory">{link.label}</span>
            <span className="mt-0.5 block text-xs text-muted">{link.help}</span>
          </a>
        ))}
      </div>
    </details>
  );
}
