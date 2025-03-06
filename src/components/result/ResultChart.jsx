// /componetes/result/ResultChart.jsx
import { motion } from "framer-motion";
import { FaLock, FaShareAlt } from "react-icons/fa";
import Grafico from "../../components/Grafico";

const ResultChart = ({
  chartRef,
  isTotal,
  shouldUnlockResults,
  isPreview,
  finalPontuacaoTotal,
  type,
  prepareShare,
  handleNextQuestion,
  handleVoltar,
}) => {
  return (
    <section className="w-full bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 relative">
        <div
          ref={chartRef}
          className={`relative transition-all duration-300 ${
            isTotal && !shouldUnlockResults ? "filter blur-sm" : ""
          }`}
        >
          {isTotal && !shouldUnlockResults && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-8xl pointer-events-none">
              <FaLock />
            </div>
          )}
          <motion.h2
            className="text-2xl font-bold text-jornadas-blue mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Seu Resultado
          </motion.h2>
          <motion.div
            className="w-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Grafico pontuacaoTotal={finalPontuacaoTotal} type={type} />
          </motion.div>
          {isPreview && (
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={handleNextQuestion}
                className="px-8 py-4 font-bold bg-jornadas-blue text-white rounded-lg text-base sm:text-lg transition-all duration-150 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Próxima pergunta
              </button>
              <button
                onClick={handleVoltar}
                className="px-8 py-4 font-bold bg-gray-200 text-black rounded-lg text-base sm:text-lg transition-all duration-150 ease-in-out hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Voltar
              </button>
            </div>
          )}
        </div>
        {isTotal && shouldUnlockResults && (
          <motion.button
            onClick={prepareShare}
            className="mt-6 sm:mt-8 flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow font-semibold text-sm sm:absolute sm:right-4 sm:bottom-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <FaShareAlt />
            Compartilhe com seus amigos
          </motion.button>
        )}
      </div>
    </section>
  );
};

export default ResultChart;
