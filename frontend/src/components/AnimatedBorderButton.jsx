import { motion } from "framer-motion";

export const AnimatedBorderButton = ({ children, href = "#", className = "" }) => {
  return (
    <a href={href} className={`relative inline-block group ${className}`}>
      {/* Rotating gradient border */}
      <span className="absolute -inset-[1.5px] rounded-xl overflow-hidden">
        <motion.span
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, var(--primary) 25%, var(--secondary) 50%, var(--primary) 75%, transparent 100%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </span>

      {/* Button inner */}
      <span className="relative flex items-center gap-2 px-7 py-3.5 bg-[color:var(--bg-soft)] rounded-xl text-sm font-semibold text-[var(--primary)] group-hover:text-[var(--text)] transition-colors duration-300 z-10">
        {children}
      </span>
    </a>
  );
};