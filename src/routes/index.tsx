import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BreathOrb } from "@/components/breath-orb";
import { ContinueLink } from "@/components/continue-link";
import { book, disclaimer, fourPrinciples, aboutAuthor } from "@/lib/content/meta";
import { useSanctuary } from "@/lib/store";
import { todaysSit } from "@/lib/today";

export const Route = createFileRoute("/")({ component: Home });

const ranks = [
  { roman: "01", part: "Part one", title: "The Battlefield", short: "Chambers", line: "Begin with the rooms that name what is happening beneath the surface.", to: "/battlefield" as const, image: "/images/mark-watch.jpg" },
  { roman: "02", part: "Part two", title: "Taking Back Authority", short: "Authority", line: "Move through seven practical steps to take back the ground.", to: "/authority" as const, image: "/images/mark-authority.jpg" },
  { roman: "03", part: "Part three", title: "Walking in the Light", short: "The Light", line: "Carry what you have learned into ordinary life with support and prayer.", to: "/light" as const, image: "/images/mark-light.jpg" },
] as const;

function Home() {
  const enter = useSanctuary((s) => s.enter);
  const last = useSanctuary((s) => s.last);
  const addStillness = useSanctuary((s) => s.addStillness);
  const sit = todaysSit();
  return (
    <main className="order-home">
      <section className="order-intro" aria-labelledby="order-title">
        <div className="order-intro-topline"><span className="order-field-label">ORDER · The interactive book</span><Link to="/how" className="order-text-link">How it works <ArrowRight size={15} /></Link></div>
        <h1 id="order-title">A place to begin again.</h1>
        <p className="order-intro-lead">{book.subtitle}</p>
        <p className="order-intro-copy">A guided journey through the book by {book.author}. Read, reflect, pray, and take your next step at your own pace.</p>
        <ol className="order-intro-steps">
          <li><span>01</span><div><h2>Begin with stillness.</h2><p>Take a few minutes to breathe and make room to listen before you read.</p></div></li>
          <li><span>02</span><div><h2>Walk through the chapters.</h2><p>Explore the chambers, reflect on what you find, and name what matters.</p></div></li>
          <li><span>03</span><div><h2>Carry it into the light.</h2><p>Practice the seven steps, return to prayer, and keep a record of your journey.</p></div></li>
        </ol>
        <div className="order-intro-actions"><Link to="/path" onClick={() => enter()} className="order-pill order-pill-primary">Enter the journey <ArrowRight size={16} /></Link>{last ? <ContinueLink place={last} /> : <Link to="/dashboard" className="order-pill order-pill-secondary">Open dashboard</Link>}</div>
        <p className="order-intro-note">Free to read. Sign in if you want to sync your progress across devices.</p>
      </section>
      <section className="order-feature" aria-label="About this experience">
        <div className="order-feature-image"><img src="/images/mark-how.jpg" alt="Quiet, sunlit architecture" /><span>THE ORDER · A LIVING SANCTUARY</span></div>
        <div className="order-feature-copy"><span className="order-field-label">The experience</span><h2>More than a digital copy.</h2><p>Read the book, listen to teaching, pause with guided breathing, write privately, revisit saved pages, and resume where you left off.</p><Link to="/how" className="order-text-link">Explore how it works <ArrowRight size={16} /></Link></div>
      </section>
      <section className="order-content-section">
        <span className="order-field-label">Today’s sit</span><h2>Six minutes. Then one room.</h2><p>Sit first. Read today’s excerpt. Then answer one prompt in {sit.chamber.title}.</p>
        <div className="order-sit-grid"><div className="order-sit-orb"><BreathOrb durationMin={6} inhale={4} hold={4} exhale={6} guidance={["Sit before you study.", "Intimacy is the source of authority.", "When the six minutes end, read the excerpt."]} onComplete={() => addStillness(6)} /></div><div className="order-sit-reading"><span className="order-field-label">From the book</span><blockquote>{sit.excerpt}</blockquote><p>{sit.chamber.number} · {sit.chamber.title}</p><strong>{sit.prompt}</strong><Link to="/battlefield/$slug" params={{ slug: sit.chamber.slug }} className="order-pill order-pill-primary">Open today’s chamber <ArrowRight size={16} /></Link></div></div>
      </section>
      <section className="order-content-section order-parts">
        <span className="order-field-label">The three parts of this book</span><h2>Walk the path, one part at a time.</h2><p>Kirby wrote ORDER in three parts. Between the first and second sits an assessment that helps name what the chambers brought forward.</p>
        <div className="order-part-grid">{ranks.map((r) => <Link to={r.to} key={r.roman} className="order-part-card"><img src={r.image} alt="" /><div><span className="order-field-label">{r.roman} · {r.part}</span><h3>{r.short}</h3><em>{r.title}</em><p>{r.line}</p><span className="order-card-arrow">Explore <ArrowRight size={15} /></span></div></Link>)}</div>
      </section>
      <section className="order-content-section order-principles"><span className="order-field-label">Keys to the Order</span><div>{fourPrinciples.map((p, i) => <article key={p.t}><span>0{i + 1}</span><div><h3>{p.t}</h3><p>{p.b}</p></div></article>)}</div><p className="order-author">{aboutAuthor}</p><small>{disclaimer}</small></section>
    </main>
  );
}
