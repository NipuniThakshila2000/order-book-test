import { createFileRoute, Link } from "@tanstack/react-router";
import { PageMark } from "@/components/page-mark";
import { PrintRow } from "@/components/print-button";
import { SpeakButton } from "@/components/speak-button";
import { decrees, prayers, type Spoken } from "@/lib/content/prayers";
import { reassignmentPrayers } from "@/lib/content/book-passages";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/prayers")({ component: PrayersPage });

function SpokenCard({ p }: { p: Spoken }) {
  const marks = useSanctuary((s) => s.prayerMarks);
  const mark = useSanctuary((s) => s.markPrayer);
  return (
    <article className="rounded-xl border border-border bg-surface p-5 md:p-6">
      {p.ref ? <p className="text-xs tracking-[0.2em] text-gold uppercase">{p.ref}</p> : null}
      <h3 className={`font-display text-2xl text-ivory ${p.ref ? "mt-2" : ""}`}>{p.title}</h3>
      <p className="mt-1 text-sm italic text-gold">{p.kicker}</p>
      <div className="mt-4 space-y-3">
        {p.lines.map((l) => (
          <p key={l} className="font-display text-lg leading-snug text-ivory">
            {l}
          </p>
        ))}
      </div>
      <div className="no-print mt-5 flex flex-wrap gap-3">
        <SpeakButton text={p.lines.join(" ")} label="Speak" />
        <button
          type="button"
          onClick={() => mark(p.id)}
          className="min-h-11 rounded-full border border-border px-5 text-sm text-ivory"
        >
          {marks[p.id] ? "Spoken" : "I have spoken this"}
        </button>
      </div>
    </article>
  );
}

function PrayersPage() {
  return (
    <main className="page-enter mx-auto max-w-6xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/mark-authority.jpg"
        kicker="Spoken work"
        title="Prayers and Decrees"
        aside={<PrintRow pageLabel="Print prayers" />}
        bodyBelow
      >
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Two kinds of speech. Prayers you bring to God. Decrees you say over your life from His Word and from this
          book. First press Speak and hear it. Then say the lines yourself, slowly, more than once. Do not perform.
          Occupy.{" "}
          <Link to="/print" search={{ pack: "prayers" }} className="text-gold hover:text-ivory">
            Print the prayers pack
          </Link>
          .
        </p>
      </PageMark>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-3xl text-ivory">Prayers</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Addressed to Him. Morning, before a chamber, after a step that undid you, when you have no words. The
            opening search is a good place to begin every sitting.
          </p>
          <div className="mt-6 grid gap-4">
            {prayers.map((p) => (
              <SpokenCard key={p.id} p={p} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-3xl text-ivory">Decrees</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Occupancy spoken — from Colossians, from the chambers, from the rank Kirby teaches. Say them over your
            house, your mind, your body, your day. Return to the same one until it is no longer a speech.
          </p>
          <div className="mt-6 grid gap-4">
            {decrees.map((p) => (
              <SpokenCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-3xl text-ivory">Supplementary reassignment prayers</h2>
        <p className="mt-3 max-w-3xl leading-relaxed text-muted">
          From the back of the book — after Step 5, when you have judged and cast down, and you need language for
          where to send what was bound. Kirby’s own list, to get you started.
        </p>
        <div className="mt-6 space-y-4">
          {reassignmentPrayers.map((p) => (
            <article key={p.slice(0, 48)} className="rounded-xl border border-border bg-surface p-5">
              <p className="leading-relaxed text-ivory">{p}</p>
              <div className="mt-4">
                <SpeakButton text={p} label="Hear this prayer" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
