import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Heart } from "lucide-react";
import { SPECIAL_DATE, SPECIAL_DATE_HINT } from "../data/content";

interface PasscodeLockProps {
  onUnlock: () => void;
}

function HeartBurst() {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * 360,
    distance: 80 + Math.random() * 60,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute left-1/2 top-1/2"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((h.angle * Math.PI) / 180) * h.distance,
            y: Math.sin((h.angle * Math.PI) / 180) * h.distance,
            opacity: 0,
            scale: 0.5,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        </motion.div>
      ))}
    </div>
  );
}

export default function PasscodeLock({ onUnlock }: PasscodeLockProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);

  const handleSubmit = () => {
    if (input === SPECIAL_DATE) {
      setUnlocked(true);
      setShowBurst(true);
      setTimeout(() => onUnlock(), 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 relative">
      {showBurst && <HeartBurst />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={unlocked ? { rotate: [0, -15, 0], scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          {unlocked ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
              <Unlock className="w-20 h-20 text-rose-400" />
            </motion.div>
          ) : (
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Lock className="w-20 h-20 text-rose-500/80" />
            </motion.div>
          )}
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-rose-200 mb-2 text-center">
          {unlocked ? "Unlocked!" : "Enter Our Special Date"}
        </h2>

        <p className="text-rose-300/60 text-sm mb-8 text-center">
          {unlocked ? "You hold the key to my heart" : SPECIAL_DATE_HINT}
        </p>

        <AnimatePresence>
          {!unlocked && (
            <motion.div
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder="DD/MM/YYYY"
                  className="w-64 px-6 py-3 bg-white/5 border border-rose-500/30 rounded-full text-center text-rose-200 placeholder-rose-500/40 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 transition-all"
                />
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-rose-300 text-sm"
                  >
                    Not this one baby, try again ❤️
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Unlock
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
