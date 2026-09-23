import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMemberSummary, type MemberSummary } from "@/lib/platform";

export const Route = createFileRoute("/account")({ component: AccountPage });

function AccountPage() {
  const { user } = useCurrentUserState();
  const [summary, setSummary] = useState<MemberSummary | null>(null);

  useEffect(() => {
    void getMemberSummary().then((data) => setSummary(data as MemberSummary)).catch(() => undefined);
  }, []);

  return (
    <main className="bg-bg px-5 py-12">
      <section className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-7">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Account</p>
        <h1 className="mt-3 font-display text-5xl text-ivory">{user?.displayName ?? "Member"}</h1>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <Info label="Email" value={user?.primaryEmail ?? "Not available"} />
          <Info label="Role" value={summary?.profile?.role ?? "Loading"} />
          <Info label="Access" value={summary?.profile?.access_status ?? "Loading"} />
          <Info label="Purchase" value={summary?.profile?.purchase_status ?? "Loading"} />
          <Info label="Verification" value={summary?.verification?.status ?? "None"} />
          <Info label="Entitled" value={summary?.hasAccess ? "Yes" : "No"} />
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/purchase" className="rounded-full bg-ivory px-6 py-3 text-sm text-bg hover:bg-gold">
            Manage access
          </Link>
          <button
            type="button"
            onClick={() => void signOut("/")}
            className="rounded-full border border-border px-6 py-3 text-sm text-ivory hover:border-gold"
          >
            Log out
          </button>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <dt className="text-xs tracking-[0.18em] text-gold uppercase">{label}</dt>
      <dd className="mt-1 text-ivory">{value}</dd>
    </div>
  );
}
