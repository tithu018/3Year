import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { HEART_SYNC_MESSAGE } from "../data/content";

interface HeartbeatSyncProps {
  onComplete: () => void;
}

const HOLD_DURATION = 2800;
const RING_RADIUS = 68;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function HeartbeatSync({ onComplete }: HeartbeatSyncProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!isHolding || synced) return;

    const startedAt = performance.now();
    let animationFrame = 0;

    const updateProgress = (now: number) => {
      const nextProgress = Math.min(100, ((now - startedAt) / HOLD_DURATION) * 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        setIsHolding(false);
        setSynced(true);
        navigator.vibrate?.([80, 50, 120]);
        return;
      }

      animationFrame = requestAnimationFrame(updateProgress);
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHolding, synced]);

  const startSync = useCallback(() => {
    if (!synced) {
      setProgress(0);
      setIsHolding(true);
    }
  }, [synced]);

  const cancelSync = useCallback(() => {
    if (!synced) {
      setIsHolding(false);
      setProgress(0);
    }
  }, [synced]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Heartbeat Sync
      </motion.h2>

      <motion.p
        className="text-rose-300/60 text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Press and hold until our hearts beat as one
      </motion.p>

      {!synced ? (
        <motion.button
          type="button"
          className="relative w-40 h-40 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shadow-2xl shadow-rose-500/20 touch-none select-none"
          onPointerDown={startSync}
          onPointerUp={cancelSync}
          onPointerCancel={cancelSync}
          onPointerLeave={cancelSync}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && !event.repeat) {
              event.preventDefault();
              startSync();
            }
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              cancelSync();
            }
          }}
          animate={{ scale: isHolding ? [1, 1.04, 1] : 1 }}
          transition={{ duration: isHolding ? 0.55 : 0.2, repeat: isHolding ? Infinity : 0 }}
          whileHover={{ scale: isHolding ? 1 : 1.03 }}
          aria-label="Press and hold to synchronize hearts"
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160" aria-hidden="true">
            <circle
              cx="80"
              cy="80"
              r={RING_RADIUS}
              fill="none"
              stroke="rgba(244, 63, 94, 0.12)"
              strokeWidth="4"
            />
            <circle
              cx="80"
              cy="80"
              r={RING_RADIUS}
              fill="none"
              stroke="#fb7185"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - progress / 100)}
            />
          </svg>

          <motion.div
            animate={{ scale: isHolding ? [1, 1.2, 1] : [1, 1.08, 1] }}
            transition={{ duration: isHolding ? 0.55 : 1.2, repeat: Infinity }}
          >
            <Heart className="w-20 h-20 text-rose-500 fill-rose-500" />
          </motion.div>

          <span className="absolute -bottom-9 text-rose-300/60 text-sm">
            {isHolding ? `${Math.round(progress)}% synced` : "Hold the heart"}
          </span>
        </motion.button>
      ) : (
        <motion.div
          className="max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="mx-auto mb-8 w-32 h-32 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shadow-2xl shadow-rose-500/20"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          >
            <Heart className="w-16 h-16 text-rose-400 fill-rose-400" />
          </motion.div>

          <div className="bg-white/5 border border-rose-500/20 rounded-2xl p-7 mb-8">
            <p className="text-rose-200 text-lg leading-relaxed">{HEART_SYNC_MESSAGE}</p>
          </div>

          <motion.button
            type="button"
            onClick={onComplete}
            className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Our Memories
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
