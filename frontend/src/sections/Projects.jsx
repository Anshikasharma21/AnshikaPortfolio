// src/sections/Projects.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const projects = [
  {
    title: "DevConnect",
    desc: "A full-stack social platform for developers with real-time chat and collaboration features.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io", "JWT"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-purple-600/20 to-violet-600/10",
    border: "border-purple-500/20",
    badge: "Full Stack",
  },
  {
    title: "ShopEase",
    desc: "Modern e-commerce platform with Stripe payments, authentication, and admin dashboard.",
    tech: ["React", "Express", "MongoDB", "Stripe", "Tailwind"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-indigo-600/20 to-cyan-600/10",
    border: "border-indigo-500/20",
    badge: "E-Commerce",
  },
  {
    title: "TaskFlow",
    desc: "Kanban project management tool with drag-and-drop and analytics dashboard.",
    tech: ["React", "Node.js", "MongoDB", "DnD Kit"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-violet-600/20 to-pink-600/10",
    border: "border-violet-500/20",
    badge: "Productivity",
  },
  {
    title: "WeatherPulse",
    desc: "Real-time weather app with forecast and location detection.",
    tech: ["React", "API", "Recharts", "Tailwind"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-cyan-600/20 to-blue-600/10",
    border: "border-cyan-500/20",
    badge: "API App",
  },
  {
    title: "CodeBlog",
    desc: "Markdown-based blog platform with admin dashboard and search.",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-emerald-600/20 to-teal-600/10",
    border: "border-emerald-500/20",
    badge: "Blog",
  },

  // ✅ YOUR REAL PROJECTS ADDED

  {
    title: "Full Stack CRUD Web App",
    desc: "Built a full-stack CRUD system with REST APIs, responsive UI, and reusable components.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-pink-600/20 to-purple-600/10",
    border: "border-pink-500/20",
    badge: "Full Stack",
  },
  {
    title: "AI Code Review System",
    desc: "AI-powered platform using Gemini API for code analysis and performance feedback.",
    tech: ["React", "Node.js", "Express", "Gemini API"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-orange-600/20 to-red-600/10",
    border: "border-orange-500/20",
    badge: "API App",
  },
  {
    title: "Real-Time Vehicle Tracking System",
    desc: "Live tracking system using Socket.IO with real-time synchronization across clients.",
    tech: ["Node.js", "Express", "MongoDB", "Socket.IO"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-green-600/20 to-emerald-600/10",
    border: "border-green-500/20",
    badge: "Full Stack",
  },

  {
    title: "Anshika Sharma Portfolio",
    desc: "Personal portfolio built with React, Tailwind, and Framer Motion showcasing projects & experience.",
    tech: ["React", "Framer Motion", "Tailwind", "Vite"],
    github: "https://github.com/Anshikasharma21",
    live: "#",
    gradient: "from-sky-600/20 to-indigo-600/10",
    border: "border-sky-500/20",
    badge: "Portfolio",
  },
];

const filters = [
  "All",
  "Full Stack",
  "E-Commerce",
  "Productivity",
  "API App",
  "Blog",
  "Portfolio",
];

export const Projects = () => {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.badge === active);

  return (
    <section id="projects" className="py-28 max-w-6xl mx-auto px-6">
      <motion.div {...fadeUp()} className="mb-12 text-center">
        <span className="section-tag">✦ Projects</span>
        <h2 className="section-heading mt-4">
          Things I've <span className="gradient-text">built</span>
        </h2>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          A selection of projects that showcase my full-stack development skills.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div {...fadeUp(0.1)} className="flex flex-wrap justify-center gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all ${
              active === f
                ? "bg-purple-600 border-purple-500 text-white"
                : "border-white/10 text-gray-500 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Cards */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${p.gradient} border ${p.border} group flex flex-col`}
            >
              <h3 className="font-bold text-white text-lg">{p.title}</h3>

              <p className="text-gray-400 text-sm mt-2 flex-1">{p.desc}</p>

              <div className="flex flex-wrap gap-1.5 my-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[11px] font-mono bg-white/5 border border-white/10 rounded-md text-gray-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-400 hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-gray-400 hover:text-purple-300"
                >
                  Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};