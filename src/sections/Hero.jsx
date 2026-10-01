import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const orbRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const animatedElements = contentRef.current.querySelectorAll(".hero-eyebrow, .hero-title-line, .hero-description, .hero-actions");

      if (reduceMotion) {
        gsap.set(animatedElements, {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });

        return;
      }

      // ------------------------------------------------
      // CONTENT INTRO
      // ------------------------------------------------

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          ".hero-eyebrow",
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
        )
        .fromTo(
          ".hero-title-line",
          {
            opacity: 0,
            yPercent: 105,
          },
          {
            opacity: 1,
            yPercent: 0,
            duration: 1,
            stagger: 0.14,
          },
          "-=0.35",
        )
        .fromTo(
          ".hero-accent-word",
          {
            opacity: 0,
            y: 20,
            rotate: 3,
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.75,
            ease: "back.out(1.4)",
          },
          "-=0.55",
        )
        .fromTo(
          ".hero-description",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
          },
          "-=0.4",
        )
        .fromTo(
          ".hero-actions",
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.35",
        );

      // ------------------------------------------------
      // AMBIENT ORB
      // ------------------------------------------------

      gsap.to(orbRef.current, {
        x: 35,
        y: -25,
        duration: 7,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // ------------------------------------------------
      // VERY SUBTLE VIDEO MOVEMENT
      // ------------------------------------------------

      if (videoRef.current) {
        gsap.fromTo(
          videoRef.current,
          {
            scale: 1.04,
          },
          {
            scale: 1.08,
            duration: 14,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          },
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative min-h-svh overflow-hidden bg-bg text-text">
      {/* =================================================
          HERO BACKGROUND
      ================================================= */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* ------------------------------------------------
            SILK VIDEO
        ------------------------------------------------ */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="hero-silk-video absolute inset-0 h-full w-full object-cover"
          >
            <source src="/media/bg-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ------------------------------------------------
            VIDEO TREATMENT
        ------------------------------------------------ */}

        {/* Main readability overlay */}
        <div className="absolute inset-0 bg-bg/75" />

        {/* Theme-aware silk treatment */}
        <div className="hero-silk-light absolute inset-0" />

        {/* Top-to-bottom depth */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),transparent_35%,var(--theme-bg)_100%)] opacity-70"
        />

        {/* Accent atmosphere */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,color-mix(in_srgb,var(--theme-accent)_8%,transparent),transparent_30%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,0.035),transparent_28%)]"
        />

        {/* Floating light */}
        <div
          ref={orbRef}
          className="absolute right-[-12%] top-[10%] h-152 w-152 rounded-full bg-accent/8 blur-[110px]"
        />

        {/* Secondary atmosphere */}
        <div
          className="absolute bottom-[-20%] left-[-12%] h-128 w-lg rounded-full bg-white/2.5 blur-[110px]"
        />

        {/* Grain */}
        <div className="hero-grain absolute inset-0 opacity-[0.035]" />
      </div>

      {/* =================================================
          CONTENT
      ================================================= */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-svh max-w-portfolio flex-col justify-center px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:px-12"
      >
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-6 flex items-center gap-3 sm:mb-8">
          <span className="h-px w-8 bg-accent sm:w-10" />

          <span
            className="mono-text text-sm sm:text-base font-medium uppercase tracking-[0.2em] text-text"
          >
            Frontend Developer
          </span>

          <span className="text-text">·</span>

          <span
            className="mono-text text-sm sm:text-base font-medium uppercase tracking-[0.2em] text-text"
          >
            Mumbai
          </span>
        </div>

        {/* =================================================
            HERO TITLE
        ================================================= */}
        <h1
          className="max-w-280 font-sans text-[clamp(3.5rem,8.2vw,8.7rem)] font-medium leading-[0.86] tracking-[-0.065em]"
        >
          {/* First line */}
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-title-line block">Interfaces</span>
          </span>

          {/* Second line */}
          <span className="block overflow-hidden pb-[0.08em]">
            <span className="hero-title-line block text-text-muted">
              made to{" "}
              <span className="hero-accent-word relative inline-block text-accent opacity-0">
                move.
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-0.08em] left-[5%] h-[0.06em] w-[90%] origin-left -rotate-1 rounded-full bg-accent/50"
                />
              </span>
            </span>
          </span>
        </h1>

        {/* =================================================
            DESCRIPTION + CTA
        ================================================= */}
        <div className="mt-10 flex flex-col gap-9 sm:mt-12 sm:gap-10 lg:mt-14">
          <p className="hero-description max-w-lg text-sm leading-7 text-text-muted opacity-0 sm:text-base sm:leading-8">
            I build responsive, interactive web experiences where React, motion, and visual design work together.
          </p>

          {/* Selected work */}
          <div className="hero-actions opacity-0">
            <a href="#work" data-cursor="interactive" className="group inline-flex items-center gap-5">
              {/* Label */}
              <span className="relative pb-2 text-xs font-medium uppercase tracking-[0.18em] text-text">
                Explore selected work
                <span className="absolute bottom-0 left-0 h-px w-full bg-border transition-all duration-500 group-hover:w-0" />
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
              </span>

              {/* Arrow */}
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg"
              >
                <ArrowUpRight size={17} strokeWidth={1.7} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
