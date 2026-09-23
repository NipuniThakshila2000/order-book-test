import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { firstGlossHit, type GlossEntry } from "@/lib/gloss";

export function glossNodes(text: string, seen: Set<string>, terms: GlossEntry[]): ReactNode {
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining) {
    let best: { index: number; len: number; entry: GlossEntry; match: string } | null = null;
    for (const entry of terms) {
      if (seen.has(entry.id)) continue;
      const hit = firstGlossHit(remaining, entry.term);
      if (!hit) continue;
      if (!best || hit.index < best.index || (hit.index === best.index && hit.match.length > best.len)) {
        best = { index: hit.index, len: hit.match.length, entry, match: hit.match };
      }
    }
    if (!best) {
      parts.push(remaining);
      break;
    }
    if (best.index > 0) parts.push(remaining.slice(0, best.index));
    seen.add(best.entry.id);
    parts.push(<GlossWord key={`${best.entry.id}-${key++}`} label={best.match} entry={best.entry} />);
    remaining = remaining.slice(best.index + best.len);
  }

  return parts;
}

function GlossWord({ label, entry }: { label: string; entry: GlossEntry }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={wrap} className="relative inline">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Look up ${entry.term}`}
        onClick={() => setOpen((v) => !v)}
        className="underline decoration-gold/55 decoration-from-font underline-offset-4 hover:text-gold"
      >
        {label}
      </button>
      {open ? (
        <span
          id={panelId}
          role="dialog"
          className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-border bg-surface p-4 text-left shadow-[0_16px_40px_color-mix(in_oklab,var(--color-fg)_12%,transparent)] sm:w-80"
        >
          <span className="block font-display text-xl text-ivory">{entry.term}</span>
          <span className="mt-2 block text-sm font-normal leading-relaxed text-muted not-italic">{entry.body}</span>
          <Link
            to="/glossary"
            hash={entry.id}
            className="mt-3 inline-flex text-sm text-gold hover:text-ivory"
          >
            Open in Glossary
          </Link>
        </span>
      ) : null}
    </span>
  );
}
