import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { SCRATCH_MESSAGE } from "../data/content";

interface ScratchCardProps {
  onComplete: () => void;
}

export default function ScratchCard({ onComplete }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 320;
    canvas.height = 200;

    // Draw the scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, 320, 200);
    gradient.addColorStop(0, "#e11d48");
    gradient.addColorStop(1, "#be123c");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 320, 200);

    // Add pattern
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.fillText("♥", 40 + i * 70, 40 + j * 60);
      }
    }

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("Scratch to reveal a secret", 160, 100);
  }, []);

  const getScratchPercent = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    return (transparent / (pixels.length / 4)) * 100;
  }, []);

  const scratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      const percent = getScratchPercent();
      setScratchPercent(percent);

      if (percent > 50 && !revealed) {
        setRevealed(true);
        // Clear remaining overlay
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => onComplete(), 2000);
      }
    },
    [getScratchPercent, revealed, onComplete]
  );

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPosition(e);
    scratch(pos.x, pos.y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-12">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Scratch Card Surprise
      </motion.h2>

      <motion.p
        className="text-rose-300/60 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Use your finger or mouse to scratch
      </motion.p>

      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-rose-500/20 border border-rose-500/20">
        {/* Hidden message underneath */}
        <div className="w-[320px] h-[200px] flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-6">
          <motion.p
            className="text-rose-200 text-center text-lg font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: revealed ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
          >
            {SCRATCH_MESSAGE}
          </motion.p>
        </div>

        {/* Scratch canvas overlay */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          style={{ width: 320, height: 200 }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      {scratchPercent > 0 && scratchPercent < 50 && (
        <p className="mt-4 text-rose-400/60 text-sm">Keep scratching...</p>
      )}

      {revealed && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-rose-300 text-sm"
        >
          You revealed the secret! ❤️
        </motion.p>
      )}
    </div>
  );
}
