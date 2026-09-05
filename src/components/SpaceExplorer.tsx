import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, X } from "lucide-react";
import { Reveal, SplitHeading } from "@/components/motion";
import { rooms, type Room } from "@/lib/story";
import { projects } from "@/lib/trust";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/* --------------------------------- detail --------------------------------- */

function SpecColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow text-gold">{title}</p>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li
            key={i}
            className="border-b border-white/10 pb-2 text-sm text-ink-foreground/75"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SpaceDetail({ room, onClose }: { room: Room; onClose: () => void }) {
  const shots = projects.filter((p) => p.category === room.projectCategory).slice(0, 3);

  return (
    <div className="relative mt-6 overflow-hidden rounded-sm bg-ink">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close space details"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-sm border border-white/20 text-ink-foreground/70 transition-colors duration-500 hover:border-gold hover:text-gold"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-[18rem] overflow-hidden">
          <img
            src={room.image}
            alt={`${room.label} finished with premium surfaces`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/80" />
        </div>

        <div className="p-8 sm:p-12">
          <span className="eyebrow text-gold">Curated for</span>
          <h3 className="display-section mt-4 text-ink-foreground">{room.label}</h3>
          <p className="lede mt-5 text-ink-foreground/70">{room.description}</p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <SpecColumn title="Recommended tiles" items={room.recommendedTiles} />
            <SpecColumn title="Finishes" items={room.recommendedFinishes} />
            <SpecColumn title="Sizes" items={room.recommendedSizes} />
            <SpecColumn title="Matching materials" items={room.matchingMaterials} />
          </div>

          {/* featured products */}
          <div className="mt-10">
            <p className="eyebrow text-gold">Featured products</p>
            <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
              {room.featured.map((f) => (
                <li key={f.name}>
                  <Link
                    to="/products/$productId"
                    params={{ productId: f.productId }}
                    className="group flex items-center justify-between gap-4 py-3.5"
                  >
                    <span className="text-sm text-ink-foreground/85">{f.name}</span>
                    <span className="flex items-center gap-2 whitespace-nowrap text-xs text-gold">
                      {f.price}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* completed projects */}
          {shots.length > 0 && (
            <div className="mt-10">
              <p className="eyebrow text-gold">Completed projects</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {shots.map((s) => (
                  <figure key={s.title} className="overflow-hidden rounded-sm">
                    <img
                      src={s.src}
                      alt={s.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-out hover:scale-110"
                    />
                    <figcaption className="mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-ink-foreground/55">
                      {s.title}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              to="/products/$productId"
              params={{ productId: room.productId }}
              className="btn btn-primary group"
            >
              Explore Collection
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <a
              href={whatsappLink(
                `Hello, I am planning my ${room.label.toLowerCase()} and would like recommendations on tiles and materials.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary-dark"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Ask for advice
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- section -------------------------------- */

export function RoomExplorer() {
  const [openId, setOpenId] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const active = rooms.find((r) => r.id === openId) ?? null;

  useEffect(() => {
    if (!active) return;
    detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [active]);

  return (
    <section id="rooms" className="bg-secondary py-28 sm:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="eyebrow text-gold">Explore by space</span>
          </Reveal>
          <h2 className="display-section mt-5 text-foreground">
            <SplitHeading text="Designed for the way you live." />
          </h2>
          <Reveal delay={120}>
            <p className="lede mt-6 text-muted-foreground">
              Explore surfaces and materials curated for every space.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((r, i) => {
            const isOpen = r.id === openId;
            return (
              <Reveal
                key={r.id}
                delay={(i % 3) * 90}
                direction="zoom"
                className={cn(i % 5 === 0 && "lg:col-span-2")}
              >
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-sm bg-ink shadow-luxe transition-transform duration-700 ease-out hover:-translate-y-1",
                    isOpen && "ring-1 ring-gold",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : r.id)}
                    aria-expanded={isOpen}
                    className="block w-full text-left"
                  >
                    <div
                      className={cn(
                        "overflow-hidden",
                        i % 5 === 0 ? "aspect-[16/10]" : "aspect-[4/5] sm:aspect-[4/3]",
                      )}
                    >
                      <img
                        src={r.image}
                        alt={`${r.label} finished with premium surfaces`}
                        loading="lazy"
                        decoding="async"
                        width={1280}
                        height={1600}
                        className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08]"
                      />
                    </div>
                    <span className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent transition-opacity duration-700 group-hover:from-ink group-hover:via-ink/55" />

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <h3 className="display-sub text-white transition-transform duration-700 ease-out group-hover:-translate-y-1">
                        {r.label}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-white/70">{r.note}</p>

                      <ul className="mt-3 flex max-h-0 flex-wrap gap-1.5 overflow-hidden opacity-0 transition-all duration-700 group-hover:max-h-28 group-hover:opacity-100">
                        {r.picks.map((p) => (
                          <li
                            key={p}
                            className="rounded-sm border border-white/20 px-2.5 py-1 text-[11px] text-white/75"
                          >
                            {p}
                          </li>
                        ))}
                      </ul>

                      <span className="mt-5 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-gold">
                        {isOpen ? "Hide details" : "Explore Collection"}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </button>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div ref={detailRef}>
          {active && <SpaceDetail room={active} onClose={() => setOpenId(null)} />}
        </div>
      </div>
    </section>
  );
}
