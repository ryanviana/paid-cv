// src/components/CheckoutForm.jsx

import React, { useState, useEffect, useContext, useRef } from "react";
import { usePersistedState } from "../hooks/usePersistedState";
import { ResultContext } from "../context/ResultContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { FaQrcode } from "react-icons/fa";
import Grafico from "../assets/grafico.png";

export default function CheckoutForm({ finalPrice }) {
  const navigate = useNavigate();
  const { setLeadSubmitted } = useContext(ResultContext);

  // Persisted states
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
  const [timer, setTimer] = useState(15 * 60); // 15 minutes
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPixModal, setShowPixModal] = useState(false);

  // Coupon logic
  const [couponCode, setCouponCode] = useState("");
  const [price, setPrice] = useState(38.9); // default price (R$38,90)
  const [couponMessage, setCouponMessage] = useState("");
  const [couponMessageColor, setCouponMessageColor] = useState("");

  // Socket
  const socketRef = useRef(null);

  // --- Setup WebSocket & Polling ---
  useEffect(() => {
    socketRef.current = io("https://paid.cv.backend.decisaoexata.com", {
      transports: ["websocket", "polling"],
    });
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

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
              amount: price,
              conversionKey: "paymentApproved",
            });
          }
        }
      }
    };
    socketRef.current.on("paymentStatusUpdate", handlePaymentUpdate);
    return () =>
      socketRef.current.off("paymentStatusUpdate", handlePaymentUpdate);
  }, [testId, price]);

  // Polling fallback
  useEffect(() => {
    if (!testId || paymentStatus !== "pending") return;
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(
          `https://paid.cv.backend.decisaoexata.com/api/test/status/${testId}`
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
              amount: price,
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
  }, [testId, paymentStatus, price]);

  // Timer countdown for Pix
  useEffect(() => {
    if (!showPixModal) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [showPixModal]);

  // --- Handlers ---
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
    try {
      const payload = {
        email: userEmail || "user@example.com",
        answers: ["Answer1", "Answer2", "Answer3"],
      };
      const res = await fetch(
        "https://paid.cv.backend.decisaoexata.com/api/test/pix/start",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
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

  // const handlePaymentSuccess = async () => {
  //   if (!userName || !userCellphone || !userEmail) {
  //     setErrorMsg("Por favor, preencha todos os campos.");
  //     return;
  //   }
  //   setErrorMsg("");
  //   await sendLeadData();
  //   await sendLeadEmail();
  //   setResultsRevealed(true);
  //   setLeadSubmitted(true);
  //   navigate("/results");
  // };

  const handlePaymentSuccess = () => {
    if (!userName || !userCellphone || !userEmail) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }
    setErrorMsg("");

    // Trigger the conversion event and redirect to '/results'
    if (window.gtag_report_conversion) {
      window.gtag_report_conversion("/results");
    } else {
      // Fallback in case the conversion function is not available
      navigate("/results");
    }

    // Continue with background actions (fire-and-forget)
    sendLeadData();
    sendLeadEmail();
    setResultsRevealed(true);
    setLeadSubmitted(true);
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

  const sendLeadEmail = async () => {
    const emailPayload = {
      score: [],
      user_name: userName,
      user_cellphone: userCellphone,
      user_email: userEmail,
      user_schoolYear: "Outro",
      user_careerChoiceCertainty: "Não tenho ideia do que escolher",
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

  // --- Coupon logic: If code == "CALCULO9", set price to 9.9; else revert to 38.9
  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.trim().toUpperCase();
    if (trimmedCode === "CALCULO9") {
      setPrice(9.9);
      setCouponMessage("Desconto aplicado! Novo valor: R$ 9,90");
      setCouponMessageColor("text-green-600");
    } else if (trimmedCode === "") {
      // If user clears the coupon, revert to default
      setPrice(38.9);
      setCouponMessage("Cupom removido. Valor padrão: R$38,90.");
      setCouponMessageColor("text-red-600");
    } else {
      // Invalid code
      setPrice(38.9);
      setCouponMessage("Cupom inválido. Valor padrão: R$38,90.");
      setCouponMessageColor("text-red-600");
    }
  };

  const formattedTimer = `${Math.floor(timer / 60)}:${
    timer % 60 < 10 ? "0" : ""
  }${timer % 60}`;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* PAGAMENTO CARD (Pix only) */}
      <div className="bg-white rounded-md shadow p-4">
        <div className="flex items-center justify-between mb-4">
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

        {/* Info text & price */}
        <div className="text-sm text-gray-600 mb-3">
          Pagamento é instantâneo e liberação imediata. Ao clicar em “Comprar
          agora” você será encaminhado para um ambiente seguro, onde encontrará
          o passo a passo para realizar o pagamento via Pix.
        </div>
        <p className="font-bold text-lg">Valor atual: R$ {price.toFixed(2)}</p>

        {/* Error if fields empty */}
        {attemptedSubmit && errorMsg && (
          <p className="text-red-500 text-sm mt-2">{errorMsg}</p>
        )}
      </div>

      {/* SUA COMPRA CARD */}
      <div className="bg-white rounded-md shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Sua Compra</h2>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={Grafico}
              alt="Cálculo Vocacional"
              className="w-14 h-14 rounded-md object-cover"
            />
            <div>
              <p className="font-semibold">Cálculo Vocacional</p>
              <p className="text-gray-500">R$ {price.toFixed(2)}</p>
            </div>
          </div>
          <p className="font-semibold">1 item • R$ {price.toFixed(2)}</p>
        </div>

        {/* Coupon code input */}
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Cupom de desconto"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="p-2 border rounded w-1/2 focus:outline-none"
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

        {/* Coupon feedback message */}
        {couponMessage && (
          <p className={`mt-2 text-sm font-semibold ${couponMessageColor}`}>
            {couponMessage}
          </p>
        )}
      </div>

      {/* BUY BUTTON (only if not approved & not showing Pix) */}
      {paymentStatus !== "approved" && !showPixModal && (
        <button
          onClick={handleBuyNow}
          className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Comprar agora
        </button>
      )}

      {/* PIX "MODAL" CARD */}
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
          ) : (
            <p className="text-red-500 font-bold text-center">
              Tempo Esgotado!
            </p>
          )}
        </div>
      )}

      {/* FINAL SUBMISSION (if payment approved) */}
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

      {/* Success message (if resultsRevealed) */}
      {resultsRevealed && (
        <p className="text-green-600 font-bold text-2xl text-center">
          Obrigado! Dados enviados.
        </p>
      )}
    </div>
  );
}
