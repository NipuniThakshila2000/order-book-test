import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ContinueLink } from "@/components/continue-link";
import { placeLabel } from "@/lib/resume";
import { useSanctuary } from "@/lib/store";

const walk = [
  {
    n: "01",
    t: "Stillness",
    do: "Sit before you study",
    b: "Open Stillness in the header. Choose one sitting — Temple breath, Match His stride, or Held together. Stay until the orb finishes. Then open a chapter. Intimacy is the source of authority; skipping this is how the walk becomes homework.",
  },
  {
    n: "02",
    t: "Chambers",
    do: "Part One — one room at a time",
    b: "Read the Introduction first. Then El Mistater. Then the numbered chapters, in order. In every room: read the teaching, write what the Spirit highlights, breathe, speak the decree, write the exercise. Mark complete when you have sat it. Do not binge the list.",
  },
  {
    n: "03",
    t: "Assess",
    do: "After the rooms, not before",
    b: "Name what occupies — four writings, then the doorways, then the legal rights. One cluster at a time. Tick only what He puts a finger on. Keep a snapshot when you are done.",
  },
  {
    n: "04",
    t: "Authority",
    do: "Seven steps — take back the ground",
    b: "Use what you named in Assess. Hear the teaching, write the practice, seal the step, then the next. Days on a single step is faithfulness, not delay.",
  },
  {
    n: "05",
    t: "The Light",
    do: "Stay covered",
    b: "Part Three is how what you recovered is kept — covering, the prayers, people. Do not walk home alone because it felt finished.",
  },
] as const;

function alreadyWalking() {
  const s = useSanctuary.getState();
  return Boolean(
    s.last ||
      s.stillnessMinutes > 0 ||
      s.journal.length > 0 ||
      Object.keys(s.chamberVisit ?? {}).length > 0 ||
      Object.keys(s.stepVisit ?? {}).length > 0,
  );
}

export function WalkGate() {
  const last = useSanctuary((s) => s.last);
  const seen = useSanctuary((s) => s.welcomeBackSeen);
  const dismiss = useSanctuary((s) => s.dismissWelcomeBack);
  const [ready, setReady] = useState(false);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    const decide = () => {
      setReturning(alreadyWalking());
      setReady(true);
    };
    if (useSanctuary.persist.hasHydrated()) decide();
    const unsub = useSanctuary.persist.onFinishHydration(decide);
    return unsub;
  }, []);

  if (!ready || seen || !returning) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-bg/80 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-surface px-6 py-8 shadow-[0_24px_60px_color-mix(in_oklab,var(--color-fg)_16%,transparent)] md:px-10 md:py-10">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Welcome back</p>
        <h2 className="mt-3 font-display text-4xl text-ivory">You already have a walk here</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Nothing was lost. Here is the order of the house again — then go to the title page, or pick up exactly
          where you left.
        </p>
        <ol className="mt-8 grid gap-5">
          {walk.map((w) => (
            <li key={w.n} className="flex gap-4">
              <span className="font-display text-lg text-gold tabular-nums">{w.n}</span>
              <div>
                <p className="font-display text-xl text-ivory">{w.t}</p>
                <p className="mt-0.5 text-sm italic text-gold">{w.do}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{w.b}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-relaxed text-muted">
          <span className="text-ivory">Home page</span> is the title page — today’s sit, the three parts, the whole
          house in one glance.{" "}
          {last ? (
            <>
              <span className="text-ivory">Resume</span> opens {placeLabel(last)} where you left it.
            </>
          ) : (
            <>If you want to start the sitting, open Stillness first.</>
          )}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/"
            onClick={() => dismiss()}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-8 text-sm text-ivory hover:border-gold"
          >
            Home page
          </Link>
          {last ? (
            <ContinueLink place={last} prefix="Resume" onClick={() => dismiss()} />
          ) : (
            <Link
              to="/stillness"
              onClick={() => dismiss()}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
            >
              Begin at Stillness
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
