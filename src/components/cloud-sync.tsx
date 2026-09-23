import { useEffect, useMemo, useRef } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { saveProgress, upsertJournalEntry, upsertResponse } from "@/lib/platform";
import { placeLabel, type LastPlace } from "@/lib/resume";
import { useSanctuary } from "@/lib/store";

function routeFromLast(last: LastPlace | null) {
  if (!last) return "/dashboard";
  if (last.kind === "chamber") return `/battlefield/${last.slug}`;
  if (last.kind === "step") return `/authority/${last.slug}`;
  if (last.kind === "assess") return "/assessment";
  if (last.kind === "light") return "/light";
  if (last.kind === "stillness") return "/stillness";
  return "/introduction";
}

export function CloudSync() {
  const { user } = useCurrentUserState();
  const last = useSanctuary((s) => s.last);
  const notes = useSanctuary((s) => s.notes);
  const journal = useSanctuary((s) => s.journal);
  const chamberSeal = useSanctuary((s) => s.chamberSeal);
  const stepSeal = useSanctuary((s) => s.stepSeal);
  const assessmentMarks = useSanctuary((s) => s.assessmentMarks);
  const prayerMarks = useSanctuary((s) => s.prayerMarks);
  const stillnessMinutes = useSanctuary((s) => s.stillnessMinutes);
  const lightSeen = useSanctuary((s) => s.lightSeen);
  const signature = useMemo(
    () =>
      JSON.stringify({
        last,
        notes,
        journal,
        chamberSeal,
        stepSeal,
        assessmentMarks,
        prayerMarks,
        stillnessMinutes,
        lightSeen,
      }),
    [assessmentMarks, chamberSeal, journal, last, lightSeen, notes, prayerMarks, stepSeal, stillnessMinutes],
  );
  const lastSynced = useRef("");

  useEffect(() => {
    if (!user || signature === lastSynced.current) return;
    const timer = window.setTimeout(() => {
      lastSynced.current = signature;
      const completedChapter = Object.entries(chamberSeal).find(([, done]) => done)?.[0];
      const completedStep = Object.entries(stepSeal).find(([, done]) => done)?.[0];
      const completedAssessmentItem = Object.entries(assessmentMarks).find(([, done]) => done)?.[0];
      const completedPrayer = Object.entries(prayerMarks).find(([, done]) => done)?.[0];
      const route = routeFromLast(last);
      void saveProgress({
        data: {
          sectionSlug: last?.kind ?? null,
          chapterSlug: "slug" in (last ?? {}) ? (last as { slug?: string }).slug : null,
          contentId: last ? placeLabel(last) : null,
          route,
          scrollY: window.scrollY,
          completedChapter,
          completedStep,
          completedAssessmentItem,
          completedPrayer,
          stillnessMinutes,
          lightCompleted: lightSeen,
        },
      }).catch(() => undefined);
      for (const [responseKey, response] of Object.entries(notes)) {
        if (!response.trim()) continue;
        void upsertResponse({
          data: {
            responseKey,
            response,
            prompt: responseKey,
            completed: Boolean(response.trim()),
          },
        }).catch(() => undefined);
      }
      for (const entry of journal.slice(0, 25)) {
        void upsertJournalEntry({
          data: {
            id: entry.id,
            title: entry.title || "Untitled",
            body: entry.body,
            sourceChapter: entry.chamber,
          },
        }).catch(() => undefined);
      }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [
    assessmentMarks,
    chamberSeal,
    journal,
    last,
    lightSeen,
    notes,
    prayerMarks,
    signature,
    stepSeal,
    stillnessMinutes,
    user,
  ]);

  return null;
}
