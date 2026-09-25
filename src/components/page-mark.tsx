import type { ReactNode } from "react";

export function PageMark({
  image,
  kicker,
  title,
  aside,
  children,
  bodyBelow,
  imageClassName,
}: {
  image: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
  children?: ReactNode;
  bodyBelow?: boolean;
  imageClassName?: string;
}) {
  return (
    <header>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
        <img
          src={image}
          alt=""
          className={`mark-illum h-36 w-full shrink-0 rounded-xl object-cover sm:h-28 sm:w-28 md:h-32 md:w-32 ${imageClassName ?? ""}`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.28em] text-gold uppercase">{kicker}</p>
              <h1 className="mt-2 font-display text-3xl leading-[1.15] text-ivory text-balance md:text-4xl">
                {title}
              </h1>
            </div>
            {aside}
          </div>
          {!bodyBelow ? children : null}
        </div>
      </div>
      {bodyBelow && children ? <div className="mt-6 max-w-3xl">{children}</div> : null}
    </header>
  );
}
