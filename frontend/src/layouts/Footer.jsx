// src/layouts/Footer.jsx
import { motion } from "framer-motion";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] py-10">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.04 }}
          className="font-black text-lg tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-white">Anshika</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            .dev
          </span>
        </motion.a>

        <p className="text-gray-600 text-xs font-mono">
          © {year} Anshika Sharma · Built with React & Framer Motion
        </p>

        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="text-xs text-gray-600 hover:text-purple-400 transition-colors font-mono flex items-center gap-1"
        >
          Back to top ↑
        </motion.a>

      </div>
    </footer>
  );
};