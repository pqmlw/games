import React, { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const fire = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // burst from random positions near top
      confetti({
        particleCount: 20,
        angle: 90 + (Math.random() - 0.5) * 40,
        spread: 55,
        startVelocity: 30 + Math.random() * 20,
        origin: { x: Math.random(), y: Math.random() * 0.2 },
      });
      // smaller bursts
      confetti({
        particleCount: 8,
        spread: 80,
        origin: { x: Math.random(), y: Math.random() * 0.3 },
      });
    };

    fire();
    intervalRef.current = window.setInterval(fire, 350);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [active]);

  return null; // canvas-confetti draws directly to page
};

export default Confetti;
