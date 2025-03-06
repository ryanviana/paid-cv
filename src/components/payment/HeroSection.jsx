import React from "react";
import { motion } from "framer-motion";
import Grafico from "../../assets/grafico.png";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection = () => (
  <motion.section
    initial="hidden"
    animate="visible"
    variants={sectionVariant}
    transition={{ duration: 0.8 }}
    className="bg-blue-600 text-white py-20 px-4 text-center"
  >
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:space-x-10">
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          PARABÉNS, VOCÊ CONCLUIU O TESTE!
        </h1>
        <p className="text-lg md:text-xl">
          Você respondeu 10 perguntas e está a um passo de descobrir um
          mapeamento completo das suas aptidões e interesses.
        </p>
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="mt-6 bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          Ver Oferta
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img
          src={Grafico}
          alt="Career Test"
          className="rounded-lg shadow-lg w-full max-w-md blur-sm"
        />
      </div>
    </div>
  </motion.section>
);

export default HeroSection;
