import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LastPlace } from "@/lib/resume";

export type JournalEntry = {
  id: string;
  title: string;
  body: string;
  at: number;
  chamber?: string;
};

export type AssessSnapshot = {
  id: string;
  at: number;
  notes: Record<string, string>;
  marks: Record<string, boolean>;
};

export type BackupPayload = {
  v: 1;
  at: number;
  journal: JournalEntry[];
  notes: Record<string, string>;
  assessmentMarks: Record<string, boolean>;
  chamberVisit: Sanctuary["chamberVisit"];
  stepVisit: Sanctuary["stepVisit"];
  prayerMarks: Record<string, boolean>;
  stillnessMinutes: number;
  chamberSeal: Record<string, boolean>;
  stepSeal: Record<string, boolean>;
  assessSnapshots: AssessSnapshot[];
  last: LastPlace | null;
};

type Sanctuary = {
  entered: boolean;
  last: LastPlace | null;
  stillnessMinutes: number;
  prayerMarks: Record<string, boolean>;
  journal: JournalEntry[];
  notes: Record<string, string>;
  assessmentMarks: Record<string, boolean>;
  chamberVisit: Record<string, { visited: boolean; ponder?: string; exercise?: string }>;
  stepVisit: Record<string, { visited: boolean; practice?: string }>;
  gateSeen: boolean;
  welcomeBackSeen: boolean;
  navHintsSeen: boolean;
  assessAdvisorySeen: boolean;
  assessCluster: number;
  assessSnapshots: AssessSnapshot[];
  chamberSeal: Record<string, boolean>;
  stepSeal: Record<string, boolean>;
  scrollAt: Record<string, number>;
  speechRate: number;
  fieldManual: boolean;
  lightSeen: boolean;
  enter: () => void;
  touchLast: (p: LastPlace) => void;
  addStillness: (min: number) => void;
  markPrayer: (id: string) => void;
  addJournal: (e: { title: string; body: string; chamber?: string }) => void;
  removeJournal: (id: string) => void;
  setNote: (key: string, body: string) => void;
  toggleAssess: (id: string) => void;
  visitChamber: (slug: string, patch?: { ponder?: string; exercise?: string }) => void;
  visitStep: (slug: string, patch?: { practice?: string }) => void;
  dismissGate: () => void;
  dismissWelcomeBack: () => void;
  dismissNavHints: () => void;
  dismissAssessAdvisory: () => void;
  setAssessCluster: (n: number) => void;
  saveAssessSnapshot: () => void;
  restoreAssessSnapshot: (id: string) => void;
  sealChamber: (slug: string, on?: boolean) => void;
  sealStep: (slug: string, on?: boolean) => void;
  setScrollAt: (key: string, y: number) => void;
  setSpeechRate: (n: number) => void;
  setFieldManual: (on: boolean) => void;
  markLight: () => void;
  applyBackup: (b: BackupPayload) => void;
};

export function chamberDone(p?: { visited?: boolean; ponder?: string; exercise?: string }) {
  return Boolean(p?.ponder?.trim() && p?.exercise?.trim());
}

const defaults: Pick<
  Sanctuary,
  | "entered"
  | "last"
  | "stillnessMinutes"
  | "prayerMarks"
  | "journal"
  | "notes"
  | "assessmentMarks"
  | "chamberVisit"
  | "stepVisit"
  | "gateSeen"
  | "welcomeBackSeen"
  | "navHintsSeen"
  | "assessAdvisorySeen"
  | "assessCluster"
  | "assessSnapshots"
  | "chamberSeal"
  | "stepSeal"
  | "scrollAt"
  | "speechRate"
  | "fieldManual"
  | "lightSeen"
> = {
  entered: false,
  last: null,
  stillnessMinutes: 0,
  prayerMarks: {},
  journal: [],
  notes: {},
  assessmentMarks: {},
  chamberVisit: {},
  stepVisit: {},
  gateSeen: false,
  welcomeBackSeen: false,
  navHintsSeen: false,
  assessAdvisorySeen: false,
  assessCluster: 0,
  assessSnapshots: [],
  chamberSeal: {},
  stepSeal: {},
  scrollAt: {},
  speechRate: 1,
  fieldManual: false,
  lightSeen: false,
};

export const useSanctuary = create<Sanctuary>()(
  persist(
    (set) => ({
      ...defaults,
      enter: () => set({ entered: true, gateSeen: true }),
      touchLast: (p) => set({ last: p, entered: true }),
      addStillness: (min) => set((s) => ({ stillnessMinutes: s.stillnessMinutes + min })),
      markPrayer: (id) => set((s) => ({ prayerMarks: { ...s.prayerMarks, [id]: true } })),
      addJournal: (e) =>
        set((s) => {
          const body = e.body.trim();
          if (!body) return s;
          const dup = s.journal[0];
          if (dup && dup.title === (e.title || "Untitled") && dup.body === body) return s;
          return {
            journal: [
              {
                id: crypto.randomUUID(),
                title: e.title || "Untitled",
                body,
                at: Date.now(),
                chamber: e.chamber,
              },
              ...s.journal,
            ],
          };
        }),
      removeJournal: (id) => set((s) => ({ journal: s.journal.filter((x) => x.id !== id) })),
      setNote: (key, body) => set((s) => ({ notes: { ...s.notes, [key]: body } })),
      toggleAssess: (id) =>
        set((s) => {
          const cur = s.assessmentMarks ?? {};
          return { assessmentMarks: { ...cur, [id]: !cur[id] } };
        }),
      visitChamber: (slug, patch) =>
        set((s) => ({
          chamberVisit: {
            ...s.chamberVisit,
            [slug]: { ...s.chamberVisit[slug], ...patch, visited: true },
          },
        })),
      visitStep: (slug, patch) =>
        set((s) => ({
          stepVisit: {
            ...s.stepVisit,
            [slug]: { ...s.stepVisit[slug], ...patch, visited: true },
          },
        })),
      dismissGate: () => set({ gateSeen: true, entered: true }),
      dismissWelcomeBack: () => set({ welcomeBackSeen: true, gateSeen: true, entered: true }),
      dismissNavHints: () => set({ navHintsSeen: true }),
      dismissAssessAdvisory: () => set({ assessAdvisorySeen: true }),
      setAssessCluster: (n) => set({ assessCluster: Math.max(0, n) }),
      saveAssessSnapshot: () =>
        set((s) => ({
          assessSnapshots: [
            {
              id: crypto.randomUUID(),
              at: Date.now(),
              notes: { ...s.notes },
              marks: { ...s.assessmentMarks },
            },
            ...s.assessSnapshots,
          ],
        })),
      restoreAssessSnapshot: (id) =>
        set((s) => {
          const snap = s.assessSnapshots.find((x) => x.id === id);
          if (!snap) return s;
          return { notes: { ...s.notes, ...snap.notes }, assessmentMarks: { ...snap.marks } };
        }),
      sealChamber: (slug, on = true) =>
        set((s) => ({ chamberSeal: { ...s.chamberSeal, [slug]: on } })),
      sealStep: (slug, on = true) => set((s) => ({ stepSeal: { ...s.stepSeal, [slug]: on } })),
      setScrollAt: (key, y) => set((s) => ({ scrollAt: { ...s.scrollAt, [key]: y } })),
      setSpeechRate: (n) => set({ speechRate: n }),
      setFieldManual: (on) => set({ fieldManual: on }),
      markLight: () => set({ lightSeen: true }),
      applyBackup: (b) =>
        set({
          journal: b.journal ?? [],
          notes: b.notes ?? {},
          assessmentMarks: b.assessmentMarks ?? {},
          chamberVisit: b.chamberVisit ?? {},
          stepVisit: b.stepVisit ?? {},
          prayerMarks: b.prayerMarks ?? {},
          stillnessMinutes: b.stillnessMinutes ?? 0,
          chamberSeal: b.chamberSeal ?? {},
          stepSeal: b.stepSeal ?? {},
          assessSnapshots: b.assessSnapshots ?? [],
          last: b.last ?? null,
          entered: true,
        }),
    }),
    {
      name: "order-sanctuary",
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<Sanctuary>;
        const walked = Boolean(p.entered || p.last);
        return {
          ...current,
          ...p,
          gateSeen: p.gateSeen ?? walked,
          welcomeBackSeen: p.welcomeBackSeen ?? false,
          navHintsSeen: p.navHintsSeen ?? walked,
          assessAdvisorySeen: p.assessAdvisorySeen ?? false,
          assessCluster: p.assessCluster ?? 0,
          assessSnapshots: p.assessSnapshots ?? [],
          chamberSeal: p.chamberSeal ?? {},
          stepSeal: p.stepSeal ?? {},
          scrollAt: p.scrollAt ?? {},
          speechRate: p.speechRate ?? 1,
          fieldManual: p.fieldManual ?? false,
          lightSeen: p.lightSeen ?? false,
        };
      },
    },
  ),
);
