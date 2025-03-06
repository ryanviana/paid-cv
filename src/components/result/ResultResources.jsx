// /componetes/result/ResultResources.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import EbookDicasImage from "../../assets/EbookDicas.png";
import EbookSalariosImage from "../../assets/EbookSalarios.png";
import EbookDicasPdf from "../../assets/EbookDicas.pdf";
import EbookSalariosPdf from "../../assets/EbookSalarios.pdf";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ResultResources = () => (
  <motion.section
    initial="hidden"
    animate="visible"
    variants={sectionVariant}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 text-center"
  >
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
        Baixe seu Material Exclusivo!
      </h2>
      <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
        Confira os materiais que preparamos para aprofundar seus conhecimentos e
        transformar sua jornada.
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Card 1: E-book “Dicas Para Fuvest” */}
        <div className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-full max-w-[160px]">
            <img
              src={EbookDicasImage}
              alt="E-book Dicas Para Fuvest"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">
            E-book “Dicas Para Fuvest”
          </h3>
          <p className="text-gray-700 mt-2 mb-4">
            Estratégias e segredos para conquistar sua vaga.
          </p>
          <a
            href={EbookDicasPdf}
            download="Ebook_Dicas_Para_Fuvest.pdf"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            <FaDownload className="mr-2" /> Baixar
          </a>
        </div>

        {/* Card 2: E-book “A Realidade dos Salários” */}
        <div className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
          <div className="w-full max-w-[160px]">
            <img
              src={EbookSalariosImage}
              alt="E-book A Realidade dos Salários"
              className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-4">
            E-book “A Realidade dos Salários”
          </h3>
          <p className="text-gray-700 mt-2 mb-4">
            Desmistifique os números e descubra seu potencial.
          </p>
          <a
            href={EbookSalariosPdf}
            download="Ebook_A_Realidade_dos_Salarios.pdf"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            <FaDownload className="mr-2" /> Baixar
          </a>
        </div>
      </div>
    </div>
  </motion.section>
);

export default ResultResources;
