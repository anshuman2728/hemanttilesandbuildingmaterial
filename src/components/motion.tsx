import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------- hooks --------------------------------- */

export function useInView<T extends HTMLElement>(options?: {
  threshold?: number;
  once?: boolean;
}) {
  const { threshold = 0.15, once = true } = options ?? {};
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}

/** Scroll progress of an element through the viewport: 0 (entering) → 1 (leaving). */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const p = (window.innerHeight - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}

/* --------------------------------- reveal --------------------------------- */

type Direction = "up" | "down" | "left" | "right" | "zoom" | "none";

const hiddenTransform: Record<Direction, string> = {
  up: "translate3d(0,42px,0)",
  down: "translate3d(0,-42px,0)",
  left: "translate3d(-48px,0,0)",
  right: "translate3d(48px,0,0)",
  zoom: "scale(1.06)",
  none: "none",
};

export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 900,
  once = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "span" | "li" | "section";
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ once });

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionDuration: `${duration}ms`,
    transform: inView ? "none" : hiddenTransform[direction],
    opacity: inView ? 1 : 0,
    filter: inView ? "blur(0px)" : "blur(6px)",
  };

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={cn(
        "transition-[transform,opacity,filter] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!blur-none motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Staggered children reveal. */
export function Stagger({
  children,
  className,
  step = 90,
  direction = "up",
}: {
  children: ReactNode[];
  className?: string;
  step?: number;
  direction?: Direction;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * step} direction={direction}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/** Word-by-word cinematic headline reveal. */
export function SplitHeading({
  text,
  className,
  wordClassName,
  delay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            className={cn(
              "inline-block transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              wordClassName,
            )}
            style={{
              transitionDelay: `${delay + i * step}ms`,
              transform: inView ? "translateY(0)" : "translateY(108%)",
              opacity: inView ? 1 : 0,
            }}
          >
            {word}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------- parallax -------------------------------- */

export function Parallax({
  children,
  className,
  speed = 0.15,
  scale = 1,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  scale?: number;
}) {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const shift = (0.5 - progress) * speed * 260;
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className="h-full w-full will-change-transform motion-reduce:!transform-none"
        style={{ transform: `translate3d(0,${shift}px,0) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------------------- counters -------------------------------- */

export function Counter({
  to,
  suffix = "",
  duration = 1800,
  className,
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* -------------------------------- marquee --------------------------------- */

export function Marquee({
  children,
  className,
  slow = false,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
}) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-14 group-hover:[animation-play-state:paused] motion-reduce:animate-none",
          slow ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        <div className="flex shrink-0 items-center gap-14">{children}</div>
        <div className="flex shrink-0 items-center gap-14" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
