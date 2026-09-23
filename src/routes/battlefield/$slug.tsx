import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BreathOrb } from "@/components/breath-orb";
import { PageMark } from "@/components/page-mark";
import { PrintRow } from "@/components/print-button";
import { SpeakButton } from "@/components/speak-button";
import { TeachBody } from "@/components/teach-body";
import { useDebouncedSave } from "@/lib/autosave";
import { chambers, chambersBySlug, neighbors } from "@/lib/content/chambers";
import { chamberSits } from "@/lib/content/chamber-sits";
import { chamberHow } from "@/lib/content/meta";
import { overlays } from "@/lib/content/overlays";
import { glossTitle } from "@/lib/gloss-title";
import { useScrollPlace } from "@/lib/scroll-place";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/battlefield/$slug")({ component: ChamberPage });

function ChamberPage() {
  const { slug } = Route.useParams();
  const chamber = chambersBySlug[slug];
  if (!chamber) throw notFound();
  return <ChamberWork key={slug} slug={slug} />;
}

function ChamberWork({ slug }: { slug: string }) {
  const chamber = chambersBySlug[slug];
  if (!chamber) throw notFound();
  const work = overlays[slug];
  const ponderings = work?.ponderings ?? chamber.ponderings;
  const activation = work?.activation ?? chamber.activation;
  const exWork = work?.exercise ?? chamber.exercise;
  const meditation = work?.meditation ?? chamber.meditation;
  const sit = chamberSits[slug];
  const visit = useSanctuary((s) => s.visitChamber);
  const addJournal = useSanctuary((s) => s.addJournal);
  const touchLast = useSanctuary((s) => s.touchLast);
  const sealChamber = useSanctuary((s) => s.sealChamber);
  const sealed = useSanctuary((s) => Boolean(s.chamberSeal[slug]));
  const saved = useSanctuary((s) => s.chamberVisit[slug]);
  const [ponder, setPonder] = useState(saved?.ponder ?? "");
  const [exercise, setExercise] = useState(saved?.exercise ?? "");
  const [kept, setKept] = useState<"ponder" | "exercise" | null>(null);
  const { prev, next } = neighbors(slug);
  const place = chambers.findIndex((c) => c.slug === slug);

  useScrollPlace(`chamber:${slug}`);

  useEffect(() => {
    visit(slug);
    touchLast({ kind: "chamber", slug, label: chamber.title });
    setPonder(useSanctuary.getState().chamberVisit[slug]?.ponder ?? "");
    setExercise(useSanctuary.getState().chamberVisit[slug]?.exercise ?? "");
    setKept(null);
  }, [slug, visit, touchLast, chamber.title]);

  useDebouncedSave(ponder, (v) => visit(slug, { ponder: v }));
  useDebouncedSave(exercise, (v) => visit(slug, { exercise: v }));

  return (
    <main className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/mark-watch.jpg"
        kicker={`Chambers · Part One · ${chamber.number} · ${place + 1} of ${chambers.length}`}
        title={glossTitle(chamber.title)}
        aside={<PrintRow pageLabel="Print this chamber" />}
        bodyBelow
      >
        <p className="mt-3 font-display text-xl italic text-gold">{chamber.kicker}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Five doors, in this order: Teach, Ponder, Breathe, Activate, Exercise. Sit each one. What you write is kept
          as you type. Keep this copies it into Journal. You will find it later on Pages. Gold-underlined words open
          Kirby’s glossary without leaving the room.
        </p>
        <p className="mt-2 text-xs text-muted">Saved on this device — export from Pages if you change phones.</p>
      </PageMark>

      <section className="mt-12">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">
          {chamberHow[0].n} {chamberHow[0].t}
        </p>
        <p className="mt-2 text-sm text-muted">{chamberHow[0].b}</p>
        <TeachBody blocks={chamber.teaching} live />
        {chamber.scripture.text ? (
          <blockquote className="mt-8 border-l-2 border-gold pl-5">
            <p className="font-display text-xl italic text-ivory">“{chamber.scripture.text}”</p>
            <cite className="mt-2 block text-xs tracking-[0.2em] text-gold uppercase not-italic">
              {chamber.scripture.ref}
            </cite>
          </blockquote>
        ) : null}
      </section>

      <section className="mt-12 rounded-xl border border-border bg-surface p-5 md:p-6">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">
          {chamberHow[1].n} {chamberHow[1].t}
        </p>
        <p className="mt-2 text-sm text-muted">{chamberHow[1].b}</p>
        <ol className="mt-4 grid gap-3">
          {ponderings.map((q) => (
            <li key={q} className="text-ivory">
              {q}
            </li>
          ))}
        </ol>
        <textarea
          value={ponder}
          onChange={(e) => setPonder(e.target.value)}
          rows={6}
          placeholder={ponderings[0]}
          className="mt-5 w-full resize-y rounded-md border border-border bg-bg px-3 py-2 text-sm text-ivory outline-none focus:border-border-strong"
        />
        <button
          type="button"
          className="mt-3 min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg"
          onClick={() => {
            visit(slug, { ponder });
            if (ponder.trim()) addJournal({ title: `Ponderings · ${chamber.title}`, body: ponder, chamber: slug });
            setKept("ponder");
          }}
        >
          Keep this
        </button>
        {kept === "ponder" ? (
          <p className="mt-2 text-xs text-gold">Kept in Journal. Also saved on this device as you type.</p>
        ) : (
          <p className="mt-2 text-xs text-muted">Writing is kept on this device as you type.</p>
        )}
      </section>

      <section className="mt-12 rounded-xl border border-border bg-surface py-8 md:py-10">
        <p className="px-5 text-xs tracking-[0.22em] text-gold uppercase md:px-8">
          {chamberHow[2].n} {chamberHow[2].t} · {sit?.title ?? meditation.title} · 2 min
        </p>
        {sit ? (
          <div className="mt-4 space-y-5 px-5 md:px-8">
            <div>
              <p className="text-xs tracking-[0.2em] text-gold uppercase">What this sitting is for</p>
              <p className="mt-2 leading-relaxed text-ivory">{sit.forThis}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-gold uppercase">You are meditating on this</p>
              <p className="mt-2 leading-relaxed text-ivory">{sit.onThis}</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-gold uppercase">How to sit</p>
              <p className="mt-2 leading-relaxed text-muted">{sit.how}</p>
              <ul className="mt-3 grid gap-1 text-sm text-muted">
                <li>
                  <span className="text-gold">Inhale {sit.inhale}s.</span> {sit.phases.inhale}
                </li>
                <li>
                  <span className="text-gold">Hold {sit.hold}s.</span> {sit.phases.hold}
                </li>
                <li>
                  <span className="text-gold">Exhale {sit.exhale}s.</span> {sit.phases.exhale}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-2 px-5 text-sm text-muted md:px-8">{chamberHow[2].b}</p>
        )}
        <div className="mt-8">
          <BreathOrb
            inhale={sit?.inhale ?? meditation.inhale}
            hold={sit?.hold ?? meditation.hold}
            exhale={sit?.exhale ?? meditation.exhale}
            durationMin={2}
            guidance={sit?.guidance ?? meditation.guidance}
            phases={sit?.phases}
          />
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-surface p-5 md:p-8">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">
          {chamberHow[3].n} {chamberHow[3].t} · {activation.title}
        </p>
        <p className="mt-2 text-sm text-muted">{chamberHow[3].b}</p>
        <div className="mt-6 space-y-3">
          {activation.lines.map((l) => (
            <p key={l} className="font-display text-xl text-ivory">
              {l}
            </p>
          ))}
        </div>
        <div className="mt-6">
          <SpeakButton text={activation.lines.join(" ")} label="Speak" />
        </div>
        <p className="mt-3 text-xs text-muted">
          Hear it first with Speak. Then read the decree several times out loud yourself.
        </p>
      </section>

      <section className="mt-12 rounded-xl border border-border bg-surface p-5 md:p-6">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">
          {chamberHow[4].n} {chamberHow[4].t} · {exWork.title}
        </p>
        <p className="mt-2 text-sm text-muted">{chamberHow[4].b}</p>
        <p className="mt-3 text-muted">{exWork.prompt}</p>
        <textarea
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          rows={5}
          placeholder={exWork.prompt}
          className="mt-4 w-full resize-y rounded-md border border-border bg-bg px-3 py-2 text-sm text-ivory outline-none focus:border-border-strong"
        />
        <button
          type="button"
          className="mt-3 min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg"
          onClick={() => {
            visit(slug, { exercise });
            if (exercise.trim())
              addJournal({ title: `${exWork.title} · ${chamber.title}`, body: exercise, chamber: slug });
            setKept("exercise");
          }}
        >
          Keep this
        </button>
        {kept === "exercise" ? (
          <p className="mt-2 text-xs text-gold">Kept in Journal. Also saved on this device as you type.</p>
        ) : (
          <p className="mt-2 text-xs text-muted">Writing is kept on this device as you type.</p>
        )}
      </section>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => sealChamber(slug, !sealed)}
          className={
            sealed
              ? "min-h-11 rounded-full border border-gold px-5 text-sm text-gold"
              : "min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg hover:bg-gold"
          }
        >
          {sealed ? "Sealed · unseal" : "Mark complete"}
        </button>
        {sealed ? <p className="text-sm text-gold">This chamber is sealed. Continue when you are ready.</p> : null}
      </div>

      <nav className="mt-8 rounded-xl border border-border bg-surface px-5 py-6 md:px-8">
        {next ? (
          <div>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Continue to next · {next.number}</p>
            <p className="mt-2 font-display text-2xl text-ivory">{glossTitle(next.title)}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              This room is finished when you have taught, pondered, breathed, spoken, and written. Then open the next
              chapter — not before.
            </p>
            <Link
              to="/battlefield/$slug"
              params={{ slug: next.slug }}
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
            >
              Continue to next
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Part One is complete</p>
            <p className="mt-2 font-display text-2xl text-ivory">Proceed to Assess</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              That is the next step — not Authority yet. Name what these chambers woke, then take back the ground.
            </p>
            <Link
              to="/assessment"
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
            >
              Continue to Assess
            </Link>
          </div>
        )}
        {prev ? (
          <p className="mt-6 text-sm text-muted">
            <Link to="/battlefield/$slug" params={{ slug: prev.slug }} className="hover:text-gold">
              Previous chamber: {glossTitle(prev.title)}
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-sm text-muted">
            <Link to="/introduction" className="hover:text-gold">
              Previous: Introduction
            </Link>
          </p>
        )}
      </nav>
    </main>
  );
}
