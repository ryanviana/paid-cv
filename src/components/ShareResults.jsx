// src/components/ShareResults.js
import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

function ShareResults() {
  const [showShareModal] = useState(false); // or manage if needed
  const shareText =
    "Fiz um teste vocacional e achei os resultados bem interessantes! Faça o seu também: https://vocacional.decisaoexata.com";

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <motion.div
      className="text-center mt-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Compartilhe seu resultado!</h2>
      <button
        onClick={handleWhatsAppShare}
        className="mt-4 px-6 py-3 flex items-center gap-2 bg-green-500 text-white rounded-full shadow-lg font-bold text-lg hover:scale-105 hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <FaWhatsapp className="text-2xl" /> Compartilhar no WhatsApp
      </button>
    </motion.div>
  );
}

export default ShareResults;
