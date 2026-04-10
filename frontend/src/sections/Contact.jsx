// src/sections/Contact.jsx
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
});

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Anshikasharma21",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/anshika-sharma-50b8082b5/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://x.com/AnshikaSha61255",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });

        setTimeout(() => setSent(false), 4000);
      } else {
        alert("❌ Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Server error");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/8 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-700 blur-[120px] opacity-10 rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <motion.div {...fadeUp()} className="mb-16 text-center">
          <span className="section-tag">✦ Contact</span>
          <h2 className="section-heading mt-4">
            Let's <span className="gradient-text">work together</span>
          </h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left info */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2 space-y-6">
            <div>
              <div className="text-xs font-mono text-gray-500 mb-1 tracking-wider">EMAIL</div>
              <a
                href="mailto:anshikasharma5697@gmail.com"
                className="text-white hover:text-purple-300 transition-colors text-sm break-all"
              >
                anshikasharma5697@gmail.com
              </a>
            </div>

            <div>
              <div className="text-xs font-mono text-gray-500 mb-1 tracking-wider">PHONE</div>
              <a
                href="tel:+919137206735"
                className="text-white hover:text-purple-300 transition-colors text-sm"
              >
                +91-9137206735
              </a>
            </div>

            <div>
              <div className="text-xs font-mono text-gray-500 mb-1 tracking-wider">LOCATION</div>
              <p className="text-white text-sm">Mumbai, Maharashtra, India</p>
            </div>

            <div>
              <div className="text-xs font-mono text-gray-500 mb-3 tracking-wider">SOCIAL</div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(34,197,94,0.4)",
                  "0 0 0 8px rgba(34,197,94,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for hire
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form
            {...fadeUp(0.2)}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-4 p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "name", label: "Your Name", type: "text", placeholder: "Rahul Mehta" },
                { name: "email", label: "Email", type: "email", placeholder: "rahul@example.com" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="text-xs font-mono text-gray-500 tracking-wider block mb-1.5">
                    {f.label}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06] transition-all"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-mono text-gray-500 tracking-wider block mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell me about your project..."
                required
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:bg-white/[0.06] transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || sent}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                sent
                  ? "bg-green-600 text-white"
                  : "bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:shadow-lg hover:shadow-purple-900/40"
              }`}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending...
                </>
              ) : sent ? (
                <>✓ Message Sent!</>
              ) : (
                <>Send Message →</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};