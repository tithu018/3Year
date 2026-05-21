import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Heart, Mail } from "lucide-react";
import { LOVE_LETTER } from "../data/content";

interface LoveLetterProps {
  onComplete: () => void;
}

function HeartBurst() {
  const hearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    angle: (i / 30) * 360,
    distance: 100 + Math.random() * 80,
    size: 3 + Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute left-1/2 top-1/2"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((h.angle * Math.PI) / 180) * h.distance,
            y: Math.sin((h.angle * Math.PI) / 180) * h.distance,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Heart className="fill-rose-400 text-rose-400" style={{ width: h.size, height: h.size }} />
        </motion.div>
      ))}
    </div>
  );
}

export default function LoveLetter({ onComplete }: LoveLetterProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!unlocked) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < LOVE_LETTER.length) {
        setDisplayedText(LOVE_LETTER.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [unlocked]);

  const handleUnlock = () => {
    setUnlocked(true);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-12 relative">
      {showBurst && <HeartBurst />}

      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Love Letter
      </motion.h2>

      {!unlocked ? (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Locked envelope */}
          <motion.div
            className="relative mb-8"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-48 h-36 bg-gradient-to-b from-rose-800/40 to-rose-900/40 border-2 border-rose-500/30 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Mail className="w-16 h-16 text-rose-400/40" />
              <div className="absolute top-3 right-3">
                <Lock className="w-5 h-5 text-rose-400/60" />
              </div>
            </div>
          </motion.div>

          <p className="text-rose-300/60 mb-6 text-center">Your love letter is locked.</p>

          <motion.button
            onClick={handleUnlock}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Unlock className="w-5 h-5" />
            Unlock My Heart
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="max-w-lg w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Open envelope */}
          <div className="bg-gradient-to-b from-rose-900/20 to-[#1a1a2e] border border-rose-500/30 rounded-2xl p-8 shadow-2xl shadow-rose-500/10 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
            </div>

            <p className="text-rose-200/90 leading-relaxed text-base md:text-lg whitespace-pre-wrap min-h-[120px]">
              {displayedText}
              {!typingDone && (
                <motion.span
                  className="inline-block w-0.5 h-5 bg-rose-400 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </p>

            {typingDone && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={onComplete}
                  className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  See Our Memories
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
