import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import RelatorioImage from "../../assets/Relatorio.png";
import EbookDicasImage from "../../assets/EbookDicas.png";
import Grafico from "../../assets/grafico_resultado.png"; // Importing the chart image

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const WhatYouGetSection = () => (
  <motion.section
    initial="hidden"
    animate="visible"
    variants={sectionVariant}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 text-center"
  >
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
        Desbloqueie Seu Potencial Completo
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
        Ao adquirir seu resultado premium, você não recebe apenas uma análise
        superficial — você ganha acesso ao seu relatório completo, repleto de
        insights detalhados sobre suas áreas de maior destaque e tudo o que
        precisa para transformar sua carreira.
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-500 mb-6">
        Você recebe:
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {/* Card 1: Relatório Premium Completo */}
        <div className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-full max-w-[160px]">
            <img
              src={RelatorioImage}
              alt="Relatório Premium Completo"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">
            Relatório Premium Completo
          </h3>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1 mt-2 text-left">
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Habilidades necessárias
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Comparativos salariais
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Onde você consegue trabalhar
            </li>
          </ul>
        </div>

        {/* Card 2: E-book “Dicas Para Fuvest” */}
        <div className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-full max-w-[160px] relative">
            <img
              src={EbookDicasImage}
              alt="E-book Dicas Para Fuvest"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
              Bônus
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">
            E-book “Dicas Para Fuvest”
          </h3>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1 mt-2 text-left">
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Escrito por alunos da USP
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Estratégias e segredos
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Conquiste sua vaga
            </li>
          </ul>
        </div>

        {/* Card 3: Seu Mapeamento Personalizado (Chart) */}
        <div className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-full max-w-[160px]">
            <img
              src={Grafico}
              alt="Mapeamento Personalizado"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">
            Seu Mapeamento Personalizado
          </h3>
          <ul className="text-sm sm:text-base text-gray-700 space-y-1 mt-2 text-left">
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Representação visual das suas aptidões
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Comparação com áreas profissionais
            </li>
            <li className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2" />
              Insight detalhado sobre seu perfil
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={() =>
            document
              .getElementById("payment-offer")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200"
        >
          Acesse agora!
        </button>
      </div>
    </div>
  </motion.section>
);

export default WhatYouGetSection;
