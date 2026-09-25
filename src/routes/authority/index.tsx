import { createFileRoute, Link } from "@tanstack/react-router";
import { Dust } from "@/components/dust";
import { PageMark } from "@/components/page-mark";
import { BookPdfLink } from "@/components/print-button";
import { GlanceSteps, TeachBody } from "@/components/teach-body";
import { partHow } from "@/lib/content/meta";
import { partTwoIntroduction } from "@/lib/content/book-passages";
import { steps } from "@/lib/content/steps";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/authority/")({ component: AuthorityIndex });

function AuthorityIndex() {
  const sv = useSanctuary((s) => s.stepVisit);
  const seal = useSanctuary((s) => s.stepSeal);
  return (
    <main className="relative min-h-[calc(100dvh-57px)] overflow-hidden">
      <Dust count={12} />
      <img
        src="/images/ornaments/keyhole.png"
        alt=""
        aria-hidden="true"
        className="ornament pointer-events-none absolute left-[-4rem] top-28 z-0 hidden w-48 -rotate-[10deg] opacity-[0.1] mix-blend-multiply md:block"
      />
      <div className="page-enter relative mx-auto max-w-5xl px-5 py-12 md:py-16">
        <PageMark
          image="/images/mark-authority.jpg"
          kicker="Authority · Part Two"
          title="Taking Back Authority"
          aside={<BookPdfLink />}
          bodyBelow
        >
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            The book calls this Taking Back Authority. The link in the header is Authority. Seven steps. Do not skip
            them. Use Assess as a companion — what you named there is what these steps work on.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{partHow.two}</p>
        </PageMark>
        <TeachBody
          blocks={partTwoIntroduction}
          live
          className="mt-10 max-w-3xl space-y-5 text-lg leading-relaxed text-muted"
        />
        <h2 className="mt-14 font-display text-3xl text-ivory">The seven steps</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          This is the map from the back of the book, and the door into each step. Scripture and principle first. Then
          enter and sit — teaching and a written practice. Days on a single step is faithfulness, not delay.
        </p>
        <GlanceSteps
          doors={steps.map((st) => ({
            slug: st.slug,
            occupied: Boolean(seal[st.slug] || sv[st.slug]?.practice),
          }))}
        />

        <div className="mt-16 rounded-xl border border-border bg-surface px-6 py-10 text-center md:px-10">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">When the seven steps are walked</p>
          <h2 className="mt-3 font-display text-3xl text-ivory">Proceed to the Light</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted">
            Part Three is not a shortcut. It is how what you recovered is kept — in community, under covering. Do not
            finish the steps and walk home alone.
          </p>
          <Link
            to="/light"
            className="mt-6 inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
          >
            Proceed to the Light
          </Link>
        </div>
      </div>
    </main>
  );
}
