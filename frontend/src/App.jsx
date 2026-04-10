import { useEffect, useRef } from "react";
import { Navbar } from "./layouts/Navbar";
import { Footer } from "./layouts/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Testimonials } from "./sections/Testimonials";
import { Contact } from "./sections/Contact";

// Custom cursor component
const CustomCursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
    };

    const animate = () => {
      // smooth trailing (same logic, just smoother feel)
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      }

      raf = requestAnimationFrame(animate);
    };

    // ✅ Hover effect
    const onEnter = () => {
      if (ring.current) {
        ring.current.style.width = "60px";
        ring.current.style.height = "60px";
        ring.current.style.background = "rgba(168,85,247,0.15)";
      }
    };

    const onLeave = () => {
      if (ring.current) {
        ring.current.style.width = "36px";
        ring.current.style.height = "36px";
        ring.current.style.background = "transparent";
      }
    };

    // ✅ Click effect
    const onClick = () => {
      if (ring.current) {
        ring.current.style.transform += " scale(0.85)";
        setTimeout(() => {
          if (ring.current) {
            ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
          }
        }, 120);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onClick);

    const elements = document.querySelectorAll("a, button");

    elements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onClick);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });

      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
};

function App() {
  return (
    <div className="bg-[#06060f] text-white min-h-screen">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;