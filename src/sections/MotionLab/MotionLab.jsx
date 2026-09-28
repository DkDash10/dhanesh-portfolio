import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticField from "./components/MagneticField";
import KineticType from "./components/KineticType";
import GravityField from "./components/GravityField";

export default function MotionLab() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".motion-lab-header",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } },
      );

      gsap.fromTo(
        ".motion-lab-card",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".motion-lab-grid", start: "top 84%", once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="motion-lab" ref={sectionRef} className="relative overflow-hidden bg-bg py-28 lg:py-44">
      <div className="mx-auto w-full max-w-portfolio px-5 sm:px-8 lg:px-12">
        <div className="motion-lab-header">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">03</span>
            <span className="h-px w-8 bg-accent/60" />
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-subtle">Motion lab</span>
          </div>

          <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <h2 className="max-w-5xl text-[clamp(3.5rem,8vw,9rem)] font-light leading-[0.8] tracking-[-0.08em] text-text">
              Interaction
              <br />
              <span className="text-text-muted">is the interface.</span>
            </h2>
            <p className="max-w-md text-base leading-7 text-text-muted sm:text-lg lg:justify-self-end">
              Small experiments built to explore movement, physics, responsiveness and the relationship between a cursor and the interface.
            </p>
          </div>
        </div>

        <div className="motion-lab-grid mt-14 grid gap-5 lg:mt-24 lg:grid-cols-2">
          <div className="motion-lab-card">
            <MagneticField />
          </div>
          <div className="motion-lab-card">
            <KineticType />
          </div>
          <div className="motion-lab-card lg:col-span-2">
            <GravityField />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle">Built with React + GSAP</span>
          <span className="max-w-md text-sm leading-6 text-text-muted sm:text-right">
            No templates. No motion for the sake of motion. Just small systems exploring how an interface can respond.
          </span>
        </div>
      </div>
    </section>
  );
}
