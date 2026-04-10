// src/sections/Testimonials.jsx
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const testimonials = [
  {
    name: "Rahul Mehta",
    role: "CTO, TechCorp Solutions",
    avatar: "RM",
    color: "from-purple-600 to-violet-600",
    text: "Anshika joined us as an intern and immediately started contributing like a senior developer. Her ability to pick up new technologies, write clean code, and communicate effectively made her an invaluable part of our team. The MERN application she built is still running flawlessly in production.",
    stars: 5,
  },
  {
    name: "Priya Kapoor",
    role: "Product Manager, StartupXYZ",
    avatar: "PK",
    color: "from-indigo-600 to-cyan-600",
    text: "Working with Anshika on our e-commerce platform was a fantastic experience. She has a rare combination of technical depth and an eye for design. She delivered the project ahead of schedule with features we didn't even ask for. Highly recommend her!",
    stars: 5,
  },
  {
    name: "Arjun Singh",
    role: "Freelance Client",
    avatar: "AS",
    color: "from-violet-600 to-pink-600",
    text: "Anshika built my business website and I couldn't be happier. The animations are smooth, the site loads instantly, and she was incredibly responsive throughout. She transformed my rough idea into something I'm genuinely proud to show customers.",
    stars: 5,
  },
  {
    name: "Neha Joshi",
    role: "Lead Developer, DevAgency",
    avatar: "NJ",
    color: "from-cyan-600 to-blue-600",
    text: "I've worked with many junior developers and Anshika stands out. Her code is readable, well-structured, and comes with thoughtful comments. She asks the right questions and always delivers on time. A real pleasure to collaborate with.",
    stars: 5,
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <motion.span key={i} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.05 * i + 0.3 }}
        className="text-yellow-400 text-sm">★</motion.span>
    ))}
  </div>
);

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/8 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <span className="section-tag">✦ Testimonials</span>
          <h2 className="section-heading mt-4">
            What people <span className="gradient-text">say</span>
          </h2>
          <p className="text-gray-500 mt-3">Kind words from people I've worked with</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} {...fadeUp(i * 0.12)}
              whileHover={{ y: -5 }}
              className="relative p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-purple-500/30 transition-all duration-300 group">

              {/* Glow */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

              {/* Quote mark */}
              <div className="text-5xl font-black text-purple-500/20 absolute top-4 right-6 select-none"
                style={{ fontFamily:"'Syne',sans-serif" }}>"</div>

              <Stars count={t.stars} />

              <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};