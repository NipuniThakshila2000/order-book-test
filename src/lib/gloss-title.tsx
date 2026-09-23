import type { ReactNode } from "react";

export function glossTitle(title: string): ReactNode {
  const m = title.match(/^(.*?)\s+([("'“].+[)"”])\s*$/u);
  if (!m) return title;
  return (
    <>
      {m[1]}
      <span className="mt-1 block whitespace-nowrap">{m[2]}</span>
    </>
  );
}
