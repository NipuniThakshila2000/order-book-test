import { entryPoints } from "@/lib/content/assessment";

export const entryClusters = [
  {
    title: "Bloodline and speech",
    hint: "Ancestry, lying, unforgiveness, anger.",
    ids: ["ancestry", "lying", "unforgiveness", "anger"],
  },
  {
    title: "Wounds and the body",
    hint: "Rejection, trauma, childhood, sexual impurity, the body.",
    ids: ["rejection", "trauma", "childhood", "sexual", "body"],
  },
  {
    title: "The hidden doors",
    hint: "The occult, unbelief, blasphemy, cursed objects.",
    ids: ["occult", "doubt", "blasphemy", "objects"],
  },
] as const;

export const assessClusters = [
  { id: "name", title: "Name what occupies" },
  { id: "entry-0", title: entryClusters[0].title },
  { id: "entry-1", title: entryClusters[1].title },
  { id: "entry-2", title: entryClusters[2].title },
  { id: "rights", title: "Legal rights" },
  { id: "seal", title: "Keep this sitting" },
] as const;

export const ASSESS_STEPS = assessClusters.length;

export function pointsInCluster(i: number) {
  const ids = new Set<string>(entryClusters[i].ids);
  return entryPoints.filter((ep) => ids.has(ep.id));
}
