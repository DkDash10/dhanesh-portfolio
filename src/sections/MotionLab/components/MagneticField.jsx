import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MousePointer2 } from "lucide-react";

export default function MagneticField() {
  const containerRef = useRef(null);
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const core = coreRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!container || !core || !ring || !label) return;

    const handleMove = (event) => {
      const rect = container.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = Math.max(rect.width, rect.height) * 0.55;
      const strength = Math.max(0, Math.min(1, 1 - distance / maxDistance));

      gsap.to(core, { x: dx * 0.16, y: dy * 0.16, scale: 1 + strength * 0.18, duration: 0.45, ease: "power3.out", overwrite: true });
      gsap.to(ring, {
        x: dx * 0.28,
        y: dy * 0.28,
        scale: 1 + strength * 0.45,
        opacity: 0.25 + strength * 0.55,
        duration: 0.7,
        ease: "power3.out",
        overwrite: true,
      });
      gsap.to(label, { x: dx * 0.06, y: dy * 0.06, duration: 0.7, ease: "power3.out", overwrite: true });
    };

    const handleLeave = () => {
      gsap.to([core, ring, label], { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" });
      gsap.to(ring, { opacity: 0.35, duration: 0.5 });
    };

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="group relative min-h-90 overflow-hidden rounded-4xl border border-border bg-bg sm:min-h-107.5">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute left-5 right-5 top-5 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7">
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">01</span>
          <h3 className="mt-3 text-[clamp(1.4rem,3vw,2.4rem)] font-light tracking-[-0.045em] text-text">Magnetic field</h3>
        </div>
        <MousePointer2 size={18} strokeWidth={1.5} className="text-text-subtle" />
      </div>

      <div
        ref={coreRef}
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-bg shadow-[0_0_80px_rgba(255,90,54,0.18)] sm:h-28 sm:w-28"
      >
        <span className="font-mono text-[12px] uppercase tracking-[0.15em]">pull</span>
      </div>

      <div
        ref={ringRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 opacity-35 sm:h-56 sm:w-56"
      />
      <div ref={labelRef} className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle">
        move around the field
      </div>

      <span className="absolute left-[18%] top-[34%] h-2 w-2 rounded-full bg-text-subtle/40 transition-transform duration-500 group-hover:scale-150" />
      <span className="absolute right-[22%] top-[29%] h-1.5 w-1.5 rounded-full bg-accent/60" />
      <span className="absolute bottom-[26%] left-[26%] h-1.5 w-1.5 rounded-full bg-text-subtle/40" />
      <span className="absolute bottom-[22%] right-[18%] h-2 w-2 rounded-full bg-text-subtle/30" />
    </div>
  );
}
