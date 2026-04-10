import { useEffect } from "react";

export const CustomCursor = () => {
  useEffect(() => {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const speed = 0.15; // lower = smoother lag

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;

      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", moveCursor);

    // ✨ Hover detection
    const addHover = () => document.body.classList.add("cursor-hover");
    const removeHover = () => document.body.classList.remove("cursor-hover");

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // ✨ Click animation
    const click = () => {
      document.body.classList.add("cursor-click");
      setTimeout(() => {
        document.body.classList.remove("cursor-click");
      }, 150);
    };

    window.addEventListener("mousedown", click);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", click);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </>
  );
};