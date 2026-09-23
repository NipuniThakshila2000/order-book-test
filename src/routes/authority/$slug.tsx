import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageMark } from "@/components/page-mark";
import { PrintRow } from "@/components/print-button";
import { TeachBody } from "@/components/teach-body";
import { useDebouncedSave } from "@/lib/autosave";
import { stepPrompts } from "@/lib/content/step-prompts";
import { steps } from "@/lib/content/steps";
import { useScrollPlace } from "@/lib/scroll-place";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/authority/$slug")({ component: StepPage });

function StepPage() {
  const { slug } = Route.useParams();
  const step = steps.find((s) => s.slug === slug);
  if (!step) throw notFound();
  return <StepWork key={slug} slug={slug} />;
}

function StepWork({ slug }: { slug: string }) {
  const step = steps.find((s) => s.slug === slug);
  if (!step) throw notFound();
  const visit = useSanctuary((s) => s.visitStep);
  const addJournal = useSanctuary((s) => s.addJournal);
  const touchLast = useSanctuary((s) => s.touchLast);
  const sealStep = useSanctuary((s) => s.sealStep);
  const sealed = useSanctuary((s) => Boolean(s.stepSeal[slug]));
  const saved = useSanctuary((s) => s.stepVisit[slug]);
  const [practice, setPractice] = useState(saved?.practice ?? "");
  const [kept, setKept] = useState(false);
  const i = steps.findIndex((s) => s.slug === slug);
  const prev = steps[i - 1];
  const next = steps[i + 1];
  const prompt = stepPrompts[slug] ?? step.practice;

  useScrollPlace(`step:${slug}`);

  useEffect(() => {
    visit(slug);
    touchLast({ kind: "step", slug, label: `Step ${step.n} · ${step.title}` });
  }, [slug, visit, touchLast, step.n, step.title]);

  useDebouncedSave(practice, (v) => visit(slug, { practice: v }));

  return (
    <main className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/mark-authority.jpg"
        kicker={`Authority · Part Two · Step ${step.n} of ${steps.length}`}
        title={step.title}
        aside={<PrintRow pageLabel="Print this step" />}
        bodyBelow
      >
        <p className="mt-3 font-display text-xl italic text-gold">{step.kicker}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Hear the teaching. Write the practice. Seal this step. Then continue. What you write is kept on this device
          as you type — jump back any time without losing it. Days here is faithfulness.
        </p>
        <p className="mt-2 text-xs text-muted">Saved on this device — export from Pages if you change phones.</p>
      </PageMark>

      <ol className="mt-8 flex flex-wrap gap-2">
        {["Hear this teaching", "Write the practice", "Seal this step"].map((label, n) => (
          <li
            key={label}
            className="rounded-full border border-border px-3 py-1 text-xs tracking-[0.14em] text-muted uppercase"
          >
            {n + 1}. {label}
          </li>
        ))}
      </ol>

      <TeachBody blocks={step.teaching} live className="mt-10 space-y-4 text-lg leading-relaxed text-ivory" />

      <section className="mt-10 rounded-xl border border-border bg-surface p-5">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">Practice</p>
        <p className="mt-3 text-ivory">{prompt}</p>
        <textarea
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          rows={6}
          placeholder={prompt}
          className="mt-4 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-ivory outline-none"
        />
        <button
          type="button"
          className="mt-3 min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg"
          onClick={() => {
            visit(slug, { practice });
            if (practice.trim()) addJournal({ title: `Step ${step.n} · ${step.title}`, body: practice });
            setKept(true);
          }}
        >
          Keep this
        </button>
        {kept ? (
          <p className="mt-2 text-xs text-gold">Kept in Journal. Also saved on this device as you type.</p>
        ) : (
          <p className="mt-2 text-xs text-muted">Writing is kept on this device as you type.</p>
        )}
      </section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => sealStep(slug, !sealed)}
          className={
            sealed
              ? "min-h-11 rounded-full border border-gold px-5 text-sm text-gold"
              : "min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg hover:bg-gold"
          }
        >
          {sealed ? "Sealed · unseal" : "Seal this step"}
        </button>
        {sealed ? <p className="text-sm text-gold">Sealed. You may continue, or return later.</p> : null}
      </div>

      <nav className="mt-8 rounded-xl border border-border bg-surface px-5 py-6 md:px-8">
        {next ? (
          <div>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Continue to next · Step {next.n}</p>
            <p className="mt-2 font-display text-2xl text-ivory">{next.title}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Finish the writing in this step first. Days here is faithfulness. Then open the next.
            </p>
            <Link
              to="/authority/$slug"
              params={{ slug: next.slug }}
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
            >
              Continue to next
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">The seven steps are walked</p>
            <p className="mt-2 font-display text-2xl text-ivory">Proceed to the Light</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Part Three is how what you recovered is kept. Do not walk home alone.
            </p>
            <Link
              to="/light"
              className="mt-5 inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
            >
              Continue to the Light
            </Link>
          </div>
        )}
        {prev ? (
          <p className="mt-6 text-sm text-muted">
            <Link to="/authority/$slug" params={{ slug: prev.slug }} className="hover:text-gold">
              Previous step: {prev.title}
            </Link>
          </p>
        ) : (
          <p className="mt-6 text-sm text-muted">
            <Link to="/authority" className="hover:text-gold">
              The seven steps
            </Link>
          </p>
        )}
      </nav>
    </main>
  );
}
