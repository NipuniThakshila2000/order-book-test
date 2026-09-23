import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BreathOrb } from "@/components/breath-orb";
import { Dust } from "@/components/dust";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/stillness")({ component: StillnessPage });

const presets = [
  {
    id: "temple",
    title: "Temple breath",
    when: "When the body still flinches",
    min: 8,
    inhale: 4,
    hold: 4,
    exhale: 8,
    aim: "Occupy the body as a temple. Let His light reach the place in you that still flinches — the old alarm in the nerves — not only the thought in your mind.",
    mind: "Do not solve. Do not rehearse the next chamber. Attend to this breath and to the sensation of being a body God indwells.",
    heart: "Consent: He dwells here. If tears or tremor come, they are not failure — light is moving through tissue.",
    intention: "I yield the old alarm. This ground is holy.",
    phases: {
      inhale: "Receive His dwelling. I am a temple.",
      hold: "He dwells here. Do not add a thought.",
      exhale: "The old alarm in the body may leave. Let it go down the breath.",
      rest: "Stay. Do not reach for the next thing.",
    },
    guidance: ["Place a hand on your chest. This is holy ground.", "Mind: attend. Heart: consent.", "If tears come, let them."],
  },
  {
    id: "yoke",
    title: "Match His stride",
    when: "When you are rushing or fighting",
    min: 6,
    inhale: 5,
    hold: 2,
    exhale: 5,
    aim: "Take His yoke. Love and fire in one stride — not collapse, not combat.",
    mind: "Watch the pace, not the plan. If the mind rushes, slow. If it stalls, step.",
    heart: "Let love and holy fire walk together. Meekness is a royal nature, reined.",
    intention: "Jesus, I take Your yoke. Time me.",
    phases: {
      inhale: "Inhale with the King. Match His stride.",
      hold: "The yoke times you. It does not crush.",
      exhale: "Exhale with the King. Love and fire, one step.",
      rest: "If you rushed, slow. If you stalled, step.",
    },
    guidance: ["Imagine a yoke that does not crush — it times you.", "Mind on the pace.", "If you rush, slow. If you stall, step."],
  },
  {
    id: "held",
    title: "Held together",
    when: "When you are striving to hold everything together",
    min: 10,
    inhale: 4,
    hold: 6,
    exhale: 6,
    aim: "Rest as proof of His preeminence. You do not hold this together. He does.",
    mind: "Let the need to manage pass. You are not sustaining this breath.",
    heart: "On the hold, notice that you are being held. This is sonship, not performance.",
    intention: "Jesus Christ, You have the preeminence — including in me.",
    phases: {
      inhale: "This breath is given. You do not produce it.",
      hold: "Notice that you are being held. Abide.",
      exhale: "Release the need to hold everything together.",
      rest: "Remain in preeminence. Striving may go.",
    },
    guidance: ["On the hold, notice that you are being held.", "You do not sustain this breath.", "Remain until striving feels unnecessary."],
  },
] as const;

function StillnessPage() {
  const [id, setId] = useState<(typeof presets)[number]["id"]>("temple");
  const [skipped, setSkipped] = useState(false);
  const addStillness = useSanctuary((s) => s.addStillness);
  const touchLast = useSanctuary((s) => s.touchLast);
  const minutes = useSanctuary((s) => s.stillnessMinutes);
  const preset = presets.find((p) => p.id === id) ?? presets[0];

  useEffect(() => {
    touchLast({ kind: "stillness" });
  }, [touchLast]);

  return (
    <main className="relative min-h-[calc(100dvh-57px)] overflow-hidden">
      <img src="/images/candle.jpg" alt="" className="absolute inset-0 size-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-bg/88" />
      <Dust count={16} />
      <div className="relative mx-auto max-w-3xl px-5 py-12 md:py-16">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Sit before you study</p>
      <h1 className="mt-3 font-display text-4xl text-ivory md:text-6xl">Stillness</h1>
      <div className="mt-5 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
        <p>
          Kirby is blunt about this: intimacy is the source of authority. If you skip the sitting and go straight to
          the chambers, you will be studying a war you have not first stood in with Him.
        </p>
        <p>
          This is not emptying your mind, and it is not a wellness timer. You are occupying the silence with Christ —
          on purpose. Thoughts will come. Let them pass. You are not trying to feel holy. You are giving Him the room.
        </p>
        <p>
          How to use it: sit where you will not be interrupted. Put the phone face down. Choose one exercise below —
          the one that names how you actually are today. Press it. Breathe with the orb until it finishes. If you have
          to stop, Pause holds the sitting; Continue picks it up. Do not collect all three in one sitting like a checklist.
        </p>
        <p>
          Over a week, learn all three. Temple breath when the body is still on alarm. Match His stride when you are
          rushing or fighting. Held together when you are the one holding the house up. Come back tomorrow. Come back
          before a hard chamber. Come back for no reason at all.
        </p>
      </div>
      <p className="mt-4 text-xs tracking-[0.18em] text-gold uppercase tabular-nums">{minutes} minutes offered</p>

      <h2 className="mt-12 font-display text-2xl text-ivory">Three stillness exercises</h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted">
        Pick one of the three below. Read the mind, heart, and intention for that exercise before you start the breath
        — that is the work, not the timer. Then sit it to the last rest. When the orb is done, stay a moment. Do not
        lunge at the next page.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {presets.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setId(p.id);
              setSkipped(false);
            }}
            className={`rounded-xl border px-4 py-4 text-left ${
              p.id === id ? "border-gold bg-ivory text-bg" : "border-border bg-surface text-ivory"
            }`}
          >
            <p className={`text-xs tracking-[0.2em] uppercase ${p.id === id ? "text-bg/60" : "text-gold"}`}>
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 font-display text-xl">{p.title}</p>
            <p className={`mt-2 text-sm ${p.id === id ? "text-bg/70" : "text-muted"}`}>{p.when}</p>
          </button>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-border bg-surface p-5 md:p-6">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">Your objective in this silence</p>
        <p className="mt-2 font-display text-xl italic text-ivory">{preset.aim}</p>
        <dl className="mt-6 grid gap-5 md:grid-cols-3">
          <div>
            <dt className="text-xs tracking-[0.2em] text-gold uppercase">Mind</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{preset.mind}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.2em] text-gold uppercase">Heart</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{preset.heart}</dd>
          </div>
          <div>
            <dt className="text-xs tracking-[0.2em] text-gold uppercase">Intention</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{preset.intention}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-6 rounded-xl border border-border bg-surface py-10">
        <BreathOrb
          key={preset.id}
          inhale={preset.inhale}
          hold={preset.hold}
          exhale={preset.exhale}
          durationMin={preset.min}
          guidance={preset.guidance}
          phases={preset.phases}
          allowSkip
          onSkip={() => setSkipped(true)}
          onComplete={() => {
            addStillness(preset.min);
            setSkipped(false);
          }}
        />
        {skipped ? (
          <p className="mx-auto mt-6 max-w-md px-5 text-center text-sm leading-relaxed text-muted">
            The sitting is offered, not required. Go on if you must — and come back when you can stay.
          </p>
        ) : null}
      </div>

      <nav className="mt-10 rounded-xl border border-border bg-surface px-5 py-8 md:px-8">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">When you are ready to walk</p>
        <p className="mt-3 max-w-xl leading-relaxed text-muted">
          The path is the map of the whole book. Chambers is the door into Part One — Introduction first, then the
          rooms. Sit here whenever you return.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/path"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-8 text-sm text-ivory hover:border-gold"
          >
            See the path
          </Link>
          <Link
            to="/battlefield"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
          >
            Begin Chambers
          </Link>
        </div>
      </nav>
      </div>
    </main>
  );
}
