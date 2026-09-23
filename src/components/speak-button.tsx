import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/cn";
import { canSpeak, speak, stopSpeak } from "@/lib/speak";
import { useSanctuary } from "@/lib/store";

const SILENCE = "order-silence";
const RATES = [0.75, 1, 1.25, 1.5] as const;

export function SpeakButton({ text, label = "Speak" }: { text: string; label?: string }) {
  const [on, setOn] = useState(false);
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState(false);
  const rate = useSanctuary((s) => s.speechRate) || 1;
  const setRate = useSanctuary((s) => s.setSpeechRate);

  useEffect(() => {
    setOk(canSpeak());
    const hush = () => setOn(false);
    window.addEventListener(SILENCE, hush);
    return () => {
      window.removeEventListener(SILENCE, hush);
      stopSpeak();
    };
  }, []);

  if (!ok) {
    return (
      <details className="no-print text-sm">
        <summary className="cursor-pointer text-muted hover:text-ivory">Read these lines</summary>
        <p className="mt-3 whitespace-pre-wrap leading-relaxed text-muted">{text}</p>
      </details>
    );
  }

  return (
    <div className="no-print">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (on) {
              stopSpeak();
              setOn(false);
            } else {
              window.dispatchEvent(new Event(SILENCE));
              speak(text, () => setOn(false), rate);
              setOn(true);
            }
          }}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm text-ivory hover:border-border-strong"
        >
          {on ? <VolumeX className="size-4 text-gold" /> : <Volume2 className="size-4 text-gold" />}
          {on ? "Silence" : label}
        </button>
        {RATES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => {
              setRate(r);
              if (on) {
                window.dispatchEvent(new Event(SILENCE));
                speak(text, () => setOn(false), r);
                setOn(true);
              }
            }}
            className={cn(
              "min-h-9 rounded-full px-3 text-xs tabular-nums",
              rate === r ? "bg-ivory text-bg" : "border border-border text-muted hover:text-ivory",
            )}
          >
            {r}×
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="min-h-9 px-2 text-xs text-muted hover:text-gold"
        >
          {open ? "Hide transcript" : "Transcript"}
        </button>
      </div>
      {open ? (
        <p className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap rounded-lg border border-border bg-bg px-3 py-3 text-sm leading-relaxed text-muted">
          {text}
        </p>
      ) : null}
    </div>
  );
}
