import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageMark } from "@/components/page-mark";
import { BookPdfLink } from "@/components/print-button";
import { TeachBody } from "@/components/teach-body";
import { bookIntroduction } from "@/lib/content/book-passages";
import { useScrollPlace } from "@/lib/scroll-place";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/introduction")({ component: IntroductionPage });

function IntroductionPage() {
  const touchLast = useSanctuary((s) => s.touchLast);
  useScrollPlace("intro");
  useEffect(() => {
    touchLast({ kind: "intro" });
  }, [touchLast]);

  return (
    <main className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/mark-watch.jpg"
        kicker="Before Part One"
        title="Introduction"
        aside={<BookPdfLink />}
        bodyBelow
      >
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Kirby’s own pages — covering, infiltration, Leviathan, and why this book exists. Read this before El
          Mistater. It is not a numbered chapter. It is the door.
        </p>
      </PageMark>
      <TeachBody blocks={bookIntroduction} live className="mt-10 space-y-5 text-lg leading-relaxed text-ivory" />
      <div className="mt-14 rounded-xl border border-border bg-surface px-6 py-8 text-center">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">Then the rooms begin</p>
        <p className="mt-2 font-display text-2xl text-ivory">El Mistater (“The Hidden One”)</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          The opening of Part One. Not chapter 1 — the unveiling before the numbered chapters.
        </p>
        <Link
          to="/battlefield/$slug"
          params={{ slug: "el-mistater" }}
          className="mt-5 inline-flex min-h-12 items-center rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold"
        >
          Begin with El Mistater
        </Link>
      </div>
    </main>
  );
}
