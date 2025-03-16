// src/pages/results/ResultToken.jsx
import { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import areasConhecimento from "../../data/areas_cursos.json";
import { ResultContext } from "../../context/ResultContext";
import { usePersistedState } from "../../hooks/usePersistedState";

// Import refactored subcomponents
import ResultHero from "../../components/result/ResultHero";
import ResultChart from "../../components/result/ResultChart";
import ResultDetails from "../../components/result/ResultDetails";
import ResultResources from "../../components/result/ResultResources";
import ResultAboutUs from "../../components/result/ResultAboutUs";
import ResultFooter from "../../components/result/ResultFooter";
import ShareModal from "../../components/result/ShareModal";
import CourseModal from "../../components/result/CourseModal";

function ResultToken({ pontuacaoTotal, type, updatePagina }) {
  // Extract token from URL
  const { token } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Local states for fetched data
  const [fetchedResult, setFetchedResult] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [fetchedPurchasedBumps, setFetchedPurchasedBumps] = useState([]);

  // Get context values
  const { result, leadSubmitted } = useContext(ResultContext);
  const isTestMode = searchParams.get("test") === "true";
  const isTotal = type === "total";
  const isPreview = type === "parcial";

  // Determine final score array: prefer backend data if available.
  const finalPontuacaoTotal =
    fetchedResult && fetchedResult.pontuacaoTotal
      ? fetchedResult.pontuacaoTotal
      : result || pontuacaoTotal;

  const shouldUnlockResults = isTestMode || leadSubmitted;

  // Compute top areas for details based on finalPontuacaoTotal
  const computedAreas = areasConhecimento
    .map((area, idx) => ({
      area,
      pontuacao: finalPontuacaoTotal[idx] || 0,
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao)
    .slice(0, 3);

  // Persist selected course from context
  const [selectedCourse, setSelectedCourse] = usePersistedState(
    "result_selected_course",
    null
  );

  // Ephemeral UI states
  const [showDownArrow, setShowDownArrow] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePreviewImage, setSharePreviewImage] = useState("");
  // We now rely on the backend for purchased bumps so no local persisted state here.
  const [chartPreviewImage, setChartPreviewImage] = usePersistedState(
    "chartPreviewImage",
    ""
  );

  // Refs – chartRef will be forwarded to ResultChart
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

  // Fetch the personalized result using the token
  useEffect(() => {
    if (token) {
      axios
        .get(`http://localhost:3001/api/test/result/${token}`)
        .then((res) => {
          if (res.data && res.data.resultData) {
            setFetchedResult(res.data.resultData);
            setFetchedPurchasedBumps(res.data.purchasedBumps || []);
          } else {
            setFetchError(
              "Resultado não encontrado ou pagamento não aprovado."
            );
          }
        })
        .catch((err) => {
          console.error("Error fetching personalized result:", err);
          setFetchError("Erro ao buscar o resultado.");
        });
    }
  }, [token]);

  // Setup chart preview image (only if data is ready)
  useEffect(() => {
    if (type !== "total") return;
    if (chartRef.current) {
      setTimeout(async () => {
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
      }, 800);
    } else {
      console.error("Invalid chartRef.current:", chartRef.current);
    }
  }, [chartRef, setChartPreviewImage, type]);

  // Other handlers remain unchanged...
  const handleShare = async () => {
    /* ... */
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
    /* ... */
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
      {fetchError ? (
        <div className="text-center mt-10 text-red-600">{fetchError}</div>
      ) : isTotal && !fetchedResult ? (
        <div className="text-center mt-10">Carregando seu resultado...</div>
      ) : (
        <>
          <ResultHero isTotal={isTotal} />
          <ResultChart
            ref={chartRef}
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
              areasComPontuacao={computedAreas}
              showDownArrow={showDownArrow}
              isAtBottom={isAtBottom}
              handleArrowClick={handleArrowClick}
              setSelectedCourse={setSelectedCourse}
            />
          )}
          {/* Pass both purchasedBumps and finalPontuacaoTotal from the backend */}
          {isTotal && (
            <ResultResources
              purchasedBumps={fetchedPurchasedBumps}
              finalPontuacaoTotal={finalPontuacaoTotal}
            />
          )}
          {isTotal && shouldUnlockResults && <ResultAboutUs />}
          {isTotal && <ResultFooter />}
          {/* Other components like ShareModal and CourseModal */}
          {/*
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
          )} */}
        </>
      )}
    </motion.div>
  );
}

ResultToken.propTypes = {
  pontuacaoTotal: PropTypes.array,
  type: PropTypes.string.isRequired,
  updatePagina: PropTypes.func.isRequired,
};

export default ResultToken;
