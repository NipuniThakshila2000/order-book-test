import { createFileRoute, Link } from "@tanstack/react-router";
import { BackupBar } from "@/components/backup-bar";
import { PageMark } from "@/components/page-mark";
import { PrintRow } from "@/components/print-button";
import { assessFields, assessmentItems, entryPoints } from "@/lib/content/assessment";
import { chambers } from "@/lib/content/chambers";
import { steps } from "@/lib/content/steps";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/record")({ component: RecordPage });

function RecordPage() {
  const journal = useSanctuary((s) => s.journal);
  const cv = useSanctuary((s) => s.chamberVisit);
  const sv = useSanctuary((s) => s.stepVisit);
  const notes = useSanctuary((s) => s.notes);
  const marks = useSanctuary((s) => s.assessmentMarks) ?? {};

  return (
    <main className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/nave.jpg"
        kicker="Paper"
        title="Your pages"
        aside={<PrintRow pageLabel="Print the whole record" />}
        bodyBelow
      >
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Everything you have actually written in this sanctuary, gathered as one letter: journal entries, chamber
          ponderings and exercises, the seven steps, and Assess. Kept on this device. Export a JSON backup before you
          change phones. Print this page for a paper copy of the writing.
        </p>
      </PageMark>

      <div className="mt-8">
        <BackupBar />
      </div>
      <div className="no-print mt-3 flex flex-wrap gap-3 text-sm">
        <Link to="/print" search={{ pack: "assess" }} className="text-gold hover:text-ivory">
          Export my Assess answers
        </Link>
        <span className="text-border">·</span>
        <Link to="/print" search={{ pack: "steps" }} className="text-gold hover:text-ivory">
          Seven Steps worksheet
        </Link>
        <span className="text-border">·</span>
        <Link to="/print" search={{ pack: "prayers" }} className="text-gold hover:text-ivory">
          Prayers pack
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ivory">Journal</h2>
        {journal.length === 0 ? (
          <p className="mt-3 text-sm text-muted">
            No journal entries yet.{" "}
            <Link to="/journal" className="text-gold hover:text-ivory">
              Open Journal
            </Link>
          </p>
        ) : (
          journal.map((e) => (
            <article key={e.id} className="mt-4 rounded-xl border border-border bg-surface p-5">
              <h3 className="font-display text-xl text-ivory">{e.title}</h3>
              <p className="mt-1 text-xs text-muted">{new Date(e.at).toLocaleString()}</p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-ivory">{e.body}</p>
            </article>
          ))
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ivory">Chambers</h2>
        {chambers.some((c) => cv[c.slug]?.ponder || cv[c.slug]?.exercise) ? (
          chambers.map((c) => {
            const p = cv[c.slug];
            if (!p?.ponder && !p?.exercise) return null;
            return (
              <article key={c.slug} className="mt-4 rounded-xl border border-border bg-surface p-5">
                <h3 className="font-display text-xl text-ivory">{c.title}</h3>
                {p.ponder ? <p className="mt-3 whitespace-pre-wrap text-sm text-ivory">{p.ponder}</p> : null}
                {p.exercise ? <p className="mt-3 whitespace-pre-wrap text-sm text-ivory">{p.exercise}</p> : null}
              </article>
            );
          })
        ) : (
          <p className="mt-3 text-sm text-muted">
            No chamber writings yet.{" "}
            <Link to="/battlefield" className="text-gold hover:text-ivory">
              Open Chambers
            </Link>
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ivory">Seven steps</h2>
        {steps.some((st) => sv[st.slug]?.practice) ? (
          steps.map((st) => {
            const p = sv[st.slug];
            if (!p?.practice) return null;
            return (
              <article key={st.slug} className="mt-4 rounded-xl border border-border bg-surface p-5">
                <h3 className="font-display text-xl text-ivory">
                  Step {st.n} · {st.title}
                </h3>
                <p className="mt-3 whitespace-pre-wrap text-sm text-ivory">{p.practice}</p>
              </article>
            );
          })
        ) : (
          <p className="mt-3 text-sm text-muted">
            No step writings yet.{" "}
            <Link to="/authority" className="text-gold hover:text-ivory">
              Open Authority
            </Link>
          </p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-ivory">Assessment</h2>
        {assessFields.some((f) => notes[f.key]?.trim()) ||
        notes.assessment ||
        entryPoints.some((ep) => notes[`entry-${ep.id}`]?.trim()) ||
        assessmentItems.some((it) => marks[it.id]) ? (
          <>
            {assessFields.map((f) =>
              notes[f.key]?.trim() ? (
                <article key={f.key} className="mt-4 rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-display text-xl text-ivory">{f.t}</h3>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-ivory">{notes[f.key]}</p>
                </article>
              ) : null,
            )}
            {entryPoints.map((ep) =>
              notes[`entry-${ep.id}`]?.trim() ? (
                <article key={ep.id} className="mt-4 rounded-xl border border-border bg-surface p-5">
                  <h3 className="font-display text-xl text-ivory">
                    {ep.n} · {ep.title}
                  </h3>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-ivory">{notes[`entry-${ep.id}`]}</p>
                </article>
              ) : null,
            )}
            {assessmentItems.some((it) => marks[it.id]) ? (
              <ul className="mt-4 grid gap-2">
                {assessmentItems
                  .filter((it) => marks[it.id])
                  .map((it) => (
                    <li key={it.id} className="rounded-xl border border-border bg-surface p-5">
                      <p className="font-display text-xl text-ivory">{it.label}</p>
                      {notes[`assess-item-${it.id}`] ? (
                        <p className="mt-2 whitespace-pre-wrap text-sm text-ivory">{notes[`assess-item-${it.id}`]}</p>
                      ) : null}
                    </li>
                  ))}
              </ul>
            ) : null}
            {notes.assessment ? (
              <article className="mt-4 rounded-xl border border-border bg-surface p-5">
                <h3 className="font-display text-xl text-ivory">Anything else</h3>
                <p className="mt-3 whitespace-pre-wrap text-sm text-ivory">{notes.assessment}</p>
              </article>
            ) : null}
          </>
        ) : (
          <p className="mt-3 text-sm text-muted">No assessment writings yet.</p>
        )}
      </section>
    </main>
  );
}
