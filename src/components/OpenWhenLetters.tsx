import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X } from "lucide-react";
import { OPEN_WHEN_LETTERS } from "../data/content";

interface OpenWhenLettersProps {
  onComplete: () => void;
}

export default function OpenWhenLetters({ onComplete }: OpenWhenLettersProps) {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [openedSet, setOpenedSet] = useState<Set<number>>(new Set());

  const handleOpen = (index: number) => {
    setOpenedIndex(index);
    setOpenedSet((prev) => new Set(prev).add(index));
  };

  const allOpened = openedSet.size === OPEN_WHEN_LETTERS.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Open When Letters
      </motion.h2>

      <motion.p
        className="text-rose-300/60 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Tap each letter when the moment is right
      </motion.p>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {OPEN_WHEN_LETTERS.map((letter, index) => {
          const isOpened = openedSet.has(index);

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleOpen(index)}
              className="cursor-pointer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className={`relative p-6 rounded-xl border transition-all duration-300 ${
                  isOpened
                    ? "bg-rose-500/10 border-rose-500/40 shadow-lg shadow-rose-500/10"
                    : "bg-white/5 border-rose-500/15 hover:border-rose-500/30 hover:bg-white/8"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Mail
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      isOpened ? "text-rose-400" : "text-rose-500/40"
                    }`}
                  />
                  <div>
                    <h3 className="text-rose-200 font-medium text-sm">{letter.title}</h3>
                    {isOpened && (
                      <motion.p
                        className="text-rose-300/60 text-xs mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Opened
                      </motion.p>
                    )}
                  </div>
                </div>

                {isOpened && (
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-400"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {allOpened && (
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-rose-300 mb-4">You've opened all the letters ❤️</p>
          <motion.button
            onClick={onComplete}
            className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Your Letter
          </motion.button>
        </motion.div>
      )}

      {/* Letter modal */}
      <AnimatePresence>
        {openedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenedIndex(null)}
          >
            <motion.div
              className="bg-[#1a1a2e] border border-rose-500/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl relative"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOpenedIndex(null)}
                className="absolute top-4 right-4 text-rose-400/60 hover:text-rose-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <Mail className="w-8 h-8 text-rose-400 mb-4" />
              <h3 className="text-xl text-rose-200 font-bold mb-4">
                {OPEN_WHEN_LETTERS[openedIndex].title}
              </h3>
              <p className="text-rose-300/80 leading-relaxed">
                {OPEN_WHEN_LETTERS[openedIndex].message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
