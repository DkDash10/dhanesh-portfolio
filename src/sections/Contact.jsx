import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const links = [
  {
    label: "Email",
    value: "dhaneshdash11@gmail.com",
    href: "mailto:dhaneshdash11@gmail.com",
    copyValue: "dhaneshdash11@gmail.com",
    description: "Start a conversation",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "",
    href: "https://www.linkedin.com/in/dhanesh-09854922a",
    copyValue: "https://www.linkedin.com/in/dhanesh-09854922a",
    description: "Professional",
    external: true,
  },
  {
    label: "GitHub",
    value: "",
    href: "https://github.com/DkDash10",
    copyValue: "https://github.com/DkDash10",
    description: "Code & experiments",
    external: true,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/resume/Dhanesh_Frontend_Developer_Resume.pdf",
    description: "Background",
    external: false,
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const emailRef = useRef(null);
  const [copied, setCopied] = useState(null);

  const ODIA_DIGITS = ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"];

  const toOdiaNumber = (number) =>
    String(number)
      .padStart(2, "0")
      .split("")
      .map((digit) => ODIA_DIGITS[Number(digit)])
      .join("");

  const handleCopy = async (value, label) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);

      setTimeout(() => {
        setCopied(null);
      }, 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  useLayoutEffect(() => {
    if (reduceMotion()) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray("[data-contact-reveal]");

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-contact-title]",
        {
          opacity: 0,
          y: 70,
          clipPath: "inset(0 0 20% 0)",
        },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-contact-title]",
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-contact-rule]",
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: "[data-contact-rule]",
            start: "top 88%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEmailEnter = () => {
    if (reduceMotion()) return;

    gsap.to(emailRef.current, {
      x: 8,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleEmailLeave = () => {
    if (reduceMotion()) return;

    gsap.to(emailRef.current, {
      x: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden bg-bg">
      <div className="mx-auto w-full max-w-portfolio px-5 pb-6 sm:px-8  lg:px-12 pt-10 lg:pt-20">
        {/* =================================================
            SECTION HEADER
        ================================================= */}

        <div data-contact-reveal className="flex items-center gap-4">
          <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-accent">05</span>

          <span className="h-px w-8 bg-accent" />

          <span className="font-mono text-base sm:text-lg uppercase tracking-[0.18em] text-text">Let's talk</span>
        </div>

        {/* =================================================
            INTRO
        ================================================= */}

        <div className="mt-4 grid gap-10 lg:mt-20 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          {/* Supporting copy */}

          <div data-contact-reveal>
            <p className="max-w-xs hidden sm:block text-sm leading-7 text-text-muted">Have a product, interface or idea that needs a frontend with personality?</p>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-subtle">Available for interesting work</span>
            </div>
          </div>

          {/* Main statement */}

          <div>
            <h2 data-contact-title className="text-[clamp(2.8rem,6vw,6.8rem)] font-light leading-[0.88] tracking-[-0.065em] text-text">
              Let's build something
              <br />
              <span className="text-text-muted leading-[1.1]">worth remembering.</span>
            </h2>

            <p data-contact-reveal className="mt-8 hidden sm:block max-w-2xl text-base leading-8 text-text-muted sm:mt-10 sm:text-lg">
              If you're working on something interesting, I'd love to hear about it. Tell me what you're building, what you're trying to solve, or simply where you think I could
              help.
            </p>
          </div>
        </div>

        {/* =================================================
                CONTACT LINKS
            ================================================= */}

        <div data-contact-reveal className="mt-16 border-t border-border sm:mt-20">
          {links.map((link, index) => (
            <div key={link.label} className="group relative border-b border-border">
              <a
                ref={link.label === "Email" ? emailRef : undefined}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                onMouseEnter={link.label === "Email" ? handleEmailEnter : undefined}
                onMouseLeave={link.label === "Email" ? handleEmailLeave : undefined}
                className="flex items-center justify-between py-5 sm:py-6"
              >
                <div className="flex min-w-0 items-center gap-5 sm:gap-8">
                  <span className="font-mono text-[12px] tracking-[0.08em] text-text-subtle transition-colors duration-300 group-hover:text-accent">
                    {toOdiaNumber(index + 1)}
                  </span>

                  <div className="min-w-0">
                    <span className="block text-[clamp(1.25rem,2.5vw,1.8rem)] font-light tracking-[-0.035em] text-text-muted transition-transform duration-500 group-hover:translate-x-2 group-hover:text-text">
                      {link.label}
                    </span>

                    <span className="mt-1 block truncate font-mono text-[12px] tracking-[0.03em] text-text-subtle sm:text-sm">{link.value}</span>
                  </div>
                </div>

                <div className="ml-5 flex shrink-0 items-center gap-3">
                  {link.copyValue && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleCopy(link.copyValue, link.label);
                      }}
                      className="hidden font-mono text-[12px] uppercase tracking-[0.12em] text-text-subtle transition-colors duration-300 hover:text-accent sm:block"
                    >
                      {copied === link.label ? "Copied" : "Copy"}
                    </button>
                  )}

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-subtle transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                    <ArrowUpRight size={16} strokeWidth={1.4} />
                  </span>
                </div>
              </a>

              <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        {/* =================================================
            FOOTER META
        ================================================= */}

        <div data-contact-reveal className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-text-subtle">Frontend · Motion · Interfaces</span>
        </div>
      </div>
    </section>
  );
}
