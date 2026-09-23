export function Dust({ count = 18 }: { count?: number }) {
  return (
    <div className="dust no-print pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute size-1 rounded-full bg-gold-soft/40"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 29) % 100}%`,
            animation: `rise ${8 + (i % 5)}s ease-in-out ${(i % 7) * 0.4}s infinite`,
            opacity: 0.35 + (i % 5) * 0.08,
          }}
        />
      ))}
    </div>
  );
}
