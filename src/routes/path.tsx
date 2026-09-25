import { createFileRoute, Link } from "@tanstack/react-router";
import { Dust } from "@/components/dust";
import { PageMark } from "@/components/page-mark";
import { BookPdfLink } from "@/components/print-button";
import { chambers } from "@/lib/content/chambers";
import { partHow } from "@/lib/content/meta";
import { overlays } from "@/lib/content/overlays";
import { stepBlurbs } from "@/lib/content/step-blurbs";
import { steps } from "@/lib/content/steps";
import { glossTitle } from "@/lib/gloss-title";
import { chamberDone, useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/path")({ component: PathPage });

function PathPage() {
  const cv = useSanctuary((s) => s.chamberVisit);
  const minutes = useSanctuary((s) => s.stillnessMinutes);
  const journal = useSanctuary((s) => s.journal);
  const lit = chambers.filter((c) => chamberDone(cv[c.slug])).length;

  return (
    <main className="relative min-h-[calc(100dvh-57px)] overflow-hidden">
      <Dust count={18} />
      <img
        src="/images/ornaments/broken-tower.png"
        alt=""
        aria-hidden="true"
        className="ornament pointer-events-none absolute right-[-10rem] top-32 z-0 hidden w-[30rem] rotate-[5deg] opacity-[0.08] mix-blend-multiply lg:block"
      />
      <div className="page-enter relative mx-auto max-w-5xl px-5 py-12 md:py-16">
        <PageMark
          image="/images/mark-path.jpg"
          kicker="Your walk"
          title="The path"
          aside={<BookPdfLink />}
          bodyBelow
        >
          <div className="mt-4 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            <p>
              This page is the map of the whole book. It is not a menu. You cannot jump from here into a chamber or a
              step — that is on purpose. Look down the page and see what is coming, in the order Kirby wrote it.
            </p>
            <p>
              As you begin: when you are ready to enter a room, use Chambers in the header — or Begin Chambers at the
              bottom of this page. Each chamber has its own sitting. Read the Introduction first. El Mistater opens
              Part One (not a numbered chapter). Then the fifteen numbered chapters — The Trap of Offense is Chapter 3.
              After Deus Revelatus, Assess. Then Authority. Then the Light. The count below remembers how far you have
              sat.
            </p>
            <p>
              Scroll it once before you start. You are not meant to know it all today. You are meant to see that there
              is an order, and that you will not get lost in it.
            </p>
          </div>
          <p className="mt-4 text-sm text-subtle">
            {lit} of {chambers.length} chambers lit · {minutes} minutes of stillness · {journal.length} journal entries
            kept.
          </p>
        </PageMark>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { roman: "I", t: "Chambers", sub: "The Battlefield · Part One", b: "Kirby’s name for this part is the Battlefield. The header link is Chambers. Introduction, then El Mistater, then fifteen chapters, then Deus Revelatus.", img: "/images/mark-watch.jpg" },
            { roman: "II", t: "Authority", sub: "Part Two", b: "Seven steps. Take back the ground. After Assess, not instead of it. Days on a step is faithfulness.", img: "/images/mark-authority.jpg" },
            { roman: "III", t: "The Light", sub: "Part Three", b: "Walk it with people. Covering, the prayers, a quiet commissioning. Not a shortcut around the rooms or the steps.", img: "/images/mark-light.jpg" },
          ].map((r) => (
            <li key={r.roman} className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface">
              <img src={r.img} alt="" className="h-32 w-full object-cover object-[center_58%]" />
              <div className="px-5 py-4">
                <p className="text-xs tracking-[0.2em] text-gold uppercase">{r.roman} · {r.sub}</p>
                <h2 className="mt-1 font-display text-2xl text-ivory">{r.t}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.b}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-display text-3xl text-ivory">Part One — the Battlefield</h2>
        <p className="mt-3 max-w-2xl text-muted">
          This is Chambers in the header. Read the Introduction first — it is Kirby’s own pages, before the numbered
          chapters. {partHow.one}
        </p>
        <p className="mt-3 text-sm text-gold">
          Opening · Chapters 1–15 as in the book · Close. The Trap of Offense is Chapter 3 — not chamber 4.
        </p>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2">
          <li className="flex h-full flex-col rounded-xl border border-gold/35 bg-surface p-5">
            <span className="font-display text-sm tracking-[0.2em] text-gold">Intro</span>
            <h3 className="mt-3 font-display text-2xl leading-tight text-ivory">Introduction</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Kirby’s own pages — covering, infiltration, Leviathan — before El Mistater. Not a numbered chapter.
            </p>
          </li>
          {chambers.map((c) => (
            <li key={c.slug} className="flex h-full flex-col rounded-xl border border-border bg-surface p-5">
              <span className="font-display text-sm tracking-[0.2em] text-gold">{c.number}</span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-ivory">{glossTitle(c.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{overlays[c.slug]?.blurb ?? c.kicker}</p>
            </li>
          ))}
        </ol>

        <section className="mt-16 overflow-hidden rounded-xl border border-border bg-surface">
          <img src="/images/mark-citadel.jpg" alt="" className="h-40 w-full object-cover object-center" />
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Between the Battlefield and Authority</p>
            <h2 className="mt-2 font-display text-3xl text-ivory">Assess</h2>
            <p className="mt-1 text-sm italic text-gold">Strongholds & legal rights · the header link is Assess</p>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">
              This is not a fourth part of the book. It belongs here, after Part One and before Authority.
              The chambers teach you the language — offense, rank, yoke, stronghold — so you can tell the truth about
              what has been occupying you. Assess is where you write that down, specifically, so the seven steps are
              not guesswork. If you open it first, you will tick boxes you do not yet understand. Come back to it if,
              during Authority, something new is named.
            </p>
          </div>
        </section>

        <h2 className="mt-16 font-display text-3xl text-ivory">Part Two — Taking Back Authority</h2>
        <p className="mt-3 max-w-2xl text-muted">{partHow.two}</p>
        <ol className="mt-6 grid gap-3">
          {steps.map((st) => (
            <li key={st.slug} className="flex items-start gap-5 rounded-xl border border-border bg-surface p-5">
              <span className="font-display text-2xl text-gold tabular-nums">{String(st.n).padStart(2, "0")}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl text-ivory">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{stepBlurbs[st.slug] ?? st.kicker}</p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-16 overflow-hidden rounded-xl border border-border bg-surface">
          <img src="/images/mark-light.jpg" alt="" className="h-40 w-full object-cover object-center" />
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Part Three</p>
            <h2 className="mt-2 font-display text-3xl text-ivory">Walking in the Light</h2>
            <p className="mt-3 max-w-xl text-muted">{partHow.three}</p>
            <p className="mt-3 text-sm italic text-gold">The End That Becomes a Beginning · About the Author · Acknowledgments</p>
          </div>
        </section>

        <h2 className="mt-16 font-display text-3xl text-ivory">From the back of the book</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          Nothing of Kirby’s back matter is left out. Glossary, the Strongholds & Legal Rights Assessment, the
          Supplementary Reassignment Prayers, and the 7 Steps at a Glance all live in this sanctuary — in the header
          as Glossary, Assess, Prayers, and on Authority.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { n: "Glossary", b: "Kirby’s own terms, A to Zeal, with the Scripture he set beside each one." },
            { n: "Assess", b: "Strongholds & Legal Rights Assessment — entry points, then the legal-rights checklist." },
            { n: "Prayers", b: "Spoken work, and the Supplementary Reassignment Prayers after Step 5." },
            { n: "7 Steps at a glance", b: "The short map from the back of the book, on the Authority page." },
          ].map((x) => (
            <li key={x.n} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-xl text-ivory">{x.n}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{x.b}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 rounded-xl border border-border bg-surface px-6 py-10 text-center md:px-10">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Ready to begin</p>
          <h2 className="mt-3 font-display text-3xl text-ivory">Begin Chambers</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
            You have seen the whole walk. Open Part One. Introduction first — Kirby’s own pages — then El Mistater,
            then chapter 1. Each room has its own sitting. Sit it to the end before you open the next.
          </p>
          <Link
            to="/battlefield"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
          >
            Begin Chambers
          </Link>
        </div>
      </div>
    </main>
  );
}
