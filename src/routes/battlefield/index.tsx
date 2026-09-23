import { createFileRoute, Link } from "@tanstack/react-router";
import { Dust } from "@/components/dust";
import { PageMark } from "@/components/page-mark";
import { BookPdfLink } from "@/components/print-button";
import { chambers } from "@/lib/content/chambers";
import { chamberHow, partHow } from "@/lib/content/meta";
import { overlays } from "@/lib/content/overlays";
import { glossTitle } from "@/lib/gloss-title";
import { chamberDone, useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/battlefield/")({ component: BattlefieldIndex });

function BattlefieldIndex() {
  const state = useSanctuary((s) => s.chamberVisit);
  const seal = useSanctuary((s) => s.chamberSeal);
  const list = chambers.filter((c) => c.part === 1);

  return (
    <main className="relative min-h-[calc(100dvh-57px)] overflow-hidden">
      <Dust count={14} />
      <div className="page-enter relative mx-auto max-w-5xl px-5 py-12 md:py-16">
        <PageMark
          image="/images/mark-watch.jpg"
          kicker="Chambers · Part One"
          title="The Battlefield"
          aside={<BookPdfLink />}
          bodyBelow
        >
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            The book calls this Understanding the Battlefield. The link in the header is Chambers. Same rooms. Same
            walk. Numbered as Kirby numbered them.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{partHow.one}</p>
        </PageMark>

        <h2 className="mt-14 font-display text-3xl text-ivory">How to walk a chamber</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Open one room. Sit in it. Do not binge the list. In every chamber you will find the same five doors, in this
          order:
        </p>
        <ol className="mt-6 grid gap-3">
          {chamberHow.map((d) => (
            <li key={d.n} className="flex gap-5 rounded-xl border border-border bg-surface px-5 py-4">
              <div className="w-24 shrink-0">
                <p className="text-xs tracking-[0.22em] text-gold uppercase">{d.n}</p>
                <p className="mt-1 font-display text-xl text-gold">{d.t}</p>
              </div>
              <p className="leading-relaxed text-muted">{d.b}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-display text-3xl text-ivory">The chambers</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          As in the book: first the Introduction (Kirby’s own pages), then El Mistater opens Part One — not a
          numbered chapter. Then fifteen numbered chapters. The Trap of Offense is Chapter 3. Deus Revelatus
          closes the part. Walk them in that order.
        </p>
        <Link
          to="/introduction"
          className="mt-6 flex items-start gap-4 rounded-xl border border-gold/40 bg-surface p-5 hover:border-gold"
        >
          <span className="font-display text-sm tracking-[0.2em] text-gold">Intro</span>
          <div>
            <h2 className="font-display text-2xl text-ivory">Introduction</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Covering, infiltration, Leviathan — why Kirby wrote this. Read it before the rooms.
            </p>
          </div>
        </Link>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {list.map((c) => {
            const p = state[c.slug];
            const sealed = Boolean(seal[c.slug]);
            const done = sealed || chamberDone(p);
            return (
              <Link
                key={c.slug}
                to="/battlefield/$slug"
                params={{ slug: c.slug }}
                className="rounded-xl border border-border bg-surface p-5 hover:border-gold"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-sm tracking-[0.2em] text-gold">{c.number}</span>
                  <span className="text-[11px] tracking-[0.18em] text-muted uppercase">
                    {sealed ? "Sealed" : done ? "Lit" : p?.visited ? "Opened" : "Enter"}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl text-ivory">{glossTitle(c.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {overlays[c.slug]?.blurb ?? c.kicker}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 rounded-xl border border-border bg-surface px-6 py-10 text-center md:px-10">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">When Part One is walked</p>
          <h2 className="mt-3 font-display text-3xl text-ivory">Proceed to Assess</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
            That is the next step — not Authority yet. Assess is where you name what the chambers woke, specifically.
            Then the seven steps have something real to work on.
          </p>
          <Link
            to="/assessment"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
          >
            Proceed to Assess
          </Link>
        </div>
      </div>
    </main>
  );
}
