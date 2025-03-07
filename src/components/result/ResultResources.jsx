// src/components/result/ResultResources.jsx

import React, { useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { usePersistedState } from "../../hooks/usePersistedState";
import { ResultContext } from "../../context/ResultContext";
import areasConhecimento from "../../data/areas_cursos.json";

// Free material for download
import EbookDicasImage from "../../assets/EbookDicas.png";
import EbookDicasPdf from "../../assets/EbookDicas.pdf";

// Static GD ebook: "A Realidade dos Salários"
import EbookSalariosImage from "../../assets/EbookSalarios.png";
import EbookSalariosPdf from "../../assets/EbookSalarios.pdf";

// Dynamic ebook mapping for course-based GD ebooks
import ebookMapping from "../../mappings/ebookMapping";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const ResultResources = () => {
  // Retrieve purchased bumps from persistent state
  const [purchasedBumps] = usePersistedState("purchasedBumps", []);
  // Retrieve test results from context (assumed to be an array of scores)
  const { result } = useContext(ResultContext);

  // Debug logs – remove in production
  useEffect(() => {
    console.log("Purchased bumps:", purchasedBumps);
    console.log("Test result (scores):", result);
  }, [purchasedBumps, result]);

  // Compute top areas based on test results
  const finalPontuacaoTotal = result || [];
  const areasComPontuacao = areasConhecimento
    .map((area, idx) => ({
      area,
      pontuacao: finalPontuacaoTotal[idx] || 0,
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao);

  // Recommended course is the first course of the top scoring area
  const recommendedCourse =
    areasComPontuacao.length > 0 && areasComPontuacao[0].area.cursos.length > 0
      ? areasComPontuacao[0].area.cursos[0]
      : null;

  // Determine purchased flags from order bumps
  const userHasAllGuides = purchasedBumps.includes("all-guides");
  const userHasEbookSalarios = purchasedBumps.includes("ebook-salarios");
  const userHasDynamicEbook = purchasedBumps.includes("ebook-bump");

  // Lookup dynamic ebook based on recommended course
  let dynamicEbook = null;
  if (userHasDynamicEbook && recommendedCourse && recommendedCourse.nome) {
    if (ebookMapping[recommendedCourse.nome]) {
      dynamicEbook = ebookMapping[recommendedCourse.nome];
    }
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
          Baixe seu Material Exclusivo!
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
          Confira os materiais gratuitos que preparamos para aprofundar seus
          conhecimentos e transformar sua jornada.
        </p>

        {/* FREE MATERIALS in a list style */}
        <ul className="flex flex-col gap-6">
          <li className="flex items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="w-32 mr-6 relative flex-shrink-0">
              <img
                src={EbookDicasImage}
                alt="E-book Dicas Para Fuvest"
                className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                Bônus
              </span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-800">
                E-book “Dicas Para Fuvest”
              </h3>
              <p className="text-gray-700 my-2">
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
          </li>
          {/* Add more free material list items here if needed */}
        </ul>

        {/* PURCHASED MATERIALS */}
        {(userHasAllGuides || userHasEbookSalarios || dynamicEbook) && (
          <>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 my-12">
              Materiais Adicionais
            </h2>
            <ul className="flex flex-col gap-6">
              {userHasAllGuides ? (
                // Render ALL ebooks from ebookMapping if "all-guides" was purchased
                Object.keys(ebookMapping).map((key) => {
                  const ebook = ebookMapping[key];
                  return (
                    <li
                      key={key}
                      className="flex items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="w-32 mr-6 relative flex-shrink-0">
                        <img
                          src={ebook.cover}
                          alt={ebook.title}
                          className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        />
                        <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                          GD
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-800">
                          {ebook.title}
                        </h3>
                        <p className="text-gray-700 my-2">
                          {ebook.description}
                        </p>
                        <a
                          href={ebook.pdf}
                          download={`${ebook.title}.pdf`}
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
                        >
                          <FaDownload className="mr-2" /> Baixar
                        </a>
                      </div>
                    </li>
                  );
                })
              ) : (
                <>
                  {userHasEbookSalarios && (
                    <li className="flex items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="w-32 mr-6 relative flex-shrink-0">
                        <img
                          src={EbookSalariosImage}
                          alt="E-book A Realidade dos Salários"
                          className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        />
                        <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                          Bônus
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-800">
                          E-book “A Realidade dos Salários”
                        </h3>
                        <p className="text-gray-700 my-2">
                          Desmistifique os números e descubra seu potencial
                          financeiro.
                        </p>
                        <a
                          href={EbookSalariosPdf}
                          download="Ebook_A_Realidade_dos_Salarios.pdf"
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
                        >
                          <FaDownload className="mr-2" /> Baixar
                        </a>
                      </div>
                    </li>
                  )}
                  {dynamicEbook && (
                    <li className="flex items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="w-32 mr-6 relative flex-shrink-0">
                        <img
                          src={dynamicEbook.cover}
                          alt={dynamicEbook.title}
                          className="w-full h-auto object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                        />
                        <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                          GD
                        </span>
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-bold text-gray-800">
                          {dynamicEbook.title}
                        </h3>
                        <p className="text-gray-700 my-2">
                          {dynamicEbook.description}
                        </p>
                        <a
                          href={dynamicEbook.pdf}
                          download={`${dynamicEbook.title}.pdf`}
                          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
                        >
                          <FaDownload className="mr-2" /> Baixar
                        </a>
                      </div>
                    </li>
                  )}
                </>
              )}
            </ul>
          </>
        )}
      </div>
    </motion.section>
  );
};

export default ResultResources;
