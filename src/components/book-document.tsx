import { GlanceSteps, TeachBody } from "@/components/teach-body";
import {
  assessIntro,
  assessPrayerClose,
  assessPrayerMid,
  assessPrayerOpen,
  entryPoints,
  legalRights,
} from "@/lib/content/assessment";
import { glanceIcons } from "@/lib/content/book-images";
import {
  aboutTheAuthorBook,
  acknowledgments,
  bookIntroduction,
  partTwoIntroduction,
  reassignmentPrayers,
  walkingInTheLight,
} from "@/lib/content/book-passages";
import { chambers } from "@/lib/content/chambers";
import { glossary } from "@/lib/content/glossary";
import { book, disclaimer, fourPrinciples, howToUse, partHow } from "@/lib/content/meta";
import { overlays } from "@/lib/content/overlays";
import { decrees, prayers } from "@/lib/content/prayers";
import { stepBlurbs } from "@/lib/content/step-blurbs";
import { steps } from "@/lib/content/steps";

function WriteSpace({ lines = 4 }: { lines?: number }) {
  return (
    <div className="mt-4 grid gap-0">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-8 border-b border-border-strong/40" />
      ))}
    </div>
  );
}

function SpokenBlock({
  title,
  kicker,
  ref,
  lines,
}: {
  title: string;
  kicker?: string;
  ref?: string;
  lines: string[];
}) {
  return (
    <article className="print-avoid mt-6 rounded-xl border border-border bg-surface p-5">
      {ref ? <p className="text-xs tracking-[0.2em] text-gold uppercase">{ref}</p> : null}
      <h3 className={`font-display text-2xl text-ivory ${ref ? "mt-2" : ""}`}>{title}</h3>
      {kicker ? <p className="mt-1 text-sm italic text-gold">{kicker}</p> : null}
      <div className="mt-4 space-y-2">
        {lines.map((l) => (
          <p key={l} className="font-display text-lg leading-snug text-ivory">
            {l}
          </p>
        ))}
      </div>
    </article>
  );
}

function PartLeaf({ roman, title, kicker }: { roman: string; title: string; kicker: string }) {
  return (
    <section className="print-chapter flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-xs tracking-[0.42em] text-gold uppercase">{roman}</p>
      <h1 className="mt-6 font-display text-5xl text-ivory md:text-6xl">{title}</h1>
      <p className="mt-4 max-w-xl font-display text-xl italic text-gold">{kicker}</p>
    </section>
  );
}

export function BookDocument() {
  return (
    <article className="book-document mx-auto max-w-3xl bg-surface px-5 py-10 text-ivory shadow-[0_24px_60px_color-mix(in_oklab,var(--color-fg)_10%,transparent)] md:px-12 md:py-16 print:max-w-none print:bg-transparent print:px-0 print:py-0 print:shadow-none">
      <section className="print-cover flex min-h-[78vh] flex-col items-center justify-center py-16 text-center">
        <img src="/images/crown.jpg" alt="" className="h-16 w-16 object-contain md:h-20 md:w-20" />
        <p className="mt-6 text-xs tracking-[0.42em] text-gold uppercase">A living sanctuary</p>
        <h1 className="mt-3 font-display text-6xl tracking-[0.18em] text-ivory md:text-8xl">{book.title}</h1>
        <p className="mt-4 max-w-xl font-display text-2xl leading-snug text-gold italic">{book.subtitle}</p>
        <p className="mt-4 font-display text-xl text-ivory">By {book.author}</p>
        <blockquote className="mt-10 max-w-2xl">
          <p className="font-display text-lg leading-relaxed text-ivory italic md:text-xl">“{book.epigraph.text}”</p>
          <cite className="mt-3 block text-xs tracking-[0.24em] text-gold uppercase not-italic">
            — {book.epigraph.ref}
          </cite>
        </blockquote>
        <p className="mt-12 font-display text-lg italic text-ivory">{book.dedication}</p>
        <p className="mt-8 text-xs tracking-[0.18em] text-subtle uppercase">
          {book.publisher} · {book.year}
        </p>
      </section>

      <nav className="print-chapter" id="print-toc" aria-label="Contents">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Contents</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">The order of the book</h2>
        <ol className="mt-8 grid gap-6">
          <li>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Front matter</p>
            <ul className="mt-2 space-y-1 text-lg">
              <li>
                <a href="#print-how" className="text-ivory hover:text-gold">
                  How to use this book
                </a>
              </li>
              <li>
                <a href="#print-intro" className="text-ivory hover:text-gold">
                  Introduction
                </a>
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Part One · Understanding the Battlefield</p>
            <ul className="mt-2 space-y-1">
              {chambers.map((c) => (
                <li key={c.slug} className="flex gap-3 text-lg">
                  <span className="w-24 shrink-0 font-display text-sm tracking-[0.14em] text-gold">{c.number}</span>
                  <a href={`#print-chamber-${c.slug}`} className="text-ivory hover:text-gold">
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Between the parts</p>
            <a href="#print-assess" className="mt-2 block text-lg text-ivory hover:text-gold">
              Strongholds and Legal Rights Assessment
            </a>
          </li>
          <li>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Part Two · Taking Back Authority</p>
            <ul className="mt-2 space-y-1">
              {steps.map((st) => (
                <li key={st.slug} className="flex gap-3 text-lg">
                  <span className="w-24 shrink-0 font-display text-sm tracking-[0.14em] text-gold">Step {st.n}</span>
                  <a href={`#print-step-${st.slug}`} className="text-ivory hover:text-gold">
                    {st.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#print-glance" className="text-lg text-ivory hover:text-gold">
                  7 Steps at a Glance
                </a>
              </li>
            </ul>
          </li>
          <li>
            <p className="text-xs tracking-[0.2em] text-gold uppercase">Part Three · Walking in the Light</p>
            <ul className="mt-2 space-y-1 text-lg">
              <li>
                <a href="#print-light" className="text-ivory hover:text-gold">
                  Walking in the Light
                </a>
              </li>
              <li>
                <a href="#print-prayers" className="text-ivory hover:text-gold">
                  Prayers and decrees
                </a>
              </li>
              <li>
                <a href="#print-glossary" className="text-ivory hover:text-gold">
                  Glossary
                </a>
              </li>
              <li>
                <a href="#print-author" className="text-ivory hover:text-gold">
                  About the author · Acknowledgments
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </nav>

      <section className="print-chapter" id="print-how">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">How To Use This Book</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">A roadmap and a feast</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          <p>{howToUse.feast}</p>
          <p>{howToUse.notAFormula}</p>
          <p>{howToUse.repetition}</p>
        </div>
        <ol className="mt-10 grid gap-4">
          {[
            { n: "Part One", t: "Understanding the Battlefield", b: partHow.one },
            { n: "Part Two", t: "Taking Back Authority", b: partHow.two },
            { n: "Part Three", t: "Walking in the Light", b: partHow.three },
          ].map((p) => (
            <li key={p.n} className="print-avoid rounded-xl border border-border bg-bg p-5">
              <p className="text-xs tracking-[0.22em] text-gold uppercase">{p.n}</p>
              <h3 className="mt-2 font-display text-2xl text-ivory">{p.t}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.b}</p>
            </li>
          ))}
        </ol>
        <h3 className="mt-12 font-display text-2xl text-ivory">Keys to the Order</h3>
        <ol className="mt-4 grid gap-3">
          {fourPrinciples.map((p) => (
            <li key={p.t} className="print-avoid rounded-xl border border-border bg-bg p-5">
              <h4 className="font-display text-xl text-ivory">{p.t}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="print-chapter" id="print-intro">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Before Part One</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">Introduction</h2>
        <TeachBody blocks={bookIntroduction} eager className="mt-8 space-y-5 text-lg leading-relaxed" />
      </section>

      <PartLeaf roman="Part One" title="Understanding the Battlefield" kicker="The chambers. Occupancy named. Rank recovered." />

      {chambers.map((c) => {
        const work = overlays[c.slug];
        const ponderings = work?.ponderings ?? c.ponderings;
        const activation = work?.activation ?? c.activation;
        const exercise = work?.exercise ?? c.exercise;
        return (
          <section key={c.slug} className="print-chapter" id={`print-chamber-${c.slug}`}>
            <p className="text-xs tracking-[0.28em] text-gold uppercase">
              Chambers · {c.number}
            </p>
            <h2 className="mt-2 font-display text-4xl text-ivory">{c.title}</h2>
            <p className="mt-3 font-display text-xl italic text-gold">{c.kicker}</p>
            <TeachBody blocks={c.teaching} eager className="mt-8 space-y-4 text-lg leading-relaxed" />
            {c.scripture.text ? (
              <blockquote className="print-avoid mt-8 border-l-2 border-gold pl-5">
                <p className="font-display text-xl italic">“{c.scripture.text}”</p>
                <cite className="mt-2 block text-xs tracking-[0.2em] text-gold uppercase not-italic">
                  {c.scripture.ref}
                </cite>
              </blockquote>
            ) : null}

            <div className="print-avoid mt-10">
              <p className="text-xs tracking-[0.22em] text-gold uppercase">Ponder</p>
              <ol className="mt-3 grid gap-2">
                {ponderings.map((q) => (
                  <li key={q} className="leading-relaxed">
                    {q}
                  </li>
                ))}
              </ol>
              <WriteSpace lines={5} />
            </div>

            <div className="print-avoid mt-10">
              <p className="text-xs tracking-[0.22em] text-gold uppercase">Activate · {activation.title}</p>
              <div className="mt-3 space-y-2">
                {activation.lines.map((l) => (
                  <p key={l} className="font-display text-lg leading-snug italic">
                    {l}
                  </p>
                ))}
              </div>
            </div>

            <div className="print-avoid mt-10">
              <p className="text-xs tracking-[0.22em] text-gold uppercase">Exercise · {exercise.title}</p>
              <p className="mt-3 leading-relaxed">{exercise.prompt}</p>
              <WriteSpace lines={5} />
            </div>
          </section>
        );
      })}

      <section className="print-chapter" id="print-assess">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">After Part One · from the back of the book</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">Strongholds and Legal Rights Assessment</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {assessIntro.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
        <div className="print-avoid mt-8 rounded-xl border border-gold/30 bg-bg p-5">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Prayer before beginning</p>
          <div className="mt-3 space-y-2 font-display text-xl leading-snug">
            {assessPrayerOpen.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
        <h3 className="mt-12 font-display text-3xl text-ivory">Entry points</h3>
        <ol className="mt-6 grid gap-8">
          {entryPoints.map((ep) => (
            <li key={ep.id} className="print-avoid">
              <p className="text-xs tracking-[0.2em] text-gold uppercase">
                {ep.n} · {ep.ref}
              </p>
              <h4 className="mt-1 font-display text-2xl text-ivory">{ep.title}</h4>
              <p className="mt-2 font-display text-lg italic text-muted">{ep.scripture}</p>
              <ul className="mt-4 grid gap-3">
                {ep.questions.map((q) => (
                  <li key={q} className="flex gap-3">
                    <span className="mt-1 size-3.5 shrink-0 rounded-sm border border-gold" />
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
              <WriteSpace lines={3} />
            </li>
          ))}
        </ol>
        <div className="print-avoid mt-8 rounded-xl border border-gold/30 bg-bg p-5">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Prayer</p>
          <div className="mt-3 space-y-2 font-display text-xl leading-snug">
            {assessPrayerMid.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
        <h3 className="mt-12 font-display text-3xl text-ivory">Legal rights checklist</h3>
        <ul className="mt-6 grid gap-2">
          {legalRights.map((it) => (
            <li key={it.id} className="print-avoid flex gap-3 rounded-lg border border-border bg-bg px-4 py-3">
              <span className="mt-1 size-3.5 shrink-0 rounded-sm border border-gold" />
              <span className="leading-relaxed">{it.label}</span>
            </li>
          ))}
        </ul>
        <div className="print-avoid mt-8 rounded-xl border border-gold/30 bg-bg p-5">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Closing prayer</p>
          <div className="mt-3 space-y-2 font-display text-xl leading-snug">
            {assessPrayerClose.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      </section>

      <PartLeaf roman="Part Two" title="Taking Back Authority" kicker="Seven steps. Take back the ground." />

      <section className="print-chapter" id="print-part-two">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Authority · Part Two</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">The activation of the walk</h2>
        <TeachBody blocks={partTwoIntroduction} eager className="mt-8 space-y-5 text-lg leading-relaxed" />
      </section>

      {steps.map((st) => (
        <section key={st.slug} className="print-chapter" id={`print-step-${st.slug}`}>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Authority · Step {st.n}</p>
          <h2 className="mt-2 font-display text-4xl text-ivory">{st.title}</h2>
          <p className="mt-3 font-display text-xl italic text-gold">{st.kicker}</p>
          <p className="mt-4 leading-relaxed text-muted">{stepBlurbs[st.slug] ?? st.kicker}</p>
          <TeachBody blocks={st.teaching} eager className="mt-8 space-y-4 text-lg leading-relaxed" />
          <div className="print-avoid mt-10">
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Practice</p>
            <p className="mt-3 leading-relaxed">{st.practice}</p>
            <WriteSpace lines={6} />
          </div>
        </section>
      ))}

      <section className="print-chapter" id="print-glance">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">From the back of the book</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">7 Steps at a Glance</h2>
        <div className="mt-8 flex flex-wrap items-end justify-center gap-4">
          {glanceIcons.map((g) => (
            <figure key={g.n} className="print-avoid w-24 text-center">
              <img src={g.src} alt={g.alt} className="mx-auto h-24 w-24 object-contain mix-blend-multiply" />
              <figcaption className="mt-2 text-[10px] tracking-[0.16em] text-gold uppercase">Step {g.n}</figcaption>
            </figure>
          ))}
        </div>
        <GlanceSteps className="mt-8 grid gap-4" />
      </section>

      <PartLeaf roman="Part Three" title="Walking in the Light" kicker="The end that becomes a beginning." />

      <section className="print-chapter" id="print-light">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">The Light · Part Three</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">Walking in the Light</h2>
        <TeachBody blocks={walkingInTheLight} eager className="mt-8 space-y-5 text-lg leading-relaxed" />
      </section>

      <section className="print-chapter" id="print-prayers">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Spoken work</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">Prayers and decrees</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Prayers you bring to God. Decrees you say over your life from His Word and this book. Say the lines out
          loud, more than once. They are not yours until they have been in your mouth.
        </p>
        <h3 className="mt-10 font-display text-3xl text-ivory">Prayers</h3>
        {prayers.map((p) => (
          <SpokenBlock key={p.id} title={p.title} kicker={p.kicker} ref={p.ref} lines={p.lines} />
        ))}
        <h3 className="mt-12 font-display text-3xl text-ivory">Decrees</h3>
        {decrees.map((p) => (
          <SpokenBlock key={p.id} title={p.title} kicker={p.kicker} ref={p.ref} lines={p.lines} />
        ))}
        <h3 className="mt-12 font-display text-3xl text-ivory">Reassignment prayers</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          After you have judged and cast down the stronghold in Step 5 — language for sending what was bound to serve
          righteousness.
        </p>
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {reassignmentPrayers.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="print-chapter" id="print-glossary">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Language of the walk</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">Glossary</h2>
        <dl className="mt-8 grid gap-5">
          {glossary.map((g) => (
            <div key={g.term} className="print-avoid">
              <dt className="font-display text-2xl text-ivory">{g.term}</dt>
              <dd className="mt-2 leading-relaxed text-muted">{g.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="print-chapter" id="print-author">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Colophon</p>
        <h2 className="mt-2 font-display text-4xl text-ivory">About the Author</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {aboutTheAuthorBook.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
        <h2 className="mt-14 font-display text-4xl text-ivory">Acknowledgments</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {acknowledgments.map((p) => (
            <p key={p.slice(0, 48)}>{p}</p>
          ))}
        </div>
        <p className="mt-16 text-center font-display text-xl italic text-ivory">{book.dedication}</p>
        <p className="mt-8 text-center text-[11px] leading-relaxed text-subtle">{disclaimer}</p>
        <p className="mt-4 text-center text-[11px] tracking-[0.16em] text-subtle uppercase">
          {book.author} · {book.publisher} · {book.year}
        </p>
      </section>
    </article>
  );
}
