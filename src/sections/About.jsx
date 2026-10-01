import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Gamepad2, Trophy, ChessKnight, Music2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const interests = [
  {
    number: "୦୧",
    title: "Games",
    description: "Competitive matches, late-night sessions and the occasional victory screen.",
    icon: Gamepad2,
    images: ["/media/images/coc.jpg", "/media/images/ML.jpg", "/media/images/pes.jpg", "/media/images/bgmi.jpg"],
  },
  {
     number: "୦୨",
    title: "Football",
    description: "The game, the rivalry, the goals and those moments worth watching twice.",
    icon: Trophy,
    images: ["/media/images/cr7.jpg", "/media/images/messi.jpg"],
  },
  {
    number: "୦୩",
    title: "Chess",
    description: "A quiet game where one unexpected move can change everything.",
    icon: ChessKnight,
    images: ["/media/images/chess.png"],
  },
  {
    number: "୦୪",
    title: "Music",
    description: "Albums, headphones and songs that somehow become attached to memories.",
    icon: Music2,
    images: ["/media/images/brunomars.png", "/media/images/metroboomin.jpg", "/media/images/postmalone.jpg", "/media/images/twentyonepilots.png"],
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRefs = useRef(new Map());
  const [activeInterest, setActiveInterest] = useState(null);
  const [mobileImage, setMobileImage] = useState(0);

  useEffect(() => {
    if (activeInterest === null) return;

    const active = interests[activeInterest];
    if (!active || active.images.length < 2) return;

    const media = window.matchMedia("(max-width: 767px)");
    if (!media.matches) return;

    const interval = window.setInterval(() => {
      setMobileImage((current) => (current + 1) % active.images.length);
    }, 1250);

    return () => window.clearInterval(interval);
  }, [activeInterest]);

  const handleCardMove = (event, interestIndex) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const interest = interests[interestIndex];

    interest.images.forEach((_, index) => {
      const node = imageRefs.current.get(`${interest.title}-${index}`);
      if (!node) return;

      const depth = index === 0 ? 1 : index === 1 ? 0.72 : index === 2 ? 0.48 : 0.3;
      const base =
        interest.images.length === 1
          ? { x: 0, y: 0, rotate: 0 }
          : index === 0
            ? { x: -2, y: 0, rotate: -5 }
            : index === 1
              ? { x: 2, y: -2, rotate: 5 }
              : index === 2
                ? { x: -1, y: 2, rotate: 2 }
                : { x: 2, y: 2, rotate: -3 };

      gsap.to(node, {
        x: base.x + x * 18 * depth,
        y: base.y + y * 14 * depth,
        rotate: base.rotate + x * 5 * depth,
        scale: index === 0 ? 1.045 : 1,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  const resetCardImages = (interestIndex) => {
    const interest = interests[interestIndex];

    interest.images.forEach((_, index) => {
      const node = imageRefs.current.get(`${interest.title}-${index}`);
      if (!node) return;

      gsap.to(node, {
        x: 0,
        y: 0,
        rotate: interest.images.length === 1 ? 0 : index === 0 ? -5 : index === 1 ? 5 : index === 2 ? 2 : -3,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        overwrite: true,
      });
    });
  };

  const handleCardClick = (interestIndex) => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    setActiveInterest((current) => {
      if (current === interestIndex) {
        setMobileImage(0);
        return null;
      }

      setMobileImage(0);
      return interestIndex;
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        gsap.set(".about-reveal, .about-rule, .about-card, .about-close", {
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0 0 0 0)",
        });
        return;
      }

      // Editorial reveal: each content block animates when it actually enters view.
      gsap.utils.toArray(".about-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 34,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      // Section divider draws from left to right.
      gsap.fromTo(
        ".about-rule",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.15,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".about-rule",
            start: "top 86%",
            once: true,
          },
        },
      );

      // Interest cards enter as a staggered sequence.
      gsap.fromTo(
        ".about-card",
        {
          opacity: 0,
          y: 48,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-grid",
            start: "top 82%",
            once: true,
          },
        },
      );

      // The final statement gets a slower editorial reveal.
      gsap.fromTo(
        ".about-close",
        {
          opacity: 0,
          y: 42,
          clipPath: "inset(0 0 18% 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-close",
            start: "top 84%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section id="about" ref={sectionRef} className="relative z-10 overflow-hidden bg-bg pt-28 pb-14 lg:pt-40 lg:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 h-120 overflow-hidden">
        <video autoPlay muted loop playsInline preload="metadata" className="hero-silk-video absolute inset-0 h-full w-full scale-105 object-cover opacity-40 blur-[10px]">
          <source src="/media/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-bg/55" />
        <div className="absolute inset-0 bg-linear-to-b from-bg via-bg/75 to-bg" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-portfolio px-5 sm:px-8 lg:px-12">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="about-reveal flex items-center gap-4">
          <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-accent">01</span>

          <span className="h-px w-8 bg-accent" />

          <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-text">Beyond the interface</span>
        </div>

        {/* =================================================
            INTRO
        ================================================= */}

        <div className="mt-4 grid gap-10 lg:mt-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="about-reveal">
            <p className="max-w-xs hidden sm:block text-sm leading-7 text-text-muted">A little more about the person behind the interfaces.</p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-subtle">Mumbai, India · Frontend</span>
            </div>
          </div>

          <div>
            <h2 className="about-reveal max-w-262.5 text-[clamp(3rem,6.5vw,7rem)] font-light leading-[0.9] tracking-[-0.06em] text-text">
              I spend my days building.
              <br />
              <span className="text-text-muted">My time exploring.</span>
            </h2>

            <p className="about-reveal hidden sm:block mt-8 max-w-2xl text-base leading-8 text-text-muted sm:mt-10 sm:text-lg">
              Outside of frontend development, I spend my time around games, football, chess and music. Different worlds, different ways of thinking — all of them give me something
              to come back with.
            </p>
          </div>
        </div>

        {/* =================================================
            RULE
        ================================================= */}

        <div className="about-rule mt-10 h-px bg-border sm:mt-12" />

        {/* =================================================
            INTEREST INTRO
        ================================================= */}

        <div className="about-reveal mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-subtle">Outside the screen</span>

          <p className="max-w-md text-sm leading-6 text-text-muted sm:text-right">
            <span className="hidden sm:inline">Move around. There are a few things I never really get tired of.</span>
            <span className="sm:hidden">Tap around. There are a few things I never really get tired of.</span>
          </p>
        </div>

        {/* =================================================
            INTEREST GRID
        ================================================= */}

        <div className="about-grid mt-10 grid border border-border sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest, interestIndex) => {
            const Icon = interest.icon;

            return (
              <article
                key={interest.title}
                onClick={() => handleCardClick(interestIndex)}
                onPointerMove={(event) => handleCardMove(event, interestIndex)}
                onPointerLeave={() => resetCardImages(interestIndex)}
                className={`about-card group relative min-h-77.5 touch-manipulation cursor-pointer overflow-hidden border-b border-border px-4 py-8 transition-colors duration-500 hover:bg-surface sm:px-5 sm:py-10 lg:border-b-0 lg:border-r ${
                  activeInterest === interestIndex ? "bg-surface" : ""
                }`}
              >
                {/* IMAGE LAYER */}

                <div
                  className={`pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700 ${
                    activeInterest === interestIndex ? "opacity-100" : "opacity-20 sm:opacity-0 sm:group-hover:opacity-100"
                  }`}
                >
                  {interest.images.map((image, index) => {
                    const isMobileActive = activeInterest === interestIndex && mobileImage === index;

                    return (
                      <img
                        key={image}
                        ref={(node) => {
                          const key = `${interest.title}-${index}`;
                          if (node) imageRefs.current.set(key, node);
                          else imageRefs.current.delete(key);
                        }}
                        src={image}
                        alt=""
                        aria-hidden="true"
                        className={`absolute object-cover transition-[opacity,filter] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                          interest.images.length === 1
                            ? "inset-0 h-full w-full"
                            : index === 0
                              ? "left-[8%] top-[12%] h-[72%] w-[62%] rotate-[-5deg]"
                              : index === 1
                                ? "right-[7%] top-[8%] h-[66%] w-[58%] rotate-[5deg]"
                                : index === 2
                                  ? "bottom-[5%] left-[18%] h-[62%] w-[55%] rotate-2"
                                  : "bottom-[8%] right-[8%] h-[58%] w-[50%] -rotate-3"
                        } ${activeInterest === interestIndex ? "opacity-100" : "opacity-20 sm:opacity-0 sm:group-hover:opacity-100"} ${
                          interest.images.length > 1 && isMobileActive
                            ? "z-20 scale-[1.08] blur-0"
                            : interest.images.length > 1 && activeInterest === interestIndex
                              ? "opacity-35 sm:opacity-100"
                              : ""
                        }`}
                      />
                    );
                  })}
                </div>

                {/* DARK IMAGE OVERLAY */}

                <div
                  className={`pointer-events-none absolute inset-0 z-1 bg-black/35 transition-opacity duration-500 ${
                    activeInterest === interestIndex ? "opacity-45" : "opacity-30 sm:opacity-0 sm:group-hover:opacity-100"
                  }`}
                />

                {/* CONTENT */}

                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[12px] tracking-[0.15em] text-text-subtle transition-colors duration-500 group-hover:text-white/70">{interest.number}</span>

                    <Icon
                      size={20}
                      strokeWidth={1.4}
                      className="text-text-subtle transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:text-white"
                    />
                  </div>

                  <div className="mt-auto">
                    <h3 className="text-3xl font-light tracking-[-0.04em] text-text transition-colors duration-500 group-hover:text-white">{interest.title}</h3>

                    <p className="mt-4 max-w-60 text-sm leading-6 text-text-muted transition-colors duration-500 group-hover:text-white/75">{interest.description}</p>
                  </div>
                </div>

                {/* ACCENT LINE */}

                <span
                  className={`absolute bottom-0 left-0 z-20 h-px bg-accent transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                    activeInterest === interestIndex ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />

                <span
                  className={`pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 font-mono text-[12px] uppercase tracking-[0.16em] text-white/70 transition-all duration-500 sm:hidden ${
                    activeInterest === interestIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {interest.images.length > 1 ? `${String(mobileImage + 1).padStart(2, "0")} / ${String(interest.images.length).padStart(2, "0")}` : "01"}
                </span>
              </article>
            );
          })}
        </div>

        {/* =================================================
            MEMORABLE CLOSE
        ================================================= */}

        <div className="about-close grid gap-8  border-border pt-10 sm:pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-subtle">After the interface</span>

            <p className="mt-5 max-w-4xl text-[clamp(1.8rem,3.5vw,4rem)] font-light leading-none tracking-[-0.045em] text-text">
              The best experiences are the ones
              <span className="text-accent"> you remember</span>
              <span className="text-text-muted"> after you leave them.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
