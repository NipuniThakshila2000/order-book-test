import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/cn";
import { placeLabel, type LastPlace } from "@/lib/resume";

export function ContinueLink({
  place,
  className,
  prefix = "Continue",
  compact,
  onClick,
}: {
  place: LastPlace;
  className?: string;
  prefix?: string;
  compact?: boolean;
  onClick?: () => void;
}) {
  const label = `${prefix} · ${placeLabel(place)}`;
  const cls = cn(
    "inline-flex items-center justify-center rounded-full bg-ivory font-medium tracking-wide text-bg transition-colors duration-150 ease-out hover:bg-gold active:scale-[0.96]",
    compact ? "min-h-9 px-4 text-xs" : "min-h-12 px-8 text-sm",
    className,
  );
  if (place.kind === "chamber") {
    return (
      <Link to="/battlefield/$slug" params={{ slug: place.slug }} className={cls} onClick={onClick}>
        {label}
      </Link>
    );
  }
  if (place.kind === "step") {
    return (
      <Link to="/authority/$slug" params={{ slug: place.slug }} className={cls} onClick={onClick}>
        {label}
      </Link>
    );
  }
  if (place.kind === "intro") {
    return (
      <Link to="/introduction" className={cls} onClick={onClick}>
        {label}
      </Link>
    );
  }
  if (place.kind === "assess") {
    return (
      <Link to="/assessment" className={cls} onClick={onClick}>
        {label}
      </Link>
    );
  }
  if (place.kind === "light") {
    return (
      <Link to="/light" className={cls} onClick={onClick}>
        {label}
      </Link>
    );
  }
  return (
    <Link to="/stillness" className={cls} onClick={onClick}>
      {label}
    </Link>
  );
}