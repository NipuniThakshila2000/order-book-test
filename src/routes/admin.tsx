import { useEffect, useState } from "react";
import type React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { getAdminOverview, grantBookAccess, reviewBookOwnerVerification, type AdminOverview } from "@/lib/platform";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  function reload() {
    void getAdminOverview()
      .then((data) => setOverview(data as AdminOverview))
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load admin"));
  }

  useEffect(reload, []);

  async function review(id: string, status: "approved" | "rejected") {
    setBusy(id);
    try {
      await reviewBookOwnerVerification({ data: { id, status, rejectionReason: status === "rejected" ? "Rejected by admin review." : undefined } });
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Review failed");
    } finally {
      setBusy(null);
    }
  }

  async function grant(userId: string) {
    setBusy(userId);
    try {
      await grantBookAccess({ data: { userId, reason: "Manual admin grant" } });
      reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Grant failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className="bg-bg px-5 py-10">
      <section className="mx-auto max-w-6xl">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Secure admin</p>
        <h1 className="mt-3 font-display text-5xl text-ivory">Admin Panel</h1>
        {error ? <p className="mt-4 rounded-lg border border-border bg-surface p-4 text-muted">{error}</p> : null}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries((overview?.analytics ?? {}) as Record<string, number>).map(([key, value]) => (
            <div key={key} className="rounded-xl border border-border bg-surface p-5">
              <p className="text-xs tracking-[0.18em] text-gold uppercase">{key.replaceAll("_", " ")}</p>
              <p className="mt-2 font-display text-3xl text-ivory">{value}</p>
            </div>
          ))}
        </div>
        <Panel title="Book owner verification">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs tracking-[0.14em] text-gold uppercase">
                <tr><th className="py-2">User</th><th>Status</th><th>Photo Ref</th><th>Note</th><th>Action</th></tr>
              </thead>
              <tbody>
                {overview?.verifications?.map((v) => (
                  <tr key={v.id} className="border-t border-border">
                    <td className="py-3">{v.email ?? v.user_id}</td>
                    <td>{v.status}</td>
                    <td className="max-w-[220px] truncate">{v.photo_ref}</td>
                    <td className="max-w-[260px] truncate">{v.note}</td>
                    <td className="space-x-2">
                      <button disabled={busy === v.id} onClick={() => void review(v.id, "approved")} className="text-gold">Approve</button>
                      <button disabled={busy === v.id} onClick={() => void review(v.id, "rejected")} className="text-muted">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Users">
          <div className="grid gap-3">
            {overview?.users?.map((u) => (
              <div key={u.id} className="flex flex-col gap-2 rounded-lg border border-border bg-bg p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-ivory">{u.email ?? u.name}</p>
                  <p className="text-sm text-muted">{u.role ?? "user"} · {u.access_status ?? "none"} · {u.purchase_status ?? "none"}</p>
                </div>
                <button disabled={busy === u.id} onClick={() => void grant(u.id)} className="rounded-full border border-border px-4 py-2 text-sm text-ivory hover:border-gold">
                  Grant access
                </button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Content and payments">
          <pre className="overflow-auto rounded-lg bg-bg p-4 text-xs text-muted">
            {JSON.stringify({ content: overview?.content, purchases: overview?.purchases }, null, 2)}
          </pre>
        </Panel>
      </section>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 rounded-xl border border-border bg-surface p-5">
      <h2 className="font-display text-3xl text-ivory">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
