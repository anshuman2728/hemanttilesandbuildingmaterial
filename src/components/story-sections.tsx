import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Counter, Reveal, SplitHeading, useScrollProgress } from "@/components/motion";
import { legacyCounters, materialReasons, milestones, rooms } from "@/lib/story";
import { cn } from "@/lib/utils";

/* ------------------------------- our legacy ------------------------------- */

export function LegacyTimeline() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const fill = Math.min(1, Math.max(0, (progress - 0.08) * 1.5));

  return (
    <section id="legacy" className="bg-ink py-28 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-gold">Our legacy</span>
          </Reveal>
          <h2 className="display-section mt-5 text-ink-foreground">
            <SplitHeading text="Two decades on the same road." />
          </h2>
          <Reveal delay={120}>
            <p className="lede mt-6 text-ink-foreground/70">
              Every year added a room to what we could finish for a family — and a
              reason for the next family to walk in.
            </p>
          </Reveal>
        </div>

        {/* counters */}
        <div className="mt-16 grid grid-cols-2 gap-y-10 border-y border-white/10 py-10 lg:grid-cols-4">
          {legacyCounters.map((c, i) => (
            <Reveal key={c.label} delay={i * 90}>
              <div className="text-center">
                <p className="font-display text-4xl text-gold sm:text-5xl">
                  <Counter to={c.value} suffix={c.suffix} />
                </p>
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
                  {c.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* timeline */}
        <div ref={ref} className="relative mt-20">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 w-px bg-white/12 sm:left-1/2 sm:-translate-x-1/2"
            style={{ height: "calc(100% - 1rem)" }}
          />
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-2 w-px origin-top bg-gold transition-transform duration-300 ease-out sm:left-1/2 sm:-translate-x-1/2"
            style={{ height: "calc(100% - 1rem)", transform: `scaleY(${fill})` }}
          />

          <ol className="space-y-12 sm:space-y-16">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative pl-10 sm:pl-0">
                <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={40}>
                  <div
                    className={cn(
                      "sm:w-[calc(50%-2.5rem)]",
                      i % 2 === 0 ? "sm:pr-0" : "sm:ml-auto",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-2 grid h-4 w-4 place-items-center rounded-full border border-gold bg-ink sm:left-1/2 sm:-translate-x-1/2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>
                    <p className="font-display text-2xl text-gold sm:text-3xl">
                      {m.year}
                    </p>
                    <h3 className="mt-2 text-lg text-ink-foreground sm:text-xl">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-foreground/65">
                      {m.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- why premium materials matter ---------------------- */

export function MaterialsMatter() {
  return (
    <section id="materials" className="bg-background py-28 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow text-gold">Why premium materials matter</span>
          </Reveal>
          <h2 className="display-section mt-5 text-foreground">
            <SplitHeading text="The cheapest floor is laid twice." />
          </h2>
          <Reveal delay={120}>
            <p className="lede mt-6 text-muted-foreground">
              Six reasons the surface deserves more attention than almost anything
              else in the budget.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {materialReasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <article className="group h-full border-t border-border pt-6 transition-colors duration-500 hover:border-gold">
                <span className="font-display text-xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg text-foreground">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ room explorer ----------------------------- */

export function RoomExplorer() {
  return (
    <section id="rooms" className="bg-secondary py-28 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-gold">Explore by room</span>
          </Reveal>
          <h2 className="display-section mt-5 text-foreground">
            <SplitHeading text="Start where you are standing." />
          </h2>
          <Reveal delay={120}>
            <p className="lede mt-6 text-muted-foreground">
              Twelve places a surface decision has to be made. Pick one and we'll
              show you what usually works.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 90} direction="zoom">
              <article className="group relative h-full overflow-hidden rounded-sm bg-ink shadow-luxe transition-transform duration-700 ease-out hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={r.image}
                    alt={`${r.label} finished with premium surfaces`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={1600}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                </div>
                <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent transition-opacity duration-500 group-hover:from-ink" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl text-white">{r.label}</h3>
                  <p className="mt-1.5 text-sm text-white/70">{r.note}</p>

                  <ul className="mt-3 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-700 group-hover:max-h-28 group-hover:opacity-100">
                    {r.picks.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-white/75"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/products/$productId"
                    params={{ productId: r.productId }}
                    className="btn btn-secondary-dark mt-5 !px-5 !py-3"
                  >
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
