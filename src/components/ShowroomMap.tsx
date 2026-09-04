import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/lib/business";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";

/** Luxury showroom locator: embedded map, business details, hours, directions. */
export function ShowroomMap({ heading = true }: { heading?: boolean }) {
  return (
    <section id="visit" className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <Reveal direction="up">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold">Visit the showroom</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Come feel the surfaces in person
              </h2>
              <p className="mt-4 text-muted-foreground">
                Walk through full-size displays of tiles, granite and bathware —
                our team will help you shortlist for every room.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-stretch">
          <Reveal direction="left" className="h-full">
            <div className="h-full overflow-hidden rounded-2xl border border-border shadow-luxe">
              <iframe
                title="Hemant Tiles and Building Materials on Google Maps"
                src={BUSINESS.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 sm:h-[440px] lg:h-full"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="flex h-full flex-col gap-6 rounded-2xl border border-border bg-card p-7 shadow-luxe">
              <div>
                <p className="font-display text-2xl">{BUSINESS.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-gold">
                  Tiles · Granite · Bathware
                </p>
              </div>

              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{BUSINESS.address}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <a
                    href={BUSINESS.phoneHref}
                    className="underline-sweep text-foreground"
                  >
                    {BUSINESS.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <a
                    href={`mailto:${BUSINESS.email}`}
                    className="underline-sweep break-all text-foreground"
                  >
                    {BUSINESS.email}
                  </a>
                </li>
              </ul>

              <div className="rounded-xl border border-border bg-secondary/60 p-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Clock className="h-4 w-4 text-gold" />
                  <span className="text-xs uppercase tracking-[0.2em]">
                    Working hours
                  </span>
                </div>
                <dl className="mt-3 space-y-2 text-sm">
                  {BUSINESS.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{h.day}</dt>
                      <dd className="text-foreground">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">
                  Opens daily from 9:00 AM.
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                <a
                  href={BUSINESS.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex-1"
                >
                  <Navigation className="h-4 w-4" />
                  Get directions
                </a>
                <a
                  href={whatsappLink(
                    "Hello, I would like to book a showroom visit. My preferred time is: ",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary flex-1"
                >
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  Book a visit
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
