// src/components/PaymentCaptureForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import io from "socket.io-client";
import axios from "axios";
import { usePersistedState } from "../hooks/usePersistedState";

// Establish socket connection for payment status updates.
const socket = io("https://paid.cv.backend.decisaoexata.com");

function PaymentCaptureForm({
  showForm,
  onPaymentSuccess,
  pontuacaoTotal,
  topCourses,
  previewImage,
  onFormOpen,
}) {
  // Persisted states for payment info and user data.
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

  // Local UI states.
  const [timer, setTimer] = useState(15 * 60); // 15 minutes countdown
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Scroll to the form when it becomes visible.
  useEffect(() => {
    if (showForm) {
      onFormOpen?.();
    }
  }, [showForm, onFormOpen]);

  if (!showForm) return null;

  // Initiate PIX payment if not started and not approved.
  useEffect(() => {
    if (!testId && paymentStatus !== "approved") {
      startPixPayment();
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [testId, paymentStatus, showForm]);

  // Listen to real-time updates from the payment socket.
  useEffect(() => {
    socket.on("paymentStatusUpdate", (data) => {
      if (data.testId === testId) {
        setPaymentStatus(data.paymentStatus);
        if (data.paymentStatus === "approved") {
          setQrCodeData(null);
          setQrCodeText(null);
        }
      }
    });
    return () => socket.off("paymentStatusUpdate");
  }, [testId, userName, userCellphone, userEmail, pontuacaoTotal, topCourses]);

  // Function to start the PIX payment.
  const startPixPayment = async () => {
    setLoading(true);
    try {
      const payload = {
        email: "user@example.com",
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

  // Send the lead data to your backend.
  const sendLeadData = async () => {
    const leadPayload = {
      name: userName,
      cellphone: userCellphone,
      email: userEmail,
      topCourses: topCourses,
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
    onPaymentSuccess(leadPayload);
  };

  // Send a confirmation email with the lead data.
  const sendLeadEmail = async () => {
    const emailPayload = {
      score: pontuacaoTotal,
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
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  };

  // Handle copying the PIX key to clipboard.
  const handleCopyPixKey = () => {
    if (qrCodeText) {
      navigator.clipboard.writeText(qrCodeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Validate and reveal the full result after collecting lead data.
  const handleRevealResults = () => {
    setAttemptedSubmit(true);
    if (!userName || !userCellphone || !userEmail) {
      setErrorMsg("Por favor, preencha todos os campos.");
      return;
    }
    setErrorMsg("");
    sendLeadData();
    sendLeadEmail();
    setResultsRevealed(true);
  };

  // Timer and progress bar calculations.
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const countdown = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  const percentage = (timer / (15 * 60)) * 100;

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col px-4 py-8"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Landing Page Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">
          Descubra seu Futuro: Seu Radar Completo de Carreiras por Apenas R$10!
        </h1>
        <p className="text-xl mt-2 text-gray-700">
          Você já respondeu 10 perguntas – agora desbloqueie insights exclusivos
          para transformar sua carreira.
        </p>
      </header>

      {/* Conditional Content Based on Payment & Lead Status */}
      {!resultsRevealed && paymentStatus !== "approved" && (
        <section className="flex flex-col md:flex-row items-center mb-8">
          {/* Preview Image (blurred until payment) */}
          <div className="md:w-1/2">
            <img
              src={previewImage}
              alt="Prévia do resultado"
              className="w-full max-h-48 object-cover rounded-lg shadow-md"
              style={{
                filter: paymentStatus !== "approved" ? "blur(2px)" : "none",
              }}
            />
          </div>
          {/* Benefits Section */}
          <div className="md:w-1/2 md:pl-6 mt-4 md:mt-0">
            <ul className="list-disc ml-5 text-lg text-gray-800">
              <li>
                <strong>Radar Visual Exclusivo:</strong> Descubra suas forças e
                interesses com um gráfico detalhado.
              </li>
              <li>
                <strong>Detalhamento das Carreiras:</strong> Informações
                completas sobre profissões, salários e perfis ideais.
              </li>
              <li>
                <strong>Decisão Informada:</strong> Orientações valiosas para
                escolher a carreira dos seus sonhos.
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* Pricing, QR Code and Urgency Section */}
      {!resultsRevealed && (
        <section className="text-center mb-8">
          <div className="flex items-center justify-center space-x-4">
            <span className="line-through text-red-500 text-lg">R$38,90</span>
            <span className="text-green-500 text-4xl font-extrabold">
              R$9,90
            </span>
          </div>
          <div className="mt-4">
            {loading ? (
              <p className="text-gray-500">Gerando QR Code...</p>
            ) : qrCodeData && timer > 0 ? (
              <div className="flex flex-col items-center">
                <img
                  src={qrCodeData}
                  alt="QR Code para pagamento PIX"
                  className="w-40 h-40 object-contain rounded shadow-md border-4 border-blue-500 mb-2"
                />
                {qrCodeText && (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleCopyPixKey}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-200"
                    >
                      Copiar Código PIX
                    </button>
                    {copied && (
                      <span
                        className="text-xs text-green-500 mt-1"
                        aria-live="polite"
                      >
                        Copiado!
                      </span>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-500 font-bold mt-4">Tempo Esgotado!</p>
            )}
          </div>
          {/* Countdown Timer and Progress */}
          <div className="mt-6">
            <span className="text-3xl font-bold text-red-500">{countdown}</span>
            <p className="text-sm text-gray-600 mt-1">
              Oferta válida até o código expirar
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-3 mx-auto max-w-sm">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </section>
      )}

      {/* Lead Capture / Payment Approved Section */}
      {paymentStatus === "approved" && !resultsRevealed && (
        <section className="mb-8">
          <div className="text-center mb-4">
            <p className="text-green-600 font-bold text-2xl">
              Pagamento Confirmado!
            </p>
            <p className="text-gray-700 text-base">
              Insira seus dados para liberar seu resultado completo.
            </p>
            {errorMsg && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {errorMsg}
              </p>
            )}
          </div>
          <div className="space-y-4 max-w-md mx-auto">
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">
                Nome
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu nome"
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm ${
                  attemptedSubmit && !userName ? "border-red-500" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">
                Celular
              </label>
              <input
                type="tel"
                value={userCellphone}
                onChange={(e) => setUserCellphone(e.target.value)}
                placeholder="(XX) XXXXX-XXXX"
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm ${
                  attemptedSubmit && !userCellphone ? "border-red-500" : ""
                }`}
              />
            </div>
            <div>
              <label className="block text-gray-800 font-semibold mb-1 text-sm">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm ${
                  attemptedSubmit && !userEmail ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="text-center mt-4">
              <button
                onClick={handleRevealResults}
                disabled={!userName || !userCellphone || !userEmail}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-200"
              >
                Liberar Meu Resultado
              </button>
            </div>
          </div>
        </section>
      )}

      {resultsRevealed && (
        <section className="text-center mb-8">
          <p className="text-green-600 font-bold text-2xl mb-4">
            Obrigado! Dados enviados.
          </p>
        </section>
      )}

      {/* Testimonial Section */}
      <section className="border-t pt-4">
        <div className="text-center">
          <p className="italic text-gray-700">
            "Esse teste transformou minha vida! Consegui ver minhas reais
            potencialidades." - João S.
          </p>
          <p className="italic text-gray-700 mt-2">
            "Vale cada centavo. Agora sei qual carreira seguir com confiança." -
            Maria F.
          </p>
        </div>
      </section>

      {/* Footer / Trust Signals */}
      <footer className="mt-6 text-center text-gray-600 text-sm">
        <p>
          Compra 100% segura – Seus dados estão protegidos e criptografados.
        </p>
      </footer>
    </motion.div>
  );
}

PaymentCaptureForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  pontuacaoTotal: PropTypes.array.isRequired,
  topCourses: PropTypes.array.isRequired,
  previewImage: PropTypes.string,
  onFormOpen: PropTypes.func,
};

export default PaymentCaptureForm;
