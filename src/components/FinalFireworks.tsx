import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";

interface FinalFireworksProps {
  onReplay: () => void;
}

function Firework({ x, color, delay }: { x: number; color: string; delay: number }) {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i / 12) * 360,
  }));

  return (
    <div className="absolute" style={{ left: `${x}%`, top: "20%" }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * (60 + Math.random() * 40),
            y: Math.sin((p.angle * Math.PI) / 180) * (60 + Math.random() * 40),
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            delay: delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function FallingHearts() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 4,
    size: 10 + Math.random() * 14,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.x}%` }}
          initial={{ y: -30, opacity: 0.6, rotate: Math.random() * 360 }}
          animate={{ y: "110vh", opacity: 0, rotate: Math.random() * 720 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            className="fill-rose-400/40 text-rose-400/40"
            style={{ width: h.size, height: h.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function Sparkles() {
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: s.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#d4a574", "#fbbf24", "#34d399"][i % 8],
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${p.x}%`, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 720 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export default function FinalFireworks({ onReplay }: FinalFireworksProps) {
  const [showFireworks] = useState(true);

  const fireworkColors = ["#e11d48", "#f43f5e", "#fb7185", "#fbbf24", "#d4a574"];
  const fireworks = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    color: fireworkColors[i % fireworkColors.length],
    delay: i * 0.4,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] px-4 py-16 relative overflow-hidden">
      <FallingHearts />
      <Sparkles />
      <Confetti />

      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {fireworks.map((fw) => (
            <Firework key={fw.id} x={fw.x} color={fw.color} delay={fw.delay} />
          ))}
        </div>
      )}

      <motion.div
        className="text-center z-20 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.p
          className="text-rose-200/70 text-lg md:text-xl mb-6 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          You completed the journey, but our real journey is forever.
        </motion.p>

        <motion.h1
          className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-rose-300 via-rose-400 to-rose-200 bg-clip-text text-transparent mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 1, type: "spring" }}
        >
          I Love You Forever
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <motion.button
            onClick={onReplay}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-rose-500/30 text-rose-300 rounded-full hover:bg-rose-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Replay the Journey
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
