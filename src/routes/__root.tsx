import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { MapPin, Phone, Mail, Menu, X, Clock, ArrowUpRight } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import {
  CursorGlow,
  FloatingActions,
  PremiumLoader,
  ScrollProgress,
  ThemeToggle,
} from "@/components/chrome";
import { categoryGroups } from "@/lib/catalog";
import { whatsappLink, WhatsAppIcon } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const BUSINESS_NAME = "Hemant Tiles and Building Materials";
const PHONE = "+91 94513 65107";
const EMAIL = "hemantsingh1965@gmail.com";
const ADDRESS =
  "Sankar Nagar Colony, 661/2, near Jio Tower, Ram Nagar Industrial Area, Tengra mod, Ramnagar, Varanasi, Uttar Pradesh 221008";
const MAPS_LINK = "https://maps.app.goo.gl/A71gEFAMbxpNEU4WA";
const DESCRIPTION =
  "Premium tiles, granite, marble, bathware and building materials in Ramnagar, Varanasi. Open from 9 AM — free tile estimator and instant WhatsApp quotes.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-opacity hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: BUSINESS_NAME },
      { name: "description", content: DESCRIPTION },
      { name: "author", content: BUSINESS_NAME },
      { name: "theme-color", content: "#1a1815" },
      { property: "og:title", content: BUSINESS_NAME },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: BUSINESS_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: BUSINESS_NAME },
      { name: "twitter:description", content: DESCRIPTION },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/596dd42d-ee88-451e-8186-c85ba2b880ec",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/596dd42d-ee88-451e-8186-c85ba2b880ec",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-screen flex-col font-body antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/* --------------------------------- header --------------------------------- */

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/calculator", label: "Estimator" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const { location } = useRouterState();
  const transparent = location.pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[75] transition-[background-color,border-color,backdrop-filter] duration-500",
        transparent
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-background/85 backdrop-blur-xl",
      )}
      onMouseLeave={() => setMega(false)}
    >
      <div
        className={cn(
          "container mx-auto flex items-center justify-between px-4 transition-[height] duration-500 sm:px-6 lg:px-8",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Link
          to="/"
          className={cn(
            "font-display text-xl leading-none tracking-tight transition-colors sm:text-2xl",
            transparent ? "text-white" : "text-foreground",
          )}
        >
          Hemant Tiles
          <span className="mt-0.5 block text-[0.55rem] uppercase tracking-[0.3em] text-gold">
            Tiles · Granite · Bathware
          </span>
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((n) => (
            <div
              key={n.to}
              onMouseEnter={() => setMega(n.to === "/products")}
              className="relative"
            >
              <Link
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className={cn(
                  "underline-sweep text-[0.8rem] uppercase tracking-[0.16em] transition-colors",
                  transparent
                    ? "text-white/75 hover:text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
                activeProps={{
                  className: transparent ? "text-white" : "text-foreground",
                }}
              >
                {n.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className={transparent ? "text-white" : "text-foreground"} />
          <a
            href={whatsappLink(
              "Hello, I visited your website and I would like to know more about your products.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-ink transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            Get Quote
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={cn(
              "grid h-11 w-11 place-items-center rounded-full lg:hidden",
              transparent ? "text-white" : "text-foreground",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mega menu */}
      <div
        className={cn(
          "hidden overflow-hidden border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 lg:block",
          mega ? "max-h-[26rem] border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto grid grid-cols-5 gap-8 px-4 py-10 sm:px-6 lg:px-8">
          {categoryGroups.map((c) => (
            <div key={c.id}>
              <Link
                to="/products/$productId"
                params={{ productId: c.productId }}
                className="group inline-flex items-center gap-1 text-sm font-medium text-foreground"
              >
                {c.title}
                <ArrowUpRight className="h-3 w-3 text-gold transition-transform group-hover:translate-x-0.5" />
              </Link>
              <ul className="mt-3 space-y-1.5">
                {c.items.slice(0, 7).map((i) => (
                  <li key={i}>
                    <Link
                      to="/products/$productId"
                      params={{ productId: c.productId }}
                      className="text-xs text-muted-foreground transition-colors hover:text-gold"
                    >
                      {i}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background px-4 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-2xl text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink"
            >
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* --------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-3xl">Hemant Tiles</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-gold">
              Building Beautiful Spaces
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-foreground/60">
              A twenty-year-old surface showroom in Ramnagar, Varanasi — tiles,
              granite, marble, bathware and building materials under one roof.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-gold">Quick Links</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-foreground/65">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="underline-sweep">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/admin" className="underline-sweep">
                  Staff Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold">Collections</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-ink-foreground/65">
              {categoryGroups.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/products/$productId"
                    params={{ productId: c.productId }}
                    className="underline-sweep"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold">Visit / Contact</h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-foreground/65">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-gold" />
                <span>Open from 9:00 AM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="underline-sweep">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${EMAIL}`} className="underline-sweep break-all">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-gold" />
                <a
                  href={whatsappLink(
                    "Hello, I visited your website and I would like to know more about your products.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-sweep"
                >
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-gold" />
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-sweep"
                >
                  Open in Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-7 text-xs text-ink-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
          </span>
          <span>Ramnagar, Varanasi · Uttar Pradesh 221008</span>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();
  const isHome = location.pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <PremiumLoader />
      <ScrollProgress />
      <CursorGlow />
      <Header />
      <main className={cn("flex-1", !isHome && "pt-20")}>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <Toaster />
    </QueryClientProvider>
  );
}
