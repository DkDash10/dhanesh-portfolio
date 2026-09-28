import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const progressysMedia = [
  {
    number: "01",
    label: "Hero",
    title: "A world built around motion.",
    description: "The opening experience establishes Progressys as a motion-led digital product rather than a conventional agency website.",
    video: "/projects/progressys/Videos/Hero.mp4",
    poster: "/projects/progressys/Hero.png",
  },
  {
    number: "02",
    label: "Problem statement",
    title: "Typography becomes the transition.",
    description: "Large editorial type, changing emphasis and scroll-led reveals turn the problem statement into part of the narrative.",
    video: "/projects/progressys/Videos/Problem Statement.mp4",
    poster: "/projects/progressys/Problem Statement.png",
  },
  {
    number: "03",
    label: "What we do",
    title: "Physics, not decoration.",
    description: "Matter.js-powered circles form an interactive service map, giving the section a physical quality and making exploration part of the interface.",
    video: "/projects/progressys/Videos/WhatWeDo.mp4",
    poster: "/projects/progressys/What we do.png",
  },
  {
    number: "04",
    label: "5D Model",
    title: "The Growth Algorithm comes alive.",
    description: "The 5D model unfolds through Diagnose, Design, Deploy, Drive and Dominate — using movement to explain the system.",
    video: "/projects/progressys/Videos/Growth Algorithm.mp4",
    poster: "/projects/progressys/5d Modal Overview.png",
  },
];

const dwaarperMedia = [
  {
    number: "01",
    label: "Hero",
    title: "A marketplace built for discovery.",
    description: "The opening experience introduces Dwaarper and sets the path into a service marketplace designed around straightforward discovery.",
    video: "/projects/dwaarper/Videos/Hero.mp4",
    poster: "/projects/dwaarper/Hero.png",
  },
  {
    number: "02",
    label: "Services",
    title: "Explore the services on offer.",
    description: "The services experience helps customers browse the marketplace and discover options that fit what they need.",
    video: "/projects/dwaarper/Videos/Services.mp4",
  },
  {
    number: "03",
    label: "Cart",
    title: "A considered cart experience.",
    description: "The cart keeps selected services and order details in view, giving customers a clear point to review before continuing to checkout.",
    video: "/projects/dwaarper/Videos/Cart.mp4",
    poster: "/projects/dwaarper/Cart.png",
  },
  {
    number: "04",
    label: "Checkout",
    title: "A direct path to completion.",
    description: "The checkout flow carries the booking through its final steps, keeping the purchase experience connected to the rest of the marketplace.",
    video: "/projects/dwaarper/Videos/Checkout.mp4",
  },
];

const Reveal = ({ children, className = "" }) => <div className={`projects-reveal ${className}`}>{children}</div>;

function ProjectLink({ href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" data-cursor="interactive" className="group inline-flex items-center gap-5">
      <span className="relative pb-2 text-xs font-medium uppercase tracking-[0.18em] text-text">
        Visit live project
        <span className="absolute bottom-0 left-0 h-px w-full bg-border transition-all duration-500 group-hover:w-0" />
        <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
      </span>

      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted transition-all duration-500 ease-out group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
        <ArrowUpRight size={17} strokeWidth={1.7} />
      </span>
    </a>
  );
}

function VideoStage({ item, onEnded }) {
  const videoRef = useRef(null);
  const stageRef = useRef(null);
  const isVisibleRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        isVisibleRef.current = entry.isIntersecting;
        if (!video) return;

        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!video || !stage) return;
    setPlaying(false);
    video.pause();
    video.currentTime = 0;
    if (isVisibleRef.current) {
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
    gsap.killTweensOf(stage);
    gsap.fromTo(stage, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" });
  }, [item.video]);

  const handleEnded = () => {
    const stage = stageRef.current;
    if (!stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onEnded();
      return;
    }

    gsap.to(stage, { opacity: 0, duration: 0.35, ease: "power2.in", onComplete: onEnded });
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div ref={stageRef} className="relative overflow-hidden rounded-3xl border border-border bg-black shadow-2xl">
      <div className="relative aspect-video overflow-hidden">
        <video key={item.video} ref={videoRef} muted playsInline preload="none" poster={item.poster} onEnded={handleEnded} className="h-full w-full object-cover">
          <source src={item.video} type="video/mp4" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 text-white sm:p-7">
          <div>
            <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/55">
              {item.number} / {item.label}
            </div>
            <h3 className="mt-2 max-w-xl text-[clamp(1.4rem,3vw,2.8rem)] font-light leading-[0.95] tracking-[-0.045em]">{item.title}</h3>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause video" : "Play video"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/25 backdrop-blur-md"
          >
            {playing ? <Pause size={16} strokeWidth={1.8} /> : <Play size={15} fill="currentColor" />}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressysCaseStudy() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".projects-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.fromTo(
        ".progressys-shot",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".progressys-shots",
            start: "top 82%",
            once: true,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const item = progressysMedia[active];
  const advanceVideo = () => setActive((current) => (current + 1) % progressysMedia.length);

  return (
    <article ref={sectionRef}>
      <div className="flex flex-col gap-8">
        <Reveal>
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">02</span>
                <span className="h-px w-7 bg-accent/60" />
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-subtle">Digital experience</span>
              </div>

              <h2 className="mt-7 text-[clamp(3.5rem,7vw,7.5rem)] font-light leading-[0.82] tracking-[-0.075em] text-text">Progressys</h2>
            </div>

            <div className="flex-1 flex flex-col items-end ">
              <div className="mt-8 flex flex-wrap gap-2">
                {["React", "GSAP", "ScrollTrigger", "Matter.js"].map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-3 py-1.5 font-mono text-[12px] uppercase tracking-widest text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-7 text-end text-base leading-7 text-text-muted sm:text-lg">
                An interaction-heavy growth platform where typography, movement and scroll become part of the story.
              </p>

            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <VideoStage item={item} onEnded={advanceVideo} />
          </Reveal>

          <Reveal className="mt-7">
            <p className="max-w-2xl text-base leading-7 text-text-muted sm:text-lg">{item.description}</p>

            <div className="mt-6 border-t border-border">
              {progressysMedia.map((media, index) => {
                const isActive = index === active;

                return (
                  <button
                    key={media.number}
                    type="button"
                    onClick={() => setActive(index)}
                    className="group grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-border py-5 text-left sm:grid-cols-[56px_1fr_auto] sm:py-6"
                  >
                    <span className={`font-mono text-[12px] tracking-[0.16em] ${isActive ? "text-accent" : "text-text-subtle"}`}>{media.number}</span>

                    <span className={`text-[clamp(1.15rem,2vw,1.6rem)] font-light tracking-[-0.035em] ${isActive ? "text-text" : "text-text-muted group-hover:text-text"}`}>
                      {media.label}
                    </span>

                    <ArrowUpRight size={18} strokeWidth={1.5} className={isActive ? "rotate-45 text-accent" : "text-text-subtle"} />
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-9 w-fit">
          <ProjectLink href="https://progressys.onrender.com/" />
        </div>
      </div>
    </article>
  );
}

function DwaarperCaseStudy() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".projects-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const item = dwaarperMedia[active];
  const advanceVideo = () => setActive((current) => (current + 1) % dwaarperMedia.length);

  return (
    <article ref={sectionRef}>
      <div className="flex flex-col gap-8">
        <Reveal>
          <div className="flex gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">01</span>
                <span className="h-px w-7 bg-accent/60" />
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-subtle">Full-stack marketplace</span>
              </div>

              <h2 className="mt-7 text-[clamp(3.5rem,7vw,7.5rem)] font-light leading-[0.82] tracking-[-0.075em] text-text">Dwaarper</h2>
            </div>

            <div className="flex flex-1 flex-col items-end">
              <div className="mt-8 flex flex-wrap justify-end gap-2">
                {["React", "Node.js", "MongoDB", "Stripe"].map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-3 py-1.5 font-mono text-[12px] uppercase tracking-widest text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-7 text-end text-base leading-7 text-text-muted sm:text-lg">
                A service marketplace built from the ground up, connecting discovery, booking, cart and checkout in one consumer experience.
              </p>

            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <VideoStage item={item} onEnded={advanceVideo} />
          </Reveal>

          <Reveal className="mt-7">
            <p className="max-w-2xl text-base leading-7 text-text-muted sm:text-lg">{item.description}</p>

            <div className="mt-6 border-t border-border">
              {dwaarperMedia.map((media, index) => {
                const isActive = index === active;

                return (
                  <button
                    key={media.number}
                    type="button"
                    onClick={() => setActive(index)}
                    className="group grid w-full grid-cols-[42px_1fr_auto] items-center gap-4 border-b border-border py-5 text-left sm:grid-cols-[56px_1fr_auto] sm:py-6"
                  >
                    <span className={`font-mono text-[12px] tracking-[0.16em] ${isActive ? "text-accent" : "text-text-subtle"}`}>{media.number}</span>
                    <span className={`text-[clamp(1.15rem,2vw,1.6rem)] font-light tracking-[-0.035em] ${isActive ? "text-text" : "text-text-muted group-hover:text-text"}`}>
                      {media.label}
                    </span>
                    <ArrowUpRight size={18} strokeWidth={1.5} className={isActive ? "rotate-45 text-accent" : "text-text-subtle"} />
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-9 w-fit">
          <ProjectLink href="https://dwaarper-wow5.onrender.com/" />
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%", once: true },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden bg-bg pt-28 lg:pt-44">
      <div className="mx-auto w-full max-w-portfolio px-5 sm:px-8 lg:px-12">
        <div className="projects-header">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-accent">02</span>
            <span className="h-px w-8 bg-accent/60" />
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-text-subtle">Selected work</span>
          </div>

          <div className="mt-10 max-w-5xl lg:mt-14">
            <h1 className="text-[clamp(3.4rem,8vw,9rem)] font-light leading-[0.82] tracking-[-0.08em] text-text">
              Things I
              <br />
              <span className="text-text-muted">actually built.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-text-muted sm:text-lg">
              Two very different frontend problems — one product, one interaction-heavy digital experience.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:gap-20 mt-12 lg:mt-20">
          <DwaarperCaseStudy />
          <div aria-hidden="true" className="flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="h-2 w-2 rotate-45 border border-accent" />
            <span className="h-px flex-1 bg-border" />
          </div>
          <ProgressysCaseStudy />
        </div>

        <div className="mt-12 border-t border-border pt-7 lg:mt-20">
          <div className="flex items-center justify-between gap-6">
            <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle">More experiments are coming.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
