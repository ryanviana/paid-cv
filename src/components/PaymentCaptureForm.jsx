// src/components/PaymentCaptureForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import io from "socket.io-client";
import axios from "axios";
import { usePersistedState } from "../hooks/usePersistedState";

// Socket para atualizações de status de pagamento
const socket = io("https://paid.cv.backend.decisaoexata.com");

function PaymentCaptureForm({
  showForm,
  onPaymentSuccess,
  pontuacaoTotal,
  topCourses,
  previewImage, // URL para imagem de prévia do resultado
}) {
  /* ────────────── Estados Persistidos ────────────── */
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

  // Dados do usuário
  const [userName, setUserName] = usePersistedState("leadName", "");
  const [userCellphone, setUserCellphone] = usePersistedState(
    "leadCellphone",
    ""
  );
  const [userEmail, setUserEmail] = usePersistedState("leadEmail", "");

  // Flag para indicar se os dados já foram enviados
  const [resultsRevealed, setResultsRevealed] = usePersistedState(
    "resultsRevealed",
    false
  );

  /* ────────────── Estados Locais ────────────── */
  const [timer, setTimer] = useState(15 * 60); // contagem regressiva de 15 minutos
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Se o modal não deve aparecer, sai imediatamente
  if (!showForm) return null;

  /* ────────────── Efeitos de Pagamento e Timer ────────────── */
  useEffect(() => {
    if (!testId && paymentStatus !== "approved") {
      startPixPayment();
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [testId, paymentStatus, showForm]);

  /* ────────────── Listener do Socket ────────────── */
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

  /* ────────────── Chamadas para o Backend ────────────── */
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
    console.log("Enviando dados do lead:", leadPayload);
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

  const sendLeadEmail = async () => {
    const emailPayload = {
      score: pontuacaoTotal,
      user_name: userName,
      user_cellphone: userCellphone,
      user_email: userEmail,
      user_schoolYear: "Outro",
      user_careerChoiceCertainty: "Não tenho ideia do que escolher",
    };
    console.log("Enviando email:", emailPayload);
    try {
      await axios.post(
        "https://leads.cv.back.decisaoexata.com/send-email/",
        emailPayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Erro ao enviar email:", error);
    }
  };

  /* ────────────── Manipuladores de Eventos ────────────── */
  const handleCopyPixKey = () => {
    if (qrCodeText) {
      navigator.clipboard.writeText(qrCodeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

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

  /* ────────────── Cálculos para a Contagem e Progresso ────────────── */
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const countdown = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  const percentage = (timer / (15 * 60)) * 100;

  /* ────────────── Renderização ────────────── */
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      style={{ fontFamily: "Ubuntu, sans-serif" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto pointer-events-auto"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* HEADER */}
        <header className="text-center mb-6">
          <h1 className="mt-2 text-3xl md:text-2xl font-bold text-indigo-600">
            Você concluiu o teste vocacional!
          </h1>
          <p className="mt-2 text-base md:text-lg text-gray-700">
            Não escolha a carreira errada! Descubra agora mesmo qual é a sua
            profissão ideal
          </p>
        </header>

        {/* PREVIEW IMAGE */}
        {previewImage && (
          <section className="mb-6">
            <img
              src={previewImage}
              alt="Prévia do resultado"
              className="w-full max-h-48 object-cover rounded-lg shadow-md"
              style={{
                filter: paymentStatus !== "approved" ? "blur(2px)" : "none",
              }}
            />
          </section>
        )}

        {/* CONTENT */}
        {resultsRevealed ? (
          <section className="text-center">
            <p className="text-green-600 font-bold text-xl md:text-2xl">
              Obrigado! Dados enviados.
            </p>
          </section>
        ) : paymentStatus === "approved" ? (
          <section>
            <p className="text-center text-green-600 font-bold text-xl md:text-2xl mb-4">
              Pagamento Confirmado!
            </p>
            <p className="text-center text-gray-700 text-sm md:text-base mb-4">
              Insira seus dados para liberar seu resultado.
            </p>
            {errorMsg && (
              <p
                className="text-center text-red-500 text-sm md:text-base mb-4"
                role="alert"
              >
                {errorMsg}
              </p>
            )}
            {/* FORM FIELDS */}
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1 text-sm md:text-base">
                Nome
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Seu nome"
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base ${
                  attemptedSubmit && !userName ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1 text-sm md:text-base">
                Celular
              </label>
              <input
                type="tel"
                value={userCellphone}
                onChange={(e) => setUserCellphone(e.target.value)}
                placeholder="(XX) XXXXX-XXXX"
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base ${
                  attemptedSubmit && !userCellphone ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1 text-sm md:text-base">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base ${
                  attemptedSubmit && !userEmail ? "border-red-500" : ""
                }`}
              />
            </div>
            <button
              onClick={handleRevealResults}
              disabled={!userName || !userCellphone || !userEmail}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md text-sm md:text-base transition-all duration-200 ${
                !userName || !userCellphone || !userEmail
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100"
              }`}
            >
              Liberar Meu Resultado
            </button>
          </section>
        ) : (
          <section className="text-center">
            <p className="text-2xl md:text-2xl font-extrabold text-red-500 mb-2">
              Oferta Exclusiva
            </p>
            <p className="text-xl md:text-2xl font-extrabold text-red-500 mb-2">
              Liberação Imediata dos Resultados
            </p>
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="line-through text-red-500 text-sm md:text-base">
                  R$38,90
                </span>
                <span className="text-green-500 text-3xl md:text-4xl font-extrabold animate-pulse">
                  R$9,90
                </span>
              </div>
            </div>

            {loading && (
              <p className="text-center text-gray-500 mb-4 text-sm md:text-base">
                Gerando QR Code...
              </p>
            )}
            {!loading && qrCodeData && timer > 0 && (
              <div className="flex flex-col items-center mb-4">
                <img
                  src={qrCodeData}
                  alt="QR Code para pagamento PIX"
                  className="w-40 h-40 object-contain rounded shadow-md border-4 border-blue-500 mb-2"
                />
                {qrCodeText && (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleCopyPixKey}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full text-sm md:text-base transition-all duration-200"
                    >
                      Copiar Código PIX
                    </button>
                    {copied && (
                      <span
                        className="text-xs md:text-sm text-green-500 mt-1"
                        aria-live="polite"
                      >
                        Copiado!
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* COUNTDOWN & PROGRESS */}
            <section className="text-center mb-6">
              <span className="text-3xl md:text-4xl font-black text-red-500">
                {countdown}
              </span>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3 mx-auto max-w-sm">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
                <p className="text-sm md:text-base text-gray-400 mb-2">
                  Tempo restante até o seu código PIX expirar
                </p>
              </div>
            </section>

            {/* {paymentStatus && paymentStatus !== "approved" && (
              <p className="text-gray-700 text-sm md:text-base mt-2">
                {paymentStatus}
              </p>
            )} */}
            {!loading && timer === 0 && !paymentStatus && (
              <p className="text-red-500 font-bold mt-4 text-sm md:text-base">
                Tempo Esgotado!
              </p>
            )}
          </section>
        )}

        {/* FOOTER / TRUST SIGNALS */}
        <footer className="mt-10 text-center text-gray-600 text-xs md:text-sm">
          <p className="mb-1 font-semibold">Compra 100% Segura</p>
          <p className="mb-2">Seus dados estão protegidos e criptografados.</p>
        </footer>
      </motion.div>
    </motion.div>
  );
}

PaymentCaptureForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  pontuacaoTotal: PropTypes.array.isRequired,
  topCourses: PropTypes.array.isRequired,
  previewImage: PropTypes.string,
};

export default PaymentCaptureForm;
