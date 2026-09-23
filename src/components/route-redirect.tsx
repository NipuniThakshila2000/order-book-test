import { useEffect } from "react";

export function RouteRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return (
    <main className="bg-bg px-5 py-16 text-center">
      <p className="text-sm text-muted">Redirecting...</p>
      <a href={to} className="mt-4 inline-flex rounded-full border border-border px-5 py-2 text-sm text-ivory">
        Continue
      </a>
    </main>
  );
}
