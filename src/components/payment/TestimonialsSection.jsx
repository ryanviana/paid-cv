import React from "react";
import { motion } from "framer-motion";
import Bernal from "../../assets/Bernal.png";
import Beluce from "../../assets/Beluce.png";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const TestimonialsSection = () => (
  <motion.section
    initial="hidden"
    animate="visible"
    variants={sectionVariant}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="py-16 px-4 bg-blue-50 text-center"
  >
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-800 mb-8">
        O que os outros dizem
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <img
            src={Bernal}
            alt="João"
            className="w-20 h-20 rounded-full mb-4"
          />
          <h3 className="font-bold text-gray-900 mb-2">João</h3>
          <p className="italic text-gray-700 text-center">
            Sempre quis trabalhar com carros e curtia computação, mas não sabia
            como conciliar isso. Achava que minhas dificuldades em matemática me
            atrapalhariam. Quando estava prestes a desistir, o Decisão Exata me
            mostrou o caminho.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex flex-col items-center">
          <img
            src={Beluce}
            alt="Beluce"
            className="w-20 h-20 rounded-full mb-4"
          />
          <h3 className="font-bold text-gray-900 mb-2">Beluce</h3>
          <p className="italic text-gray-700 text-center">
            Sempre gostei de Fórmula 1 e pensei: “Óbvio, vou fazer Engenharia
            Mecânica.” Mas, quando comecei, percebi que minha verdadeira
            afinidade era com Engenharia de Produção. Só que para entender isso
            precisei voltar ao cursinho.
          </p>
        </div>
      </div>
      <button
        onClick={() =>
          document.getElementById("payment-offer").scrollIntoView({
            behavior: "smooth",
          })
        }
        className="mt-20 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-xl transition-all duration-200"
      >
        Quero Meu Acesso
      </button>
    </div>
  </motion.section>
);

export default TestimonialsSection;
