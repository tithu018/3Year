import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CheckCircle, XCircle, PartyPopper } from "lucide-react";
import { QUIZ_QUESTIONS } from "../data/content";

interface LoveQuizProps {
  onComplete: () => void;
}

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#d4a574"][i % 6],
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-full"
          style={{ left: `${p.x}%`, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "100vh", opacity: 0, rotate: 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function LoveQuiz({ onComplete }: LoveQuizProps) {
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = QUIZ_QUESTIONS[current];
  const progress = (current / QUIZ_QUESTIONS.length) * 100;

  const handleSubmit = () => {
    const isCorrect = answer.trim().toLowerCase() === question.answer.toLowerCase();
    setFeedback(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setAnswer("");

      if (current < QUIZ_QUESTIONS.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setCompleted(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          onComplete();
        }, 3000);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-12 relative">
      {showConfetti && <Confetti />}

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-rose-300/60 text-sm">
            Question {current + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span className="flex items-center gap-1 text-rose-400 text-sm">
            <Heart className="w-3 h-3 fill-rose-400" /> {score}
          </span>
        </div>
        <div className="w-full h-2 bg-rose-900/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-rose-300 rounded-full"
            animate={{ width: `${completed ? 100 : progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-rose-500/20 rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl md:text-2xl text-rose-100 font-semibold mb-6 text-center">
                {question.question}
              </h3>

              <motion.div animate={feedback === "wrong" ? { x: [0, -10, 10, -10, 10, 0] } : {}}>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !feedback && handleSubmit()}
                  disabled={!!feedback}
                  placeholder="Type your answer..."
                  className="w-full px-5 py-3 bg-white/5 border border-rose-500/30 rounded-xl text-rose-200 placeholder-rose-500/40 focus:outline-none focus:border-rose-400 transition-all disabled:opacity-50"
                />
              </motion.div>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 flex items-center gap-2 justify-center"
                  >
                    {feedback === "correct" ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        <span className="text-emerald-300">You know me so well ❤️</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-400" />
                        <span className="text-rose-300">Think again my love, I know you can do it ❤️</span>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!feedback && (
                <motion.button
                  onClick={handleSubmit}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl font-medium shadow-lg shadow-rose-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Answer
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <PartyPopper className="w-16 h-16 text-rose-400 mx-auto mb-4" />
            <h3 className="text-2xl text-rose-200 font-bold">You did it!</h3>
            <p className="text-rose-300/70 mt-2">You truly know my heart</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
