import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ─── Theme Definitions ────────────────────────────────────────────────────────
// Each theme sets CSS variables that cascade globally across your entire app.
// To add your own theme, just duplicate one entry and tweak the hex values.
const THEMES = [
  {
    id: "purple",
    label: "Purple",
    swatch: "#a78bfa",
    vars: {
      "--primary":    "#a78bfa",
      "--secondary":  "#7c3aed",
      "--bg":         "#0d0d14",
      "--bg-soft":    "#13131f",
      "--bg-card":    "#1a1a2e",
      "--text":       "#f1f0ff",
      "--text-muted": "#9b97c4",
      "--border":     "#2e2b52",
      "--glow":       "rgba(167,139,250,0.25)",
    },
  },
  {
    id: "green",
    label: "Green",
    swatch: "#34d399",
    vars: {
      "--primary":    "#34d399",
      "--secondary":  "#059669",
      "--bg":         "#090f0d",
      "--bg-soft":    "#0f1a16",
      "--bg-card":    "#142318",
      "--text":       "#edfaf4",
      "--text-muted": "#6bab8a",
      "--border":     "#1e3d2c",
      "--glow":       "rgba(52,211,153,0.22)",
    },
  },
  {
    id: "orange",
    label: "Orange",
    swatch: "#fb923c",
    vars: {
      "--primary":    "#fb923c",
      "--secondary":  "#ea580c",
      "--bg":         "#110d09",
      "--bg-soft":    "#1c1208",
      "--bg-card":    "#271a0f",
      "--text":       "#fff5eb",
      "--text-muted": "#b07d55",
      "--border":     "#3d2410",
      "--glow":       "rgba(251,146,60,0.22)",
    },
  },
  {
    id: "pink",
    label: "Pink",
    swatch: "#f472b6",
    vars: {
      "--primary":    "#f472b6",
      "--secondary":  "#db2777",
      "--bg":         "#120a10",
      "--bg-soft":    "#1d0f1a",
      "--bg-card":    "#281525",
      "--text":       "#fff0f8",
      "--text-muted": "#b07090",
      "--border":     "#3d1533",
      "--glow":       "rgba(244,114,182,0.22)",
    },
  },
  {
    id: "cyan",
    label: "Cyan",
    swatch: "#22d3ee",
    vars: {
      "--primary":    "#22d3ee",
      "--secondary":  "#0891b2",
      "--bg":         "#080f12",
      "--bg-soft":    "#0c1820",
      "--bg-card":    "#112230",
      "--text":       "#e8faff",
      "--text-muted": "#5b9bb0",
      "--border":     "#0f3347",
      "--glow":       "rgba(34,211,238,0.22)",
    },
  },
  {
    id: "red",
    label: "Red",
    swatch: "#f87171",
    vars: {
      "--primary":    "#f87171",
      "--secondary":  "#dc2626",
      "--bg":         "#120808",
      "--bg-soft":    "#1f0c0c",
      "--bg-card":    "#2a1010",
      "--text":       "#fff5f5",
      "--text-muted": "#b07070",
      "--border":     "#3f1111",
      "--glow":       "rgba(248,113,113,0.22)",
    },
  },
];

// ─── Apply theme variables to :root globally ──────────────────────────────────
function applyTheme(theme) {
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
  // Persist choice so it survives page reload
  localStorage.setItem("portfolio-theme", theme.id);
}

// ─── Theme Switcher Component ─────────────────────────────────────────────────
const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("purple");
  const ref = useRef(null);

  // On mount: restore saved theme or apply default
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    const initial = THEMES.find((t) => t.id === saved) || THEMES[0];
    setActiveId(initial.id);
    applyTheme(initial);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (theme) => {
    setActiveId(theme.id);
    applyTheme(theme);
    setOpen(false);
  };

  const active = THEMES.find((t) => t.id === activeId);

  return (
    <div ref={ref} className="relative hidden md:block">
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        title="Change theme"
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors duration-200 bg-white/5 backdrop-blur-md"
      >
        {/* Active swatch */}
        <span
          className="block w-4 h-4 rounded-full ring-2 ring-white/20 transition-colors duration-300"
          style={{ background: active?.swatch }}
        />
        {/* All swatches mini-row */}
        <span className="flex items-center gap-1">
          {THEMES.map((t) => (
            <span
              key={t.id}
              className="block w-2 h-2 rounded-full transition-all duration-200"
              style={{
                background: t.swatch,
                opacity: t.id === activeId ? 1 : 0.35,
                transform: t.id === activeId ? "scale(1.25)" : "scale(1)",
              }}
            />
          ))}
        </span>
        {/* Chevron */}
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className="text-white/40"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/10 bg-[color:var(--bg-soft)]/95 backdrop-blur-xl shadow-2xl overflow-hidden z-[100]"
          >
            <div className="p-2 space-y-0.5">
              {THEMES.map((theme) => {
                const isActive = theme.id === activeId;
                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleSelect(theme)}
                    whileHover={{ x: 2 }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-white/10 text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text)]"
                    }`}
                  >
                    {/* Swatch */}
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full ring-1 transition-all duration-200"
                      style={{
                        background: theme.swatch,
                        boxShadow: isActive ? `0 0 10px ${theme.swatch}88` : "none",
                        ringColor: isActive ? theme.swatch : "transparent",
                      }}
                    />
                    {theme.label}
                    {isActive && (
                      <motion.span
                        layoutId="theme-check"
                        className="ml-auto text-[var(--primary)]"
                        style={{ fontSize: 14 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-white/5">
              <p className="text-[10px] text-[var(--text-muted)] opacity-60 text-center">
                Changes apply globally
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Mobile Theme Row ─────────────────────────────────────────────────────────
const MobileThemeSwitcher = () => {
  const [activeId, setActiveId] = useState("purple");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) setActiveId(saved);
  }, []);

  const handleSelect = (theme) => {
    setActiveId(theme.id);
    applyTheme(theme);
  };

  return (
    <li className="pt-4 pb-1">
      <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-widest opacity-60">
        Theme
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {THEMES.map((theme) => {
          const isActive = theme.id === activeId;
          return (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme)}
              title={theme.label}
              className="flex flex-col items-center gap-1.5 group"
            >
              <span
                className="block w-8 h-8 rounded-full transition-all duration-200"
                style={{
                  background: theme.swatch,
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                  boxShadow: isActive ? `0 0 12px ${theme.swatch}99` : "none",
                  outline: isActive ? `2px solid ${theme.swatch}` : "2px solid transparent",
                  outlineOffset: "2px",
                }}
              />
              <span
                className="text-[10px] transition-colors duration-200"
                style={{ color: isActive ? "var(--primary)" : "var(--text-muted)" }}
              >
                {theme.label}
              </span>
            </button>
          );
        })}
      </div>
    </li>
  );
};



// ─── Main Navbar ──────────────────────────────────────────────────────────────
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[color:var(--bg)]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <motion.a
          href="#"
          className="font-syne font-black text-xl tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-[var(--text)]">Anshika</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
            .dev
          </span>
        </motion.a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l, i) => (
            <motion.li
              key={l.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <a
                href={l.href}
                onClick={() => setActive(l.label)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 group ${
                  active === l.label
                    ? "text-[var(--primary)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {l.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-px bg-[var(--primary)] transition-all duration-300 rounded-full" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Desktop right cluster */}
        <div className="hidden md:flex items-center gap-3">
          {/* Resume */}
          <motion.a
            href="/Anshika_Sharma_Resume.pdf"
            download="Anshika_Sharma_Resume.pdf"
            className="flex items-center gap-2 px-5 py-2 text-sm font-semibold border border-[var(--primary)]/50 rounded-lg text-[var(--primary)] hover:text-white hover:bg-[var(--primary)]/20 hover:border-[var(--primary)] transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Resume ↗
          </motion.a>

          {/* ✦ Theme Switcher */}
          <ThemeSwitcher />
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-6 h-px bg-white"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-6 h-px bg-white"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-6 h-px bg-white"
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[color:var(--bg-soft)]/95 backdrop-blur-xl border-t border-white/5"
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-[var(--text-muted)] hover:text-[var(--primary)] font-medium border-b border-white/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}

          {/* Mobile Resume */}
          <li className="pt-3">
            <a
              href="/Anshika_Sharma_Resume.pdf"
              download="Anshika_Sharma_Resume.pdf"
              className="block text-center py-2.5 border border-[var(--primary)]/50 rounded-lg text-[var(--primary)] text-sm font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Resume ↗
            </a>
          </li>

          {/* ✦ Mobile Theme Switcher */}
          <MobileThemeSwitcher />
        </ul>
      </motion.div>
    </motion.header>
  );
};