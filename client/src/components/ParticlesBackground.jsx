import React from "react";
import { motion } from "framer-motion";

export default function ParticlesBackground() {
  const particles = React.useMemo(() => Array.from({ length: 25 }, (_, i) => i), []);

  return (
    <div className="fixed inset-0 z-30 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const duration = Math.random() * 3 + 2; // 2-5s
        return (
          <motion.div
            key={particle}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        );
      })}
    </div>
  );
} 
