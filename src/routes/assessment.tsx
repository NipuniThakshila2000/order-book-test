import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageMark } from "@/components/page-mark";
import { PrintRow } from "@/components/print-button";
import { SpeakButton } from "@/components/speak-button";
import {
  assessFields,
  assessIntro,
  assessPrayerClose,
  assessPrayerMid,
  assessPrayerOpen,
  legalRights,
} from "@/lib/content/assessment";
import { ASSESS_STEPS, assessClusters, entryClusters, pointsInCluster } from "@/lib/content/assess-flow";
import { useScrollPlace } from "@/lib/scroll-place";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/assessment")({ component: AssessmentPage });

function AssessmentPage() {
  const notes = useSanctuary((s) => s.notes);
  const setNote = useSanctuary((s) => s.setNote);
  const marks = useSanctuary((s) => s.assessmentMarks) ?? {};
  const toggleAssess = useSanctuary((s) => s.toggleAssess);
  const touchLast = useSanctuary((s) => s.touchLast);
  const advisory = useSanctuary((s) => s.assessAdvisorySeen);
  const dismissAdvisory = useSanctuary((s) => s.dismissAssessAdvisory);
  const cluster = useSanctuary((s) => s.assessCluster);
  const setCluster = useSanctuary((s) => s.setAssessCluster);
  const snapshots = useSanctuary((s) => s.assessSnapshots);
  const saveSnap = useSanctuary((s) => s.saveAssessSnapshot);
  const restoreSnap = useSanctuary((s) => s.restoreAssessSnapshot);
  const extra = notes["assessment"] ?? "";
  const named = legalRights.filter((it) => marks[it.id]).length;
  const written = assessFields.filter((f) => notes[f.key]?.trim()).length;
  const step = Math.min(Math.max(cluster, 0), ASSESS_STEPS - 1);

  useEffect(() => {
    touchLast({ kind: "assess" });
  }, [touchLast]);
  useScrollPlace("assess");

  if (!advisory) {
    return (
      <main className="page-enter mx-auto max-w-2xl px-5 py-12 md:py-16">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Before Assess</p>
        <h1 className="mt-3 font-display text-4xl text-ivory">A pastoral word</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
          <p>
            This is an educational companion to Kirby’s Strongholds & Legal Rights Assessment — not a diagnosis, not a
            substitute for covering, counseling, or medical care. You are not meant to walk warfare content alone.
          </p>
          <p>
            Sit where you will not be interrupted. Invite the Holy Spirit. Tick only what He puts a finger on. If you
            begin to feel overwhelmed, stop. Breathe. Call a trusted leader. In crisis, seek help — in the US and
            Canada, 988.
          </p>
          <p>What the Spirit reveals is not to shame you. It is to set you free.</p>
        </div>
        <button
          type="button"
          onClick={() => dismissAdvisory()}
          className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
        >
          I will not walk this alone — begin
        </button>
        <p className="mt-4 text-sm text-muted">
          <Link to="/stillness" className="text-gold hover:text-ivory">
            Sit in Stillness first
          </Link>
          {" · "}
          <Link to="/prayers" className="text-gold hover:text-ivory">
            Open the prayers
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/book/order-and-rank-p042-55.jpg"
        kicker="After Part One · from the back of the book"
        title="Assess"
        aside={<PrintRow pageLabel="Print this sitting" />}
        bodyBelow
        imageClassName="bg-ivory object-contain p-3"
      >
        <p className="font-display text-2xl italic text-gold">Strongholds & Legal Rights Assessment</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          One cluster at a time. Writing is kept on this device as you type.{" "}
          {step + 1} of {ASSESS_STEPS} · {assessClusters[step].title}.
        </p>
        <p className="mt-2 text-xs text-muted">Saved on this device — export from Pages if you change phones.</p>
      </PageMark>

      <ol className="mt-8 flex flex-wrap gap-2">
        {assessClusters.map((c, i) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setCluster(i)}
              className={`min-h-9 rounded-full px-3 text-xs ${
                i === step ? "bg-ivory text-bg" : "border border-border text-muted hover:text-ivory"
              }`}
            >
              {i + 1}. {c.title}
            </button>
          </li>
        ))}
      </ol>

      {step === 0 ? (
        <section className="mt-10">
          <div className="rounded-xl border border-gold/30 bg-surface p-5 md:p-6">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Prayer before beginning</p>
            <div className="mt-4 space-y-3 font-display text-xl leading-snug text-ivory">
              {assessPrayerOpen.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <div className="mt-5">
              <SpeakButton text={assessPrayerOpen.join(" ")} label="Hear this prayer" />
            </div>
          </div>
          <h2 className="mt-10 font-display text-3xl text-ivory">Name what occupies</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Four writings — so the questionnaire is not guesswork. {written} of {assessFields.length} named.
          </p>
          <ol className="mt-8 grid gap-5">
            {assessFields.map((f) => (
              <li key={f.key} className="rounded-xl border border-border bg-surface p-5 md:p-6">
                <p className="text-xs tracking-[0.22em] text-gold uppercase">
                  {f.n} · {f.t}
                </p>
                <p className="mt-3 leading-relaxed text-muted">{f.q}</p>
                <textarea
                  value={notes[f.key] ?? ""}
                  onChange={(e) => setNote(f.key, e.target.value)}
                  rows={5}
                  placeholder={f.q}
                  className="mt-4 w-full rounded-md border border-border bg-bg px-3 py-3 text-sm leading-relaxed text-ivory"
                />
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {step >= 1 && step <= 3 ? (
        <section className="mt-10">
          <h2 className="font-display text-3xl text-ivory">{entryClusters[step - 1].title}</h2>
          <p className="mt-3 leading-relaxed text-muted">{entryClusters[step - 1].hint} Write only where He puts a finger.</p>
          <ol className="mt-8 grid gap-6">
            {pointsInCluster(step - 1).map((ep) => (
              <li key={ep.id} className="rounded-xl border border-border bg-surface p-5 md:p-6">
                <p className="text-xs tracking-[0.22em] text-gold uppercase">
                  {ep.n} · {ep.title}
                </p>
                <blockquote className="mt-4 border-l-2 border-gold pl-4">
                  <p className="font-display text-lg italic text-ivory">“{ep.scripture}”</p>
                  <cite className="mt-2 block text-xs tracking-[0.2em] text-gold uppercase not-italic">{ep.ref}</cite>
                </blockquote>
                <ul className="mt-4 grid gap-2">
                  {ep.questions.map((q) => (
                    <li key={q} className="leading-relaxed text-muted">
                      {q}
                    </li>
                  ))}
                </ul>
                <textarea
                  value={notes[`entry-${ep.id}`] ?? ""}
                  onChange={(e) => setNote(`entry-${ep.id}`, e.target.value)}
                  rows={4}
                  placeholder={ep.questions[0]}
                  className="mt-4 w-full rounded-md border border-border bg-bg px-3 py-3 text-sm leading-relaxed text-ivory"
                />
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {step === 4 ? (
        <section className="mt-10">
          <div className="rounded-xl border border-gold/30 bg-surface p-5 md:p-6">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Before the checklist</p>
            <div className="mt-4 space-y-3 font-display text-xl leading-snug text-ivory">
              {assessPrayerMid.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <div className="mt-5">
              <SpeakButton text={assessPrayerMid.join(" ")} label="Hear this prayer" />
            </div>
          </div>
          <h2 className="mt-10 font-display text-3xl text-ivory">Legal rights for strongholds</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Tick only what resonates. When a box opens, write where it lives. {named} named.
          </p>
          <ul className="mt-8 grid gap-2">
            {legalRights.map((it) => {
              const on = Boolean(marks[it.id]);
              return (
                <li key={it.id} className="rounded-xl border border-border bg-surface">
                  <label className="flex min-h-12 cursor-pointer items-start gap-3 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleAssess(it.id)}
                      className="mt-1 size-4 accent-[var(--color-gold)]"
                    />
                    <span className="text-ivory">{it.label}</span>
                  </label>
                  {on ? (
                    <div className="px-4 pb-4 pl-11">
                      <textarea
                        value={notes[`assess-item-${it.id}`] ?? ""}
                        onChange={(e) => setNote(`assess-item-${it.id}`, e.target.value)}
                        rows={3}
                        placeholder="Where does this live in you? Write a sentence."
                        className="w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-ivory"
                      />
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {step === 5 ? (
        <section className="mt-10">
          <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Reflection</p>
            <div className="mt-4 space-y-3 font-display text-lg leading-snug text-ivory">
              {assessPrayerClose.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <div className="mt-5">
              <SpeakButton text={assessPrayerClose.join(" ")} label="Hear this prayer" />
            </div>
            <p className="mt-4 leading-relaxed text-muted">{assessIntro[3]}</p>
            <textarea
              value={extra}
              onChange={(e) => setNote("assessment", e.target.value)}
              rows={5}
              placeholder="What is the most significant area to address now?"
              className="mt-4 w-full rounded-md border border-border bg-bg px-3 py-3 text-sm leading-relaxed text-ivory"
            />
          </div>
          <div className="mt-8 rounded-xl border border-border bg-surface p-5">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Keep a dated snapshot</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Save this sitting as a version you can return to. Later sittings can be compared — occupancy is patient.
            </p>
            <button
              type="button"
              onClick={() => saveSnap()}
              className="mt-4 min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg hover:bg-gold"
            >
              Keep this assessment
            </button>
            {snapshots.length > 0 ? (
              <ul className="mt-6 grid gap-2">
                {snapshots.map((s) => (
                  <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border px-4 py-3">
                    <span className="text-sm text-ivory">{new Date(s.at).toLocaleString()}</span>
                    <button type="button" onClick={() => restoreSnap(s.id)} className="text-sm text-gold">
                      Restore this sitting
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="mt-10 rounded-xl border border-border bg-surface px-6 py-10 text-center">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">When you have named it</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Take this into Authority</h2>
            <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
              Begin at Step 1. Print this sitting, or export your answers from Pages.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/authority"
                className="inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
              >
                Proceed to Authority
              </Link>
              <Link
                to="/print"
                search={{ pack: "assess" }}
                className="inline-flex min-h-12 items-center rounded-full border border-border px-8 text-sm text-ivory hover:border-gold"
              >
                Export my Assess answers
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setCluster(step - 1)}
          className="min-h-11 rounded-full border border-border px-5 text-sm text-ivory disabled:opacity-40"
        >
          Back
        </button>
        <p className="text-xs tracking-[0.16em] text-muted uppercase tabular-nums">
          {step + 1} of {ASSESS_STEPS}
        </p>
        {step < ASSESS_STEPS - 1 ? (
          <button
            type="button"
            onClick={() => setCluster(step + 1)}
            className="min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg hover:bg-gold"
          >
            Next
          </button>
        ) : (
          <span className="min-h-11" />
        )}
      </nav>
    </main>
  );
}
