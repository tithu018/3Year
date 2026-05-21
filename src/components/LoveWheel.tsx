import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw } from "lucide-react";
import { WHEEL_REWARDS } from "../data/content";

interface LoveWheelProps {
  onComplete: () => void;
}

const COLORS = ["#e11d48", "#be123c", "#f43f5e", "#e11d48", "#be123c", "#f43f5e"];

export default function LoveWheel({ onComplete }: LoveWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const wheelRef = useRef<SVGSVGElement>(null);

  const segmentAngle = 360 / WHEEL_REWARDS.length;

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const extraSpins = 3 + Math.random() * 3;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraSpins * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setHasSpun(true);
      const normalizedAngle = totalRotation % 360;
      const winningIndex = Math.floor((360 - normalizedAngle) / segmentAngle) % WHEEL_REWARDS.length;
      setResult(winningIndex);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Spin the Love Wheel
      </motion.h2>

      <div className="relative mb-8">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-rose-300" />
        </div>

        {/* Wheel */}
        <motion.svg
          ref={wheelRef}
          width="280"
          height="280"
          viewBox="0 0 280 280"
          className="drop-shadow-2xl"
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {WHEEL_REWARDS.map((reward, i) => {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            const startRad = ((startAngle - 90) * Math.PI) / 180;
            const endRad = ((endAngle - 90) * Math.PI) / 180;
            const largeArc = segmentAngle > 180 ? 1 : 0;
            const cx = 140;
            const cy = 140;
            const r = 130;

            const x1 = cx + r * Math.cos(startRad);
            const y1 = cy + r * Math.sin(startRad);
            const x2 = cx + r * Math.cos(endRad);
            const y2 = cy + r * Math.sin(endRad);

            const midRad = ((startAngle + segmentAngle / 2 - 90) * Math.PI) / 180;
            const textR = r * 0.65;
            const textX = cx + textR * Math.cos(midRad);
            const textY = cy + textR * Math.sin(midRad);

            return (
              <g key={i}>
                <path
                  d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                  fill={COLORS[i % COLORS.length]}
                  stroke="#1a1a2e"
                  strokeWidth="2"
                />
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="600"
                  transform={`rotate(${startAngle + segmentAngle / 2}, ${textX}, ${textY})`}
                >
                  {reward.label}
                </text>
              </g>
            );
          })}
          <circle cx="140" cy="140" r="20" fill="#1a1a2e" stroke="#e11d48" strokeWidth="3" />
          <text x="140" y="140" textAnchor="middle" dominantBaseline="middle" fill="#e11d48" fontSize="16">
            ♥
          </text>
        </motion.svg>
      </div>

      <motion.button
        onClick={spin}
        disabled={spinning}
        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={!spinning ? { scale: 1.05 } : {}}
        whileTap={!spinning ? { scale: 0.95 } : {}}
      >
        <RotateCw className={`w-5 h-5 ${spinning ? "animate-spin" : ""}`} />
        {spinning ? "Spinning..." : "Spin!"}
      </motion.button>

      {/* Result card */}
      <AnimatePresence>
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 max-w-sm w-full"
          >
            <div className="bg-white/5 border border-rose-500/30 rounded-2xl p-6 text-center relative">
              <h3 className="text-rose-300 font-semibold text-lg mb-2">
                {WHEEL_REWARDS[result].label}
              </h3>
              <p className="text-rose-200/80">{WHEEL_REWARDS[result].message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {hasSpun && !spinning && result !== null && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={onComplete}
          className="mt-6 px-6 py-2 bg-rose-500/20 text-rose-300 rounded-full text-sm hover:bg-rose-500/30 transition-colors"
        >
          Continue the Journey
        </motion.button>
      )}
    </div>
  );
}
