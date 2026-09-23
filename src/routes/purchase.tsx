import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { createCheckout, getMemberSummary, submitBookOwnerVerification, type MemberSummary } from "@/lib/platform";

export const Route = createFileRoute("/purchase")({ component: PurchasePage });

function PurchasePage() {
  const [message, setMessage] = useState<string | null>(null);
  const [photoRef, setPhotoRef] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    void getMemberSummary().then((summary) => setSettings((summary as MemberSummary).settings)).catch(() => undefined);
  }, []);

  async function checkout() {
    setBusy(true);
    try {
      const result = await createCheckout({ data: { productId: "order-digital-access" } });
      if (result.checkoutUrl) window.location.href = result.checkoutUrl;
      else setMessage(result.message);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unable to create checkout");
    } finally {
      setBusy(false);
    }
  }

  async function submitVerification() {
    setBusy(true);
    try {
      const result = await submitBookOwnerVerification({ data: { photoRef, note } });
      setMessage(`Verification submitted with status: ${result.status}. An admin must approve it before any discount applies.`);
      setPhotoRef("");
      setNote("");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Unable to submit verification");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="bg-bg px-5 py-12">
      <section className="mx-auto max-w-5xl">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Access</p>
        <h1 className="mt-3 font-display text-5xl text-ivory">Purchase THE ORDER Experience</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Pricing is configurable through admin settings and environment variables. Access is activated only after
          server-side payment confirmation or an admin entitlement grant.
        </p>
        {message ? <p className="mt-6 rounded-xl border border-border bg-surface p-4 text-muted">{message}</p> : null}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="rounded-xl border border-gold/30 bg-surface p-6">
            <h2 className="font-display text-3xl text-ivory">Digital access</h2>
            <p className="mt-3 text-muted">
              Current pricing settings: {JSON.stringify(settings?.pricing ?? "loading")}
            </p>
            <button
              type="button"
              onClick={() => void checkout()}
              disabled={busy}
              className="mt-6 inline-flex min-h-12 rounded-full bg-ivory px-8 text-sm font-medium text-bg hover:bg-gold disabled:opacity-60"
            >
              {busy ? "Working..." : "Create secure checkout"}
            </button>
          </article>
          <article className="rounded-xl border border-border bg-surface p-6">
            <h2 className="font-display text-3xl text-ivory">Physical book owner</h2>
            <p className="mt-3 text-muted">
              Submit a secure storage reference for a photo of yourself holding the book. Approval is manual and can be
              rejected with a reason.
            </p>
            <label className="mt-5 block text-sm text-muted">
              Verification photo reference
              <input
                value={photoRef}
                onChange={(e) => setPhotoRef(e.target.value)}
                placeholder="storage/private/verifications/photo.jpg"
                className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-ivory outline-none focus:border-gold"
              />
            </label>
            <label className="mt-4 block text-sm text-muted">
              Note
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2 min-h-28 w-full rounded-lg border border-border bg-bg px-4 py-3 text-ivory outline-none focus:border-gold"
              />
            </label>
            <button
              type="button"
              onClick={() => void submitVerification()}
              disabled={busy || !photoRef.trim()}
              className="mt-5 inline-flex min-h-12 rounded-full border border-border px-8 text-sm text-ivory hover:border-gold disabled:opacity-60"
            >
              Submit verification
            </button>
          </article>
        </div>
        <Link to="/account" className="mt-8 inline-flex text-sm text-gold">
          View account access status
        </Link>
      </section>
    </main>
  );
}
