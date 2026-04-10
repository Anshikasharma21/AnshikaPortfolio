// src/sections/About.jsx
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const skills = [
  { cat: "Frontend", items: ["React.js", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "JavaScript"] },
  { cat: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Socket.io"] },
  { cat: "Database", items: ["MongoDB", "Mongoose", "Firebase"] },
  { cat: "Tools", items: ["Git", "GitHub", "VS Code", "Postman", "Figma", "Vite"] },
];

const stats = [
  { value: "1+", label: "Year Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "Technologies" },
  { value: "∞", label: "Coffee Cups" },
];

export const About = () => {
  return (
    <section id="about" className="py-28 max-w-6xl mx-auto px-6">

      {/* Header */}
      <motion.div {...fadeUp()} className="mb-16 text-center">
        <span className="section-tag">✦ About Me</span>
        <h2 className="section-heading mt-4">
          The person behind <span className="gradient-text">the code</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* Left — bio + stats */}
        <div>
          <motion.p {...fadeUp(0.1)} className="text-gray-400 leading-relaxed text-lg mb-6">
            I'm a <span className="text-white font-semibold">Full Stack Developer</span> with 1+ year of experience
            building scalable, production-ready MERN applications. I thrive at the intersection of
            clean architecture and delightful user experience.
          </motion.p>
          <motion.p {...fadeUp(0.2)} className="text-gray-500 leading-relaxed mb-10">
            Based in <span className="text-purple-300">Mumbai, India</span>, I love crafting interfaces
            that feel alive — smooth animations, thoughtful micro-interactions, and code that's a pleasure
            to read. When not coding, I'm exploring new frameworks or sketching out design ideas.
          </motion.p>

          {/* Stats */}
          <motion.div {...fadeUp(0.3)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] text-center hover:border-purple-500/40 transition-colors group">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:scale-110 transition-transform inline-block"
                  style={{ fontFamily:"'Syne',sans-serif" }}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — skills grid */}
        <div className="space-y-6">
          {skills.map((group, gi) => (
            <motion.div key={group.cat} {...fadeUp(0.15 + gi * 0.1)}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">{group.cat}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.span key={item}
                    whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.6)" }}
                    className="px-3 py-1.5 text-sm bg-white/[0.03] border border-white/[0.08] rounded-lg text-gray-300 hover:text-white transition-all cursor-default">
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};