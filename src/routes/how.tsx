import { createFileRoute, Link } from "@tanstack/react-router";
import { Dust } from "@/components/dust";
import { PageMark } from "@/components/page-mark";
import { BookPdfLink } from "@/components/print-button";
import { howToUse, partHow } from "@/lib/content/meta";

export const Route = createFileRoute("/how")({ component: HowPage });

const sequence = [
  {
    n: "01",
    t: "Orient here",
    where: "How to use",
    to: "/how" as const,
    b: "You are here. This page is the map. Read it once before you enter a chamber. Come back whenever a name in the header is still unnamed. The crown that says ORDER is the title page — return there when you want the whole house in one glance.",
  },
  {
    n: "02",
    t: "Sit before you study",
    where: "Stillness",
    to: "/stillness" as const,
    b: "Intimacy is the source of authority. Guided breath with a living orb. Choose one of the three exercises for this sitting — Temple breath, Match His stride, or Held together. You do not have to do all three today. Sit it to the end. Then study.",
  },
  {
    n: "03",
    t: "See the whole feast",
    where: "Path",
    to: "/path" as const,
    b: "The map of the whole book — not a menu. Scroll it once so you can see what is coming: Chambers, then Assess, then the seven steps, then the Light. The rooms on this page are not doors. That is on purpose. When you are ready to enter, use Chambers in the header, or the button at the bottom of Path.",
  },
  {
    n: "04",
    t: "Part I — the Battlefield",
    where: "Chambers",
    to: "/battlefield" as const,
    b: "Kirby names this part Understanding the Battlefield. In the header the link is Chambers — that is the door. Read the Introduction first. El Mistater opens the part (not a numbered chapter). Then fifteen chapters as in the book — The Trap of Offense is Chapter 3. Deus Revelatus closes it. In each room: Teach, Ponder, Breathe, Activate, Exercise. Do not binge the list.",
  },
  {
    n: "05",
    t: "Name what occupies",
    where: "Assess",
    to: "/assessment" as const,
    b: "After Part One — not before. A pastoral word first. Then a stepped sitting: name what occupies, three clusters of entry points, then the legal-rights checklist. Back and Next. Keep dated snapshots. Carry that into Authority.",
  },
  {
    n: "06",
    t: "Part II — authority",
    where: "Authority",
    to: "/authority" as const,
    b: "Seven steps. Open one. Sit in it. Identify the curse, reveal the stronghold, confess-forgive-repent, submit to Order, judge and reassign, command alignment, testify and keep honor. Each has teaching and a written practice. Days on a single step is faithfulness. Use Assess beside you. Do not skip.",
  },
  {
    n: "07",
    t: "Part III — the light",
    where: "The Light",
    to: "/light" as const,
    b: "The end that becomes a beginning — after Authority, not instead of it. Covering, testimony, the prayers, and a quiet commissioning. Stay. Do not treat the book as finished and walk home alone.",
  },
];

const tools = [
  {
    label: "Journal",
    to: "/journal" as const,
    body: "This is your notebook for the walk — already here, already saved. Write before a chamber, after one, or at two in the morning. Hit Keep this when you’re done. You can find every entry again on this page, and later on Pages if you want a printed copy.",
  },
  {
    label: "Prayers",
    to: "/prayers" as const,
    body: "Two kinds of speech. Prayers you bring to God. Decrees you say over your life from His Word and this book. Press Speak and hear it first. Then say the lines yourself, out loud, more than once. Morning, after a hard step, when you have no words.",
  },
  {
    label: "Pages",
    to: "/record" as const,
    body: "A gathering of what you actually wrote: ponderings, exercises, journal notes, the assessment, the seven steps. One place to read it back. Export a JSON backup before you change phones. Print Pages for a paper copy of the writing.",
  },
  {
    label: "Glossary",
    to: "/glossary" as const,
    body: "When Kirby uses a word you don’t live in yet — El Mistater, occupancy, rank, yoke, jurisdiction — look it up here. In a chamber, gold-underlined words open the same definitions without leaving the room.",
  },
  {
    label: "Find",
    to: "/find" as const,
    body: "Type a word Kirby uses — Jezebel, scandalon, rank — and the rooms, steps, glossary, and prayers that carry it will come up. Press / from anywhere in the house.",
  },
  {
    label: "Download",
    to: "/print" as const,
    body: "The entire manuscript as a PDF — cover, chambers, assessment, the seven steps, the Light, prayers, and glossary. Read by chapter on screen. Print packs for Assess, the seven steps, or the prayers only.",
  },
];

function HowPage() {
  return (
    <main className="relative min-h-[calc(100dvh-57px)] overflow-hidden">
      <Dust count={14} />
      <div className="page-enter relative mx-auto max-w-4xl px-5 py-12 md:py-16">
        <PageMark
          image="/images/mark-how.jpg"
          kicker="How To Use This Book"
          title="How to use this book"
          aside={<BookPdfLink />}
          bodyBelow
        >
          <p className="mt-4 text-lg leading-relaxed text-muted">{howToUse.feast}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted">{howToUse.notAFormula}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted">{howToUse.repetition}</p>
        </PageMark>

        <h2 className="mt-16 font-display text-3xl text-ivory">The three parts, as written</h2>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          From How To Use This Book — Kirby’s own map of the feast, before you enter a chamber.
        </p>
        <ol className="mt-8 grid gap-4">
          {[
            { n: "Part One", t: "Understanding the Battlefield", b: partHow.one },
            { n: "Part Two", t: "Taking Back Authority", b: partHow.two },
            { n: "Part Three", t: "Walking in the Light", b: partHow.three },
          ].map((p) => (
            <li key={p.n} className="rounded-xl border border-border bg-surface p-5 md:p-6">
              <p className="text-xs tracking-[0.22em] text-gold uppercase">{p.n}</p>
              <h3 className="mt-2 font-display text-2xl text-ivory">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.b}</p>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-display text-3xl text-ivory">The order of the walk</h2>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          The links in the header of every page are this walk, in this order. Start at How to use. Then Stillness,
          Path, Chambers, Assess, Authority, The Light. The links to the right of those — Journal, Prayers, Pages,
          Glossary, Find, Download — are tools, not another part of the book. They are described at the bottom of this page.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full min-w-[36rem] text-left">
            <thead>
              <tr className="border-b border-border text-xs tracking-[0.18em] text-gold uppercase">
                <th className="px-4 py-3 font-medium">Step</th>
                <th className="px-4 py-3 font-medium">Open</th>
                <th className="px-4 py-3 font-medium">What to do</th>
              </tr>
            </thead>
            <tbody>
              {sequence.map((s) => (
                <tr key={s.n} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-4 font-display text-lg text-gold tabular-nums">{s.n}</td>
                  <td className="px-4 py-4">
                    <Link to={s.to} className="font-display text-xl text-ivory hover:text-gold">
                      {s.where}
                    </Link>
                    <p className="mt-1 text-sm italic text-muted">{s.t}</p>
                  </td>
                  <td className="px-4 py-4 text-sm leading-relaxed text-muted">{s.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-16 font-display text-3xl text-ivory">Journal · Prayers · Pages · Glossary · Find · Download</h2>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          Look to the right of the header. Those links are always there, because you will need them in the middle of a
          chamber as much as at the end of a week. They are not Part Four. They are the kit you carry. Download is
          the whole manuscript as a PDF. Press / to Find a word without hunting the header.
        </p>
        <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-surface">
          {tools.map((l) => (
            <li key={l.label} className="flex flex-col gap-2 px-5 py-5 md:flex-row md:gap-8">
              <Link to={l.to} className="shrink-0 font-display text-xl text-gold md:w-40">
                {l.label}
              </Link>
              <p className="leading-relaxed text-muted">{l.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
