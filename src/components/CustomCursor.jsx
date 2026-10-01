import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Make cursor visible immediately
    gsap.set([dot, ring], {
      opacity: 1,
    });

    const moveDotX = gsap.quickTo(dot, "x", {
      duration: 0.12,
      ease: "power3.out",
    });

    const moveDotY = gsap.quickTo(dot, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    const moveRingX = gsap.quickTo(ring, "x", {
      duration: 0.45,
      ease: "power3.out",
    });

    const moveRingY = gsap.quickTo(ring, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      moveDotX(clientX);
      moveDotY(clientY);

      moveRingX(clientX);
      moveRingY(clientY);
    };

    const handlePointerOver = (event) => {
      const interactive = event.target.closest("a, button, [data-cursor='interactive']");

      if (!interactive) return;

      gsap.to(dot, {
        scale: 0.55,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(ring, {
        width: 56,
        height: 56,
        borderColor: "var(--theme-accent)",
        backgroundColor: "color-mix(in srgb, var(--theme-accent) 8%, transparent)",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handlePointerOut = (event) => {
      const interactive = event.target.closest("a, button, [data-cursor='interactive']");

      if (!interactive) return;

      gsap.to(dot, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(ring, {
        width: 34,
        height: 34,
        borderColor: "var(--theme-border)",
        backgroundColor: "transparent",
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);

      gsap.killTweensOf(dot);
      gsap.killTweensOf(ring);
    };
  }, []);

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor h-8.5 w-8.5 rounded-full border border-border opacity-0"
      />

      {/* Inner cursor dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor h-1.5 w-1.5 rounded-full bg-accent opacity-0"
      />
    </>
  );
};

export default CustomCursor;
