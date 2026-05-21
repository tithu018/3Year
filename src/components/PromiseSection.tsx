import { motion } from "framer-motion";
import { Shield, Heart, Star, TrendingUp, Handshake } from "lucide-react";
import { PROMISES } from "../data/content";

interface PromiseSectionProps {
  onComplete: () => void;
}

const icons = [Shield, Heart, Star, TrendingUp, Handshake];

export default function PromiseSection({ onComplete }: PromiseSectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Promises to You
      </motion.h2>

      <motion.p
        className="text-rose-300/60 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Words I will keep forever
      </motion.p>

      <div className="max-w-2xl mx-auto space-y-4">
        {PROMISES.map((promise, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="group"
            >
              <motion.div
                className="flex items-center gap-4 p-5 bg-white/5 border border-rose-500/10 rounded-xl hover:border-rose-500/30 hover:bg-rose-500/5 transition-all duration-300 cursor-default"
                whileHover={{ x: 8, scale: 1.01 }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(225,29,72,0.2)" }}
                >
                  <Icon className="w-5 h-5 text-rose-400" />
                </motion.div>
                <p className="text-rose-200 font-medium text-sm md:text-base">{promise}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: PROMISES.length * 0.2 + 0.5 }}
      >
        <motion.button
          onClick={onComplete}
          className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          One Last Thing...
        </motion.button>
      </motion.div>
    </div>
  );
}
