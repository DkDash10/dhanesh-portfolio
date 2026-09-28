import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function KineticType() {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const text = "MOVE";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (event) => {
      const rect = container.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      lettersRef.current.forEach((letter) => {
        if (!letter) return;
        const letterRect = letter.getBoundingClientRect();
        const dx = mouseX - (letterRect.left - rect.left + letterRect.width / 2);
        const dy = mouseY - (letterRect.top - rect.top + letterRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, Math.min(1, 1 - distance / 260));

        gsap.to(letter, {
          x: dx * 0.12 * influence,
          y: dy * 0.12 * influence,
          rotate: dx * 0.035 * influence,
          scale: 1 + influence * 0.16,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      });
    };

    const handleLeave = () => {
      gsap.to(lettersRef.current, { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.45)", stagger: 0.025 });
    };

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerleave", handleLeave);
    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-90 overflow-hidden rounded-4xl border border-border bg-bg sm:min-h-107.5">
      <div className="absolute left-5 right-5 top-5 flex items-start justify-between sm:left-7 sm:right-7 sm:top-7">
        <div>
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">02</span>
          <h3 className="mt-3 text-[clamp(1.4rem,3vw,2.4rem)] font-light tracking-[-0.045em] text-text">Kinetic type</h3>
        </div>
        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-subtle">type / motion</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-5">
        <div className="flex select-none">
          {text.split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              ref={(element) => {
                lettersRef.current[index] = element;
              }}
              className="text-[clamp(5rem,18vw,12rem)] font-light leading-none -tracking-widest text-text"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between sm:left-7 sm:right-7">
        <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle">disturb the letters</span>
        <span className="h-px w-16 bg-border sm:w-24" />
      </div>
    </div>
  );
}
