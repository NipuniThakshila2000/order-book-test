import { useEffect, useState } from "react";
import type React from "react";
import { Link } from "@tanstack/react-router";
import { getMemberSummary, type MemberSummary } from "@/lib/platform";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const protectedPrefixes = [
  "/stillness",
  "/path",
  "/battlefield",
  "/assessment",
  "/authority",
  "/light",
  "/prayers",
  "/journal",
  "/record",
  "/glossary",
  "/find",
  "/print",
  "/experience",
];

const publicExperience = ["/experience/how-to-use"];

export function isProtectedPath(pathname: string) {
  if (publicExperience.some((path) => pathname.startsWith(path))) return false;
  return protectedPrefixes.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function AccessBoundary({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const { user, isPending } = useCurrentUserState();
  const [state, setState] = useState<"idle" | "loading" | "allowed" | "denied" | "error">("idle");

  useEffect(() => {
    let cancelled = false;
    if (!isProtectedPath(pathname)) {
      setState("allowed");
      return;
    }
    if (isPending) {
      setState("loading");
      return;
    }
    if (!user) {
      setState("denied");
      return;
    }
    setState("loading");
    void getMemberSummary()
      .then((summary) => {
        const member = summary as MemberSummary;
        if (!cancelled) setState(member.hasAccess ? "allowed" : "denied");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [isPending, pathname, user]);

  if (!isProtectedPath(pathname) || state === "allowed") return <>{children}</>;

  return (
    <main className="min-h-[70dvh] bg-bg px-5 py-16">
      <section className="mx-auto max-w-2xl rounded-xl border border-border bg-surface p-8 text-center shadow-sm">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">Member access required</p>
        <h1 className="mt-3 font-display text-4xl text-ivory">
          {state === "loading" ? "Checking access" : "Enter through your account"}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted">
          The interactive book, journal, responses, downloads, and progress tracking are protected member content.
          Sign in and purchase or receive an approved entitlement to continue.
        </p>
        {state === "error" ? (
          <p className="mt-4 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-muted">
            Access could not be checked. Refresh the page or sign in again.
          </p>
        ) : null}
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/sign-in"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-ivory px-7 text-sm font-medium text-bg hover:bg-gold"
          >
            Sign in
          </Link>
          <Link
            to="/purchase"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 text-sm text-ivory hover:border-gold"
          >
            Purchase access
          </Link>
        </div>
      </section>
    </main>
  );
}
