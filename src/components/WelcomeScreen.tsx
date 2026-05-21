import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { GIRLFRIEND_NAME } from "../data/content";

interface WelcomeScreenProps {
  onBegin: () => void;
}

export default function WelcomeScreen({ onBegin }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] px-4">
      {/* Floating background hearts */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-500/10"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
            y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
            rotate: Math.random() * 360,
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360,
            x: `+=${Math.random() * 100 - 50}`,
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        >
          <Heart className="w-6 h-6 fill-current" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1.5 }}
        className="mb-8"
      >
        <div className="relative">
          <Heart className="w-24 h-24 text-rose-500 fill-rose-500" />
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-24 h-24 text-rose-400 fill-rose-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-rose-300 via-rose-400 to-rose-200 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Only You Can Unlock My Heart
      </motion.h1>

      <motion.p
        className="text-rose-200/70 text-center max-w-md text-lg mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        Answer, remember, smile, and unlock something special made only for you.
      </motion.p>

      <motion.p
        className="text-rose-400/60 text-sm mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        For {GIRLFRIEND_NAME}
      </motion.p>

      <motion.button
        onClick={onBegin}
        className="group relative px-10 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full text-lg font-medium shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-shadow duration-300 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Begin the Journey
          <Heart className="w-4 h-4 fill-current" />
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400"
          initial={{ x: "100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
}
