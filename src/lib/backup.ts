import type { BackupPayload } from "@/lib/store";
import { useSanctuary } from "@/lib/store";

export function collectBackup(): BackupPayload {
  const s = useSanctuary.getState();
  return {
    v: 1,
    at: Date.now(),
    journal: s.journal,
    notes: s.notes,
    assessmentMarks: s.assessmentMarks,
    chamberVisit: s.chamberVisit,
    stepVisit: s.stepVisit,
    prayerMarks: s.prayerMarks,
    stillnessMinutes: s.stillnessMinutes,
    chamberSeal: s.chamberSeal,
    stepSeal: s.stepSeal,
    assessSnapshots: s.assessSnapshots,
    last: s.last,
  };
}

export function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseBackup(raw: string): BackupPayload {
  const data = JSON.parse(raw) as Partial<BackupPayload>;
  if (!data || typeof data !== "object") throw new Error("Not a sanctuary backup.");
  return {
    v: 1,
    at: typeof data.at === "number" ? data.at : Date.now(),
    journal: Array.isArray(data.journal) ? data.journal : [],
    notes: data.notes && typeof data.notes === "object" ? data.notes : {},
    assessmentMarks: data.assessmentMarks && typeof data.assessmentMarks === "object" ? data.assessmentMarks : {},
    chamberVisit: data.chamberVisit && typeof data.chamberVisit === "object" ? data.chamberVisit : {},
    stepVisit: data.stepVisit && typeof data.stepVisit === "object" ? data.stepVisit : {},
    prayerMarks: data.prayerMarks && typeof data.prayerMarks === "object" ? data.prayerMarks : {},
    stillnessMinutes: typeof data.stillnessMinutes === "number" ? data.stillnessMinutes : 0,
    chamberSeal: data.chamberSeal && typeof data.chamberSeal === "object" ? data.chamberSeal : {},
    stepSeal: data.stepSeal && typeof data.stepSeal === "object" ? data.stepSeal : {},
    assessSnapshots: Array.isArray(data.assessSnapshots) ? data.assessSnapshots : [],
    last: data.last ?? null,
  };
}

export function stamp() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}
