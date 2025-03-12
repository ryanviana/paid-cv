import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";

function TinderQuestion({ statement, updatePagina }) {
  const controls = useAnimation();
  const [exiting, setExiting] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile (viewport width less than 768px)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track horizontal drag offset.
  const x = useMotionValue(0);
  // Scale left/right hints as the user drags.
  const leftScale = useTransform(x, [-150, 0], [1.5, 1]);
  const rightScale = useTransform(x, [0, 150], [1, 1.5]);

  const handleSwipe = async (direction) => {
    if (exiting) return;
    setExiting(true);
    await controls.start({
      x: direction === "right" ? 500 : -500,
      opacity: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    });
    updatePagina(1);
  };

  useEffect(() => {
    async function playHint() {
      if (isMobile) {
        // On mobile, nudge the card so the user sees the swipe action.
        await controls.start({ x: 50, transition: { duration: 0.5 } });
        await controls.start({ x: 0, transition: { duration: 0.5 } });
      }
      setTimeout(() => setShowHint(false), 2500);
    }
    playHint();
  }, [controls, isMobile]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <motion.div
        className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col"
        // Enable drag only on mobile devices.
        drag={isMobile ? "x" : false}
        dragElastic={isMobile ? 0.3 : 0}
        style={{ x }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 120) handleSwipe("right");
          else if (info.offset.x < -120) handleSwipe("left");
        }}
        animate={controls}
      >
        {/* Image & Hints Area */}
        <div className="relative">
          {statement.image && (
            <motion.img
              src={statement.image}
              alt="Visual da Questão"
              className="w-full h-64 object-cover"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {/* Only show drag hints on mobile */}
          {isMobile && (
            <>
              <motion.div
                className="absolute inset-y-0 left-0 flex items-center pl-3"
                style={{ scale: leftScale }}
              >
                <div className="bg-white bg-opacity-70 p-1 rounded-full">
                  <ChevronLeft size={20} className="text-gray-600" />
                </div>
              </motion.div>
              <motion.div
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                style={{ scale: rightScale }}
              >
                <div className="bg-white bg-opacity-70 p-1 rounded-full">
                  <ChevronRight size={20} className="text-gray-600" />
                </div>
              </motion.div>
            </>
          )}
          {/* Onboarding Hint Overlay - shows hand hints on both sides */}
          {showHint && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-full flex justify-between px-4">
                <motion.div
                  className="text-4xl"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  👈
                </motion.div>
                <motion.div
                  className="text-4xl"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  👉
                </motion.div>
              </div>
              <motion.p className="text-white text-xl font-semibold mt-4">
                Arraste ou toque para responder
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Text & Action Buttons Area */}
        <div className="p-6 flex flex-col flex-grow">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            {statement.title}
          </h2>
          <p className="text-center text-gray-600 text-lg mb-6">
            {statement.description}
          </p>
          <div className="flex justify-around mt-auto">
            <motion.button
              // Prevent drag events from being triggered by button clicks.
              onPointerDown={(e) => e.stopPropagation()}
              className="flex items-center justify-center bg-red-500 text-white w-16 h-16 rounded-full shadow-lg hover:bg-red-600 transition transform hover:scale-110"
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSwipe("left")}
            >
              <X size={24} />
            </motion.button>
            <motion.button
              onPointerDown={(e) => e.stopPropagation()}
              className="flex items-center justify-center bg-green-500 text-white w-16 h-16 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110"
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSwipe("right")}
            >
              <Heart size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

TinderQuestion.propTypes = {
  statement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string, // optional
  }).isRequired,
  updatePagina: PropTypes.func.isRequired,
};

export default TinderQuestion;
