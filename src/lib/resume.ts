export type LastPlace =
  | { kind: "chamber"; slug: string; label: string }
  | { kind: "step"; slug: string; label: string }
  | { kind: "intro" }
  | { kind: "assess" }
  | { kind: "light" }
  | { kind: "stillness" };

export function placeLabel(p: LastPlace) {
  if (p.kind === "chamber") return p.label;
  if (p.kind === "step") return p.label;
  if (p.kind === "intro") return "Introduction";
  if (p.kind === "assess") return "Assess";
  if (p.kind === "light") return "The Light";
  return "Stillness";
}
