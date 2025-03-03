// src/pages/Result.jsx
import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Grafico from "../components/Grafico";
import areasConhecimento from "../data/areas_cursos.json";
import PaymentCaptureForm from "../components/PaymentCaptureForm";
import CourseDetails from "../components/CourseDetails";
import AboutDecisaoExataMotion from "../components/AboutDecisaoExataMotion";

import {
  FaChevronRight,
  FaArrowDown,
  FaLock,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";
import getAreaIcon from "../components/AreaIcon";

import { ResultContext } from "../context/ResultContext";
import { usePersistedState } from "../hooks/usePersistedState";

function Result({ pontuacaoTotal, type, updatePagina }) {
  const { result, leadSubmitted, setLeadSubmitted } = useContext(ResultContext);
  const navigate = useNavigate();
  const isTotal = type === "total";
  const isPreview = type === "parcial";
  const finalPontuacaoTotal = result ? result : pontuacaoTotal;

  // Compute top 3 areas and derive recommended course names
  const areasComPontuacao = areasConhecimento
    .map((area, idx) => ({
      area,
      pontuacao: finalPontuacaoTotal[idx] || 0,
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .slice(0, 3);
  const topCourses = areasComPontuacao.map((item) => item.area.cursos[0].nome);

  // Persist the selected course so that if the user refreshes, it remains.
  const [selectedCourse, setSelectedCourse] = usePersistedState(
    "result_selectedCourse",
    null
  );
  // Other UI states remain ephemeral.
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePreviewImage, setSharePreviewImage] = useState("");
  const [chartPreviewImage, setChartPreviewImage] = useState("");

  const chartRef = useRef(null);
  const scrollRef = useRef(null);

  // Virtual pageview tracking for /results
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtualPageview",
      virtualPageURL: "/results",
      virtualPageTitle: "Resultados",
    });
  }, []);

  // Redirect to /questions if no result exists.
  useEffect(() => {
    if (!result) {
      navigate("/questions");
    }
  }, [result, navigate]);

  useEffect(() => {
    const generateChartPreview = async () => {
      if (chartRef.current) {
        try {
          const canvas = await html2canvas(chartRef.current, {
            useCORS: true,
            backgroundColor: "#ffffff",
            crossOrigin: "anonymous",
            scale: 2,
          });
          const dataUrl = canvas.toDataURL("image/png");
          setChartPreviewImage(dataUrl);
        } catch (error) {
          console.error("Error generating chart preview:", error);
        }
      }
    };
    generateChartPreview();
  }, [chartRef]);

  const handleShare = async () => {
    const shareText =
      "Fiz um teste vocacional bem legal e achei os resultados bem interessantes.\n\nSe quiser fazer também: https://vocacional.decisaoexata.com";
    try {
      const response = await fetch(sharePreviewImage);
      const blob = await response.blob();
      const file = new File([blob], "resultado.png", { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: shareText });
      } else {
        await navigator.share({ text: shareText });
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
      window.open(
        `https://wa.me/?text=${encodeURIComponent(shareText)}`,
        "_blank"
      );
    }
  };

  const handleVoltar = () => {
    // This value (-1) should match your navigation logic to go back to the images page.
    updatePagina(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Process payment lead info → unlock results
  const handlePaymentSuccess = async (leadPayload) => {
    setLeadSubmitted(true);
    console.log("Payment success lead data received:", leadPayload);
    navigate("/results");

    // PaymentCaptureForm already saves the lead, so no additional POST call here.
  };

  const handleNextQuestion = () => {
    updatePagina(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prepareShare = async () => {
    if (!chartRef.current) {
      alert("Gráfico não encontrado para compartilhar.");
      return;
    }
    try {
      const canvas = await html2canvas(chartRef.current, {
        useCORS: true,
        backgroundColor: "#ffffff",
        crossOrigin: "anonymous",
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");
      setSharePreviewImage(dataUrl);
      setShowShareModal(true);
    } catch (error) {
      console.error("Erro ao preparar compartilhamento:", error);
      alert("Ocorreu um erro ao preparar o compartilhamento.");
    }
  };

  const handleArrowClick = () => {
    scrollRef.current?.scrollBy({ top: 100, behavior: "smooth" });
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    if (container.scrollHeight > container.clientHeight) {
      setShowDownArrow(true);
    }
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setIsAtBottom(scrollHeight - scrollTop <= clientHeight + 2);
    };
    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="w-full min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* HERO TITLE SECTION */}
      <section className="w-full bg-white pt-16 pb-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl font-extrabold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {isTotal ? "Seu Futuro Te Aguarda" : "Você Está Quase Lá!"}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            {isTotal
              ? "Desbloqueie sua jornada e descubra as áreas que vão impulsionar seu sucesso profissional!"
              : "Continue avançando para ver uma prévia do seu caminho brilhante."}
          </motion.p>
        </div>
      </section>

      {/* BIG CHART SECTION */}
      <section className="w-full bg-slate-50 py-10">
        <div className="max-w-5xl mx-auto px-4 relative">
          <div
            ref={chartRef}
            className={`relative transition-all duration-300 ${
              isTotal && !leadSubmitted ? "filter blur-sm" : ""
            }`}
          >
            {isTotal && !leadSubmitted && (
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
                  onClick={handleVoltar} // Make sure you have a handleVoltar function defined in this component
                  className="px-8 py-4 font-bold bg-gray-200 text-black rounded-lg text-base sm:text-lg transition-all duration-150 ease-in-out hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Voltar
                </button>
              </div>
            )}
          </div>
          {isTotal && leadSubmitted && (
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

      {/* ABOUT YOU RESULTS SECTION */}
      {isTotal && (
        <section className="w-full bg-white py-16">
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
                Descubra quais áreas se destacam no seu perfil e veja as
                principais opções para cada uma.
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
                        <div className="mr-3">
                          {getAreaIcon(item.area.area)}
                        </div>
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
      )}

      {/* Payment Capture Form – shown if the lead is not yet submitted */}
      {isTotal && !leadSubmitted && (
        <PaymentCaptureForm
          showForm={true}
          onPaymentSuccess={handlePaymentSuccess}
          pontuacaoTotal={finalPontuacaoTotal}
          topCourses={topCourses}
          previewImage={chartPreviewImage} // Pass the preview image here
        />
      )}

      {/* ABOUT US SECTION */}
      {isTotal && leadSubmitted && (
        <section className="w-full bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <motion.h2
                className="text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Sobre Nós
              </motion.h2>
              <div className="mt-2 border-b-4 border-blue-600 w-24 mx-auto"></div>
            </div>
            <AboutDecisaoExataMotion />
          </div>
        </section>
      )}

      {/* FOOTER SECTION */}
      {isTotal && (
        <motion.footer
          className="w-full bg-gray-900 text-gray-200 py-8 px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Entre em Contato</h3>
            <p className="mb-2">
              <strong>Email:</strong> ryan@decisaoexata.com
            </p>
            <p className="mb-2">
              <strong>Telefone:</strong> +55 35 99145-9394
            </p>
            <p className="mb-4">
              <strong>Site:</strong>{" "}
              <a
                href="https://decisaoexata.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline"
              >
                decisaoexata.com
              </a>
            </p>
            <div>
              <a
                href="https://wa.me/5535991459394?text=Oi%2C%20preciso%20de%20ajuda%20para%20decidir%20meu%20curso!"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Fale Conosco no WhatsApp
              </a>
            </div>
            <p className="mt-4 text-sm">
              © {new Date().getFullYear()} Decisão Exata. Todos os direitos
              reservados.
            </p>
          </div>
        </motion.footer>
      )}

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm sm:max-w-md md:max-w-xl">
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
              Mostre aos seus amigos o seu potencial e convide-os a descobrir o
              próprio caminho de sucesso!
            </p>
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-full font-bold text-xl hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaWhatsapp className="text-2xl" /> Compartilhe no WhatsApp!
            </button>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 py-2 border rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* COURSE MODAL */}
      {/* COURSE MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm sm:max-w-md md:max-w-xl max-h-full overflow-y-auto">
              <CourseDetails
                course={selectedCourse}
                onClose={() => setSelectedCourse(null)}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

Result.propTypes = {
  pontuacaoTotal: PropTypes.array,
  type: PropTypes.string.isRequired,
  updatePagina: PropTypes.func.isRequired,
};

export default Result;
