// /componetes/result/ResultDetails.jsx
import { motion } from "framer-motion";
import { FaChevronRight, FaArrowDown } from "react-icons/fa";
import getAreaIcon from "../../components/AreaIcon";

const ResultDetails = ({
  detailsRef,
  scrollRef,
  areasComPontuacao,
  showDownArrow,
  isAtBottom,
  handleArrowClick,
  setSelectedCourse,
}) => {
  return (
    <section ref={detailsRef} className="w-full bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Seus Resultados em Detalhe
          </motion.h2>
          <div className="mt-2 border-b-4 border-blue-600 w-24 mx-auto"></div>
          <motion.p
            className="mt-4 text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Descubra quais áreas se destacam no seu perfil e veja as principais
            opções para cada uma.
          </motion.p>
        </div>
        <div className="relative">
          <div ref={scrollRef} className="w-full pb-6">
            <div className="flex flex-col space-y-8">
              {areasComPontuacao.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-cyan-50 py-6 px-6 sm:px-12 rounded-md shadow-sm transition hover:shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-3">{getAreaIcon(item.area.area)}</div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-black font-montserrat">
                      {index + 1}. {item.area.area}
                    </h3>
                  </div>
                  <hr className="my-3 border-gray-300" />
                  <ul className="mt-4 list-none pl-0 text-justify space-y-6">
                    {item.area.cursos.slice(0, 3).map((curso, i) => (
                      <li key={i} className="border-b border-gray-200 pb-5">
                        <div className="text-lg sm:text-xl text-black font-bold font-montserrat mb-1">
                          {curso.nome}
                        </div>
                        <p className="text-base sm:text-lg text-gray-700 font-questrial">
                          {curso.resumo}
                        </p>
                        <div
                          onClick={() => setSelectedCourse(curso)}
                          className="inline-flex items-center text-base sm:text-lg font-bold text-blue-500 font-questrial mt-3 cursor-pointer hover:underline"
                        >
                          Ver mais
                          <FaChevronRight className="ml-1 text-sm" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          {showDownArrow && !isAtBottom && (
            <div
              onClick={handleArrowClick}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-600 animate-bounce cursor-pointer z-20"
            >
              <FaArrowDown className="text-2xl" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResultDetails;
