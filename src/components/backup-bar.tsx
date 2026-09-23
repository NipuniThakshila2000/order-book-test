import { useRef, useState } from "react";
import { collectBackup, downloadJson, parseBackup, stamp } from "@/lib/backup";
import { useSanctuary } from "@/lib/store";

export function BackupBar({ compact }: { compact?: boolean }) {
  const apply = useSanctuary((s) => s.applyBackup);
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="no-print rounded-xl border border-border bg-surface p-4 md:p-5">
      <p className="text-xs tracking-[0.18em] text-gold uppercase">Saved on this device</p>
      {!compact ? (
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Journal, reflections, Assess, and prayer marks live in this browser. They are not synced. Export a backup
          before you change phones. Import restores the walk on another device.
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 rounded-full bg-ivory px-5 text-sm font-medium text-bg hover:bg-gold"
          onClick={() => {
            downloadJson(`ORDER-backup-${stamp()}.json`, collectBackup());
            setMsg("Backup downloaded.");
          }}
        >
          Export my writing
        </button>
        <button
          type="button"
          className="min-h-11 rounded-full border border-border px-5 text-sm text-ivory hover:border-gold"
          onClick={() => fileRef.current?.click()}
        >
          Import restore
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            void f.text().then((raw) => {
              try {
                apply(parseBackup(raw));
                setMsg("Restored on this device.");
              } catch {
                setMsg("That file was not a sanctuary backup.");
              }
            });
            e.target.value = "";
          }}
        />
      </div>
      {msg ? <p className="mt-3 text-xs text-gold">{msg}</p> : null}
    </div>
  );
}
