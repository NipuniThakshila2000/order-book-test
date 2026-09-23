import { chambers } from "@/lib/content/chambers";
import { overlays } from "@/lib/content/overlays";

export function todaysSit() {
  const day = Math.floor(Date.now() / 86_400_000);
  const chamber = chambers[day % chambers.length];
  const para =
    chamber.teaching.find((p) => !p.startsWith("## ") && !p.startsWith("[[img:") && !p.startsWith("> ")) ??
    chamber.kicker;
  const excerpt = para.length > 280 ? `${para.slice(0, 277).trim()}…` : para;
  const prompt = overlays[chamber.slug]?.ponderings[0] ?? chamber.ponderings[0];
  return {
    chamber,
    excerpt,
    prompt,
  };
}
