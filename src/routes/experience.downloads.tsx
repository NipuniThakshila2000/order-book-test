import { createFileRoute } from "@tanstack/react-router";
import { BookPdfLink } from "@/components/print-button";

export const Route = createFileRoute("/experience/downloads")({ component: DownloadsPage });

function DownloadsPage() {
  return (
    <main className="bg-bg px-5 py-12">
      <section className="mx-auto max-w-4xl">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Reader resources</p>
        <h1 className="mt-3 font-display text-5xl text-ivory">Downloads</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Downloadable resources are available to readers. Sign-in is only needed for account sync features, not for
          opening the experience.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-3xl text-ivory">Book PDF</h2>
            <p className="mt-3 text-muted">Reader download for the current digital edition.</p>
            <a
              href="/order.pdf"
              download="ORDER-Kirby-de-Lanerolle.pdf"
              className="mt-5 inline-flex rounded-full bg-ivory px-6 py-3 text-sm text-bg hover:bg-gold"
            >
              Download PDF
            </a>
          </article>
          <article className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-3xl text-ivory">Seven Steps</h2>
            <p className="mt-3 text-muted">Demo resource record. Replace the file reference in admin/storage.</p>
            <BookPdfLink label="Open downloads" />
          </article>
        </div>
      </section>
    </main>
  );
}
