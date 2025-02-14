import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  FaLaptopCode, FaBolt, FaRobot, FaPlane, FaChalkboardTeacher,
  FaIndustry, FaCubes, FaBuilding, FaLeaf, FaMoneyBillWave,
  FaCalculator, FaFlask, FaDatabase, FaMicrochip, FaAtom,
  FaComments, FaGlobe, FaBriefcase, FaChalkboardTeacher as FaDidatica, FaChartArea,
  FaChevronRight, FaArrowDown, FaWhatsapp, FaLock
} from 'react-icons/fa';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import html2canvas from 'html2canvas';

import Grafico from "../components/Grafico";
import areasConhecimento from '../data/areas_cursos.json';

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

function getSalaryStars(salario) {
  const salarioParaEstrelas = {
    "Altíssimo": 5,
    "Alto": 4,
    "Médio": 4,
    "Baixo": 3,
    "Baixíssimo": 2
  };
  return salarioParaEstrelas[salario] || 0;
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
    <div className="bg-white p-5 rounded-lg shadow-xl mb-8">
      <div className="flex items-center mb-3 text-gray-700 font-bold">
        <span className="text-lg">Habilidades Importantes</span>
      </div>
      <div className="space-y-4">
        {skillNames.map((skill) => {
          const rating = habilidades[skill];
          const widthPercent = (rating / 5) * 100;
          return (
            <div key={skill}>
              <div className="flex items-center mb-1">
                {getSkillIcon(skill)}
                <span className="font-semibold text-gray-900 font-questrial">{skill}</span>
              </div>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-jornadas-blue h-3 transition-all duration-300"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Result({ pontuacaoTotal, type, updatePagina }) {
  // Course modal and scrolling states
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const scrollRef = useRef(null);
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const modalScrollRef = useRef(null);
  const [showModalDownArrow, setShowModalDownArrow] = useState(false);
  const [isModalAtBottom, setIsModalAtBottom] = useState(false);
  const chartRef = useRef(null);

  // Lead info state
  const isTotal = type === 'total';
  const [userInfoSubmitted, setUserInfoSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [schoolYear, setSchoolYear] = useState('');

  // Retrieve career certainty (set earlier on LandingPage)
  const careerCertainty = localStorage.getItem("careerCertainty") || "Não informado";
  console.log("Retrieved careerCertainty from localStorage:", careerCertainty);

  // Share modal state
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePreviewImage, setSharePreviewImage] = useState('');

  const resultTitle = isTotal ? "Seu Futuro Te Aguarda" : "Você Está Quase Lá!";
  const description = isTotal
    ? "Desbloqueie sua jornada e descubra as áreas que vão impulsionar seu sucesso profissional!"
    : "Continue avançando para ver uma prévia do seu caminho brilhante.";

  /** Prepare share modal (capture chart) */
  const prepareShare = async () => {
    if (!chartRef.current) {
      alert('Gráfico não encontrado para compartilhar.');
      return;
    }
    try {
      const canvas = await html2canvas(chartRef.current, {
        useCORS: true,
        backgroundColor: "#ffffff",
        crossOrigin: "anonymous",
        scale: 2
      });
      const dataUrl = canvas.toDataURL('image/png');
      console.log("Chart captured as image.");
      setSharePreviewImage(dataUrl);
      setShowShareModal(true);
    } catch (error) {
      console.error('Erro ao preparar compartilhamento:', error);
      alert('Ocorreu um erro ao preparar o compartilhamento. Verifique se as imagens externas suportam CORS.');
    }
  };

  // WhatsApp share
  const handleWhatsAppShare = () => {
    const shareText = `Confira meu resultado vocacional e descubra seu verdadeiro potencial!
Faça o teste também: https://seusite.com/teste`;
    if (navigator.share && sharePreviewImage) {
      fetch(sharePreviewImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'resultado.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
              title: 'Meu Resultado Vocacional',
              text: shareText,
              files: [file]
            })
            .then(() => console.log('Compartilhado com sucesso via Web Share API'))
            .catch((err) => console.error('Erro ao compartilhar via Web Share API:', err));
          } else {
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
            window.open(whatsappUrl, '_blank');
          }
        })
        .catch(err => {
          console.error('Erro ao converter imagem:', err);
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
          window.open(whatsappUrl, '_blank');
        });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    }
    setShowShareModal(false);
  };

  // Build array of areas with scores
  const areasComPontuacao = areasConhecimento.map((area, index) => ({
    area,
    pontuacao: pontuacaoTotal[index],
  }));
  areasComPontuacao.sort((a, b) => b.pontuacao - a.pontuacao);

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
    scrollRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
  };

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
    modalScrollRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
  };

  const shouldShowDownArrow = showDownArrow && !isAtBottom;
  const shouldShowModalDownArrow = showModalDownArrow && !isModalAtBottom;

  const openCourseModal = (curso) => {
    setCursoSelecionado(curso);
    setIsCourseModalOpen(true);
    console.log("Opened course modal for:", curso.nome);
  };

  const closeCourseModal = () => {
    setCursoSelecionado(null);
    setIsCourseModalOpen(false);
    console.log("Closed course modal");
  };

  /**
   * When the user clicks "Revelar Agora", save the lead info and send an email to
   * jornadas.edtech@gmail.com with the following data:
   * - user_name, user_cellphone, user_schoolYear, careerCertainty, and score.
   * The UI unlocks immediately without waiting for the email request to complete.
   */
  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();
    if (!name || !cellphone || !schoolYear) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Submitting user info:", { name, cellphone, schoolYear });
    const userInfo = { name, cellphone, schoolYear };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));

    // Retrieve career certainty from localStorage
    const storedCertainty = localStorage.getItem("careerCertainty") || "Não informado";
    console.log("Using careerCertainty:", storedCertainty);

    try {
      console.log("Calling save-results endpoint...");
      await axios.post('https://cv.backend.decisaoexata.com/save-results', {
        score: pontuacaoTotal,
        user_email: "jornadas.edtech@gmail.com",
        user_name: name,
        user_cellphone: cellphone,
        user_schoolYear: schoolYear,
        user_careerChoiceCertainty: storedCertainty
      });
      console.log("Results saved successfully.");
      console.log("Calling send-email endpoint...");
      await axios.post('https://cv.backend.decisaoexata.com/send-email', {
        score: pontuacaoTotal,
        user_email: "jornadas.edtech@gmail.com",
        user_name: name,
        user_cellphone: cellphone,
        user_schoolYear: schoolYear,
        user_careerChoiceCertainty: storedCertainty
      });
      console.log("Email sent successfully.");
    } catch (error) {
      console.error('Erro ao enviar lead info:', error);
    }
    setUserInfoSubmitted(true);
    console.log("User info submitted; final results unlocked.");
  };

  const handleOverlayClick = (e, closeFunction) => {
    if (e.target === e.currentTarget && closeFunction) {
      closeFunction();
    }
  };

  const handleNextQuestion = () => {
    console.log("Navigating to next question...");
    updatePagina(1);
  };

  return (
    <div
      id="result_id"
      className="
        w-full
        min-h-screen
        bg-gradient-to-r
        from-white
        via-cyan-50
        to-white
        flex
        flex-col
        items-center
        pt-10
        pb-10
        relative
      "
    >
      {/* Title & Description */}
      <div className="text-center max-w-4xl mb-8 px-4">
        <h1 className="text-black text-3xl sm:text-4xl lg:text-5xl font-extrabold font-montserrat">
          {resultTitle}
        </h1>
        <p className="text-black text-base sm:text-lg lg:text-xl font-semibold font-questrial mt-3">
          {description}
        </p>
      </div>

      {/* Chart Container */}
      <div className="w-full max-w-4xl flex flex-col items-center px-4 relative">
        <div
          ref={chartRef}
          className={`
            w-full
            rounded-lg
            shadow-lg
            bg-white
            p-6
            flex
            flex-col
            items-center
            justify-center
            relative
            transition-all
            duration-300
            ${isTotal && !userInfoSubmitted ? "filter blur-sm" : ""}
          `}
        >
          {isTotal && !userInfoSubmitted && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-8xl pointer-events-none">
              <FaLock />
            </div>
          )}
          <h2 className="text-2xl font-bold mb-4 text-jornadas-blue flex items-center gap-2">
            Seu Gráfico Vocacional
          </h2>
          <Grafico pontuacaoTotal={pontuacaoTotal} type={type} />

          {type === 'parcial' && (
            <button
              onClick={handleNextQuestion}
              className="
                mt-6
                px-8
                py-4
                font-bold
                bg-jornadas-blue
                text-white
                rounded-lg
                text-base sm:text-lg
                transition-all
                duration-150
                ease-in-out
                hover:bg-jornadas-blue-dark
                hover:scale-105
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >
              Próxima pergunta
            </button>
          )}
        </div>
      </div>

      {isTotal && (
        <div className="w-full max-w-4xl flex flex-col mt-10 px-4">
          <div className="text-center font-questrial">
            <h1 className="text-2xl font-extrabold mb-2">Guia de Áreas</h1>
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Veja quais caminhos podem te levar ao topo e impulsionar sua carreira!
            </p>
          </div>
          <div className="relative">
            <div
              ref={scrollRef}
              className="
                w-full
                max-h-[70vh]
                overflow-auto
                scrollbar-thin
                scrollbar-thumb-gray-300
                scrollbar-thumb-rounded
                pb-6
              "
            >
              <div className="flex flex-col space-y-8">
                {areasConhecimento.length > 0 && areasComPontuacao.map((item, index) => (
                  <div
                    key={index}
                    className="bg-cyan-50 py-6 px-6 sm:px-12 rounded-md shadow-sm transition hover:shadow-lg"
                  >
                    <div className="flex items-center mb-4">
                      <div className="mr-3">{getAreaIcon(item.area.area)}</div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-black font-montserrat">
                        {index + 1}. {item.area.area}
                      </h2>
                    </div>
                    <hr className="my-3 border-gray-300" />
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
            {shouldShowDownArrow && (
              <div
                onClick={handleArrowClick}
                className="
                  absolute
                  bottom-2
                  left-1/2
                  transform
                  -translate-x-1/2
                  text-gray-600
                  animate-bounce
                  cursor-pointer
                  z-20
                "
              >
                <FaArrowDown className="text-2xl" />
              </div>
            )}
          </div>
        </div>
      )}

      {isTotal && !userInfoSubmitted && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={(e) => handleOverlayClick(e, null)}
        >
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md relative">
            <h2 className="text-3xl font-bold mb-4 text-center text-jornadas-blue flex items-center justify-center gap-2">
              <FaLock className="text-2xl text-gray-500" />
              Desbloqueie Seus Resultados
            </h2>
            <p className="mb-5 text-center text-gray-700 leading-relaxed">
              Preencha seus dados para descobrir seu caminho profissional e dar
              <span className="font-semibold"> o próximo passo rumo ao sucesso!</span>
            </p>
            <form onSubmit={handleUserInfoSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-800 font-semibold mb-1">Nome:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { console.log("Nome changed:", e.target.value); setName(e.target.value); }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-1">Celular:</label>
                <input
                  type="tel"
                  value={cellphone}
                  onChange={(e) => { console.log("Celular changed:", e.target.value); setCellphone(e.target.value); }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(XX) XXXXX-XXXX"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-1">Ano Escolar:</label>
                <select
                  value={schoolYear}
                  onChange={(e) => { console.log("Ano Escolar changed:", e.target.value); setSchoolYear(e.target.value); }}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Fundamental">Fundamental</option>
                  <option value="1º Médio">1º Médio</option>
                  <option value="2º Médio">2º Médio</option>
                  <option value="3º Médio">3º Médio</option>
                  <option value="Cursinho">Cursinho</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>
              <button
                type="submit"
                className="
                  w-full
                  py-3
                  bg-blue-600
                  text-white
                  rounded-lg
                  font-bold
                  text-lg
                  hover:bg-blue-700
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              >
                Revelar Agora
              </button>
            </form>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md md:max-w-xl">
            <h2 className="text-3xl font-bold mb-5 text-center text-green-600">
              Compartilhe Seu Resultado!
            </h2>
            {sharePreviewImage && (
              <img
                src={sharePreviewImage}
                alt="Preview do Resultado"
                className="w-full max-h-96 object-contain rounded-lg mb-5"
                loading="lazy"
              />
            )}
            <p className="mb-5 text-center text-gray-700 leading-relaxed">
              Mostre aos seus amigos o seu potencial e convide-os a descobrir o próprio caminho de sucesso!
            </p>
            <button
              onClick={handleWhatsAppShare}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-3
                bg-green-500
                text-white
                rounded-full
                font-bold
                text-xl
                hover:shadow-xl
                transition
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >
              <FaWhatsapp className="text-2xl" />
              Compartilhar no WhatsApp!
            </button>
            <button
              onClick={() => { console.log("Share modal closed"); setShowShareModal(false); }}
              className="
                w-full
                mt-4
                py-2
                border
                rounded-lg
                font-semibold
                text-gray-700
                hover:bg-gray-100
                transition
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {isCourseModalOpen && cursoSelecionado && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
          onClick={(e) => handleOverlayClick(e, closeCourseModal)}
        >
          <div className="relative w-full max-w-3xl">
            <div
              ref={modalScrollRef}
              className="
                bg-cyan-50
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
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              >
                X
              </button>
              {cursoSelecionado.imagem && (
                <img
                  src={cursoSelecionado.imagem}
                  alt={cursoSelecionado.nome}
                  loading="lazy"
                  className="w-full h-70 sm:h-85 object-cover rounded-md mb-6"
                />
              )}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black mb-4 font-montserrat">
                {cursoSelecionado.nome}
              </h3>
              <hr className="my-3 border-gray-300" />
              <p className="text-lg sm:text-xl text-gray-800 mb-6 text-left font-questrial font-semibold leading-relaxed">
                {cursoSelecionado.descricao}
              </p>
              <div className="bg-white p-4 rounded-md mb-6 shadow">
                <div className="flex items-center mb-2 text-gray-700 font-bold">
                  <FaMoneyBillWave className="text-green-500 mr-2" />
                  <span className="text-lg">Faixa Salarial</span>
                </div>
                <div className="flex items-center">
                  {(() => {
                    const stars = getSalaryStars(cursoSelecionado.salario || '');
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
              <SkillChart habilidades={cursoSelecionado.habilidades} />
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
              <h4 className="text-xl sm:text-2xl font-bold font-montserrat text-black mt-4 mb-2">
                Perfil do Estudante
              </h4>
              <p className="text-lg sm:text-xl text-gray-800 mb-6 text-justify font-questrial font-semibold leading-relaxed">
                {cursoSelecionado.perfil_estudante}
              </p>
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
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              >
                Fechar
              </button>
            </div>
            {shouldShowModalDownArrow && (
              <div
                onClick={handleModalArrowClick}
                className="
                  absolute
                  bottom-4
                  left-1/2
                  transform
                  -translate-x-1/2
                  text-gray-600
                  animate-bounce
                  cursor-pointer
                  z-20
                "
              >
                <FaArrowDown className="text-2xl md:text-3xl" />
              </div>
            )}
          </div>
        </div>
      )}

      {isTotal && userInfoSubmitted && (
        <button
          onClick={prepareShare}
          className="
            fixed
            bottom-4
            right-4
            z-50
            flex
            items-center
            gap-2
            bg-green-500
            text-white
            px-5
            py-3
            rounded-full
            shadow-lg
            font-bold
            text-lg
            animate-pulse
            hover:scale-105
            hover:shadow-xl
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        >
          <FaWhatsapp className="text-2xl" />
          Compartilhar no WhatsApp!
        </button>
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
