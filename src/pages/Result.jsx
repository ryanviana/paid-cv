// src/pages/Result.jsx
import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import areasConhecimento from "../data/areas_cursos.json";
import { ResultContext } from "../context/ResultContext";
import { usePersistedState } from "../hooks/usePersistedState";

// Import refactored subcomponents
import ResultHero from "../components/result/ResultHero";
import ResultChart from "../components/result/ResultChart";
import ResultDetails from "../components/result/ResultDetails";
import ResultResources from "../components/result/ResultResources";
import ResultAboutUs from "../components/result/ResultAboutUs";
import ResultFooter from "../components/result/ResultFooter";
import ShareModal from "../components/result/ShareModal";
import CourseModal from "../components/result/CourseModal";

function Result({ pontuacaoTotal, type, updatePagina }) {
  const { result, leadSubmitted } = useContext(ResultContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTestMode = searchParams.get("test") === "true";
  const isTotal = type === "total";
  const isPreview = type === "parcial";
  const finalPontuacaoTotal = result ? result : pontuacaoTotal;

  const shouldUnlockResults = isTestMode || leadSubmitted;

  // Redirect if no result in total mode (unless in test mode)
  useEffect(() => {
    if (type === "total" && !result && !isTestMode) {
      navigate("/questions");
    }
  }, [result, navigate, type, isTestMode]);

  // Compute top areas (for details)
  const areasComPontuacao = areasConhecimento
    .map((area, idx) => ({
      area,
      pontuacao: finalPontuacaoTotal[idx] || 0,
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .slice(0, 3);

  // Persist the selected course.
  const [selectedCourse, setSelectedCourse] = usePersistedState(
    "result_selectedCourse",
    null
  );

  // Ephemeral UI states.
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePreviewImage, setSharePreviewImage] = useState("");
  const [purchasedBumps] = usePersistedState("purchasedBumps", []);

  const [chartPreviewImage, setChartPreviewImage] = usePersistedState(
    "chartPreviewImage",
    ""
  );

  const chartRef = useRef(null);
  const scrollRef = useRef(null);
  const detailsRef = useRef(null);

  // Virtual pageview tracking.
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "virtualPageview",
      virtualPageURL: "/results",
      virtualPageTitle: "Resultados",
    });
  }, []);

  // Generate chart preview image.
  useEffect(() => {
    if (type !== "total") return;
    if (chartRef.current && chartRef.current instanceof HTMLElement) {
      try {
        setTimeout(async () => {
          const canvas = await html2canvas(chartRef.current, {
            useCORS: true,
            backgroundColor: "#ffffff",
            crossOrigin: "anonymous",
            scale: 2,
          });
          const dataUrl = canvas.toDataURL("image/png");
          setChartPreviewImage(dataUrl);
        }, 800);
      } catch (error) {
        console.error("Error generating chart preview:", error);
      }
    } else {
      console.error("Invalid chartRef.current:", chartRef.current);
    }
  }, [chartRef, setChartPreviewImage, type]);

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
    updatePagina(-1);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <ResultHero isTotal={isTotal} />
      <ResultChart
        chartRef={chartRef}
        isTotal={isTotal}
        shouldUnlockResults={shouldUnlockResults}
        isPreview={isPreview}
        finalPontuacaoTotal={finalPontuacaoTotal}
        type={type}
        prepareShare={prepareShare}
        handleNextQuestion={handleNextQuestion}
        handleVoltar={handleVoltar}
      />
      {isTotal && (
        <ResultDetails
          detailsRef={detailsRef}
          scrollRef={scrollRef}
          areasComPontuacao={areasComPontuacao}
          showDownArrow={showDownArrow}
          isAtBottom={isAtBottom}
          handleArrowClick={handleArrowClick}
          setSelectedCourse={setSelectedCourse}
        />
      )}
      {isTotal && <ResultResources />}
      {isTotal && shouldUnlockResults && <ResultAboutUs />}
      {isTotal && <ResultFooter />}
      {showShareModal && (
        <ShareModal
          sharePreviewImage={sharePreviewImage}
          handleShare={handleShare}
          onClose={() => setShowShareModal(false)}
        />
      )}
      {selectedCourse && (
        <CourseModal
          selectedCourse={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
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
