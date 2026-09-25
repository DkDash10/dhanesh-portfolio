import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "portfolio-theme";
const THEME_EVENT = "portfolio-theme-change";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);

  window.dispatchEvent(
    new CustomEvent(THEME_EVENT, {
      detail: theme,
    }),
  );
}

export default function ToogleTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleThemeChange = (event) => {
      if (event.detail === "light" || event.detail === "dark") {
        setTheme(event.detail);
      }
    };

    window.addEventListener(THEME_EVENT, handleThemeChange);

    return () => {
      window.removeEventListener(THEME_EVENT, handleThemeChange);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    /*
     * Chrome/Edge/Safari support View Transitions.
     * This makes the actual theme change feel like
     * one continuous transition instead of an instant swap.
     */
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(nextTheme);
      });
    } else {
      setTheme(nextTheme);

      // Fallback animation hook
      document.documentElement.classList.add("theme-transition");

      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 450);
    }
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      onClick={toggleTheme}
      data-cursor="interactive"
      className="group relative flex h-8 w-15.5 shrink-0 items-center rounded-full border border-border bg-bg/60 p-1 transition-[border-color,background-color] duration-300 hover:border-text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      {/* Sun */}

      <span
        className="absolute left-1.75 flex items-center justify-center text-text-muted transition-all duration-300"
      >
        <Sun size={12} strokeWidth={1.8} />
      </span>

      {/* Moon */}

      <span
        className="absolute right-1.75 flex items-center justify-center text-text-muted transition-all duration-300"
      >
        <Moon size={12} strokeWidth={1.8} />
      </span>

      {/* Moving thumb */}

      <span
        className={` relative z-10 h-6 w-6 rounded-full bg-text shadow-[0_2px_10px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isLight ? "translate-x-6.25" : "translate-x-0"} `}
      />
    </button>
  );
}
