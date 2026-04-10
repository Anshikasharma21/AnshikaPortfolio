import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export const Button = ({
  children,
  href = "#",
  variant = "primary",
  className = "",
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white shadow-lg shadow-black/40 hover:shadow-black/60",

    outline:
      "border border-[var(--primary)]/50 text-[var(--primary)] hover:text-[var(--text)] backdrop-blur-sm hover:bg-[var(--primary)]/20",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.95 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </motion.a>
  );
};