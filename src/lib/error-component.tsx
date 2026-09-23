import type { ErrorComponentProps } from "@tanstack/react-router";

export function AppErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-2xl text-ivory">This page is still gathering.</p>
      <p className="max-w-md text-sm leading-relaxed text-muted">
        {error.message?.includes("Failed to fetch")
          ? "The map did not finish loading. Open it again."
          : error.message || "Something unexpected happened."}
      </p>
      <button
        type="button"
        onClick={() => {
          reset();
          window.location.reload();
        }}
        className="mt-2 inline-flex min-h-11 items-center rounded-full bg-ivory px-6 text-sm font-medium text-bg hover:bg-gold"
      >
        Open this page again
      </button>
    </main>
  );
}
