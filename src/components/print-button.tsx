import { FileDown, Printer } from "lucide-react";
import { cn } from "@/lib/cn";

export const BOOK_PDF = "/experience/downloads";
export const BOOK_PDF_NAME = "ORDER-Kirby-de-Lanerolle.pdf";

function waitForImages(root: ParentNode = document) {
  const imgs = Array.from(root.querySelectorAll("img"));
  const pending = imgs.filter((img) => !img.complete);
  if (pending.length === 0) return Promise.resolve();
  return Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  ).then(() => undefined);
}

export function printDocument(root?: ParentNode) {
  void waitForImages(root ?? document).then(() => window.print());
}

export function PrintButton({
  label = "Print",
  variant = "outline",
}: {
  label?: string;
  variant?: "outline" | "solid";
}) {
  return (
    <button
      type="button"
      onClick={() => printDocument(document.querySelector(".book-document") ?? document.querySelector("main") ?? document)}
      className={cn(
        "no-print inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm transition-colors",
        variant === "solid"
          ? "bg-ivory font-medium text-bg hover:bg-gold"
          : "border border-border text-ivory hover:border-gold",
      )}
    >
      <Printer className={cn("size-4", variant === "solid" ? "text-bg" : "text-gold")} />
      {label}
    </button>
  );
}

export function BookPdfLink({
  label = "Download the book (PDF)",
  variant = "outline",
}: {
  label?: string;
  variant?: "outline" | "solid";
}) {
  return (
    <a
      href={BOOK_PDF}
      className={cn(
        "no-print inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm transition-colors",
        variant === "solid"
          ? "bg-ivory font-medium text-bg hover:bg-gold"
          : "border border-border text-ivory hover:border-gold",
      )}
    >
      <FileDown className={cn("size-4", variant === "solid" ? "text-bg" : "text-gold")} />
      {label}
    </a>
  );
}

export function PrintRow({ pageLabel }: { pageLabel?: string }) {
  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      {pageLabel ? <PrintButton label={pageLabel} /> : null}
      <BookPdfLink />
    </div>
  );
}
