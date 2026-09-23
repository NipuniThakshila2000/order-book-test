const words = ["ORDER", "RANK", "CONSCIENCE", "LIGHT", "YOKE", "PREEMINENCE"];

export function WordPanel() {
  return (
    <p className="pointer-events-none hidden text-[10px] tracking-[0.42em] text-gold/50 uppercase md:block">
      {words.join(" · ")}
    </p>
  );
}
