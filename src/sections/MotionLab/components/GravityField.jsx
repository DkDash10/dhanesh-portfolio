import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function GravityField() {
  const containerRef = useRef(null);
  const nodesRef = useRef([]);
  const animationRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const nodes = nodesRef.current.filter(Boolean);
    const positions = nodes.map((_, index) => ({
      x: 25 + ((index * 17) % 55),
      y: 25 + ((index * 29) % 50),
      phase: index * 0.8,
    }));

    const handleMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
        active: true,
      };
    };
    const handleLeave = () => {
      pointerRef.current.active = false;
    };

    const tick = () => {
      const pointer = pointerRef.current;
      nodes.forEach((node, index) => {
        const position = positions[index];
        let targetX = position.x + Math.sin(Date.now() * 0.0007 + position.phase) * 3;
        let targetY = position.y + Math.cos(Date.now() * 0.0008 + position.phase) * 3;

        if (pointer.active) {
          const dx = pointer.x - position.x;
          const dy = pointer.y - position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, Math.min(1, 1 - distance / 55));
          targetX += dx * influence * 0.42;
          targetY += dy * influence * 0.42;
        }

        gsap.set(node, { left: `${targetX}%`, top: `${targetY}%` });
      });
      animationRef.current = requestAnimationFrame(tick);
    };

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    animationRef.current = requestAnimationFrame(tick);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-90 overflow-hidden rounded-4xl border border-border bg-bg sm:min-h-107.5">
      <div className="absolute left-5 right-5 top-5 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7">
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">03</span>
          <h3 className="mt-3 text-[clamp(1.4rem,3vw,2.4rem)] font-light tracking-[-0.045em] text-text">Gravity field</h3>
        </div>
        <ArrowUpRight size={18} strokeWidth={1.5} className="text-text-subtle" />
      </div>

      <div className="pointer-events-none absolute left-[18%] top-[35%] h-px w-[55%] rotate-18 bg-border/70" />
      <div className="pointer-events-none absolute left-[28%] top-[57%] h-px w-[48%] rotate-[-24deg] bg-border/70" />
      <div className="pointer-events-none absolute left-[42%] top-[30%] h-[45%] w-px rotate-28 bg-border/40" />

      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          ref={(element) => {
            nodesRef.current[index] = element;
          }}
          className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${
            index === 0 || index === 4 ? "bg-accent shadow-[0_0_24px_rgba(255,90,54,0.35)]" : "bg-text-muted/50"
          }`}
          style={{ left: `${25 + ((index * 17) % 55)}%`, top: `${25 + ((index * 29) % 50)}%` }}
        />
      ))}

      <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between sm:left-7 sm:right-7">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle">disturb the system</span>
        <span className="font-mono text-[12px] text-accent">08 nodes</span>
      </div>
    </div>
  );
}
