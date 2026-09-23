import { glossary } from "@/lib/content/glossary";

const distinctive = new Set([
  "Jezebel",
  "Leviathan",
  "Mammon",
  "Kosmokrator",
  "Gehenna",
  "Sheol",
  "Sigil",
  "Whisperer",
  "Enervated",
  "Insula",
  "Glossalalia",
  "Stronghold",
  "Jurisdiction",
]);

export type GlossEntry = { term: string; id: string; body: string };

export function glossId(term: string) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

let cached: GlossEntry[] | null = null;

export function glossEntries(): GlossEntry[] {
  if (cached) return cached;
  cached = glossary
    .filter((g) => g.term.includes(" ") || g.term.includes("-") || distinctive.has(g.term))
    .sort((a, b) => b.term.length - a.term.length)
    .map((g) => ({ term: g.term, id: glossId(g.term), body: g.body }));
  return cached;
}

function isWordChar(ch: string | undefined) {
  return Boolean(ch && /[A-Za-z0-9]/.test(ch));
}

export function firstGlossHit(text: string, term: string): { index: number; match: string } | null {
  const hay = text.toLowerCase();
  const needle = term.toLowerCase();
  let from = 0;
  while (from < hay.length) {
    const i = hay.indexOf(needle, from);
    if (i < 0) return null;
    const before = i === 0 ? undefined : text[i - 1];
    const after = text[i + needle.length];
    if (!isWordChar(before) && !isWordChar(after)) {
      return { index: i, match: text.slice(i, i + term.length) };
    }
    from = i + 1;
  }
  return null;
}
