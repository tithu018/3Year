import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_PHOTOS } from "../data/content";

interface MemoryGalleryProps {
  onComplete: () => void;
}

export default function MemoryGallery({ onComplete }: MemoryGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleSwipe = (deltaX: number) => {
    if (selectedPhoto === null) return;
    if (deltaX < -50 && selectedPhoto < GALLERY_PHOTOS.length - 1) {
      setSelectedPhoto(selectedPhoto + 1);
    } else if (deltaX > 50 && selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] px-4 py-16">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-rose-300 to-rose-400 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Memory Gallery
      </motion.h2>

      <motion.p
        className="text-rose-300/60 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Every picture tells our story
      </motion.p>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {GALLERY_PHOTOS.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setSelectedPhoto(index)}
            whileHover={{ rotate: (index % 3 - 1) * 2, y: -4 }}
          >
            <div className="relative bg-white/5 p-3 rounded-lg border border-rose-500/10 hover:border-rose-500/30 transition-all duration-300 shadow-lg hover:shadow-rose-500/10">
              {/* Polaroid style */}
              <div className="relative overflow-hidden rounded aspect-square">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white/80" />
                </div>
              </div>

              {/* Caption */}
              <motion.div
                className="mt-2 text-center"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <p className="text-rose-300/70 text-xs md:text-sm font-medium">{photo.caption}</p>
              </motion.div>

              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_rgba(225,29,72,0.2)]" />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={onComplete}
          className="px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-full font-medium shadow-lg shadow-rose-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See My Promises
        </motion.button>
      </motion.div>

      {/* Photo lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStart !== null) {
                handleSwipe(e.changedTouches[0].clientX - touchStart);
                setTouchStart(null);
              }
            }}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation arrows */}
            {selectedPhoto > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(selectedPhoto - 1);
                }}
                className="absolute left-4 text-white/60 hover:text-white text-3xl z-10"
              >
                &#8249;
              </button>
            )}
            {selectedPhoto < GALLERY_PHOTOS.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(selectedPhoto + 1);
                }}
                className="absolute right-4 text-white/60 hover:text-white text-3xl z-10"
              >
                &#8250;
              </button>
            )}

            <motion.div
              key={selectedPhoto}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_PHOTOS[selectedPhoto].url}
                alt={GALLERY_PHOTOS[selectedPhoto].caption}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
              <motion.p
                className="text-center text-rose-200 mt-4 text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {GALLERY_PHOTOS[selectedPhoto].caption}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
