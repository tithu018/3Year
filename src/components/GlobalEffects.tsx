import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Music, Sun, Moon } from "lucide-react";
import { LOVE_QUOTES, MUSIC_PATH, NEXT_ANNIVERSARY } from "../data/content";

// --- Cursor Heart Trail ---
function CursorTrail() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    let lastTime = 0;
    const handleMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 80) return;
      lastTime = now;

      const id = idRef.current++;
      setHearts((prev) => [...prev.slice(-8), { id, x: e.clientX, y: e.clientY }]);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute"
            initial={{ x: h.x - 6, y: h.y - 6, opacity: 0.6, scale: 1 }}
            animate={{ y: h.y - 30, opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- Click Heart Particles ---
function ClickHearts() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; angle: number; dist: number }[]
  >([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles = Array.from({ length: 6 }, (_, i) => ({
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        angle: (i / 6) * 360 + Math.random() * 30,
        dist: 30 + Math.random() * 40,
      }));
      setParticles((prev) => [...prev, ...newParticles]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            initial={{ x: p.x - 5, y: p.y - 5, opacity: 1, scale: 1 }}
            animate={{
              x: p.x - 5 + Math.cos((p.angle * Math.PI) / 180) * p.dist,
              y: p.y - 5 + Math.sin((p.angle * Math.PI) / 180) * p.dist,
              opacity: 0,
              scale: 0.3,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- Floating Love Quotes ---
function FloatingQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % LOVE_QUOTES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center pointer-events-none z-30 px-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentQuote}
          className="text-rose-300/30 text-xs md:text-sm text-center italic max-w-md"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1 }}
        >
          &ldquo;{LOVE_QUOTES[currentQuote]}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

// --- Anniversary Countdown ---
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const target = new Date(NEXT_ANNIVERSARY).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1.5 border border-rose-500/20">
      <p className="text-rose-300/60 text-[10px] md:text-xs text-center">
        Next anniversary
      </p>
      <p className="text-rose-300 text-xs md:text-sm font-mono text-center">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}

// --- Secret Easter Egg ---
function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  useEffect(() => {
    if (clicks >= 5) {
      setShowSecret(true);
      setTimeout(() => {
        setShowSecret(false);
        setClicks(0);
      }, 3000);
    }
  }, [clicks]);

  return (
    <>
      <button
        onClick={() => setClicks((c) => c + 1)}
        className="fixed bottom-4 left-4 z-40 w-6 h-6 opacity-0 hover:opacity-20 transition-opacity duration-300"
        aria-label="secret"
      >
        <Heart className="w-4 h-4 text-rose-500/30" />
      </button>
      <AnimatePresence>
        {showSecret && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl"
              animate={{ scale: [1, 1.5, 1], rotate: [0, 360] }}
              transition={{ duration: 2 }}
            >
              ❤️
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- Main Global Effects Wrapper ---
interface GlobalEffectsProps {
  children: React.ReactNode;
}

export default function GlobalEffects({ children }: GlobalEffectsProps) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_PATH);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicPlaying(!musicPlaying);
  }, [musicPlaying]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <CursorTrail />
      <ClickHearts />
      <FloatingQuotes />
      <Countdown />
      <EasterEgg />

      {/* Control buttons */}
      <div className="fixed top-4 left-4 z-40 flex flex-col gap-2">
        <motion.button
          onClick={toggleMusic}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-rose-500/20 flex items-center justify-center hover:bg-rose-500/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={musicPlaying ? "Pause music" : "Play music"}
        >
          <Music className={`w-4 h-4 ${musicPlaying ? "text-rose-400" : "text-rose-400/50"}`} />
        </motion.button>

        <motion.button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-rose-500/20 flex items-center justify-center hover:bg-rose-500/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-rose-400/50" />
          ) : (
            <Moon className="w-4 h-4 text-rose-400/50" />
          )}
        </motion.button>
      </div>

      {children}
    </div>
  );
}
