import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FaLaptopCode, FaBolt, FaRobot, FaPlane, FaChalkboardTeacher,
  FaIndustry, FaCubes, FaBuilding, FaLeaf, FaMoneyBillWave,
  FaCalculator, FaFlask, FaDatabase, FaMicrochip, FaAtom,
  FaComments, FaGlobe, FaBriefcase, FaChalkboardTeacher as FaDidatica, FaChartArea, 
  FaChevronRight, FaArrowDown
} from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import Grafico from "../components/Grafico";
import Email from "./Email";
import areasConhecimento from '../data/areas_cursos.json';

/** Icon resolution logic */
function getAreaIcon(areaName) {
  const lower = areaName.toLowerCase();
  if (lower.includes('comput')) return <FaLaptopCode className="text-2xl text-jornadas-blue" />;
  if (lower.includes('elétrica')) return <FaBolt className="text-2xl text-yellow-500" />;
  if (lower.includes('mecatrônica') || lower.includes('mecânica')) return <FaRobot className="text-2xl text-gray-700" />;
  if (lower.includes('aeronáutica')) return <FaPlane className="text-2xl text-blue-500" />;
  if (lower.includes('licenciatura')) return <FaChalkboardTeacher className="text-2xl text-green-600" />;
  if (lower.includes('produção')) return <FaIndustry className="text-2xl text-red-500" />;
  if (lower.includes('materiais')) return <FaCubes className="text-2xl text-purple-500" />;
  if (lower.includes('civil')) return <FaBuilding className="text-2xl text-indigo-500" />;
  if (lower.includes('ambiental')) return <FaLeaf className="text-2xl text-green-500" />;
  return <FaLaptopCode className="text-2xl text-jornadas-blue" />;
}

function getSalaryStars(mediaSalarialText) {
  const pattern = /R\$[\s]*([\d.,]+)/gi;
  let match;
  let maxValue = 0;

  while ((match = pattern.exec(mediaSalarialText)) !== null) {
    const numericString = match[1].replace(/\./g, '').replace(/,/g, '.'); 
    const val = parseFloat(numericString);
    if (val && val > maxValue) {
      maxValue = val;
    }
  }

  if (!maxValue) {
    return 3;
  }
  if (maxValue < 3000) return 1;
  if (maxValue < 6000) return 2;
  if (maxValue < 10000) return 3;
  if (maxValue < 15000) return 4;
  return 5;
}

function getSkillIcon(skill) {
  const lower = skill.toLowerCase();
  if (lower.includes('matemática')) return <FaCalculator className="text-jornadas-blue mr-2" />;
  if (lower.includes('estatística')) return <FaChartArea className="text-jornadas-blue mr-2" />;
  if (lower.includes('química')) return <FaFlask className="text-jornadas-blue mr-2" />;
  if (lower.includes('física')) return <FaAtom className="text-jornadas-blue mr-2" />;
  if (lower.includes('banco')) return <FaDatabase className="text-jornadas-blue mr-2" />;
  if (lower.includes('eletrônica')) return <FaMicrochip className="text-jornadas-blue mr-2" />;
  if (lower.includes('inglês')) return <FaGlobe className="text-jornadas-blue mr-2" />;
  if (lower.includes('comunicação')) return <FaComments className="text-jornadas-blue mr-2" />;
  if (lower.includes('gestão')) return <FaBriefcase className="text-jornadas-blue mr-2" />;
  if (lower.includes('didática')) return <FaDidatica className="text-jornadas-blue mr-2" />;
  if (lower.includes('programação')) return <FaLaptopCode className="text-jornadas-blue mr-2" />;
  return <FaLaptopCode className="text-jornadas-blue mr-2" />;
}

function SkillChart({ habilidades }) {
  if (!habilidades) return null;
  const skillNames = Object.keys(habilidades);
  if (skillNames.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-md mb-8 shadow">
      <div className="flex items-center mb-2 text-gray-700 font-bold">
        <span className="text-lg">Habilidades Importantes</span>
      </div>
      <div className="space-y-4 mt-2">
        {skillNames.map((skill) => {
          const rating = habilidades[skill];
          const widthPercent = (rating / 5) * 100;
          return (
            <div key={skill}>
              <div className="flex items-center mb-1">
                {getSkillIcon(skill)}
                <span className="font-semibold text-gray-900 font-questrial">{skill}</span>
              </div>
              <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
                <div className="bg-jornadas-blue h-3" style={{ width: `${widthPercent}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Result({ pontuacaoTotal, type, updatePagina }) {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  // States for main scrollable area
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollRef = useRef(null);

  // States for the course modal (popup) scrollable content
  const modalScrollRef = useRef(null);
  const [showModalDownArrow, setShowModalDownArrow] = useState(false);
  const [isModalAtBottom, setIsModalAtBottom] = useState(false);

  // Decide which button label and text to show
  const isTotal = type === 'total';
  const buttonContent = isTotal ? "Exportar resultados" : "Próxima pergunta";
  const resultTitle = isTotal ? "Resultados" : "Você está quase lá!";
  const description = isTotal
    ? "Pronto, seus resultados estão na mão!"
    : "Você está indo muito bem! Por enquanto, vamos te dar um spoiler:";

  // Main button handler (Export / Next)
  const handleButton = () => {
    if (type === 'parcial') {
      updatePagina(1);
    } else {
      setIsExportModalOpen(true);
    }
  };

  // Course modal functions
  const openCourseModal = (curso) => {
    setCursoSelecionado(curso);
    setIsCourseModalOpen(true);
  };
  const closeCourseModal = () => {
    setCursoSelecionado(null);
    setIsCourseModalOpen(false);
  };

  // Export modal functions
  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  // Utility: Close modal if user clicks outside
  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) {
      closeFunction();
    }
  };

  // Build array of areas with scores
  const areasComPontuacao = areasConhecimento.map((area, index) => ({
    area,
    pontuacao: pontuacaoTotal[index],
  }));
  areasComPontuacao.sort((a, b) => b.pontuacao - a.pontuacao);

  // Main scrollable container arrow logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    if (container.scrollHeight > container.clientHeight) {
      setShowDownArrow(true);
    }
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 2);
    };
    container.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleArrowClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  // Modal (popup) scrollable container arrow logic
  useEffect(() => {
    if (!isCourseModalOpen) return;
    const container = modalScrollRef.current;
    if (!container) return;
    if (container.scrollHeight > container.clientHeight) {
      setShowModalDownArrow(true);
    }
    const handleModalScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsModalAtBottom(scrollHeight - scrollTop <= clientHeight + 2);
    };
    container.addEventListener('scroll', handleModalScroll);
    handleModalScroll();
    return () => container.removeEventListener('scroll', handleModalScroll);
  }, [isCourseModalOpen]);

  const handleModalArrowClick = () => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollBy({ top: 100, behavior: 'smooth' });
    }
  };

  const shouldShowDownArrow = showDownArrow && !isAtBottom;
  const shouldShowModalDownArrow = showModalDownArrow && !isModalAtBottom;

  return (
    <div id="result_id" className="w-full h-fit flex flex-col items-center mb-10 p-4 relative">
      {/* Title + Description */}
      <div className="text-center max-w-4xl">
        <h1 className="mt-5 text-black text-4xl sm:text-5xl font-extrabold font-montserrat">
          {resultTitle}
        </h1>
        <h2 className="text-black text-xl sm:text-2xl font-bold font-questrial mt-3">
          {description}
        </h2>
      </div>

      {/* Chart */}
      <Grafico pontuacaoTotal={pontuacaoTotal} type={type} />

      {/* Main Button (Exportar / Próxima Pergunta) */}
      <button
        onClick={handleButton}
        className="mt-6 mb-6 px-6 py-3 font-bold bg-jornadas-blue text-white rounded-lg transition-all duration-150 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105"
      >
        {buttonContent}
      </button>

      {/* If it's the final result, show the list of areas/courses */}
      {isTotal && (
        <div className="flex flex-col w-full max-w-4xl mt-4">
          <div className="text-center font-questrial px-2">
            <h1 className="text-2xl font-extrabold mb-2">Guia de Áreas</h1>
            <p className="text-lg font-semibold text-gray-700">
              Para aprender mais a respeito de cada área e se direcionar na plataforma,
              dê uma olhada no nosso guia:
            </p>
          </div>

          {/* Scrollable container with down arrow */}
          <div className="relative">
            <div
              ref={scrollRef}
              className="mt-6 w-full px-2 max-h-[80vh] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded"
            >
              <div className="flex flex-col space-y-8">
                {areasComPontuacao.map((item, index) => (
                  <div
                    key={index}
                    className="bg-cyan-50 py-6 px-6 sm:px-12 rounded-md shadow-sm"
                  >
                    {/* Top row: area icon + area name */}
                    <div className="flex items-center mb-4">
                      <div className="mr-3">
                        {getAreaIcon(item.area.area)}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-black font-montserrat">
                        {index + 1}. {item.area.area}
                      </h2>
                    </div>

                    <hr className="my-3 border-gray-300" />

                    {/* List of courses in this area */}
                    <ul className="mt-4 list-none pl-0 text-justify space-y-6">
                      {item.area.cursos.map((curso, cursoIndex) => (
                        <li key={cursoIndex} className="border-b border-gray-200 pb-5">
                          <div className="text-lg sm:text-xl text-black font-bold font-montserrat mb-1">
                            {curso.nome}
                          </div>
                          <p className="text-base sm:text-lg text-gray-700 font-questrial">
                            {curso.resumo}
                          </p>
                          <div
                            onClick={() => openCourseModal(curso)}
                            className="inline-flex items-center text-base sm:text-lg font-bold text-blue-500 font-questrial mt-3 cursor-pointer hover:underline"
                          >
                            Ver mais
                            <FaChevronRight className="ml-1 text-sm" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Down Arrow for main content */}
            {shouldShowDownArrow && (
              <div
                onClick={handleArrowClick}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 animate-bounce cursor-pointer z-20"
              >
                <FaArrowDown className="text-2xl" />
              </div>
            )}
          </div>

          {/* Segundo botão "Exportar Resultados" no final */}
          <button
            onClick={handleButton}
            className="mt-6 px-6 py-3 font-bold bg-jornadas-blue text-white rounded-lg transition-all duration-150 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105"
          >
            {buttonContent}
          </button>

        </div>
      )}

      {/* =================== COURSE MODAL (Pop-up) =================== */}
      {isCourseModalOpen && cursoSelecionado && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={(e) => handleOverlayClick(e, closeCourseModal)}
        >
          {/* Wrap the scrollable content and arrow in an outer relative container */}
          <div className="relative w-full max-w-3xl">
            <div
              ref={modalScrollRef}
              className="bg-cyan-50 rounded-lg overflow-y-auto max-h-[90vh] px-6 py-5 sm:px-8 sm:py-7 md:px-10 md:py-8 shadow-xl"
            >
              {/* Close (X) button */}
              <button
                onClick={closeCourseModal}
                className="absolute top-4 right-4 font-extrabold text-xl px-3 py-1 bg-gray-300 rounded-lg transition-all duration-150 ease-in-out hover:bg-gray-400 hover:scale-105"
              >
                X
              </button>

              {/* Optional course image */}
              {cursoSelecionado.imagem && (
                <img
                  src={cursoSelecionado.imagem}
                  alt={cursoSelecionado.nome}
                  className="w-full h-70 sm:h-85 object-cover rounded-md mb-8"
                />
              )}

              {/* Course Title */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black mb-6 font-montserrat">
                {cursoSelecionado.nome}
              </h3>

              <hr className="my-3 border-gray-300" />

              {/* Course Description */}
              <p className="text-lg sm:text-xl text-gray-800 mb-8 text-left font-questrial font-semibold leading-relaxed">
                {cursoSelecionado.descricao}
              </p>

              {/* Salary + Star Rating */}
              <div className="bg-white p-4 rounded-md mb-8 shadow">
                <div className="flex items-center mb-2 text-gray-700 font-bold">
                  <FaMoneyBillWave className="text-green-500 mr-2" />
                  <span className="text-lg">Faixa Salarial</span>
                </div>
                <div className="flex items-center">
                  {(() => {
                    const stars = getSalaryStars(cursoSelecionado.media_salarial || '');
                    return (
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const Icon = idx < stars ? AiFillStar : AiOutlineStar;
                          return (
                            <Icon
                              key={idx}
                              className="text-yellow-400 text-xl mr-1"
                            />
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
                <p className="text-sm text-gray-700 font-questrial mt-2 font-semibold">
                  {cursoSelecionado.media_salarial}
                </p>
              </div>

              {/* Skills */}
              <SkillChart habilidades={cursoSelecionado.habilidades} />

              {/* Typical Job Positions */}
              <h4 className="text-xl sm:text-2xl font-bold font-montserrat text-black mt-6 mb-4">
                Cargos Típicos
              </h4>
              <ul className="list-disc pl-5 mb-8 text-left font-questrial space-y-3">
                {cursoSelecionado.cargos.map((cargo, i) => (
                  <li key={i} className="text-gray-800 text-base sm:text-lg font-semibold">
                    <strong>{cargo.cargo}:</strong> {cargo.descricao}
                  </li>
                ))}
              </ul>

              {/* Student Profile */}
              <h4 className="text-xl sm:text-2xl font-bold font-montserrat text-black mt-6 mb-3">
                Perfil do Estudante
              </h4>
              <p className="text-lg sm:text-xl text-gray-800 mb-8 text-justify font-questrial font-semibold leading-relaxed">
                {cursoSelecionado.perfil_estudante}
              </p>

              {/* Bottom Close Button */}
              <button
                onClick={closeCourseModal}
                className="mt-2 px-5 py-3 bg-jornadas-blue text-white rounded-lg transition-all duration-150 ease-in-out hover:bg-jornadas-blue-dark hover:scale-105 font-bold"
              >
                Fechar
              </button>
            </div>

            {/* Down Arrow for modal content positioned outside the scrollable area */}
            {shouldShowModalDownArrow && (
              <div
                onClick={handleModalArrowClick}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 animate-bounce cursor-pointer z-20"
              >
                <FaArrowDown className="text-2xl md:text-3xl" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================== EXPORT MODAL =================== */}
      {isExportModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={(e) => handleOverlayClick(e, closeExportModal)}
        >
          <div
            className="relative bg-cyan-50 w-full max-w-md rounded-lg overflow-auto max-h-[90vh] px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-8 leading-relaxed hyphens-auto break-words text-base shadow-xl"
          >
            {/* Close (X) button */}
            <button
              onClick={closeExportModal}
              className="absolute top-4 right-4 font-extrabold text-xl px-3 py-1 bg-gray-300 rounded-lg transition-all duration-150 ease-in-out hover:bg-gray-400 hover:scale-105"
            >
              X
            </button>

            <h1 className="font-extrabold text-xl sm:text-2xl text-center mb-6 text-gray-800">
              Exportar Resultados
            </h1>

            {/* Email component */}
            <Email pontuacaoTotal={pontuacaoTotal} onClose={closeExportModal} />
          </div>
        </div>
      )}
    </div>
  );
}

Result.propTypes = {
  pontuacaoTotal: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  updatePagina: PropTypes.func.isRequired,
};

export default Result;
