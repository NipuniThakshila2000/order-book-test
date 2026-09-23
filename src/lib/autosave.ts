import { useEffect, useRef } from "react";

/** Persist as the reader writes so leaving a room does not lose the page. */
export function useDebouncedSave(value: string, save: (v: string) => void, ms = 500) {
  const fn = useRef(save);
  fn.current = save;
  useEffect(() => {
    const t = window.setTimeout(() => fn.current(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
}
