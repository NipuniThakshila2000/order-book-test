import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Dust } from "@/components/dust";
import { PageMark } from "@/components/page-mark";
import { BookPdfLink } from "@/components/print-button";
import { TeachBody } from "@/components/teach-body";
import { partHow } from "@/lib/content/meta";
import { aboutTheAuthorBook, acknowledgments, walkingInTheLight } from "@/lib/content/book-passages";
import { useScrollPlace } from "@/lib/scroll-place";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/light")({ component: LightPage });

const reminders = [
  {
    t: "Stay under covering",
    b: "Freedom without a people is how occupancy returns. Rank under Christ includes a house, a pastor, a fellowship that can tell you the truth. If you have none, that is not a small thing. It is the next obedience.",
  },
  {
    t: "Keep what was occupied",
    b: "The seven steps are not a certificate. Testimony is how Heaven’s verdict becomes the law of an ordinary Tuesday. Say what He did. Keep honor. Do not go back to the old agreement because it is familiar.",
  },
  {
    t: "Do not stop sitting",
    b: "Intimacy is still the source of authority. Stillness, the prayers, the journal — they are not homework you finished. Come back tomorrow for no reason at all. The King is not a course.",
  },
];

function LightPage() {
  const touchLast = useSanctuary((s) => s.touchLast);
  const markLight = useSanctuary((s) => s.markLight);
  useScrollPlace("light");
  useEffect(() => {
    touchLast({ kind: "light" });
    markLight();
  }, [touchLast, markLight]);

  return (
    <main className="relative min-h-[calc(100dvh-57px)] overflow-hidden">
      <Dust count={12} />
      <div className="page-enter relative mx-auto max-w-5xl px-5 py-12 md:py-16">
        <PageMark
          image="/images/mark-light.jpg"
          kicker="The Light · Part Three"
          title="The Light"
          aside={<BookPdfLink />}
          bodyBelow
        >
          <p className="mt-3 font-display text-2xl italic text-gold">Walking in the Light</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            The book calls this Walking in the Light. The link in the header is The Light. Same covering. Same walk.
            Kirby names it the end that becomes a beginning.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{partHow.three}</p>
        </PageMark>

        <TeachBody
          blocks={walkingInTheLight}
          live
          className="mt-14 max-w-2xl space-y-5 text-lg leading-relaxed text-muted"
        />
        <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          <p>
            If this book has done its work, you are not the same person who opened El Mistater. That does not mean
            you are finished. Occupancy is patient. It will wait for the first week you stop sitting, the first
            offense you keep, the first throne you take back because no one is watching.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {reminders.map((r) => (
            <li key={r.t} className="rounded-xl border border-border bg-surface p-5">
              <h2 className="font-display text-2xl text-ivory">{r.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{r.b}</p>
            </li>
          ))}
        </ol>

        <section className="mt-14 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          <h2 className="font-display text-3xl text-ivory">The prayers are not extra</h2>
          <p>
            In the header they sit to the right — Prayers. Use them. They are not a bonus track at the end of the
            book. They are how occupancy is spoken out of the mouth after it has been named in the heart.
          </p>
          <p>
            There is an opening search from Psalm 139. There is a decree of preeminence, the easy yoke, rank
            restored, and a prayer to stay covered. Start with Speak — hear the whole thing once. Then say it
            yourself, slowly, more than once. Do not perform. You are occupying the words.
          </p>
          <p>
            When to come: in the morning before you open a chamber. When a step has undone you and you have no
            language left. When the old alarm in the body starts. When you are about to go back to the agreement you
            just revoked. When you simply do not know what to pray. These are short on purpose. Return to the same
            one for a week if that is what you have.
          </p>
          <p>
            Print them if you want them on the table. Mark “I have spoken this” if it helps you remember — but the
            mark is not the work. Your mouth is.
          </p>
        </section>

        <section className="mt-14 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          <h2 className="font-display text-3xl text-ivory">A word about home</h2>
          <p>
            If you already have covering — a church, a pastor, a table of people who know your name — go back to
            them with what this book named. Do not become a lone prophet of your own deliverance. Take the pages you
            printed. Ask to be prayed for. Stay.
          </p>
          <p>
            If you do not yet have a spiritual home, Kirby and Fiona’s house is open. WOWLife Church in Sri Lanka is
            not a brand at the end of a book. It is people who will walk with you in prayer and discipleship if you
            need somewhere to land. You do not have to be in Colombo to ask.
          </p>
          <p>
            Commissioning is simple: walk in the light you were given. Keep a clean conscience. Do not make a
            spectacle of the war. Occupy quietly, as He did. And when you are tired, sit. He is still the one holding
            all things together — including you.
          </p>
        </section>

        <section className="mt-16 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          <h2 className="font-display text-3xl text-ivory">About the Author</h2>
          {aboutTheAuthorBook.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </section>

        <section className="mt-14 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          <h2 className="font-display text-3xl text-ivory">Acknowledgments</h2>
          {acknowledgments.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          <a
            href="https://www.wowlife.lk"
            className="inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
          >
            WOWLife Church
          </a>
          <Link
            to="/prayers"
            className="inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
          >
            Stay in the prayers
          </Link>
          <Link
            to="/stillness"
            className="inline-flex min-h-12 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
          >
            Sit in stillness
          </Link>
        </div>
      </div>
    </main>
  );
}
