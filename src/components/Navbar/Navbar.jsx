import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ToogleTheme from "../ToogleTheme/ToggleTheme";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Lab", href: "#motion-lab" },
  {label: "Toolkit", href: "#toolkit"}
];

function Signature() {
  return (
    <a href="#top" aria-label="Dhanesh - Home" className="group relative inline-flex items-center">
      <span className="signature relative font-signature text-4xl font-medium leading-none text-text">
        <span className="signature-base">Dhanesh</span>

        <span aria-hidden="true" className="signature-glitch signature-glitch-accent">
          Dhanesh
        </span>

        <span aria-hidden="true" className="signature-glitch signature-glitch-text">
          Dhanesh
        </span>
      </span>
    </a>
  );
}

/* =========================================================
   GLITCH LINK
========================================================= */

function GlitchLink({ item }) {
  return (
    <a
      href={item.href}
      className="nav-glitch-link group relative inline-flex items-center py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 hover:text-text"
    >
      <span className="nav-glitch-text relative" data-text={item.label}>
        {item.label}
      </span>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
      />
    </a>
  );
}

/* =========================================================
   RESUME GLITCH LINK
========================================================= */

function ResumeLink() {
  return (
    <a
      href="/resume/Dhanesh-Dash-Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="interactive"
      className="nav-glitch-link group relative inline-flex items-center gap-1.5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-text"
    >
      <span className="nav-glitch-text relative" data-text="Resume">
        Resume
      </span>

      <ArrowUpRight
        size={13}
        strokeWidth={1.5}
        className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100"
      />
    </a>
  );
}

/* =========================================================
   MOBILE MENU BUTTON
========================================================= */

function MenuButton({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative flex h-10 w-10 items-center justify-center text-text md:hidden"
    >
      <span className="relative h-5 w-6">
        <span
          className={` absolute right-0 top-1/2 h-px w-6 origin-center bg-text transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "rotate-45" : "-translate-y-1"} `}
        />

        <span
          className={` absolute right-0 top-1/2 h-px bg-accent transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${open ? "-rotate-45 w-6" : "w-4 translate-y-1"} `}
        />
      </span>
    </button>
  );
}

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const hidePoint = window.innerHeight * 0.7;

      // Always show navbar near the top
      if (currentScrollY <= 40) {
        setScrolled(false);
        setNavVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // Navbar has entered floating mode
      setScrolled(true);

      // Scrolling down past 70vh -> hide
      if (currentScrollY > lastScrollY && currentScrollY > hidePoint) {
        setNavVisible(false);
      }

      // ANY upward movement -> show
      if (currentScrollY < lastScrollY) {
        setNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / MOBILE NAV
      ===================================================== */}

      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8"
      >
        <nav
          className={` pointer-events-auto mx-auto flex h-17 w-full max-w-340 items-center justify-between px-4 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-6 lg:h-18 lg:px-7 ${
      scrolled
        ? ` rounded-[18px] border border-border bg-linear-to-r from-bg/92 via-surface/88 to-bg/92 shadow-[0_18px_55px_rgba(0,0,0,0.12)] `
        : ` rounded-none border-transparent bg-transparent shadow-none backdrop-blur-0 `
    } ${navVisible ? "translate-y-0 opacity-100" : "translate-y-[-120%] opacity-0 scale-[0.98]"} `}
        >
          {/* Signature */}

          <Signature />

          {/* =================================================
              DESKTOP
          ================================================= */}

          <div className="hidden items-center md:flex">
            <div className="flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => (
                <GlitchLink key={item.label} item={item} />
              ))}
            </div>

            <span className="mx-6 h-5 w-px bg-border-light" />

            <div className="flex items-center gap-6">
              {/* Actual theme switch */}
              <ToogleTheme />

              {/* Resume ALSO has glitch */}
              <ResumeLink />
            </div>
          </div>

          {/* =================================================
              MOBILE
          ================================================= */}

          <MenuButton open={menuOpen} onClick={() => setMenuOpen((value) => !value)} />
        </nav>
      </header>

      {/* =====================================================
          MOBILE GLASS MENU
      ===================================================== */}

      <div
        className={` fixed inset-0 z-40 bg-bg/60 backdrop-blur-xl transition-all duration-500 md:hidden ${menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"} `}
      >
        <div
          className="absolute inset-x-3 bottom-3 top-3 flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/75 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-3xl sm:inset-x-5 sm:bottom-5 sm:top-5"
        >
          {/* =================================================
              MOBILE MENU HEADER
          ================================================= */}

          <div
            className="flex h-18 shrink-0 items-center justify-between border-b border-border-light px-5 sm:px-7"
          >
            <Signature />

            <div className="flex items-center gap-2">
              {/* THEME SWITCH IS HERE ON MOBILE */}

              <MenuButton open={menuOpen} onClick={closeMenu} />
            </div>
          </div>

          {/* =================================================
              MOBILE CONTENT
          ================================================= */}

          <div className="flex flex-1 flex-col px-5 pb-7 sm:px-8">
            <div
              className={` flex items-center gap-3 pt-8 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} `}
            >
              <div></div>
              <span className="h-px w-8 bg-accent" />
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-subtle">Navigation</span>

                <ToogleTheme />
              </div>
            </div>

            {/* Links */}

            <div className="mt-6 flex flex-col">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    transitionDelay: menuOpen ? `${100 + index * 70}ms` : "0ms",
                  }}
                  className={` nav-glitch-link group flex items-center justify-between border-b border-border-light py-5 transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} `}
                >
                  <span
                    className="nav-glitch-text text-[clamp(2.4rem,11vw,4rem)] font-light leading-none tracking-[-0.04em] text-text"
                    data-text={item.label}
                  >
                    {item.label}
                  </span>

                  <span className="font-mono text-[9px] tracking-[0.15em] text-text-subtle">0{index + 1}</span>
                </a>
              ))}
            </div>

            {/* Bottom */}

            <div className="mt-auto">
              <a
                href="/resume/Dhanesh-Dash-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className={` group inline-flex items-center gap-2 border-b border-border pb-2 text-[11px] uppercase tracking-[0.18em] text-text transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} `}
                style={{
                  transitionDelay: menuOpen ? "320ms" : "0ms",
                }}
              >
                Download Resume
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <p
                className={` mt-5 max-w-70 text-xs leading-relaxed text-text-subtle transition-all duration-500 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} `}
                style={{
                  transitionDelay: menuOpen ? "400ms" : "0ms",
                }}
              >
                Frontend developer crafting interactive digital experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
