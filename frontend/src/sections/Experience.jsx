// src/sections/Experience.jsx
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const experiences = [
  {
    role: "Software Developer",
    company: "Digital Advanced Software Pvt. Ltd — Mumbai, India",
    duration: "June 2025 – Present",
    type: "Full Time",
    color: "from-purple-600 to-violet-600",
    points: [
      "Optimized and maintained legacy ERP modules, improving system reliability and maintainability",
      "Reduced API response time by 30% through query optimization, indexing, and backend refactoring",
      "Built and deployed multi-tenant ERP modules using MERN stack for scalable enterprise systems",
      "Implemented JWT authentication and role-based access control (RBAC) for secure applications",
      "Collaborated with cross-functional teams to deliver production-ready features in Agile environment",
    ],
    tech: ["MERN", "Node.js", "Express", "MongoDB", "SQL Server", "JWT"],
  },
  {
    role: "Full Stack Developer (Projects)",
    company: "Freelance / Personal Development",
    duration: "Jan 2025 – Feb 2026",
    type: "Freelance",
    color: "from-indigo-600 to-cyan-600",
    points: [
      "Built multiple full-stack applications including CRUD systems, AI tools, and real-time applications",
      "Developed AI Code Review System using Gemini API for automated code analysis",
      "Created Real-Time Vehicle Tracking System using Socket.io with sub-second latency updates",
      "Designed responsive UI using React, Tailwind CSS, and reusable component architecture",
      "Handled backend API development with Node.js and Express with proper error handling",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind"],
  },
];
export const Experience = () => {
  return (
    <section id="experience" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">

        <motion.div {...fadeUp()} className="mb-16 text-center">
          <span className="section-tag">✦ Experience</span>
          <h2 className="section-heading mt-4">
            My professional <span className="gradient-text">journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 via-violet-500 to-transparent origin-top"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div key={i} {...fadeUp(i * 0.2)}
                className={`relative flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12`}>

                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 top-6 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-purple-500 bg-[#06060f] z-10">
                  <motion.div animate={{ scale: [1,1.6,1], opacity:[0.6,0,0.6] }}
                    transition={{ duration:2, repeat:Infinity }}
                    className="absolute inset-0 rounded-full bg-purple-500" />
                </div>

                {/* Date badge */}
                <div className={`hidden md:flex w-1/2 ${i % 2 === 0 ? "justify-end pr-16" : "justify-start pl-16"} items-start pt-4`}>
                  <span className="text-xs font-mono text-gray-500 tracking-wider">{exp.duration}</span>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-16" : "md:pr-16"}`}>
                  <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-purple-500/40 transition-all duration-300 group overflow-hidden">
                    {/* Card glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`} />

                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-white text-lg" style={{ fontFamily:"'Syne',sans-serif" }}>
                        {exp.role}
                      </h3>
                      <span className="ml-3 shrink-0 px-2 py-0.5 text-[10px] font-mono rounded-full border border-purple-500/40 text-purple-400">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-purple-400 text-sm font-medium mb-1">{exp.company}</p>
                    <p className="text-gray-600 text-xs font-mono mb-4 md:hidden">{exp.duration}</p>

                    <ul className="space-y-2 mb-5">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-400 text-sm leading-relaxed">
                          <span className="text-purple-500 mt-1 shrink-0">▸</span>
                          {pt}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-[11px] font-mono bg-purple-500/10 border border-purple-500/20 rounded-md text-purple-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};