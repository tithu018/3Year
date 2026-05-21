import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface LoadingScreenProps {
  onComplete: () => void;
}

function Sparkle({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 2,
      }}
    />
  );
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {sparkles.map((s) => (
          <Sparkle key={s.id} delay={s.delay} x={s.x} y={s.y} />
        ))}

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-20 h-20 text-rose-500 fill-rose-500" />
        </motion.div>

        <motion.p
          className="mt-8 text-rose-200/80 text-lg tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          Preparing your surprise...
        </motion.p>

        <motion.div
          className="mt-6 w-48 h-1 bg-rose-900/50 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-rose-300 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
