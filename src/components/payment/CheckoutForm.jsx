import React, { useState, useEffect, useContext, useRef } from "react";
import { usePersistedState } from "../../hooks/usePersistedState";
import { ResultContext } from "../../context/ResultContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { FaQrcode } from "react-icons/fa";
import Grafico from "../../assets/grafico.png";

// Static bumps
import PACK_COMPLETO from "../../assets/ebooks_gd/PACK_COMPLETO.png";
import EbookSalariosImage from "../../assets/EbookSalarios.png";

// Dynamic ebook bump mapping
import ebookMapping from "../../mappings/ebookMapping";
// Recommended course data
import areasConhecimento from "../../data/areas_cursos.json";

export default function CheckoutForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTestMode = searchParams.get("test") === "true";

  // Retrieve test results from context
  const { result, setLeadSubmitted } = useContext(ResultContext);
  const finalPontuacaoTotal = result || [];
  const areasComPontuacao = areasConhecimento
    .map((area, idx) => ({
      area,
      pontuacao: finalPontuacaoTotal[idx] || 0,
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao);
  const recommendedCourse =
    areasComPontuacao.length > 0 && areasComPontuacao[0].area.cursos.length > 0
      ? areasComPontuacao[0].area.cursos[0]
      : null;

  // Payment/lead data
  const [testId, setTestId] = usePersistedState("paymentTestId", null);
  const [paymentStatus, setPaymentStatus] = usePersistedState(
    "paymentStatus",
    null
  );
  const [qrCodeData, setQrCodeData] = usePersistedState(
    "paymentQrCodeData",
    null
  );
  const [qrCodeText, setQrCodeText] = usePersistedState(
    "paymentQrCodeText",
    null
  );
  const [userName, setUserName] = usePersistedState("leadName", "");
  const [userCellphone, setUserCellphone] = usePersistedState(
    "leadCellphone",
    ""
  );
  const [userEmail, setUserEmail] = usePersistedState("leadEmail", "");
  const [resultsRevealed, setResultsRevealed] = usePersistedState(
    "resultsRevealed",
    false
  );

  // Local states
  const [timer, setTimer] = useState(15 * 60);
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPixModal, setShowPixModal] = useState(false);

  // Coupon logic
  const [couponCode, setCouponCode] = useState("");
  const [price, setPrice] = useState(38.9);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponMessageColor, setCouponMessageColor] = useState("");

  // Store purchased bumps
  const [purchasedBumps, setPurchasedBumps] = usePersistedState(
    "purchasedBumps",
    []
  );

  // Default order bumps (static order)
  const [orderBumps, setOrderBumps] = useState([
    {
      id: "all-guides",
      title: "PACK COMPLETO: Todos os guias definitivos",
      description: "Acesso completo a todos os guias definitivos.",
      price: 15.0,
      selected: false,
      image: PACK_COMPLETO,
    },
    {
      id: "ebook-salarios",
      title: "A REALIDADE DOS SALÁRIOS Desmistificando o que você vê no Google",
      description: "Descubra como funcionam os salários de verdade no mercado.",
      price: 5.9,
      selected: false,
      image: EbookSalariosImage,
    },
  ]);

  // Insert dynamic ebook bump at the beginning
  useEffect(() => {
    if (
      recommendedCourse &&
      recommendedCourse.nome &&
      ebookMapping[recommendedCourse.nome]
    ) {
      const ebookBump = {
        id: "ebook-bump",
        title: ebookMapping[recommendedCourse.nome].title,
        description: ebookMapping[recommendedCourse.nome].description,
        image: ebookMapping[recommendedCourse.nome].cover,
        price: 5.9,
        selected: false,
      };
      setOrderBumps((prev) => {
        // remove if it already exists
        const filtered = prev.filter((b) => b.id !== "ebook-bump");
        return [ebookBump, ...filtered];
      });
    }
  }, [recommendedCourse]);

  // Calculate totals
  const orderBumpsTotal = orderBumps.reduce(
    (acc, bump) => (bump.selected ? acc + bump.price : acc),
    0
  );
  const selectedBumpCount = orderBumps.filter((bump) => bump.selected).length;
  // Override total price in test mode so that Pix price is 0.1
  const totalPrice = isTestMode ? 0.1 : price + orderBumpsTotal;

  // Setup Socket.io
  const socketRef = useRef(null);
  useEffect(() => {
    socketRef.current = io("https://paid.cv.backend.decisaoexata.com", {
      transports: ["websocket", "polling"],
    });
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  const regeneratePixPayment = () => {
    // Clear out previous payment data and reset timer
    setTestId(null);
    setPaymentStatus(null);
    setQrCodeData(null);
    setQrCodeText(null);
    setTimer(15 * 60);
    // Start a new PIX payment process
    startPixPayment();
  };

  useEffect(() => {
    if (!socketRef.current) return;
    const handlePaymentUpdate = (data) => {
      if (data.testId === testId) {
        setPaymentStatus(data.paymentStatus);
        if (data.paymentStatus === "approved") {
          setQrCodeData(null);
          setQrCodeText(null);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: "paymentApproved" });
          if (window.fbq) {
            window.fbq("trackCustom", "paymentApproved", {
              amount: totalPrice,
              conversionKey: "paymentApproved",
            });
          }
        }
      }
    };
    socketRef.current.on("paymentStatusUpdate", handlePaymentUpdate);
    return () =>
      socketRef.current.off("paymentStatusUpdate", handlePaymentUpdate);
  }, [testId, totalPrice]);

  // Polling fallback
  useEffect(() => {
    if (!testId || paymentStatus !== "pending") return;
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/test/status/${testId}`
        );
        const data = await res.json();
        if (data.paymentStatus === "approved") {
          setPaymentStatus("approved");
          setQrCodeData(null);
          setQrCodeText(null);
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ event: "paymentApproved" });
          if (window.fbq) {
            window.fbq("trackCustom", "paymentApproved", {
              amount: totalPrice,
              conversionKey: "paymentApproved",
            });
          }
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.error("Error polling payment status:", err);
      }
    }, 5000);
    return () => clearInterval(pollInterval);
  }, [testId, paymentStatus, totalPrice]);

  // Timer for Pix
  useEffect(() => {
    if (!showPixModal) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [showPixModal]);

  const toggleOrderBump = (id) => {
    setOrderBumps((prev) =>
      prev.map((bump) =>
        bump.id === id ? { ...bump, selected: !bump.selected } : bump
      )
    );
  };

  const handleBuyNow = () => {
    setAttemptedSubmit(true);
    if (!userName || !userCellphone || !userEmail) {
      setErrorMsg("Por favor, preencha todos os campos antes de comprar.");
      return;
    }
    setErrorMsg("");
    startPixPayment();
  };

  const startPixPayment = async () => {
    setShowPixModal(true);
    setTimer(15 * 60);
    setLoading(true);

    const selectedBumpIds = orderBumps
      .filter((bump) => bump.selected)
      .map((bump) => bump.id);

    // Log computed values for debugging:
    console.log("User Email:", userEmail);
    console.log("Final Pontuação Total:", finalPontuacaoTotal);
    console.log("Areas com Pontuação:", areasComPontuacao);
    console.log("Recommended Course:", recommendedCourse);
    console.log("Total Price:", totalPrice);
    console.log("Coupon Code:", couponCode);
    console.log("Selected Bumps:", selectedBumpIds);

    try {
      const payload = {
        email: userEmail || "user@example.com",
        answers: ["Answer1", "Answer2", "Answer3"], // Replace with real answers if available
        price: parseFloat(totalPrice.toFixed(2)),
        selectedBumpIds, // Array of purchased bump IDs (e.g., ["ebook-salarios"])
        couponCode, // The coupon code applied (e.g., "CALCULO9")
        result: finalPontuacaoTotal, // Test scores array from context
        areasComPontuacao, // Computed top areas with scores
        recommendedCourse, // The recommended course object (if any)
      };

      // Log the complete payload before sending
      console.log("Payload to send:", payload);

      const res = await fetch("http://localhost:3001/api/test/pix/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Response from backend:", data);
      setTestId(data.testId);
      setPaymentStatus("pending");
      if (data.qrCodeBase64) {
        setQrCodeData("data:image/png;base64," + data.qrCodeBase64);
      } else if (data.qrCodeUrl) {
        setQrCodeData(data.qrCodeUrl);
      }
      if (data.qrCodeText) {
        setQrCodeText(data.qrCodeText);
      }
    } catch (error) {
      console.error("Erro ao iniciar pagamento PIX:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!userName || !userCellphone || !userEmail) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }
    setErrorMsg("");
    const purchasedIds = orderBumps.filter((b) => b.selected).map((b) => b.id);
    setPurchasedBumps(purchasedIds);

    setResultsRevealed(true);
    setLeadSubmitted(true);

    try {
      const res = await axios.get(
        `http://localhost:3001/api/test/resultlink?external_reference=${testId}`
      );
      const data = res.data;
      if (data.resultLink) {
        // Extract only the pathname from the absolute URL
        const relativePath = new URL(data.resultLink).pathname;
        navigate(relativePath);
      } else {
        navigate("/results");
      }
    } catch (error) {
      console.error("Error finalizing payment:", error);
      navigate("/results");
    }
  };

  const sendLeadData = async () => {
    const leadPayload = {
      name: userName,
      cellphone: userCellphone,
      email: userEmail,
      topCourses: [],
      schoolYear: "Outro",
      careerChoiceCertainty: "Não tenho ideia do que escolher",
      vocationalHelp: "Não preciso de ajuda",
    };
    try {
      await axios.post(
        "https://cv.back.decisaoexata.com/api/leads",
        leadPayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
  };
  const sendLeadEmail = async (resultLink) => {
    const emailPayload = {
      score: finalPontuacaoTotal, // pass the actual score array from context
      user_name: userName,
      user_cellphone: userCellphone,
      user_email: userEmail,
      user_schoolYear: "Outro",
      user_careerChoiceCertainty: "Não tenho ideia do que escolher",
      resultLink, // include the unique result link
    };
    try {
      await axios.post(
        "https://leads.cv.backend.decisaoexata.com/send-email/",
        emailPayload,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  };

  const handleCopyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(qrCodeText)
        .then(() => alert("Código PIX copiado!"))
        .catch(() => fallbackCopy(qrCodeText));
    } else {
      fallbackCopy(qrCodeText);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      alert("Código PIX copiado!");
    } catch (err) {
      alert("Não foi possível copiar o código. Tente manualmente.");
    }
    document.body.removeChild(textArea);
  };

  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();
    if (trimmedCode === "CALCULO9") {
      setPrice(9.9);
      setCouponMessage("Desconto aplicado! Novo valor: R$ 9,90");
      setCouponMessageColor("text-green-600");
    } else if (trimmedCode === "") {
      setPrice(38.9);
      setCouponMessage("Cupom removido. Valor padrão: R$38,90.");
      setCouponMessageColor("text-red-600");
    } else {
      setPrice(38.9);
      setCouponMessage("Cupom inválido. Valor padrão: R$38,90.");
      setCouponMessageColor("text-red-600");
    }
  };

  const formattedTimer = `${Math.floor(timer / 60)}:${
    timer % 60 < 10 ? "0" : ""
  }${timer % 60}`;

  return (
    <div className="space-y-6 max-w-2xl mx-auto px-4 sm:px-6">
      {/* Payment Card */}
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Pagamento</h2>
          <span className="text-sm text-gray-500">Pix</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <FaQrcode className="text-green-500" />
          <p className="text-sm text-gray-600">
            Pagamento exclusivo via Pix no momento.
          </p>
        </div>
        {/* Identification fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium">Nome completo</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">E-mail</label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Celular</label>
            <input
              type="tel"
              placeholder="(XX) XXXXX-XXXX"
              value={userCellphone}
              onChange={(e) => setUserCellphone(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none"
            />
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-3 leading-relaxed">
          Pagamento é instantâneo e liberação imediata. Ao clicar em
          <strong> “Comprar agora”</strong> você será encaminhado para um
          ambiente seguro, onde encontrará o passo a passo para pagar via Pix.
        </div>
        <p className="font-bold text-lg">
          Valor atual: R$ {totalPrice.toFixed(2)}
        </p>
        {attemptedSubmit && errorMsg && (
          <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
        )}
      </div>

      {/* Purchase Card */}
      <div className="bg-white rounded-md shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Sua Compra</h2>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={Grafico}
              alt="Cálculo Vocacional"
              className="w-14 h-14 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold">Cálculo Vocacional</p>
              <p className="text-gray-500">
                {1 + selectedBumpCount} item(s) • R$ {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Coupon Input */}
        <div className="mt-2 flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Cupom"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="p-2 border rounded w-full sm:w-1/2 focus:outline-none"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Aplicar
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Use o cupom <strong>CALCULO9</strong> para pagar apenas R$9,90
        </p>
        {couponMessage && (
          <p className={`mt-2 text-sm font-semibold ${couponMessageColor}`}>
            {couponMessage}
          </p>
        )}

        {/* Order Bumps Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Adicione Extras</h3>
          <div className="space-y-3">
            {orderBumps.map((bump) => (
              <div
                key={bump.id}
                onClick={() => toggleOrderBump(bump.id)}
                className={`relative border rounded p-4 cursor-pointer transition hover:scale-[1.02] ${
                  bump.selected
                    ? "bg-green-50 border-green-600"
                    : "border-gray-300"
                }`}
              >
                {/* Checkbox in top-left */}
                <div className="absolute top-2 left-2">
                  <input
                    type="checkbox"
                    checked={bump.selected}
                    onChange={() => toggleOrderBump(bump.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-5 w-5 text-green-600"
                  />
                </div>

                {/* Image centered */}
                <div className="flex justify-center">
                  <img
                    src={bump.image}
                    alt={bump.title}
                    className="object-contain w-24 h-24 rounded"
                  />
                </div>

                {/* Title & Description */}
                <div className="mt-3 text-center">
                  <p className="text-base sm:text-lg font-semibold">
                    {bump.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {bump.description}
                  </p>
                </div>

                {/* Price at the bottom center */}
                <div className="text-center text-green-600 text-base sm:text-xl font-bold mt-3">
                  R$ {bump.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BUY BUTTON */}
      {paymentStatus !== "approved" && !showPixModal && (
        <button
          onClick={handleBuyNow}
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Comprar agora
        </button>
      )}

      {/* PIX MODAL */}
      {showPixModal && paymentStatus !== "approved" && (
        <div className="bg-white rounded-md shadow p-4 space-y-3">
          <h3 className="text-lg font-bold">Pagamento via Pix</h3>
          {loading ? (
            <p className="text-gray-500">Gerando QR Code...</p>
          ) : qrCodeData && timer > 0 ? (
            <div className="text-center">
              <img
                src={qrCodeData}
                alt="QR Code para pagamento PIX"
                className="mx-auto w-40 h-40 object-contain rounded shadow-md border-4 border-blue-500 mb-2"
              />
              {qrCodeText && (
                <button
                  onClick={handleCopyToClipboard}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-200 mb-2"
                >
                  Copiar Código PIX
                </button>
              )}
              <p className="text-red-500 font-bold">{formattedTimer}</p>
              <p className="text-sm text-gray-600">
                Oferta válida até o código expirar
              </p>
            </div>
          ) : timer === 0 ? (
            <div className="text-center">
              <p className="text-red-500 font-bold">Tempo Esgotado!</p>
              <button
                onClick={regeneratePixPayment}
                className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 mt-4"
              >
                Gerar novo PIX
              </button>
            </div>
          ) : (
            <p className="text-red-500 font-bold text-center">
              Tempo Esgotado!
            </p>
          )}
        </div>
      )}

      {/* FINAL SUBMISSION */}
      {paymentStatus === "approved" && !resultsRevealed && (
        <div className="bg-white rounded-md shadow p-4 space-y-4">
          <h3 className="text-xl font-bold text-gray-800">
            Pagamento Confirmado!
          </h3>
          <p className="text-gray-700">
            Clique abaixo para liberar seu resultado completo.
          </p>
          {errorMsg && (
            <p className="text-red-500 text-sm" role="alert">
              {errorMsg}
            </p>
          )}
          <button
            onClick={handlePaymentSuccess}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-200"
          >
            Liberar Meu Resultado
          </button>
        </div>
      )}

      {resultsRevealed && (
        <p className="text-green-600 font-bold text-2xl text-center">
          Obrigado! Dados enviados.
        </p>
      )}
    </div>
  );
}
