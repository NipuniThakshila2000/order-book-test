import { FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { authClient, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/sign-in")({ component: SignInPage });

function SignInPage() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "register") {
        const result = await authClient.signUp.email({ name, email, password });
        if (result.error) throw new Error(result.error.message ?? "Registration failed");
      } else {
        const result = await authClient.signIn.email({ email, password });
        if (result.error) throw new Error(result.error.message ?? "Sign in failed");
      }
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to continue");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="bg-bg px-5 py-14">
      <section className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_0.9fr] md:items-center">
        <div>
          <p className="text-xs tracking-[0.32em] text-gold uppercase">Member access</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-ivory md:text-6xl">Enter THE ORDER</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Create an account to purchase access, submit book-owner verification, save journal entries, and resume your
            last location in the interactive experience.
          </p>
          {user && !isPending ? (
            <div className="mt-6 rounded-xl border border-gold/30 bg-surface p-5">
              <p className="text-sm text-muted">You are signed in as {user.primaryEmail ?? user.displayName}.</p>
              <Link to="/dashboard" className="mt-4 inline-flex rounded-full bg-ivory px-6 py-3 text-sm text-bg">
                Open dashboard
              </Link>
            </div>
          ) : null}
        </div>
        <form onSubmit={submit} className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="grid grid-cols-2 rounded-full border border-border p-1 text-sm">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={mode === "signin" ? "rounded-full bg-ivory py-2 text-bg" : "py-2 text-muted"}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={mode === "register" ? "rounded-full bg-ivory py-2 text-bg" : "py-2 text-muted"}
            >
              Register
            </button>
          </div>
          {mode === "register" ? (
            <label className="mt-5 block text-sm text-muted">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-ivory outline-none focus:border-gold"
                autoComplete="name"
                required
              />
            </label>
          ) : null}
          <label className="mt-5 block text-sm text-muted">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-ivory outline-none focus:border-gold"
              type="email"
              autoComplete="email"
              required
            />
          </label>
          <label className="mt-5 block text-sm text-muted">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-ivory outline-none focus:border-gold"
              type="password"
              autoComplete={mode === "register" ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </label>
          {error ? <p className="mt-4 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-muted">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold disabled:opacity-60"
          >
            {busy ? "Working..." : mode === "register" ? "Create account" : "Sign in"}
          </button>
          <button
            type="button"
            onClick={() => void signIn("google").catch((err) => setError(err.message))}
            className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-border px-6 text-sm text-ivory hover:border-gold"
          >
            Continue with configured OAuth
          </button>
        </form>
      </section>
    </main>
  );
}
