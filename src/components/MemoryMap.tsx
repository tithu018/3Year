import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Camera, MapPin, Smile, Heart } from "lucide-react";
import { MEMORIES } from "../data/content";

const iconMap: Record<string, React.ElementType> = {
  message: MessageCircle,
  phone: Phone,
  camera: Camera,
  "map-pin": MapPin,
  smile: Smile,
  heart: Heart,
};

interface MemoryMapProps {
  onComplete: () => void;
}

export default function MemoryMap({ onComplete }: MemoryMapProps) {
  const [revealed, setRevealed] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const handleReveal = (index: number) => {
    if (!revealed.includes(index)) {
      const newRevealed = [...revealed, index];
      setRevealed(newRevealed);
      if (newRevealed.length === MEMORIES.length) {
        setTimeout(() => onComplete(), 1500);
      }
    }
    setSelected(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Map of Our Memories
      </motion.h2>

      <motion.p
        className="text-rose-300/60 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Click each memory to relive it
      </motion.p>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-rose-900/30 -translate-x-1/2">
          <motion.div
            className="w-full bg-gradient-to-b from-rose-500 to-rose-300"
            initial={{ height: "0%" }}
            animate={{ height: `${(revealed.length / MEMORIES.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {MEMORIES.map((memory, index) => {
          const Icon = iconMap[memory.icon] || Heart;
          const isRevealed = revealed.includes(index);
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              className={`flex items-center mb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              {/* Card */}
              <motion.div
                className={`w-5/12 cursor-pointer ${isLeft ? "text-right" : "text-left"}`}
                onClick={() => handleReveal(index)}
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    isRevealed
                      ? "bg-rose-500/10 border-rose-500/40 shadow-lg shadow-rose-500/10"
                      : "bg-white/5 border-rose-500/10 hover:border-rose-500/30"
                  }`}
                  layout
                >
                  <h4 className="text-rose-200 font-semibold text-sm md:text-base">
                    {isRevealed ? memory.title : "???"}
                  </h4>
                  <AnimatePresence>
                    {isRevealed && (
                      <motion.p
                        className="text-rose-300/60 text-xs md:text-sm mt-1"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                      >
                        {memory.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>

              {/* Center pin */}
              <motion.div
                className="w-2/12 flex justify-center"
                onClick={() => handleReveal(index)}
              >
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isRevealed
                      ? "bg-rose-500 shadow-lg shadow-rose-500/40"
                      : "bg-rose-900/40 border-2 border-rose-500/30"
                  }`}
                  animate={isRevealed ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon
                    className={`w-4 h-4 ${isRevealed ? "text-white" : "text-rose-400/60"}`}
                  />
                </motion.div>
              </motion.div>

              {/* Spacer */}
              <div className="w-5/12" />
            </motion.div>
          );
        })}
      </div>

      {/* Selected memory detail */}
      <AnimatePresence>
        {selected !== null && revealed.includes(selected) && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-[#1a1a2e] border border-rose-500/30 rounded-2xl p-8 max-w-sm text-center shadow-2xl"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const Icon = iconMap[MEMORIES[selected].icon] || Heart;
                return <Icon className="w-10 h-10 text-rose-400 mx-auto mb-4" />;
              })()}
              <h3 className="text-xl text-rose-200 font-bold mb-2">{MEMORIES[selected].title}</h3>
              <p className="text-rose-300/70">{MEMORIES[selected].description}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 px-6 py-2 bg-rose-500/20 text-rose-300 rounded-full text-sm hover:bg-rose-500/30 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
