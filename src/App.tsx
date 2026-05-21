import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import GlobalEffects from "./components/GlobalEffects";
import LoadingScreen from "./components/LoadingScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import PasscodeLock from "./components/PasscodeLock";
import LoveQuiz from "./components/LoveQuiz";
import MemoryMap from "./components/MemoryMap";
import LoveWheel from "./components/LoveWheel";
import ScratchCard from "./components/ScratchCard";
import OpenWhenLetters from "./components/OpenWhenLetters";
import LoveLetter from "./components/LoveLetter";
import MemoryGallery from "./components/MemoryGallery";
import PromiseSection from "./components/PromiseSection";
import FinalFireworks from "./components/FinalFireworks";

// Journey stages
const STAGES = [
  "loading",
  "welcome",
  "passcode",
  "quiz",
  "memoryMap",
  "loveWheel",
  "scratchCard",
  "openWhen",
  "loveLetter",
  "gallery",
  "promises",
  "final",
] as const;

type Stage = (typeof STAGES)[number];

function App() {
  const [stage, setStage] = useState<Stage>("loading");

  const next = useCallback(() => {
    const idx = STAGES.indexOf(stage);
    if (idx < STAGES.length - 1) {
      setStage(STAGES[idx + 1]);
    }
  }, [stage]);

  const replay = useCallback(() => {
    setStage("loading");
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <GlobalEffects>
      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <motion.div key="loading" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <LoadingScreen onComplete={next} />
          </motion.div>
        )}

        {stage === "welcome" && (
          <motion.div key="welcome" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <WelcomeScreen onBegin={next} />
          </motion.div>
        )}

        {stage === "passcode" && (
          <motion.div key="passcode" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <PasscodeLock onUnlock={next} />
          </motion.div>
        )}

        {stage === "quiz" && (
          <motion.div key="quiz" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <LoveQuiz onComplete={next} />
          </motion.div>
        )}

        {stage === "memoryMap" && (
          <motion.div key="memoryMap" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <MemoryMap onComplete={next} />
          </motion.div>
        )}

        {stage === "loveWheel" && (
          <motion.div key="loveWheel" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <LoveWheel onComplete={next} />
          </motion.div>
        )}

        {stage === "scratchCard" && (
          <motion.div key="scratchCard" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <ScratchCard onComplete={next} />
          </motion.div>
        )}

        {stage === "openWhen" && (
          <motion.div key="openWhen" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <OpenWhenLetters onComplete={next} />
          </motion.div>
        )}

        {stage === "loveLetter" && (
          <motion.div key="loveLetter" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <LoveLetter onComplete={next} />
          </motion.div>
        )}

        {stage === "gallery" && (
          <motion.div key="gallery" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <MemoryGallery onComplete={next} />
          </motion.div>
        )}

        {stage === "promises" && (
          <motion.div key="promises" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <PromiseSection onComplete={next} />
          </motion.div>
        )}

        {stage === "final" && (
          <motion.div key="final" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <FinalFireworks onReplay={replay} />
          </motion.div>
        )}
      </AnimatePresence>
    </GlobalEffects>
  );
}

export default App;
