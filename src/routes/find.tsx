import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageMark } from "@/components/page-mark";
import { searchOrder } from "@/lib/find";

export const Route = createFileRoute("/find")({ component: FindPage });

function FindPage() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => searchOrder(q), [q]);

  return (
    <main className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-16">
      <PageMark image="/images/nave.jpg" kicker="Look through the house" title="Find" bodyBelow>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Type a word Kirby uses — Jezebel, scandalon, rank, El Mistater — and the rooms, steps, glossary, and
          prayers that carry it will come up. Press / from anywhere in the house to return here.
        </p>
      </PageMark>
      <input
        id="find-q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search the book…"
        autoFocus
        className="mt-8 w-full rounded-xl border border-border bg-surface px-4 py-3 text-lg text-ivory outline-none focus:border-gold"
      />
      <p className="mt-3 text-xs text-subtle">
        {q.trim().length < 2 ? "Two letters is enough to begin." : `${hits.length} place${hits.length === 1 ? "" : "s"}`}
      </p>
      <ol className="mt-6 grid gap-3">
        {hits.map((h) => (
          <li key={`${h.kind}-${h.title}-${h.slug ?? h.hash ?? ""}`}>
            {h.to === "/battlefield/$slug" && h.slug ? (
              <Link
                to="/battlefield/$slug"
                params={{ slug: h.slug }}
                className="block rounded-xl border border-border bg-surface p-5 hover:border-gold"
              >
                <HitBody kind={h.kind} title={h.title} snippet={h.snippet} />
              </Link>
            ) : h.to === "/authority/$slug" && h.slug ? (
              <Link
                to="/authority/$slug"
                params={{ slug: h.slug }}
                className="block rounded-xl border border-border bg-surface p-5 hover:border-gold"
              >
                <HitBody kind={h.kind} title={h.title} snippet={h.snippet} />
              </Link>
            ) : h.to === "/glossary" ? (
              <Link
                to="/glossary"
                hash={h.hash}
                className="block rounded-xl border border-border bg-surface p-5 hover:border-gold"
              >
                <HitBody kind={h.kind} title={h.title} snippet={h.snippet} />
              </Link>
            ) : h.to === "/prayers" ? (
              <Link to="/prayers" className="block rounded-xl border border-border bg-surface p-5 hover:border-gold">
                <HitBody kind={h.kind} title={h.title} snippet={h.snippet} />
              </Link>
            ) : h.to === "/introduction" ? (
              <Link to="/introduction" className="block rounded-xl border border-border bg-surface p-5 hover:border-gold">
                <HitBody kind={h.kind} title={h.title} snippet={h.snippet} />
              </Link>
            ) : h.to === "/light" ? (
              <Link to="/light" className="block rounded-xl border border-border bg-surface p-5 hover:border-gold">
                <HitBody kind={h.kind} title={h.title} snippet={h.snippet} />
              </Link>
            ) : (
              <Link to="/assessment" className="block rounded-xl border border-border bg-surface p-5 hover:border-gold">
                <HitBody kind={h.kind} title={h.title} snippet={h.snippet} />
              </Link>
            )}
          </li>
        ))}
      </ol>
    </main>
  );
}

function HitBody({ kind, title, snippet }: { kind: string; title: string; snippet: string }) {
  return (
    <>
      <p className="text-[11px] tracking-[0.18em] text-gold uppercase">{kind}</p>
      <h2 className="mt-1 font-display text-2xl text-ivory">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{snippet}</p>
    </>
  );
}
