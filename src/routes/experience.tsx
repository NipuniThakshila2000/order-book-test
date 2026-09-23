import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/experience")({ component: ExperienceIndex });

function ExperienceIndex() {
  return (
    <main className="bg-bg px-5 py-12">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Interactive book</p>
        <h1 className="mt-3 font-display text-5xl text-ivory">THE ORDER Experience</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Choose a section or resume through the dashboard. All member areas are protected and progress is saved.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {([
            ["Dashboard", "/dashboard"],
            ["How to Use", "/experience/how-to-use"],
            ["Stillness", "/experience/stillness"],
            ["Path", "/experience/path"],
            ["Chambers", "/experience/chambers"],
            ["Assessment", "/experience/assessment"],
            ["Authority", "/experience/authority"],
            ["Walking in the Light", "/experience/light"],
            ["Prayers", "/experience/prayers"],
            ["Journal", "/experience/journal"],
            ["Pages", "/experience/pages"],
            ["Downloads", "/experience/downloads"],
          ] as const).map(([label, to]) => (
            <Link key={to} to={to} className="rounded-xl border border-border bg-surface px-5 py-4 text-ivory hover:border-gold">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
