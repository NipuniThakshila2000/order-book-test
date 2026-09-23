import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Phase = "inhale" | "hold" | "exhale" | "rest";

export function BreathOrb({
  inhale = 4,
  hold = 4,
  exhale = 6,
  rest = 1,
  durationMin = 6,
  guidance,
  phases,
  onComplete,
  allowSkip,
  onSkip,
}: {
  inhale?: number;
  hold?: number;
  exhale?: number;
  rest?: number;
  durationMin?: number;
  guidance: readonly string[];
  phases?: { inhale: string; hold: string; exhale: string; rest: string };
  onComplete?: () => void;
  allowSkip?: boolean;
  onSkip?: () => void;
}) {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [scale, setScale] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const [guideI, setGuideI] = useState(0);
  const [reduce, setReduce] = useState(false);
  const startRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const raf = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const cycle = inhale + hold + exhale + rest;
  const total = durationMin * 60;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!running) return;
    const tick = (t: number) => {
      if (startRef.current == null) startRef.current = t - elapsedRef.current * 1000;
      const sec = (t - startRef.current) / 1000;
      elapsedRef.current = sec;
      setElapsed(sec);
      if (sec >= total) {
        setRunning(false);
        setPhase("rest");
        setScale(1);
        elapsedRef.current = total;
        setElapsed(total);
        onCompleteRef.current?.();
        return;
      }
      const pos = sec % cycle;
      let p: Phase = "inhale";
      let s = 1;
      if (pos < inhale) {
        p = "inhale";
        s = 1 + 0.42 * (pos / inhale);
      } else if (pos < inhale + hold) {
        p = "hold";
        s = 1.42;
      } else if (pos < inhale + hold + exhale) {
        const e = (pos - inhale - hold) / exhale;
        p = "exhale";
        s = 1.42 - 0.42 * e;
      } else {
        p = "rest";
        s = 1;
      }
      setPhase(p);
      setScale(reduce ? 1 : s);
      setGuideI(Math.min(guidance.length - 1, Math.floor(sec / (total / Math.max(guidance.length, 1)))));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running, inhale, hold, exhale, rest, cycle, total, guidance.length, reduce]);

  const remain = Math.max(0, Math.ceil(total - elapsed));
  const mm = String(Math.floor(remain / 60)).padStart(2, "0");
  const ss = String(remain % 60).padStart(2, "0");
  const labels: Record<Phase, string> = { inhale: "Receive", hold: "Abide", exhale: "Release", rest: "Rest" };
  const paused = !running && elapsed > 0 && elapsed < total;
  const finished = elapsed >= total && total > 0;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative grid size-56 place-items-center md:size-64">
        <div
          className={cn(
            "grid size-40 place-items-center rounded-full md:size-48",
            "bg-[radial-gradient(circle_at_38%_32%,#fffdf8,color-mix(in_oklab,var(--color-gold-soft)_70%,white)_48%,var(--color-gold)_88%)]",
          )}
          style={{ transform: `scale(${scale})` }}
        >
          <div className="text-center">
            <div className="font-display text-2xl text-ivory">{running ? labels[phase] : paused ? "Held" : "Still"}</div>
            <div className="mt-1 text-xs tracking-[0.28em] text-gold uppercase tabular-nums">
              {running || paused ? `${mm}:${ss}` : `${durationMin} min`}
            </div>
          </div>
        </div>
      </div>
      <p className="max-w-md text-center font-display text-lg italic text-ivory md:text-xl">
        {running ? (phases ? phases[phase] : guidance[guideI]) : paused ? "Stay. The sitting is held." : guidance[0]}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (running) {
              setRunning(false);
              return;
            }
            if (finished) {
              elapsedRef.current = 0;
              setElapsed(0);
              setGuideI(0);
              setPhase("inhale");
              setScale(1);
            }
            startRef.current = null;
            setRunning(true);
          }}
          className="min-h-12 rounded-full bg-ivory px-7 text-sm font-medium text-bg hover:bg-gold"
        >
          {running ? "Pause" : paused ? "Continue" : "Begin"}
        </button>
        {paused ? (
          <button
            type="button"
            onClick={() => {
              elapsedRef.current = 0;
              setElapsed(0);
              setGuideI(0);
              setPhase("inhale");
              setScale(1);
              startRef.current = null;
            }}
            className="min-h-12 rounded-full border border-border px-5 text-sm text-ivory hover:border-gold"
          >
            Begin again
          </button>
        ) : null}
        {allowSkip && !finished ? (
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              onSkip?.();
            }}
            className="min-h-12 rounded-full px-5 text-sm text-muted hover:text-ivory"
          >
            Skip this sitting
          </button>
        ) : null}
      </div>
      <div className="text-center">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">Breathing instructions</p>
        <p className="mt-2 text-sm text-ivory">
          Inhale for {inhale} seconds · Hold for {hold} seconds · Exhale for {exhale} seconds
        </p>
      </div>
    </div>
  );
}
