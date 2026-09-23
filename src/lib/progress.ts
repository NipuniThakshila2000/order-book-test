import { chambers } from "@/lib/content/chambers";
import { steps } from "@/lib/content/steps";
import { chamberDone, useSanctuary } from "@/lib/store";

export function useWalkProgress() {
  const stillnessMinutes = useSanctuary((s) => s.stillnessMinutes);
  const cv = useSanctuary((s) => s.chamberVisit);
  const sv = useSanctuary((s) => s.stepVisit);
  const sealC = useSanctuary((s) => s.chamberSeal);
  const sealS = useSanctuary((s) => s.stepSeal);
  const snapshots = useSanctuary((s) => s.assessSnapshots);
  const notes = useSanctuary((s) => s.notes);
  const marks = useSanctuary((s) => s.assessmentMarks);
  const lightSeen = useSanctuary((s) => s.lightSeen);

  const chambersLit = chambers.filter((c) => sealC[c.slug] || chamberDone(cv[c.slug])).length;
  const stepsSealed = steps.filter((st) => sealS[st.slug] || Boolean(sv[st.slug]?.practice?.trim())).length;
  const assessNamed = Object.values(marks ?? {}).filter(Boolean).length;
  const assessWritten = ["assess-cycle", "assess-door", "assess-occupant", "assess-story"].filter((k) =>
    notes[k]?.trim(),
  ).length;
  const assessDone = snapshots.length > 0 || (assessWritten >= 3 && assessNamed > 0);

  return {
    stillness: stillnessMinutes > 0,
    stillnessMinutes,
    chambersLit,
    chambersTotal: chambers.length,
    assessDone,
    assessNamed,
    stepsSealed,
    stepsTotal: steps.length,
    lightSeen,
  };
}
