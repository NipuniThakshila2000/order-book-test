import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BackupBar } from "@/components/backup-bar";
import { PageMark } from "@/components/page-mark";
import { PrintRow } from "@/components/print-button";
import { useDebouncedSave } from "@/lib/autosave";
import { useSanctuary } from "@/lib/store";

export const Route = createFileRoute("/journal")({ component: JournalPage });

function JournalPage() {
  const journal = useSanctuary((s) => s.journal);
  const add = useSanctuary((s) => s.addJournal);
  const remove = useSanctuary((s) => s.removeJournal);
  const setNote = useSanctuary((s) => s.setNote);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const apply = () => {
      const n = useSanctuary.getState().notes;
      setTitle(n["journal-draft-title"] ?? "");
      setBody(n["journal-draft"] ?? "");
    };
    apply();
    return useSanctuary.persist.onFinishHydration(apply);
  }, []);

  useDebouncedSave(title, (v) => setNote("journal-draft-title", v));
  useDebouncedSave(body, (v) => setNote("journal-draft", v));

  return (
    <main className="page-enter mx-auto max-w-3xl px-5 py-12 md:py-16">
      <PageMark
        image="/images/mark-journal.jpg"
        kicker="The journal lives here"
        title="Journal"
        aside={<PrintRow pageLabel={journal.length > 0 ? "Print journal" : undefined} />}
        bodyBelow
      >
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          This is your notebook for the whole walk — already here, already saved. Come before a chamber, after one, in
          the middle of the night. A sentence is enough. Press Keep this. You will find it on this page, underneath,
          and gathered later on Pages if you want it on paper. Use it often. It is not a diary you have to finish.
          Saved on this device.
        </p>
      </PageMark>

      <div className="mt-8">
        <BackupBar compact />
      </div>

      <form
        className="no-print mt-8 rounded-xl border border-border bg-surface p-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (!body.trim()) return;
          add({ title: title.trim() || "Untitled", body: body.trim() });
          setTitle("");
          setBody("");
          setNote("journal-draft-title", "");
          setNote("journal-draft", "");
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full bg-transparent font-display text-2xl text-ivory outline-none placeholder:text-subtle"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          placeholder="What is the Spirit showing?"
          className="mt-3 w-full resize-y rounded-md border border-border bg-bg px-3 py-2 text-sm text-ivory outline-none focus:border-border-strong"
        />
        <button type="submit" className="mt-4 min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg">
          Keep this
        </button>
        <p className="mt-3 text-xs text-subtle">
          The draft is kept as you type. Keep this places it underneath.
        </p>
      </form>

      <ol className="mt-10 grid gap-4">
        {journal.length === 0 ? (
          <p className="text-sm text-subtle">No entries yet. Write above, press Keep this — they will appear here.</p>
        ) : (
          journal.map((e) => (
            <li key={e.id} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl text-ivory">{e.title}</h2>
                  <p className="mt-1 text-xs text-subtle tabular-nums">{new Date(e.at).toLocaleString()}</p>
                </div>
                <button type="button" onClick={() => remove(e.id)} className="no-print min-h-11 px-3 text-sm text-subtle">
                  Release
                </button>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-ivory">{e.body}</p>
            </li>
          ))
        )}
      </ol>
    </main>
  );
}
