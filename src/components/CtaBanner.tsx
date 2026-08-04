import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export interface CtaBannerProps {
  eyebrow?: string;
  title: string;
  body?: string;
  /** WhatsApp prefilled message for the primary action. */
  whatsappMessage?: string;
  primaryLabel?: string;
  /** Optional internal secondary link. */
  secondary?: { to: string; label: string };
  tone?: "ink" | "light";
  className?: string;
}

/**
 * Premium CTA band used between major sections.
 * Presentation only — no business logic.
 */
export function CtaBanner({
  eyebrow,
  title,
  body,
  whatsappMessage = "Hello, I would like to know more about your tiles, granite and bathware.",
  primaryLabel = "Get Instant Quote",
  secondary,
  tone = "ink",
  className,
}: CtaBannerProps) {
  const dark = tone === "ink";

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-ink text-ink-foreground" : "bg-secondary text-foreground",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl"
      />
      <div className="container relative mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <Reveal direction="up">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
              <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
                {title}
              </h2>
              {body && (
                <p
                  className={cn(
                    "mt-3 max-w-xl text-sm leading-relaxed sm:text-base",
                    dark ? "text-ink-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {body}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {primaryLabel}
              </a>
              {secondary && (
                <Link
                  to={secondary.to}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-medium transition-colors duration-300",
                    dark
                      ? "border-white/25 text-ink-foreground hover:bg-white hover:text-ink"
                      : "border-border text-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  {secondary.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
