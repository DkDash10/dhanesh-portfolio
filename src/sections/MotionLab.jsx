import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORD = "INTERFACE";

const LETTER_OFFSETS_DESKTOP = [
  [-0.95, -0.64, -10],
  [0.88, 0.52, 8],
  [-0.76, 0.82, -8],
  [1.02, -0.7, 11],
  [-0.9, 0.62, -10],
  [0.84, -0.78, 10],
  [-0.7, -0.58, -8],
  [0.98, 0.54, 9],
  [-0.82, 0.74, -9],
];

const LETTER_OFFSETS_MOBILE = [
  [-0.58, -0.9, -7],
  [0.54, 1.78, 6],
  [-0.48, 1.05, -6],
  [0.62, -0.96, 7],
  [-0.86, 1.44, -6],
  [0.52, -1.02, 6],
  [-0.44, -0.82, -5],
  [0.6, 0.8, 6],
  [-0.5, 0.98, -6],
];

export default function MotionLab() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const lettersRef = useRef([]);
  const signalRef = useRef(null);
  const signalPathRef = useRef(null);
  const connectionRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;

    if (!section || !pin) return;

    const ctx = gsap.context(() => {
      const letters = lettersRef.current.filter(Boolean);
      const firstE = letters[3];
      const secondE = letters[8];
      const signal = signalRef.current;
      const signalPath = signalPathRef.current;
      const connections = connectionRefs.current.filter(Boolean);

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(signal, { left: "100%", xPercent: -50 });
        gsap.set(signalPath, { scaleX: 1 });
        gsap.set(connections, { scaleX: 0, opacity: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const offsets = isMobile ? LETTER_OFFSETS_MOBILE : LETTER_OFFSETS_DESKTOP;

        // Natural layout distance between the two E's (offsetLeft ignores
        // transforms). Read as a function so it is re-measured on refresh/resize.
        const eDistance = () => secondE.offsetLeft - firstE.offsetLeft;

        const lettersExceptE = letters.filter((letter) => letter !== firstE && letter !== secondE);

        gsap.set(signal, { left: "0%", xPercent: -50 });
        gsap.set(signalPath, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(connections, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline();

        // 01 — Signal enters
        timeline
          .to(signal, { left: "26%", duration: 0.8, ease: "power2.inOut" })
          .to(signalPath, { scaleX: 0.26, duration: 0.8, ease: "power2.inOut" }, "<")

          // 02 — Signal reaches the word
          .to(signal, { left: "50%", duration: 0.65, ease: "power2.inOut" })
          .to(signalPath, { scaleX: 0.5, duration: 0.65, ease: "power2.inOut" }, "<")

          // The dot is almost at the middle of the line: from here the
          // branches and the letters react together with it.
          .addLabel("reach", "-=0.1")
          .to(connections[0], { scaleX: 1, opacity: 0.7, duration: 0.3 }, "reach")
          .to(connections[1], { scaleX: 1, opacity: 0.55, duration: 0.3 }, "reach+=0.06")
          .to(connections[2], { scaleX: 1, opacity: 0.45, duration: 0.3 }, "reach+=0.12")

          // 03 — Interface responds (small movement, word stays in the composition)
          .to(
            letters,
            {
              x: (index) => `${offsets[index][0]}em`,
              y: (index) => `${offsets[index][1]}em`,
              rotation: (index) => offsets[index][2],
              duration: 1.1,
              stagger: 0.04,
              ease: "power3.inOut",
            },
            "reach",
          )
          .to(signal, { left: "72%", duration: 1, ease: "power3.inOut" }, "reach+=0.08")
          .to(signalPath, { scaleX: 0.72, duration: 1, ease: "power3.inOut" }, "<")

          // 04 — The two E's exchange positions.
          // Each E travels to the other E's slot and keeps its own colour.
          .to(firstE, { x: () => gsap.getProperty(firstE, "x") + eDistance(), duration: 0.9, ease: "power3.inOut" })
          .to(secondE, { x: () => gsap.getProperty(secondE, "x") - eDistance(), duration: 0.9, ease: "power3.inOut" }, "<")

          // 05 — Stronger fragmentation (E's stay where they landed)
          .to(lettersExceptE, {
            x: (index) => `${offsets[letters.indexOf(lettersExceptE[index])][0] * 1.28}em`,
            y: (index) => `${offsets[letters.indexOf(lettersExceptE[index])][1] * 1.28}em`,
            rotation: (index) => offsets[letters.indexOf(lettersExceptE[index])][2] * 1.3,
            duration: 0.8,
            stagger: 0.025,
            ease: "power2.inOut",
          })
          .to(connections, { opacity: 0.14, duration: 0.35 }, "<")

          // 06 — Resolution.
          // Every letter settles back to rest, except the E's: they settle into
          // their exchanged slots, so the exchange is permanent once completed.
          .to(
            letters,
            {
              x: (index, target) => (target === firstE ? eDistance() : target === secondE ? -eDistance() : 0),
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 1.25,
              stagger: 0.04,
              ease: "expo.inOut",
            },
            "+=0.18",
          )
          .to(connections, { scaleX: 0, opacity: 0, duration: 0.6, stagger: 0.04, ease: "power2.in" }, "<")
          .to(signal, { left: "100%", duration: 1, ease: "power3.inOut" }, "<0.05")
          .to(signalPath, { scaleX: 1, duration: 1, ease: "power3.inOut" }, "<");

        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: "+=255%",
          pin,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          animation: timeline,
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="motion-lab" ref={sectionRef} className="relative overflow-hidden bg-bg py-14 lg:py-28">
      {/* =====================================================
          EVERYTHING INSIDE THIS CONTAINER IS PINNED TOGETHER.
          This keeps:
          03 Motion lab
          Interaction is a response.
          INTERFACE
          is alive.
          on screen during the entire interaction.
      ====================================================== */}
      <div ref={pinRef} className="relative min-h-svh bg-bg">
        <div className="mx-auto flex min-h-svh w-full max-w-portfolio flex-col px-5 sm:px-8 lg:px-12">
          {/* -------------------------------------------------
              FIXED / PINNED INTRO
          ------------------------------------------------- */}
          <div className="motion-lab-intro shrink-0">
            {/* Section header */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-accent">03</span>

              <span className="h-px w-8 bg-accent/60" />

              <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-text">Motion lab</span>
            </div>

            {/* Intro */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
              <div>
                <p className="max-w-sm text-base leading-relaxed text-text-muted">Interfaces should not just respond. They should communicate through movement.</p>

                <span className="mt-5 block font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle">Interaction · Motion · Response</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------
              MAIN MOTION STAGE
          ------------------------------------------------- */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center pb-8 pt-6 sm:pb-10 sm:pt-8 lg:pt-4">
            {/* Construction grid */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.14]">
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border" />
            </div>

            {/* Coordinate markers */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 hidden -translate-y-1/2 font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle sm:block"
            >
              ୦୦
            </span>

            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle sm:block"
            >
              ୦୧
            </span>

            {/* =================================================
                WORD SYSTEM

                All elements here use the same local width.
                Nothing is positioned against the viewport.
            ================================================= */}
            <div className="relative w-full max-w-280">
              <div className="mb-5 text-center sm:mb-6">
                <span
                  className="
                    text-[clamp(1.45rem,3vw,2.5rem)]
                    font-light
                    leading-none
                    tracking-[-0.045em]
                    text-text-muted
                  "
                >
                  The
                </span>
              </div>

              <div className="relative mx-auto w-fit max-w-full">
                {/* INTERFACE */}
                <div
                  className="
                    relative
                    flex
                    justify-center
                    whitespace-nowrap
                    text-[clamp(3.15rem,10.5vw,10rem)]
                    font-light
                    leading-[0.8]
                    tracking-[-0.095em]
                    text-text
                  "
                  aria-label="Interface"
                >
                  {WORD.split("").map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      ref={(node) => {
                        lettersRef.current[index] = node;
                      }}
                      className={`inline-block will-change-transform ${index >= 5 ? "text-accent" : "text-text"}`}
                    >
                      {letter}
                    </span>
                  ))}
                </div>

                {/* Signal rail */}
                <div aria-hidden="true" className="absolute left-0 right-0 top-[calc(100%+1.25rem)] h-px bg-border">
                  <span ref={signalPathRef} className="absolute left-0 top-0 h-px w-full origin-left bg-accent/60" />

                  <span
                    ref={signalRef}
                    className="
                      absolute
                      left-0
                      top-1/2
                      h-3
                      w-3
                      -translate-y-1/2
                      rounded-full
                      bg-accent
                      shadow-[0_0_22px_rgba(255,90,54,0.32)]
                      will-change-[left]
                    "
                  />
                </div>

                {/* Signal branches */}
                <span
                  ref={(node) => {
                    connectionRefs.current[0] = node;
                  }}
                  aria-hidden="true"
                  className="absolute left-[22%] top-[calc(100%+1.25rem)] h-px w-[13%] -translate-y-1/2 rotate-[-18deg] bg-accent/50"
                />

                <span
                  ref={(node) => {
                    connectionRefs.current[1] = node;
                  }}
                  aria-hidden="true"
                  className="absolute left-[45%] top-[calc(100%+1.25rem)] h-px w-[14%] -translate-y-1/2 rotate-12 bg-accent/45"
                />

                <span
                  ref={(node) => {
                    connectionRefs.current[2] = node;
                  }}
                  aria-hidden="true"
                  className="absolute left-[68%] top-[calc(100%+1.25rem)] h-px w-[11%] -translate-y-1/2 rotate-[-14deg] bg-accent/40"
                />
              </div>

              {/* Same visual scale as "The" */}
              <div className="mt-10 text-center sm:mt-12">
                <span
                  className="
                    text-[clamp(1.45rem,3vw,2.5rem)]
                    font-light
                    leading-none
                    tracking-[-0.045em]
                    text-text-muted
                  "
                >
                  is alive.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
