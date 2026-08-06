import { useCallback, useRef, useState } from "react";

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(45);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="group relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-lg shadow-luxe"
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <img
        src={after}
        alt={afterAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover saturate-50 brightness-75"
        />
      </div>

      <span className="glass-dark absolute left-4 top-4 rounded px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white">
        Before
      </span>
      <span className="glass-dark absolute right-4 top-4 rounded px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white">
        After
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-gold"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-background/90 text-xs font-medium text-foreground shadow-luxe">
          ⇆
        </span>
      </div>

      <label className="sr-only" htmlFor="ba-range">
        Reveal the finished space
      </label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute bottom-3 left-1/2 w-1/2 -translate-x-1/2 accent-[oklch(0.7_0.098_78)] opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
      />
    </div>
  );
}
