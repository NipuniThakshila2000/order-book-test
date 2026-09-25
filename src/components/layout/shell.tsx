import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { AccessBoundary } from "@/components/access-boundary";
import { CloudSync } from "@/components/cloud-sync";
import { ProgressRail } from "@/components/progress-rail";
import { WalkGate } from "@/components/walk-gate";
import { cn } from "@/lib/cn";
import { book } from "@/lib/content/meta";
import { useSanctuary } from "@/lib/store";

type MenuItem = { to: string; label: string; hint: string };

const journey = [
  { to: "/stillness", label: "Stillness", hint: "Start with breathing" },
  { to: "/path", label: "Journey Map", hint: "See the whole path" },
  { to: "/battlefield", label: "Read Chambers", hint: "Main book chapters" },
  { to: "/assessment", label: "Assessment", hint: "Answer guided questions" },
  { to: "/authority", label: "Seven Steps", hint: "Authority practice" },
  { to: "/light", label: "Walking in the Light", hint: "Final section" },
] as const;

const myWork = [
  { to: "/journal", label: "Journal", hint: "Write private notes" },
  { to: "/record", label: "My Saved Pages", hint: "Everything you typed" },
  { to: "/prayers", label: "Prayers", hint: "Prayers and decrees" },
] as const;

const help = [
  { to: "/how", label: "How It Works", hint: "Simple beginner guide" },
  { to: "/find", label: "Search", hint: "Find words or sections" },
  { to: "/glossary", label: "Glossary", hint: "Simple word meanings" },
  { to: "/experience/downloads", label: "Downloads", hint: "PDF and resources" },
] as const;

export function Shell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const hints = useSanctuary((s) => s.navHintsSeen);
  const dismissHints = useSanctuary((s) => s.dismissNavHints);
  const fieldManual = useSanctuary((s) => s.fieldManual);
  const setFieldManual = useSanctuary((s) => s.setFieldManual);
  const onAuthority = pathname.startsWith("/authority");

  useEffect(() => {
    document.documentElement.classList.toggle("field-manual", fieldManual && onAuthority);
  }, [fieldManual, onAuthority]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      e.preventDefault();
      if (pathname === "/find") {
        document.getElementById("find-q")?.focus();
        return;
      }
      void navigate({ to: "/find" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, pathname]);

  return (
    <div className="relative flex min-h-dvh flex-col bg-bg text-fg">
      <WalkGate />
      <header className="site-chrome sticky top-0 z-40 border-b border-border/60 bg-bg/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src="/images/crown.svg" alt="" className="size-8" />
            <span className="font-display text-xl tracking-[0.28em] text-order-orange">ORDER</span>
          </Link>
          <nav className="ml-auto hidden items-center gap-2 lg:flex">
            <NavLink to="/dashboard" label="Dashboard" active={pathname.startsWith("/dashboard")} />
            <NavLink to="/path" label="Begin" active={pathname.startsWith("/path")} />
            <MenuGroup label="Journey" items={journey} pathname={pathname} />
            <MenuGroup label="My Work" items={myWork} pathname={pathname} />
            <MenuGroup label="Help" items={help} pathname={pathname} />
            <NavLink to="/account" label="Account" active={pathname.startsWith("/account")} quiet />
          </nav>
          <button
            type="button"
            className="ml-auto grid size-11 place-items-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
            <div className="grid gap-3">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gold/30 bg-bg px-4 py-3 text-ivory"
              >
                <span className="block font-medium">Dashboard</span>
                <span className="block text-xs text-muted">Resume, progress, and next step</span>
              </Link>
              <MobileGroup
                title="Start Here"
                items={[
                  { to: "/path", label: "Begin the Journey", hint: "Open the simple map" },
                  { to: "/how", label: "How It Works", hint: "Read the beginner guide" },
                ]}
                onNavigate={() => setOpen(false)}
              />
              <MobileGroup title="Journey Sections" items={journey} onNavigate={() => setOpen(false)} />
              <MobileGroup title="My Work" items={myWork} onNavigate={() => setOpen(false)} />
              <MobileGroup title="Search & Resources" items={help} onNavigate={() => setOpen(false)} />
              <Link to="/account" onClick={() => setOpen(false)} className="rounded-lg px-4 py-3 text-ivory">
                <span className="block">Account</span>
                <span className="block text-xs text-muted">Access, profile, and sign out</span>
              </Link>
            </div>
          </div>
        ) : null}
        <ProgressRail />
        {!hints ? (
          <div className="hidden border-t border-border/50 bg-surface px-4 py-2 lg:block">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 md:px-2">
              <p className="text-xs leading-relaxed text-muted">
                Use Dashboard to continue. Journey contains the book sections. My Work contains your writing.
              </p>
              <button type="button" onClick={() => dismissHints()} className="shrink-0 text-xs text-gold">
                Hide tip
              </button>
            </div>
          </div>
        ) : null}
      </header>
      {onAuthority ? (
        <div className="no-print border-b border-border/40 bg-surface px-4 py-2">
          <div className="mx-auto flex max-w-6xl items-center justify-end md:px-2">
            <button
              type="button"
              onClick={() => setFieldManual(!fieldManual)}
              className="text-xs tracking-[0.14em] text-muted uppercase hover:text-gold"
            >
              {fieldManual ? "Leave simple reading" : "Simple reading"}
            </button>
          </div>
        </div>
      ) : null}
      <CloudSync />
      <div className="flex-1">
        <AccessBoundary pathname={pathname}>
          <Outlet />
        </AccessBoundary>
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  const footerLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/path", label: "Begin" },
    { to: "/how", label: "How It Works" },
    { to: "/journal", label: "Journal" },
    { to: "/find", label: "Search" },
    { to: "/account", label: "Account" },
  ] as const;

  return (
    <footer className="no-print mt-auto border-t border-gold/25 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        <div className="flex flex-col items-center text-center">
          <img src="/images/crown.svg" alt="" className="h-10 w-10 opacity-90" />
          <p className="mt-4 font-display text-2xl tracking-[0.32em] text-ivory">ORDER</p>
          <p className="mt-2 font-display text-lg italic text-gold">{book.subtitle}</p>
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted">
          {footerLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:text-gold">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-xl rounded-xl border border-border px-5 py-5 text-center">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">Do not walk this alone</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            This is an educational companion, not a substitute for pastoral covering, counseling, or medical care. If
            you are in crisis, talk to a trusted leader. In the US and Canada, call or text{" "}
            <a href="tel:988" className="text-ivory hover:text-gold">
              988
            </a>
            .
          </p>
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed text-muted">
          {book.author} · {book.publisher} · {book.year}
          <br />
          Interactive companion, not a replacement for the manuscript.
        </p>
      </div>
    </footer>
  );
}

function NavLink({
  to,
  label,
  active,
  quiet,
}: {
  to: string;
  label: string;
  active: boolean;
  quiet?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "rounded-full px-3 py-2 text-sm tracking-wide transition-colors",
        active ? "text-gold" : quiet ? "text-muted hover:text-ivory" : "text-ivory hover:text-gold",
      )}
    >
      {label}
    </Link>
  );
}

function MenuGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: readonly MenuItem[];
  pathname: string;
}) {
  const active = items.some((item) => pathname === item.to || pathname.startsWith(`${item.to}/`));
  return (
    <div className="group relative">
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm tracking-wide transition-colors",
          active ? "text-gold" : "text-ivory hover:text-gold",
        )}
      >
        {label}
        <ChevronDown className="size-4" />
      </button>
      <div className="invisible absolute right-0 top-full z-50 w-72 translate-y-2 rounded-xl border border-border bg-surface p-2 opacity-0 shadow-[0_18px_45px_color-mix(in_oklab,var(--color-fg)_14%,transparent)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="block rounded-lg px-4 py-3 text-left hover:bg-bg">
            <span className="block text-sm font-medium text-ivory">{item.label}</span>
            <span className="mt-0.5 block text-xs text-muted">{item.hint}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({
  title,
  items,
  onNavigate,
}: {
  title: string;
  items: readonly MenuItem[];
  onNavigate: () => void;
}) {
  return (
    <details className="rounded-lg border border-border bg-bg/50">
      <summary className="flex min-h-12 list-none items-center justify-between px-4 py-3 text-ivory">
        <span>{title}</span>
        <ChevronDown className="size-4 text-gold" />
      </summary>
      <div className="border-t border-border px-2 py-2">
        {items.map((item) => (
          <Link key={item.to} to={item.to} onClick={onNavigate} className="block rounded-lg px-3 py-3">
            <span className="block text-sm text-ivory">{item.label}</span>
            <span className="block text-xs text-muted">{item.hint}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
