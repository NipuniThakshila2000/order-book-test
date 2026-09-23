import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { PageMark } from "@/components/page-mark";
import { BookPdfLink } from "@/components/print-button";
import { glossary } from "@/lib/content/glossary";
import { glossId } from "@/lib/gloss";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/glossary")({ component: GlossaryPage });

function GlossaryPage() {
  const [q, setQ] = useState("");
  const hash = useRouterState({ select: (s) => s.location.hash.replace(/^#/, "") });
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return glossary;
    return glossary.filter((g) => g.term.toLowerCase().includes(n) || g.body.toLowerCase().includes(n));
  }, [q]);

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [hash, list]);

  return (
    <main className="page-enter mx-auto max-w-6xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/nave.jpg"
        kicker="Language of the walk"
        title="Glossary"
        aside={<BookPdfLink />}
        bodyBelow
      >
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Open this when a word is new. These are Kirby’s own glossary from the back of ORDER — Accusation through
          Zeal — with the Scripture he set beside each one. Come back as you walk. The language is part of the occupancy.
        </p>
      </PageMark>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Find a word — rank, yoke, Jezebel…"
        className="mt-8 w-full max-w-xl rounded-xl border border-border bg-surface px-4 py-3 text-ivory outline-none focus:border-gold"
      />
      <p className="mt-3 text-xs text-subtle">
        {q.trim() ? `${list.length} of ${glossary.length}` : `${glossary.length} words`}
      </p>
      <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((g) => {
          const id = glossId(g.term);
          return (
            <div
              key={g.term}
              id={id}
              className={cn(
                "scroll-mt-24 rounded-xl border bg-surface p-5",
                hash === id ? "border-gold" : "border-border",
              )}
            >
              <dt className="font-display text-2xl text-ivory">{g.term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{g.body}</dd>
            </div>
          );
        })}
      </dl>
    </main>
  );
}
