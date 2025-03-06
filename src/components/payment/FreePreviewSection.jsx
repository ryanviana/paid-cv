import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ResultContext } from "../../context/ResultContext";
import areasConhecimento from "../../data/areas_cursos.json";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const BlurredAreaCard = ({ data }) => {
  const areaName = data.area.area;
  const pontuacao = data.pontuacao;
  const course = data.area.cursos[0]; // Recommended course
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
      {/* Apply blur only inside this wrapper */}
      <div className="flex-1 text-left filter blur-md">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          {areaName}
        </h3>
        <p className="text-md sm:text-lg text-gray-600 mb-2">
          Pontuação: {pontuacao}
        </p>
        {course && (
          <>
            <h4 className="text-lg sm:text-xl font-bold text-gray-800">
              Curso: {course.nome}
            </h4>
            <p className="text-sm sm:text-base text-gray-700">
              {course.resumo}
            </p>
          </>
        )}
      </div>
      {course && course.imagem && (
        <div className="mt-4 md:mt-0 md:ml-6 filter blur-md">
          <img
            src={course.imagem}
            alt={course.nome}
            className="rounded-lg shadow-md w-40 h-40 sm:w-48 sm:h-48 object-cover"
          />
        </div>
      )}
    </div>
  );
};

const FreePreviewSection = () => {
  const { result } = useContext(ResultContext);
  let areasComPontuacao = [];
  if (result && result.length > 0) {
    const finalPontuacaoTotal = result;
    areasComPontuacao = areasConhecimento
      .map((area, idx) => ({
        area,
        pontuacao: finalPontuacaoTotal[idx] || 0,
      }))
      .sort((a, b) => b.pontuacao - a.pontuacao);
  }

  // Get the top three areas
  const topArea = areasComPontuacao[0] || null;
  const secondArea = areasComPontuacao[1] || null;
  const thirdArea = areasComPontuacao[2] || null;

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 text-center"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Sobre você
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Com base nas suas respostas, identificamos a área com maior potencial
          para você e selecionamos um curso recomendado. Desbloquie o resultado
          completo abaixo.
        </p>
        {topArea ? (
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center">
            <div className="flex-1 text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                Melhor Área: {topArea.area.area}
              </h3>
              <p className="text-md sm:text-lg text-gray-600 mb-2">
                Pontuação: {topArea.pontuacao}
              </p>
              {topArea.area.cursos[0] && (
                <>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-800">
                    Curso Recomendado: {topArea.area.cursos[0].nome}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700">
                    {topArea.area.cursos[0].resumo}
                  </p>
                </>
              )}
            </div>
            {topArea.area.cursos[0] && topArea.area.cursos[0].imagem && (
              <div className="mt-4 md:mt-0 md:ml-6 w-full flex justify-center md:w-auto">
                <img
                  src={topArea.area.cursos[0].imagem}
                  alt={topArea.area.cursos[0].nome}
                  className="rounded-lg shadow-md w-full sm:w-2/3 md:w-40 md:h-40 sm:w-48 sm:h-48 object-cover"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-md text-gray-600">
              Realize o teste para ver seu preview!
            </p>
          </div>
        )}
        {(secondArea || thirdArea) && (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {secondArea && <BlurredAreaCard data={secondArea} />}
            {thirdArea && <BlurredAreaCard data={thirdArea} />}
          </div>
        )}
        <div className="mt-6">
          <button
            onClick={() =>
              document
                .getElementById("payment-offer")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-200"
          >
            Desbloquear Resultado Completo
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default FreePreviewSection;
