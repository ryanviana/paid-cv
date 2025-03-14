import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const OfferBanner = () => {
  return (
    <motion.div
      className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-2 items-center justify-center text-center py-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated Graduation Hat 🎓 with Black Border */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ rotate: -10 }}
        animate={{ rotate: 10 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.2,
        }}
      >
        <FaGraduationCap className="text-[#000000] text-5xl md:text-7xl drop-shadow-lg" />
      </motion.div>

      {/* Discount Banner */}
      <motion.div
        className="px-6 py-3 bg-green-600 rounded-lg shadow-md inline-block"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span className="text-2xl md:text-3xl font-extrabold text-white">
          🎉 OFERTA!
        </span>
        <br />
        <span className="text-lg md:text-2xl font-extrabold text-white tracking-wide">
          SEMANA DA DECISÃO EXATA
        </span>
      </motion.div>
    </motion.div>
  );
};

export default OfferBanner;
