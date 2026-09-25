import { createFileRoute, Link } from "@tanstack/react-router";
import { BreathOrb } from "@/components/breath-orb";
import { ContinueLink } from "@/components/continue-link";
import { book, disclaimer, fourPrinciples, aboutAuthor } from "@/lib/content/meta";
import { useSanctuary } from "@/lib/store";
import { todaysSit } from "@/lib/today";

export const Route = createFileRoute("/")({ component: Home });

const ranks = [
  {
    roman: "I",
    part: "Part One of the book",
    title: "The Battlefield — open it from Chambers",
    short: "Chambers",
    line: "Kirby calls this Understanding the Battlefield. In the header it is Chambers. Introduction, then El Mistater (unnumbered), then fifteen chapters as in the book. The Trap of Offense is Chapter 3. Deus Revelatus closes the part.",
    to: "/battlefield" as const,
    image: "/images/mark-watch.jpg",
  },
  {
    roman: "II",
    part: "Part Two of the book",
    title: "Taking Back Authority",
    short: "Authority",
    line: "Take back the ground. Seven steps: identify the curse, reveal the stronghold, confess and repent, submit to Order, judge and reassign, command alignment, testify.",
    to: "/authority" as const,
    image: "/images/mark-authority.jpg",
  },
  {
    roman: "III",
    part: "Part Three of the book",
    title: "Walking in the Light",
    short: "The Light",
    line: "After the seven steps. Covering, the prayers, a quiet commissioning. Stay with people. Do not walk home alone because the light felt finished.",
    to: "/light" as const,
    image: "/images/mark-light.jpg",
  },
] as const;

function Home() {
  const enter = useSanctuary((s) => s.enter);
  const last = useSanctuary((s) => s.last);
  const addStillness = useSanctuary((s) => s.addStillness);
  const sit = todaysSit();
  return (
    <main className="bg-bg pb-20">
      <section className="relative">
        <img
          src="/images/nave.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover object-[center_22%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/10 to-bg" />
        <div className="relative px-4 pb-4 pt-6 md:pt-8">
          <div className="stagger-in mx-auto w-full max-w-3xl rounded-2xl border border-border bg-surface px-6 py-6 text-center shadow-[0_24px_60px_color-mix(in_oklab,var(--color-fg)_12%,transparent)] md:px-12 md:py-8">
            <img
              src="/images/crown.jpg"
              alt=""
              className="seal-breathe mx-auto h-14 w-14 object-contain md:h-20 md:w-20"
            />
            <p className="mt-2 text-xs tracking-[0.42em] text-gold uppercase">A living sanctuary</p>
            <h1 className="mt-2 font-display text-5xl font-medium tracking-[0.18em] text-ivory md:text-7xl">
              ORDER
            </h1>
            <p className="mt-3 font-display text-xl leading-snug text-gold italic md:text-2xl">
              {book.subtitle}
            </p>
            <p className="mt-3 font-display text-lg font-medium text-ivory md:text-xl">
              By: {book.author}
            </p>
            <blockquote className="mt-6 md:mt-7">
              <p className="font-display text-lg leading-relaxed text-ivory italic md:text-xl">
                “{book.epigraph.text}”
              </p>
              <cite className="mt-3 block text-xs tracking-[0.24em] text-gold uppercase not-italic">
                — {book.epigraph.ref}
              </cite>
            </blockquote>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {last ? <ContinueLink place={last} /> : null}
              <Link
                to="/how"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-ivory px-8 text-sm font-medium tracking-wide text-bg transition-colors duration-150 ease-out hover:bg-gold active:scale-[0.96]"
              >
                How to use this interactive experience
              </Link>
              {last ? (
                <Link
                  to="/path"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-8 text-sm text-ivory hover:border-gold"
                >
                  The path
                </Link>
              ) : (
                <Link
                  to="/path"
                  onClick={() => enter()}
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-ivory px-8 text-sm font-medium tracking-wide text-bg transition-colors duration-150 ease-out hover:bg-gold active:scale-[0.96]"
                >
                  Enter the sanctuary
                </Link>
              )}
              <Link
                to="/dashboard"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-gold/60 px-8 text-sm text-ivory hover:border-gold"
              >
                Open Dashboard
              </Link>
              <Link
                to="/sign-in"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-8 text-sm text-ivory hover:border-gold"
              >
                Sign in to Sync
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-5">
        <div className="grid gap-5 md:grid-cols-[1fr_1fr]">
          <article className="rounded-xl border border-border bg-surface p-6 md:p-8">
            <p className="text-xs tracking-[0.28em] text-gold uppercase">About the experience</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">More than a digital copy</h2>
            <p className="mt-4 leading-relaxed text-muted">
              THE ORDER is presented as a guided interactive journey: reading, audio-ready teaching, pondering,
              breathing, activation exercises, assessment, seven steps, prayers, journal, saved pages, glossary,
              search, downloads, progress, and resume.
            </p>
          </article>
          <article className="rounded-xl border border-gold/30 bg-surface p-6 md:p-8">
            <p className="text-xs tracking-[0.28em] text-gold uppercase">Book access</p>
            <h2 className="mt-3 font-display text-3xl text-ivory">Free access for every reader</h2>
            <p className="mt-4 leading-relaxed text-muted">
              The interactive book is open without purchase. Readers can enter the journey immediately, and signing in
              remains available for synced progress, journal entries, and account features.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/path" onClick={() => enter()} className="rounded-full bg-ivory px-5 py-3 text-sm text-bg hover:bg-gold">
                Enter the Experience
              </Link>
              <Link to="/dashboard" className="rounded-full border border-border px-5 py-3 text-sm text-ivory hover:border-gold">
                Reader Dashboard
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-5xl px-5 text-center">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">How it works</p>
        <ol className="mt-5 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Enter freely",
            "Sign in to sync",
            "Begin the journey",
            "Complete interactive sections",
            "Autosave your responses",
            "Resume anytime",
          ].map((step, i) => (
            <li key={step} className="rounded-xl border border-border bg-surface p-5">
              <span className="text-xs tracking-[0.22em] text-gold uppercase">Step {i + 1}</span>
              <p className="mt-2 font-display text-xl text-ivory">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-8 max-w-3xl px-5">
        <div className="rounded-2xl border border-gold/30 bg-surface px-5 py-8 md:px-8">
          <p className="text-center text-xs tracking-[0.28em] text-gold uppercase">Today’s sit</p>
          <h2 className="mt-2 text-center font-display text-3xl text-ivory">Six minutes. Then one room.</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted">
            Sit first. Then read today’s excerpt. Then answer one prompt in {sit.chamber.title}.
          </p>
          <div className="mt-8">
            <BreathOrb
              durationMin={6}
              inhale={4}
              hold={4}
              exhale={6}
              guidance={[
                "Sit before you study.",
                "Intimacy is the source of authority.",
                "When the six minutes end, read the excerpt.",
              ]}
              onComplete={() => addStillness(6)}
            />
          </div>
          <blockquote className="mx-auto mt-8 max-w-xl border-l-2 border-gold pl-4">
            <p className="font-display text-lg italic leading-relaxed text-ivory">{sit.excerpt}</p>
            <cite className="mt-2 block text-xs tracking-[0.18em] text-gold uppercase not-italic">
              {sit.chamber.number} · {sit.chamber.title}
            </cite>
          </blockquote>
          <p className="mx-auto mt-6 max-w-xl text-center text-ivory">{sit.prompt}</p>
          <div className="mt-6 flex justify-center">
            <Link
              to="/battlefield/$slug"
              params={{ slug: sit.chamber.slug }}
              className="inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
            >
              Open today’s chamber
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-4xl px-5 text-center">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">The three parts of this book</p>
        <h2 className="mt-3 font-display text-3xl text-ivory md:text-4xl">Rank restored under Christ</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          Kirby wrote ORDER in three parts. Walk them in that order. Between the first and the second sits Assess —
          not a fourth part, the sheet that names what the rooms woke.
        </p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {ranks.map((r) => (
            <li key={r.roman}>
              <Link
                to={r.to}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface text-left transition-colors hover:border-gold"
              >
                <img src={r.image} alt="" className="h-36 w-full object-cover object-[center_58%] md:h-40" />
                <div className="flex flex-1 flex-col px-5 py-5">
                  <p className="text-xs tracking-[0.22em] text-gold uppercase">
                    {r.roman} · {r.part}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-ivory">{r.short}</h3>
                  <p className="mt-1 text-sm italic text-gold">{r.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{r.line}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
        <section className="mx-auto mt-16 max-w-3xl text-left">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/50 md:w-16" />
            <h2 className="font-display text-2xl tracking-[0.18em] text-gold uppercase md:text-3xl">
              Keys to the Order
            </h2>
            <span className="h-px w-10 bg-gold/50 md:w-16" />
          </div>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {fourPrinciples.map((p) => (
              <li key={p.t} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-display text-xl text-ivory">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 font-display text-2xl italic text-ivory">{aboutAuthor}</p>
        </section>
        <p className="mx-auto mt-10 max-w-lg text-[11px] leading-relaxed text-muted">{disclaimer}</p>
      </section>
    </main>
  );
}
