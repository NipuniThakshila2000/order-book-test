import { Link } from "@tanstack/react-router";
import { glossNodes } from "@/components/gloss-text";
import { SpeakButton } from "@/components/speak-button";
import { glanceIcons } from "@/lib/content/book-images";
import { glanceDecree, glanceSteps } from "@/lib/content/book-passages";
import { glossEntries } from "@/lib/gloss";
import { teachingSpeech } from "@/lib/speak";

type TeachBodyProps = {
  blocks: string[];
  className?: string;
  eager?: boolean;
  live?: boolean;
};

function BookImage({ src, alt, eager }: { src: string; alt: string; eager?: boolean }) {
  return (
    <figure className="book-illum flex justify-center py-2 first:pt-0 print:break-inside-avoid">
      <img
        src={src}
        alt={alt}
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        className="max-h-[22rem] w-auto max-w-full object-contain mix-blend-multiply md:max-h-[28rem]"
      />
    </figure>
  );
}

export function TeachBody({
  blocks,
  className = "mt-4 space-y-4 text-lg leading-relaxed text-ivory",
  eager,
  live,
}: TeachBodyProps) {
  const seen = new Set<string>();
  const speech = live ? teachingSpeech(blocks) : "";
  const terms = live ? glossEntries() : [];
  return (
    <div className={className}>
      {live && speech ? (
        <div className="no-print mb-2">
          <SpeakButton text={speech} label="Hear this teaching" />
        </div>
      ) : null}
      {blocks.map((p, i) => {
        if (p.startsWith("[[img:")) {
          const inner = p.slice(6, p.endsWith("]]") ? -2 : undefined);
          const [src, alt = "Illustration from ORDER"] = inner.split("|");
          return <BookImage key={i} src={src} alt={alt} eager={eager} />;
        }
        if (p.startsWith("## ")) {
          return (
            <h3
              key={i}
              className="pt-8 font-display text-2xl tracking-[0.16em] text-gold uppercase first:pt-2"
            >
              {p.slice(3)}
            </h3>
          );
        }
        if (p.startsWith("> ")) {
          const rest = p.slice(2);
          const [text, ref] = rest.split(" ||| ");
          return (
            <blockquote key={i} className="my-6 border-l-2 border-gold pl-5">
              <p className="font-display text-xl italic leading-relaxed text-ivory">{text}</p>
              {ref ? (
                <cite className="mt-2 block text-xs tracking-[0.2em] text-gold uppercase not-italic">
                  {ref}
                </cite>
              ) : null}
            </blockquote>
          );
        }
        return <p key={i}>{live ? glossNodes(p, seen, terms) : p}</p>;
      })}
    </div>
  );
}

export function GlanceSteps({
  className = "mt-6 grid gap-4",
  doors,
}: {
  className?: string;
  doors?: { slug: string; occupied?: boolean }[];
}) {
  return (
    <div className={className}>
      {glanceSteps.map((st) => {
        const door = doors?.[st.n - 1];
        return (
          <article
            key={st.n}
            className="print-avoid rounded-xl border border-border bg-surface p-5 md:p-6"
          >
            <div className="flex items-start gap-4">
              {glanceIcons[st.n - 1] ? (
                <img
                  src={glanceIcons[st.n - 1].src}
                  alt=""
                  className="mt-1 hidden h-16 w-16 shrink-0 object-contain mix-blend-multiply sm:block"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs tracking-[0.22em] text-gold uppercase">Step {st.n}</p>
                  {door ? (
                    <span className="text-[11px] tracking-[0.18em] text-subtle uppercase">
                      {door.occupied ? "Sealed" : "Enter"}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-1 font-display text-2xl text-ivory">{st.title}</h3>
                {st.scriptures.map((s) => (
                  <blockquote key={s.ref} className="mt-4 border-l-2 border-gold pl-4">
                    <p className="font-display text-lg italic leading-relaxed text-ivory">“{s.text}”</p>
                    <cite className="mt-1 block text-[11px] tracking-[0.18em] text-gold uppercase not-italic">
                      {s.ref}
                    </cite>
                  </blockquote>
                ))}
                <p className="mt-4 leading-relaxed text-ivory">
                  <span className="tracking-[0.12em] text-gold uppercase">Principle. </span>
                  {st.principle}
                </p>
                <p className="mt-3 leading-relaxed text-muted">{st.body}</p>
                {door ? (
                  <Link
                    to="/authority/$slug"
                    params={{ slug: door.slug }}
                    className="mt-4 inline-flex text-sm text-gold hover:text-ivory"
                  >
                    Enter Step {st.n} →
                  </Link>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
      <article className="print-avoid rounded-xl border border-border bg-surface p-5 md:p-6">
        <p className="text-xs tracking-[0.22em] text-gold uppercase">Seal the walk</p>
        <h3 className="mt-1 font-display text-2xl text-ivory">{glanceDecree.title}</h3>
        <p className="mt-4 font-display text-lg italic leading-relaxed text-ivory">“{glanceDecree.text}”</p>
      </article>
    </div>
  );
}
