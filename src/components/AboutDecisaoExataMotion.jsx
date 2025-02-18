// src/components/AboutDecisaoExataMotion.jsx
import React from "react";
import { motion } from "framer-motion";

export default function AboutDecisaoExataMotion() {
  return (
    <motion.section
      className="w-full bg-white py-10 sm:py-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Sobre o Decisão Exata
        </motion.h2>

        {/* Copy */}
        <motion.p
          className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-questrial"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Nossa missão é ajudar você a encontrar a profissão dos seus sonhos. Com
          uma abordagem personalizada e prática, guiamos cada passo da sua
          jornada rumo ao sucesso. Confira nosso vídeo para entender melhor o que
          fazemos, e se tiver qualquer dúvida, fale conosco no WhatsApp!
        </motion.p>

        {/* Embedded Video */}
        <motion.div
          className="relative w-full max-w-3xl mx-auto mb-8 aspect-video"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <iframe
            className="w-full h-full rounded-md shadow-md"
            src="https://www.youtube.com/embed/KVUG-qDuHpo"
            title="Decisão Exata Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a
            href="https://wa.me/5516936180172?text=Oi%2C%20eu%20vi%20o%20seu%20email%20e%20quero%20ajudar%20pra%20decidir%20o%20meu%20curso%20com%20o%20Decisao%20Exata."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 text-white px-8 py-4 text-lg font-bold rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Fale Conosco no WhatsApp
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
