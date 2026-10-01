import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  {
    number: "୦୧",
    label: "Interface",
    line: "The core of my work: fast, responsive React interfaces with clean structure.",
    items: [
      {
        id: "react",
        name: "React.js",
        note: "Component architecture",
        description: "Reusable components and state-driven interfaces, from marketing pages to full product flows.",
        usedFor: "Component systems, interactive interfaces, reusable UI patterns and product flows.",
      },
      {
        id: "javascript",
        name: "JavaScript",
        note: "ES6+ and application logic",
        description: "Async data flows, browser APIs, and the small interactions that make an interface feel considered.",
        usedFor: "Application logic, state behaviour, browser interactions and the logic behind interface motion.",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        note: "Responsive systems",
        description: "Utility-first styling that keeps layouts responsive and design tokens consistent across a build.",
        usedFor: "Responsive layouts, spacing systems, typography, states and maintaining visual consistency.",
      },
      {
        id: "redux",
        name: "Redux",
        note: "Shared state",
        description: "Predictable shared state for larger apps, where component-level state stops being enough.",
        usedFor: "Shared application state when multiple parts of an interface need to work from the same data.",
      },
    ],
  },

  {
    number: "୦୨",
    label: "Motion",
    line: "Animation used to guide attention, not to decorate.",
    items: [
      {
        id: "gsap",
        name: "GSAP",
        note: "Animation systems",
        description: "Sequenced timelines, transitions and interaction timing, built to feel precise rather than busy.",
        usedFor: "Hero animations, interface transitions, micro-interactions and larger storytelling sequences.",
      },
    ],
  },

  {
    number: "୦୩",
    label: "Commerce & Content",
    line: "Enterprise platforms where content and commerce meet the frontend.",
    items: [
      {
        id: "occ",
        name: "Oracle Commerce Cloud",
        note: "Commerce platform",
        description: "Frontend development on Oracle Commerce Cloud storefronts and content-driven commerce pages.",
        usedFor: "Building and maintaining frontend experiences across enterprise commerce environments.",
      },
      {
        id: "tridion",
        name: "SDL Tridion",
        note: "Enterprise CMS",
        description: "Building frontends on top of structured enterprise content managed in SDL Tridion.",
        usedFor: "Connecting structured CMS content with responsive frontend experiences.",
      },
    ],
  },

  {
    number: "୦୪",
    label: "Full-stack",
    line: "The MERN stack, used to take a product from interface to working backend.",
    items: [
      {
        id: "node",
        name: "Node.js",
        note: "Runtime",
        description: "Server-side JavaScript for APIs and application logic, so one language runs the whole project.",
        usedFor: "Backend application logic and services that support frontend applications.",
      },
      {
        id: "express",
        name: "Express",
        note: "API layer",
        description: "Routing and middleware for REST-style services that the frontend can rely on.",
        usedFor: "Building API routes, middleware and backend services.",
      },
      {
        id: "mongodb",
        name: "MongoDB",
        note: "Database",
        description: "Document-based data modelling for MERN applications.",
        usedFor: "Persisting application data and modelling data for MERN applications.",
      },
    ],
  },

  {
    number: "୦୫",
    label: "Workflow",
    line: "How the work gets delivered, tested and kept consistent.",
    items: [
      {
        id: "browser",
        name: "Cross-browser Testing",
        note: "Consistent behaviour",
        description: "Checking behaviour across modern browsers and resolving the differences between them.",
        usedFor: "Making sure interfaces behave consistently across supported browsers.",
      },
      {
        id: "git",
        name: "Git",
        note: "Version control",
        description: "Branching, review and clean history for collaborative development.",
        usedFor: "Version control, feature development and collaborative workflows.",
      },
      {
        id: "jira",
        name: "JIRA",
        note: "Delivery tracking",
        description: "Turning requirements into tracked, deliverable work across projects.",
        usedFor: "Tracking requirements, tasks, bugs and delivery across projects.",
      },
      {
        id: "prompt",
        name: "Prompt Engineering",
        note: "AI-assisted workflow",
        description: "Structuring prompts to speed up development and creative work without lowering the standard.",
        usedFor: "Using AI as part of development, exploration, debugging and creative workflows.",
      },
    ],
  },
];

const ODIA_DIGITS = ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"];



const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Toolkit() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  const [activeId, setActiveId] = useState(null);

  const activeItem = GROUPS.flatMap((group) => group.items).find((item) => item.id === activeId);

  const handleSelect = (item) => {
    setActiveId((current) => (current === item.id ? null : item.id));
  };

  useLayoutEffect(() => {
    if (reduceMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          once: true,
        },
      });

      tl.from("[data-toolkit-eyebrow]", {
        y: 18,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      })
        .from(
          "[data-toolkit-title-line]",
          {
            y: 65,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.35",
        )
        .from(
          "[data-toolkit-intro]",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          "[data-toolkit-group]",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!activeItem || reduceMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-tool-detail]", {
        y: 16,
        opacity: 0,
        duration: 0.45,
        ease: "power3.out",
      });
    }, listRef);

    return () => ctx.revert();
  }, [activeId, activeItem]);

  const toOdiaNumber = (number) =>
  String(number)
    .padStart(2, "0")
    .split("")
    .map((digit) => ODIA_DIGITS[Number(digit)])
    .join("");

  return (
    <section id="toolkit" ref={sectionRef} className="relative overflow-hidden bg-bg py-10 lg:py-20">
      <div className="mx-auto w-full max-w-portfolio px-5 sm:px-8 lg:px-12">
        {/* ==================================================
    SECTION HEADER
================================================== */}

        <div data-toolkit-eyebrow className="flex items-center gap-4">
          <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-accent">04</span>

          <span className="h-px w-8 bg-accent" />

          <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-text">Toolkit</span>
        </div>

        {/* ==================================================
    INTRO
================================================== */}

        <div className="mt-4 grid gap-10 lg:mt-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Supporting copy */}

          <div data-toolkit-intro>
            <p className="max-w-xs hidden sm:block text-sm leading-7 text-text-muted">The technologies, platforms and tools I use to turn ideas into working interfaces.</p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-subtle">Interface · Motion · Systems</span>
            </div>
          </div>

          {/* Main statement */}

          <div>
            <h2 className="max-w-5xl overflow-hidden text-[clamp(3rem,6.5vw,7rem)] font-light leading-[0.9] tracking-[-0.065em] text-text">
              <span data-toolkit-title-line className="block">
                The tools behind
              </span>

              <span data-toolkit-title-line className="block text-text-muted">
                the interface.
              </span>
            </h2>

            <p data-toolkit-intro className="mt-8 hidden sm:block max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
              Technologies I use to design, build and ship, grouped by the part of the product they serve.
            </p>
          </div>
        </div>

        {/* ==================================================
            TOOL INDEX
        ================================================== */}

        <div ref={listRef} className="mt-10 border-t border-border sm:mt-28">
          {GROUPS.map((group) => (
            <div key={group.number} data-toolkit-group className="grid border-b border-border py-10 sm:py-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20 lg:py-14">
              {/* CATEGORY */}

              <div className="mb-8 lg:mb-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[12px] tracking-[0.08em] text-accent">{group.number}</span>

                  <span className="h-px w-8 bg-accent/60" />
                </div>

                <h3 className="mt-4 text-[clamp(1.7rem,3vw,2.8rem)] font-light leading-none tracking-[-0.055em] text-text">{group.label}</h3>

                <p className="mt-5 max-w-sm text-[15px] leading-[1.6] text-text-muted">{group.line}</p>
              </div>

              {/* TOOLS */}

              <div>
                {group.items.map((item, index) => {
                  const isActive = activeId === item.id;

                  return (
                    <div key={item.id} className={`border-b border-border last:border-b-0 ${isActive ? "pb-5" : ""}`}>
                      <button
                        type="button"
                        onClick={() => handleSelect(item)}
                        aria-expanded={isActive}
                        className="group flex w-full items-center gap-4 py-5 text-left outline-none sm:py-6"
                      >
                        {/* NUMBER */}

                        <span className={`w-8 shrink-0 font-mono text-[12px] transition-colors duration-300 ${isActive ? "text-accent" : "text-text-subtle"}`}>
                           {toOdiaNumber(index + 1)}
                        </span>

                        {/* TOOL NAME */}

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-[clamp(1.55rem,3vw,2.7rem)] font-light leading-none tracking-tighter transition-all duration-300 ${
                              isActive ? "translate-x-2 text-text" : "text-text-muted group-hover:translate-x-1 group-hover:text-text"
                            }`}
                          >
                            {item.name}
                          </span>

                          <span className={`mt-2 block text-[14px] transition-colors duration-300 ${isActive ? "text-accent" : "text-text-subtle group-hover:text-text-muted"}`}>
                            {item.note}
                          </span>
                        </span>

                        {/* ACTIVE INDICATOR */}

                        <span className={`relative flex h-7 w-7 shrink-0 items-center justify-center transition-transform duration-500 ${isActive ? "rotate-45" : ""}`}>
                          <span className={`absolute h-px w-4 transition-colors duration-300 ${isActive ? "bg-accent" : "bg-text-subtle group-hover:bg-text"}`} />

                          <span className={`absolute h-4 w-px transition-colors duration-300 ${isActive ? "bg-accent" : "bg-text-subtle group-hover:bg-text"}`} />
                        </span>
                      </button>

                      {/* ==================================================
                          DETAIL
                      ================================================== */}

                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                      >
                        <div className="overflow-hidden">
                          <div data-tool-detail className="ml-12 max-w-2xl pb-5 sm:ml-12 sm:pb-7">
                            <p className="text-[16px] font-light leading-[1.6] text-text-muted">{item.description}</p>

                            <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                              <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-text-subtle">Used for</span>

                              <span className="text-[14px] leading-relaxed text-text-muted">{item.usedFor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
