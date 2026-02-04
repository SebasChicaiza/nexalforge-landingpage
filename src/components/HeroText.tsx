"use client";
import { motion, type Variants, useReducedMotion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: (delayBase = 0) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: delayBase },
  }),
};

const itemRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween" as const,
      duration: 1,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
};

export function HeroText() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      custom={0.1}
      // If user prefers reduced motion, skip transforms
      style={reduce ? { transform: "none" } : undefined}
    >
      <motion.h1
        variants={itemRight}
        className="mb-5 mt-2 font-[800] leading-[1.05] tracking-tight
                   text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                   drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]
                   [font-variation-settings:'wght'_800] 
                   font-sans"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Nexal Forge: Creamos Sistemas Agentes de IA para Empresas
        <br className="hidden sm:block" />
      </motion.h1>

      <motion.p
        variants={itemRight}
        className="mb-8 text-base sm:text-lg text-white/90 max-w-[48ch]"
      >
        Impulsa tus operaciones con Nexi, nuestro Sistema Operativo Agente
        (Agentic OS) que maneja tareas, reservas y flujos de trabajo de
        principio a fin.
      </motion.p>
    </motion.div>
  );
}
