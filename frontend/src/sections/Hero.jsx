// src/sections/Hero.jsx
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// --- Floating Particle ---
const Particle = ({ x, y, size, duration, delay, color }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.6, 0],
      scale: [0, 1, 0],
      y: [0, -120, -240],
      x: [0, Math.random() > 0.5 ? 40 : -40, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// --- Typewriter Hook ---
const useTypewriter = (words, speed = 80, pause = 1800) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDeleting(false);
            setWordIndex((i) => i + 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
};

// --- Magnetic Button ---
const MagneticButton = ({ children, className, href }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
};

// --- Glitch Text ---
const GlitchName = ({ name }) => (
  <div className="relative inline-block group">
    <span className="relative z-10 text-white">{name}</span>
    <motion.span
      className="absolute inset-0 text-purple-400 z-0"
      animate={{ x: [-2, 2, -1, 1, 0], opacity: [0, 0.7, 0] }}
      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4 }}
      aria-hidden
    >
      {name}
    </motion.span>
    <motion.span
      className="absolute inset-0 text-cyan-400 z-0"
      animate={{ x: [2, -2, 1, -1, 0], opacity: [0, 0.5, 0] }}
      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4, delay: 0.05 }}
      aria-hidden
    >
      {name}
    </motion.span>
  </div>
);

// --- Animated Stat Pill ---
const StatPill = ({ label, delay }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-full text-gray-400 backdrop-blur-sm"
  >
    {label}
  </motion.span>
);

// --- Main Hero ---
export const Hero = () => {
  const roles = [
    "Full Stack Developer",
    "MERN Stack Engineer",
    "React Enthusiast",
    "Node.js Developer",
  ];
  const role = useTypewriter(roles, 75, 2000);

  // Cursor orb
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const orbX = useSpring(cursorX, { stiffness: 60, damping: 20 });
  const orbY = useSpring(cursorY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 200);
      cursorY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  // Generate particles
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 4 + 4,
    delay: Math.random() * 6,
    color: i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#6366f1" : "#22d3ee",
  }));

  // Scroll progress for parallax
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden bg-[#070711]">

      {/* ── Grid Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      />

      {/* ── Cursor Orb ── */}
      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          x: orbX,
          y: orbY,
          background:
            "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)",
        }}
      />

      {/* ── Static Glows ── */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-700 blur-[160px] opacity-15 rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600 blur-[120px] opacity-10 rounded-full pointer-events-none" />

      {/* ── Floating Particles ── */}
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 backdrop-blur-md text-purple-300 text-xs font-mono tracking-widest uppercase"
        >
          ✦ Available for opportunities
        </motion.div>

        {/* Name with glitch */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-4"
          style={{ fontFamily: "'Syne', 'Space Grotesk', sans-serif" }}
        >
          <GlitchName name="Anshika" />
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
            Sharma
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 font-mono mb-2 h-8"
        >
          <span className="text-purple-400">&gt; </span>
          {role}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-5 bg-purple-400 ml-1 align-middle"
          />
        </motion.div>

        {/* Location + contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-500 text-sm mt-1 mb-6 font-mono"
        >
          📍 Mumbai, India &nbsp;•&nbsp; anshikasharma5697@gmail.com
        </motion.p>

        {/* Stat pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {["1+ yr exp", "MERN Stack", "React", "Node.js", "MongoDB"].map(
            (tag, i) => (
              <StatPill key={tag} label={tag} delay={1 + i * 0.1} />
            )
          )}
        </motion.div>

        {/* Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 150 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <MagneticButton
            href="#projects"
            className="relative px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>

          <MagneticButton
            href="#contact"
            className="relative px-8 py-3.5 border border-purple-500/50 rounded-xl font-semibold text-purple-300 hover:text-white backdrop-blur-sm overflow-hidden group cursor-pointer"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-purple-500 to-transparent"
        />
      </motion.div>

      {/* ── Corner decorations ── */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-purple-500/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-purple-500/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-purple-500/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-purple-500/30" />
    </section>
  );
};