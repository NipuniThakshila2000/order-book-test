import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookDocument } from "@/components/book-document";
import { BookPdfLink, PrintButton } from "@/components/print-button";
import { TeachBody } from "@/components/teach-body";
import {
  assessFields,
  assessmentItems,
  entryPoints,
} from "@/lib/content/assessment";
import { reassignmentPrayers } from "@/lib/content/book-passages";
import { decrees, prayers } from "@/lib/content/prayers";
import { readChapters } from "@/lib/content/read-chapters";
import { steps } from "@/lib/content/steps";
import { useSanctuary } from "@/lib/store";

type Pack = "read" | "assess" | "steps" | "prayers" | "full";

function packOf(v: unknown): Pack {
  if (v === "assess" || v === "steps" || v === "prayers" || v === "full" || v === "read") return v;
  return "read";
}

export const Route = createFileRoute("/print")({
  validateSearch: (s: Record<string, unknown>): { pack?: string; chapter?: string } => ({
    pack: typeof s.pack === "string" ? s.pack : undefined,
    chapter: typeof s.chapter === "string" ? s.chapter : undefined,
  }),
  component: PrintPage,
});

const packs: { id: Pack; label: string; hint: string }[] = [
  { id: "read", label: "Read by chapter", hint: "One chapter at a time" },
  { id: "assess", label: "Assess worksheet", hint: "Your answers" },
  { id: "steps", label: "Seven Steps", hint: "Practice sheets" },
  { id: "prayers", label: "Prayers", hint: "Spoken work only" },
];

function PrintPage() {
  const search = Route.useSearch() as { pack?: string; chapter?: string };
  const pack = packOf(search.pack);
  const chapter = search.chapter;
  return (
    <main className="bg-bg pb-20">
      <div className="no-print border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-6 md:px-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs tracking-[0.28em] text-gold uppercase">Download and print</p>
              <h1 className="mt-1 font-display text-3xl text-ivory">The manuscript, in order</h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Read one chapter at a time on screen. Download the whole book as a PDF to keep. Print packs are
                worksheets — Assess, the seven steps, or the prayers — not the entire feast at once.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row md:flex-col">
              <BookPdfLink label="Download the book (PDF)" variant="solid" />
              <PrintButton label="Print this view" />
            </div>
          </div>
          <nav className="flex flex-wrap gap-2" aria-label="Print packs">
            {packs.map((p) => (
              <Link
                key={p.id}
                to="/print"
                search={{ pack: p.id, chapter: p.id === "read" ? chapter : undefined }}
                className={`min-h-9 rounded-full px-4 text-xs ${
                  pack === p.id ? "bg-ivory text-bg" : "border border-border text-muted hover:text-ivory"
                }`}
              >
                {p.label}
              </Link>
            ))}
            <Link
              to="/print"
              search={{ pack: "full" }}
              className={`min-h-9 rounded-full px-4 text-xs ${
                pack === "full" ? "bg-ivory text-bg" : "border border-border text-muted hover:text-ivory"
              }`}
            >
              Browser print · whole book
            </Link>
          </nav>
        </div>
      </div>
      {pack === "full" ? (
        <div className="mx-auto max-w-3xl px-4 py-8 md:px-0">
          <BookDocument />
        </div>
      ) : pack === "assess" ? (
        <AssessPack />
      ) : pack === "steps" ? (
        <StepsPack />
      ) : pack === "prayers" ? (
        <PrayersPack />
      ) : (
        <ChapterReader chapterId={chapter} />
      )}
    </main>
  );
}

function ChapterReader({ chapterId }: { chapterId?: string }) {
  const navigate = useNavigate();
  const chapters = readChapters();
  const i = Math.max(
    0,
    chapterId ? chapters.findIndex((c) => c.id === chapterId) : 0,
  );
  const cur = chapters[i] ?? chapters[0];
  const prev = chapters[i - 1];
  const next = chapters[i + 1];
  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:px-0">
      <label className="no-print block text-xs tracking-[0.18em] text-gold uppercase">
        Chapter
        <select
          className="mt-2 block min-h-11 w-full rounded-lg border border-border bg-surface px-3 text-sm text-ivory"
          value={cur.id}
          onChange={(e) => {
            const id = e.target.value;
            void navigate({ to: "/print", search: { pack: "read", chapter: id } });
          }}
        >
          {chapters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.kicker} · {c.title}
            </option>
          ))}
        </select>
      </label>
      <article className="book-document mt-8">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">{cur.kicker}</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">{cur.title}</h2>
        <TeachBody blocks={cur.blocks} className="mt-8 space-y-4 text-lg leading-relaxed text-ivory" />
      </article>
      <nav className="no-print mt-10 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link
            to="/print"
            search={{ pack: "read", chapter: prev.id }}
            className="text-sm text-gold hover:text-ivory"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        <p className="text-xs text-muted tabular-nums">
          {i + 1} of {chapters.length}
        </p>
        {next ? (
          <Link
            to="/print"
            search={{ pack: "read", chapter: next.id }}
            className="text-sm text-gold hover:text-ivory"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}

function AssessPack() {
  const notes = useSanctuary((s) => s.notes);
  const marks = useSanctuary((s) => s.assessmentMarks) ?? {};
  return (
    <article className="book-document mx-auto max-w-3xl px-5 py-10 md:px-0">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Print pack</p>
      <h2 className="mt-2 font-display text-4xl text-ivory">Assess worksheet</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Your sitting, as kept on this device. Print this sheet. Carry it into Authority.
      </p>
      <h3 className="mt-10 font-display text-2xl text-ivory">Name what occupies</h3>
      {assessFields.map((f) => (
        <section key={f.key} className="print-avoid mt-6 rounded-xl border border-border bg-surface p-5">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">
            {f.n} · {f.t}
          </p>
          <p className="mt-2 text-sm text-muted">{f.q}</p>
          <p className="mt-3 whitespace-pre-wrap text-ivory">{notes[f.key]?.trim() || "—"}</p>
        </section>
      ))}
      <h3 className="mt-10 font-display text-2xl text-ivory">Entry points</h3>
      {entryPoints.map((ep) =>
        notes[`entry-${ep.id}`]?.trim() ? (
          <section key={ep.id} className="print-avoid mt-4 rounded-xl border border-border bg-surface p-5">
            <p className="font-display text-xl text-ivory">
              {ep.n} · {ep.title}
            </p>
            <p className="mt-3 whitespace-pre-wrap text-ivory">{notes[`entry-${ep.id}`]}</p>
          </section>
        ) : null,
      )}
      <h3 className="mt-10 font-display text-2xl text-ivory">Legal rights named</h3>
      <ul className="mt-4 grid gap-2">
        {assessmentItems
          .filter((it) => marks[it.id])
          .map((it) => (
            <li key={it.id} className="print-avoid rounded-xl border border-border bg-surface p-5">
              <p className="text-ivory">{it.label}</p>
              {notes[`assess-item-${it.id}`] ? (
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted">{notes[`assess-item-${it.id}`]}</p>
              ) : null}
            </li>
          ))}
      </ul>
      {notes.assessment ? (
        <section className="print-avoid mt-8 rounded-xl border border-border bg-surface p-5">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">Anything else</p>
          <p className="mt-3 whitespace-pre-wrap text-ivory">{notes.assessment}</p>
        </section>
      ) : null}
    </article>
  );
}

function StepsPack() {
  const sv = useSanctuary((s) => s.stepVisit);
  return (
    <article className="book-document mx-auto max-w-3xl px-5 py-10 md:px-0">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Print pack</p>
      <h2 className="mt-2 font-display text-4xl text-ivory">Seven Steps worksheet</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
        Practice sheets for Taking Back Authority. Your writing, where you have sat.
      </p>
      {steps.map((st) => (
        <section key={st.slug} className="print-chapter mt-10 rounded-xl border border-border bg-surface p-5 md:p-6">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">Step {st.n}</p>
          <h3 className="mt-2 font-display text-2xl text-ivory">{st.title}</h3>
          <p className="mt-1 italic text-gold">{st.kicker}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{st.practice}</p>
          <p className="mt-4 whitespace-pre-wrap text-ivory">{sv[st.slug]?.practice?.trim() || "—"}</p>
        </section>
      ))}
    </article>
  );
}

function PrayersPack() {
  return (
    <article className="book-document mx-auto max-w-3xl px-5 py-10 md:px-0">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Print pack</p>
      <h2 className="mt-2 font-display text-4xl text-ivory">Prayers and decrees</h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">Spoken work only — for the table, not the whole book.</p>
      <h3 className="mt-10 font-display text-2xl text-ivory">Prayers</h3>
      {prayers.map((p) => (
        <section key={p.id} className="print-avoid mt-5 rounded-xl border border-border bg-surface p-5">
          {p.ref ? <p className="text-xs tracking-[0.18em] text-gold uppercase">{p.ref}</p> : null}
          <h4 className="mt-1 font-display text-xl text-ivory">{p.title}</h4>
          <div className="mt-3 space-y-2">
            {p.lines.map((l) => (
              <p key={l} className="font-display text-lg text-ivory">
                {l}
              </p>
            ))}
          </div>
        </section>
      ))}
      <h3 className="mt-10 font-display text-2xl text-ivory">Decrees</h3>
      {decrees.map((p) => (
        <section key={p.id} className="print-avoid mt-5 rounded-xl border border-border bg-surface p-5">
          <h4 className="font-display text-xl text-ivory">{p.title}</h4>
          <div className="mt-3 space-y-2">
            {p.lines.map((l) => (
              <p key={l} className="font-display text-lg text-ivory">
                {l}
              </p>
            ))}
          </div>
        </section>
      ))}
      <h3 className="mt-10 font-display text-2xl text-ivory">Reassignment prayers</h3>
      {reassignmentPrayers.map((p) => (
        <p key={p.slice(0, 40)} className="print-avoid mt-4 leading-relaxed text-ivory">
          {p}
        </p>
      ))}
    </article>
  );
}
