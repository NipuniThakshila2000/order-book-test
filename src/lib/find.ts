import { assessIntro, entryPoints, legalRights } from "@/lib/content/assessment";
import { bookIntroduction, walkingInTheLight } from "@/lib/content/book-passages";
import { chambers } from "@/lib/content/chambers";
import { glossary } from "@/lib/content/glossary";
import { decrees, prayers } from "@/lib/content/prayers";
import { steps } from "@/lib/content/steps";
import { glossId } from "@/lib/gloss";

export type FindHit = {
  kind: "Chamber" | "Step" | "Glossary" | "Prayer" | "Page";
  title: string;
  snippet: string;
  to: "/battlefield/$slug" | "/authority/$slug" | "/glossary" | "/prayers" | "/introduction" | "/light" | "/assessment";
  slug?: string;
  hash?: string;
};

type Indexed = FindHit & { hay: string };

function snippetAround(hay: string, needle: string, fallback: string) {
  const i = hay.toLowerCase().indexOf(needle);
  if (i < 0) return fallback;
  const start = Math.max(0, i - 42);
  const slice = hay.slice(start, start + 160).replace(/\s+/g, " ").trim();
  return `${start > 0 ? "…" : ""}${slice}${start + 160 < hay.length ? "…" : ""}`;
}

const index: Indexed[] = [
  {
    kind: "Page",
    title: "Introduction",
    snippet: "Kirby’s own pages — covering, infiltration, Leviathan.",
    to: "/introduction",
    hay: `introduction ${bookIntroduction.join(" ")}`.toLowerCase(),
  },
  ...chambers.map((c) => {
    const heads = c.teaching.filter((p) => p.startsWith("## ")).map((p) => p.slice(3));
    const body = c.teaching.filter((p) => !p.startsWith("[[img:")).join(" ");
    return {
      kind: "Chamber" as const,
      title: `${c.number} · ${c.title}`,
      snippet: c.kicker,
      to: "/battlefield/$slug" as const,
      slug: c.slug,
      hay: `${c.title} ${c.kicker} ${c.number} ${heads.join(" ")} ${body}`.toLowerCase(),
    };
  }),
  ...steps.map((st) => ({
    kind: "Step" as const,
    title: `Step ${st.n} · ${st.title}`,
    snippet: st.kicker,
    to: "/authority/$slug" as const,
    slug: st.slug,
    hay: `${st.title} ${st.kicker} ${st.teaching.join(" ")}`.toLowerCase(),
  })),
  {
    kind: "Page",
    title: "Assess",
    snippet: "Strongholds & Legal Rights Assessment.",
    to: "/assessment",
    hay: `assess assessment ${assessIntro.join(" ")} ${entryPoints.map((e) => `${e.title} ${e.questions.join(" ")}`).join(" ")} ${legalRights.map((r) => r.label).join(" ")}`.toLowerCase(),
  },
  {
    kind: "Page",
    title: "The Light",
    snippet: "Walking in the Light — covering, commissioning.",
    to: "/light",
    hay: `light walking ${walkingInTheLight.join(" ")}`.toLowerCase(),
  },
  ...glossary.map((g) => ({
    kind: "Glossary" as const,
    title: g.term,
    snippet: g.body.slice(0, 140),
    to: "/glossary" as const,
    hash: glossId(g.term),
    hay: `${g.term} ${g.body}`.toLowerCase(),
  })),
  ...[...prayers, ...decrees].map((p) => ({
    kind: "Prayer" as const,
    title: p.title,
    snippet: p.kicker,
    to: "/prayers" as const,
    hay: `${p.title} ${p.kicker} ${p.lines.join(" ")}`.toLowerCase(),
  })),
];

export function searchOrder(q: string): FindHit[] {
  const needle = q.trim().toLowerCase();
  if (needle.length < 2) return [];
  return index
    .filter((row) => row.hay.includes(needle))
    .slice(0, 24)
    .map(({ hay, ...hit }) => ({
      ...hit,
      snippet: snippetAround(hay, needle, hit.snippet),
    }));
}
