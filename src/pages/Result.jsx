import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FaLaptopCode, FaBolt, FaRobot, FaPlane, FaChalkboardTeacher,
  FaIndustry, FaCubes, FaBuilding, FaLeaf, FaMoneyBillWave,
  FaCalculator, FaFlask, FaDatabase, FaMicrochip, FaAtom,
  FaComments, FaGlobe, FaBriefcase, FaChalkboardTeacher as FaDidatica, FaChartArea
} from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import Grafico from "../components/Grafico";
import Email from "./Email";
import areasConhecimento from '../data/areas_cursos.json';

/**
 * Pick an icon for each "Área" (e.g., Computação, Elétrica, etc.)
 */
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

/**
 * Find the highest numeric salary figure from the text and return a "potential" rating [1..5].
 */
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

  // If we never find anything, default to 3 stars
  if (!maxValue) {
    return 3;
  }
  // 1 star for < 3k, 2 for < 6k, 3 for <10k, 4 for <15k, 5 for >= 15k
  if (maxValue < 3000) return 1;
  if (maxValue < 6000) return 2;
  if (maxValue < 10000) return 3;
  if (maxValue < 15000) return 4;
  return 5;
}

/**
 * Icons for each possible skill. Feel free to expand or adjust!
 */
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
  return <FaLaptopCode className="text-jornadas-blue mr-2" />; // default
}

/**
 * A skill chart with horizontal bars for each skill rating (1–5).
 * No numeric rating displayed—only the bar + an icon for each skill.
 */
function SkillChart({ habilidades }) {
  if (!habilidades) return null;

  const skillNames = Object.keys(habilidades);
  if (skillNames.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded-md mb-6 shadow">
      <div className="flex items-center mb-2 text-gray-700 font-bold">
        <span className="text-lg">Habilidades Importantes</span>
      </div>
      <div className="space-y-4 mt-2">
        {skillNames.map((skill) => {
          const rating = habilidades[skill];
          // rating from 1..5 => 0..100% width
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

  // Decide which button label and text to show
  const isTotal = type === 'total';
  const buttonContent = isTotal ? "Exportar resultados" : "Próxima pergunta";
  const resultTitle = isTotal ? "Resultados" : "Você está quase lá!";
  const description = isTotal
    ? "Pronto, seus resultados estão na mão!"
    : "Você está indo muito bem! Por enquanto, vamos te dar um spoiler:";

  // Handle main button
  const handleButton = () => {
    if (type === 'parcial') {
      updatePagina(1);
    } else {
      setIsExportModalOpen(true);
    }
  };

  // Handle Course Modal
  const openCourseModal = (curso) => {
    setCursoSelecionado(curso);
    setIsCourseModalOpen(true);
  };
  const closeCourseModal = () => {
    setCursoSelecionado(null);
    setIsCourseModalOpen(false);
  };

  // Handle Export Modal
  const openExportModal = () => setIsExportModalOpen(true);
  const closeExportModal = () => setIsExportModalOpen(false);

  // Close if user clicks outside the modal container
  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget) {
      closeFunction();
    }
  };

  // Build an array of areas + pontuação
  const areasComPontuacao = areasConhecimento.map((area, index) => ({
    area,
    pontuacao: pontuacaoTotal[index],
  }));
  // Sort in descending order
  areasComPontuacao.sort((a, b) => b.pontuacao - a.pontuacao);

  return (
    <div id="result_id" className="w-full h-fit flex flex-col items-center mb-10 p-4">
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
        className="
          mt-6
          mb-6
          px-6
          py-3
          font-bold
          bg-jornadas-blue
          text-white
          rounded-lg
          transition-all
          duration-150
          ease-in-out
          hover:bg-jornadas-blue-dark
          hover:scale-105
        "
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

          <div className="mt-6 w-full px-2">
            {areasComPontuacao.map((item, index) => (
              <div
                key={index}
                className="mt-8 bg-cyan-50 py-6 px-6 sm:px-12 rounded-md shadow-sm"
              >
                {/* Top row: area icon + area name */}
                <div className="flex items-center mb-4">
                  <div className="mr-3">
                    {getAreaIcon(item.area.area)}
                  </div>
                  <h2
                    className="
                      text-xl
                      sm:text-2xl
                      font-extrabold
                      text-black
                      font-montserrat
                    "
                  >
                    {index + 1}. {item.area.area}
                  </h2>
                </div>

                <hr className="my-3 border-gray-300" />

                {/* List of courses in this area */}
                <ul className="mt-4 list-none pl-0 text-justify space-y-6">
                  {item.area.cursos.map((curso, cursoIndex) => (
                    <li key={cursoIndex} className="border-b border-gray-200 pb-5">
                      <div
                        className="
                          text-lg
                          sm:text-xl
                          text-black
                          font-bold
                          font-montserrat
                          mb-1
                        "
                      >
                        {curso.nome}
                      </div>
                      <p
                        className="
                          text-base
                          sm:text-lg
                          text-gray-700
                          font-questrial
                        "
                      >
                        {curso.resumo}
                      </p>
                      <div
                        onClick={() => openCourseModal(curso)}
                        className="
                          inline-flex
                          items-center
                          text-base
                          sm:text-lg
                          font-bold
                          text-blue-500
                          font-questrial
                          mt-3
                          cursor-pointer
                          hover:underline
                        "
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
      )}

      {/* ============ MODAL: CURSO SELECIONADO =========== */}
      {isCourseModalOpen && cursoSelecionado && (
        <div
          className="
            fixed
            inset-0
            bg-black
            bg-opacity-70
            flex
            justify-center
            items-center
            z-50
            p-4
          "
          onClick={(e) => handleOverlayClick(e, closeCourseModal)}
        >
          <div
            className="
              relative
              bg-cyan-50
              w-full
              max-w-3xl
              rounded-lg
              overflow-y-auto
              max-h-[90vh]
              px-6
              py-5
              sm:px-8
              sm:py-7
              md:px-10
              md:py-8
              shadow-xl
            "
          >
            {/* Close (X) top-right */}
            <button
              onClick={closeCourseModal}
              className="
                absolute
                top-4
                right-4
                font-extrabold
                text-xl
                px-3
                py-1
                bg-gray-300
                rounded-lg
                transition-all
                duration-150
                ease-in-out
                hover:bg-gray-400
                hover:scale-105
              "
            >
              X
            </button>

            {/* Course image, if present */}
            {cursoSelecionado.imagem && (
              <img
                src={cursoSelecionado.imagem}
                alt={cursoSelecionado.nome}
                className="w-full h-48 sm:h-64 object-cover rounded-md mb-4"
              />
            )}

            {/* Title */}
            <h3
              className="
                text-2xl
                sm:text-3xl
                font-extrabold
                text-black
                mb-4
                font-montserrat
              "
            >
              {cursoSelecionado.nome}
            </h3>

            <hr className="my-2 border-gray-300" />

            {/* Just the description (no heading) */}
            <p className="text-lg sm:text-xl text-gray-800 mb-6 text-left font-questrial font-semibold leading-relaxed">
              {cursoSelecionado.descricao}
            </p>

            {/* Salary + Star Rating */}
            <div className="bg-white p-4 rounded-md mb-6 shadow">
              <div className="flex items-center mb-2 text-gray-700 font-bold">
                <FaMoneyBillWave className="text-green-500 mr-2" />
                <span className="text-lg">Faixa Salarial</span>
              </div>

              {/* Star rating row */}
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

            {/* Skills in a white box (no numeric rating, just the bar + icons) */}
            <SkillChart habilidades={cursoSelecionado.habilidades} />

            {/* Cargos típicos */}
            <h4 className="text-xl sm:text-2xl font-bold font-montserrat text-black mt-4 mb-3">
              Cargos Típicos
            </h4>
            <ul className="list-disc pl-5 mb-6 text-left font-questrial space-y-2">
              {cursoSelecionado.cargos.map((cargo, i) => (
                <li key={i} className="text-gray-800 text-base sm:text-lg font-semibold">
                  <strong>{cargo.cargo}:</strong> {cargo.descricao}
                </li>
              ))}
            </ul>

            {/* Perfil do estudante */}
            <h4 className="text-xl sm:text-2xl font-bold font-montserrat text-black mt-4 mb-2">
              Perfil do Estudante
            </h4>
            <p className="text-lg sm:text-xl text-gray-800 mb-6 text-justify font-questrial font-semibold leading-relaxed">
              {cursoSelecionado.perfil_estudante}
            </p>

            {/* Bottom close button */}
            <button
              onClick={closeCourseModal}
              className="
                mt-2
                px-5
                py-3
                bg-jornadas-blue
                text-white
                rounded-lg
                transition-all
                duration-150
                ease-in-out
                hover:bg-jornadas-blue-dark
                hover:scale-105
                font-bold
              "
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* ============ MODAL: EXPORTAR ============ */}
      {isExportModalOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black
            bg-opacity-70
            flex
            justify-center
            items-center
            z-50
            p-4
          "
          onClick={(e) => handleOverlayClick(e, closeExportModal)}
        >
          <div
            className="
              relative
              bg-cyan-50
              w-full
              max-w-md
              rounded-lg
              overflow-auto
              max-h-[90vh]
              px-6
              py-5
              sm:px-8
              sm:py-6
              md:px-10
              md:py-8
              leading-relaxed
              hyphens-auto
              break-words
              text-base
              shadow-xl
            "
          >
            {/* Close (X) top-right */}
            <button
              onClick={closeExportModal}
              className="
                absolute
                top-4
                right-4
                font-extrabold
                text-xl
                px-3
                py-1
                bg-gray-300
                rounded-lg
                transition-all
                duration-150
                ease-in-out
                hover:bg-gray-400
                hover:scale-105
              "
            >
              X
            </button>

            <h1
              className="
                font-extrabold
                text-xl
                sm:text-2xl
                text-center
                mb-6
                text-gray-800
              "
            >
              Exportar Resultados
            </h1>

            {/* The Email component with its own close logic, if desired */}
            <Email
              pontuacaoTotal={pontuacaoTotal}
              onClose={closeExportModal}
            />
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
