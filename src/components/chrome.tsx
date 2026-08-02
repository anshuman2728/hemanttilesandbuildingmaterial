import { useEffect, useState } from "react";
import { ArrowUp, Moon, Phone, Sun, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_NUMBER, whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";

/* --------------------------- premium page loader --------------------------- */

export function PremiumLoader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1150);
    const t2 = setTimeout(() => setHidden(true), 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-700",
        done ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <span className="eyebrow text-gold">Hemant Tiles</span>
        <span className="font-display text-2xl text-ink-foreground sm:text-3xl">
          Building Beautiful Spaces
        </span>
        <span className="relative h-px w-48 overflow-hidden bg-ink-foreground/20">
          <span
            className={cn(
              "absolute inset-y-0 left-0 bg-gold transition-[width] duration-[1100ms] ease-out",
              done ? "w-full" : "w-0",
            )}
          />
        </span>
      </div>
    </div>
  );
}

/* --------------------------- scroll progress bar -------------------------- */

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[70] h-[2px] w-full">
      <div
        className="h-full bg-gold transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ------------------------------ cursor effect ----------------------------- */

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setActive(true);
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest("a,button,[data-cursor]")));
    };
    const onLeave = () => setActive(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const [hover, setHover] = useState(false);

  if (!active) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[95] hidden rounded-full border border-gold/60 transition-[width,height,opacity] duration-300 md:block"
        style={{
          width: hover ? 46 : 22,
          height: hover ? 46 : 22,
          transform: `translate3d(${pos.x - (hover ? 23 : 11)}px, ${pos.y - (hover ? 23 : 11)}px, 0)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed z-[94] hidden h-64 w-64 rounded-full bg-gold/10 blur-3xl md:block"
        style={{ transform: `translate3d(${pos.x - 128}px, ${pos.y - 128}px, 0)` }}
      />
    </>
  );
}

/* ---------------------------- floating actions ---------------------------- */

const DEFAULT_MESSAGE =
  "Hello, I visited your website and I would like to know more about your products.";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actions = [
    { label: "Instant chat", href: whatsappLink(DEFAULT_MESSAGE) },
    {
      label: "Request a call back",
      href: whatsappLink("Hello, please call me back regarding tiles / granite / bathware. My number is: "),
    },
    {
      label: "Get a free quote",
      href: whatsappLink("Hello, I would like a free quote. Here are my requirements: "),
    },
  ];

  return (
    <div className="fixed bottom-5 right-4 z-[80] flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-luxe backdrop-blur transition-transform duration-300 hover:-translate-y-1"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <a
        href={`tel:+${WHATSAPP_NUMBER}`}
        aria-label="Call the showroom"
        className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 text-foreground shadow-luxe backdrop-blur transition-transform duration-300 hover:-translate-y-1"
      >
        <Phone className="h-4 w-4" />
      </a>

      {open && (
        <div className="w-60 overflow-hidden rounded-lg border border-border bg-card shadow-luxe">
          <p className="border-b border-border px-4 py-3 text-xs text-muted-foreground">
            How can we help?
          </p>
          <ul className="p-1">
            {actions.map((a) => (
              <li key={a.label}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-gold" />
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp menu" : "Chat on WhatsApp"}
        className="group relative grid h-14 w-14 place-items-center rounded-full text-white shadow-luxe transition-transform duration-300 hover:scale-105"
        style={{ backgroundColor: "#25D366" }}
      >
        <span className="absolute inset-0 animate-ping rounded-full opacity-30 motion-reduce:animate-none" style={{ backgroundColor: "#25D366" }} />
        {open ? <X className="relative h-6 w-6" /> : <WhatsAppIcon className="relative h-7 w-7" />}
      </button>
    </div>
  );
}

/* ------------------------------ theme toggle ------------------------------ */

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        "grid h-10 w-10 place-items-center rounded-full border border-current/20 transition-colors hover:bg-current/10",
        className,
      )}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
