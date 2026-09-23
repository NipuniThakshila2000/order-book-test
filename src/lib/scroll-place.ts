import { useEffect } from "react";
import { useSanctuary } from "@/lib/store";

export function useScrollPlace(key: string) {
  const setScrollAt = useSanctuary((s) => s.setScrollAt);

  useEffect(() => {
    const y = useSanctuary.getState().scrollAt[key] ?? 0;
    if (y > 48) {
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
    }
    let t = 0;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setScrollAt(key, window.scrollY), 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(t);
      setScrollAt(key, window.scrollY);
    };
  }, [key, setScrollAt]);
}
