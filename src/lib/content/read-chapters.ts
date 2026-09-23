import { assessIntro } from "@/lib/content/assessment";
import {
  bookIntroduction,
  partTwoIntroduction,
  walkingInTheLight,
} from "@/lib/content/book-passages";
import { chambers } from "@/lib/content/chambers";
import { howToUse } from "@/lib/content/meta";
import { steps } from "@/lib/content/steps";

export type ReadChapter = {
  id: string;
  kicker: string;
  title: string;
  blocks: string[];
};

export function readChapters(): ReadChapter[] {
  return [
    {
      id: "how",
      kicker: "Front matter",
      title: "How to use this book",
      blocks: [howToUse.feast, howToUse.notAFormula, howToUse.repetition],
    },
    {
      id: "introduction",
      kicker: "Front matter",
      title: "Introduction",
      blocks: bookIntroduction,
    },
    ...chambers.map((c) => ({
      id: c.slug,
      kicker: `Part One · ${c.number}`,
      title: c.title,
      blocks: c.teaching,
    })),
    {
      id: "assess",
      kicker: "Between the parts",
      title: "Strongholds and Legal Rights Assessment",
      blocks: assessIntro,
    },
    {
      id: "part-two",
      kicker: "Part Two",
      title: "Taking Back Authority",
      blocks: partTwoIntroduction,
    },
    ...steps.map((st) => ({
      id: st.slug,
      kicker: `Part Two · Step ${st.n}`,
      title: st.title,
      blocks: st.teaching,
    })),
    {
      id: "light",
      kicker: "Part Three",
      title: "Walking in the Light",
      blocks: walkingInTheLight,
    },
  ];
}
