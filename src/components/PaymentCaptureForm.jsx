// src/components/PaymentCaptureForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import io from "socket.io-client";
import axios from "axios";
import { usePersistedState } from "../hooks/usePersistedState";

// Use the paid backend domain for Socket.IO (for payment status updates)
const socket = io("https://paid.cv.backend.decisaoexata.com");

function PaymentCaptureForm({
  showForm,
  onPaymentSuccess,
  pontuacaoTotal,
  topCourses,
}) {
  // Timer and payment state
  const [timer, setTimer] = useState(15 * 60); // 15 minutes in seconds
  const [loading, setLoading] = useState(false);
  // Persist testId and paymentStatus so they survive page refresh
  const [testId, setTestId] = usePersistedState("paymentTestId", null);
  const [paymentStatus, setPaymentStatus] = usePersistedState(
    "paymentStatus",
    null
  );
  const [qrCodeData, setQrCodeData] = useState(null);
  const [qrCodeText, setQrCodeText] = useState(null);
  const [copied, setCopied] = useState(false);

  // New persisted state to track if the lead data was already submitted (i.e. results revealed)
  const [resultsRevealed, setResultsRevealed] = usePersistedState(
    "resultsRevealed",
    false
  );

  // Lead data using persisted state (reads/writes automatically to localStorage)
  const [userName, setUserName] = usePersistedState("leadName", "");
  const [userCellphone, setUserCellphone] = usePersistedState(
    "leadCellphone",
    ""
  );
  const [userEmail, setUserEmail] = usePersistedState("leadEmail", "");

  // State to track if user attempted to submit
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Instead of returning null when results have been revealed,
  // display a confirmation message.
  if (resultsRevealed) {
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-center text-green-600 font-bold text-xl">
            Obrigado! Seus dados foram enviados com sucesso.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // When modal shows, start PIX payment and countdown
  useEffect(() => {
    if (!showForm) return;
    // Only start a new payment if no testId exists and payment hasn't been approved
    if (!testId && paymentStatus !== "approved") {
      startPixPayment();
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [showForm, testId, paymentStatus]);

  // Listen for payment status updates via Socket.IO
  useEffect(() => {
    socket.on("paymentStatusUpdate", (data) => {
      if (data.testId === testId) {
        setPaymentStatus(data.paymentStatus);
        if (data.paymentStatus === "approved") {
          // Optionally hide QR code when approved
          setQrCodeData(null);
        }
      }
    });
    return () => socket.off("paymentStatusUpdate");
  }, [testId, userName, userCellphone, userEmail, pontuacaoTotal, topCourses]);

  // Call the backend PIX endpoint to generate the QR code
  const startPixPayment = async () => {
    setLoading(true);
    try {
      const payload = {
        email: "user@example.com", // used only for payment creation
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
      if (data.qrCodeBase64) {
        setQrCodeData("data:image/png;base64," + data.qrCodeBase64);
      } else if (data.qrCodeUrl) {
        setQrCodeData(data.qrCodeUrl);
      }
      if (data.qrCodeText) {
        setQrCodeText(data.qrCodeText);
      }
    } catch (error) {
      console.error("Error starting PIX payment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Copy the plain-text PIX key to clipboard
  const handleCopyPixKey = () => {
    if (qrCodeText) {
      navigator.clipboard.writeText(qrCodeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Function to send the lead data to the CRM endpoint
  const sendLeadData = async () => {
    const leadPayload = {
      name: userName,
      cellphone: userCellphone,
      email: userEmail,
      topCourses: topCourses,
      // Provide default valid enum values if these fields are not captured by the form:
      schoolYear: "Outro",
      careerChoiceCertainty: "Não tenho ideia do que escolher",
      vocationalHelp: "Não preciso de ajuda",
    };

    console.log("Sending lead payload to CRM backend:", leadPayload);

    try {
      await axios.post(
        "https://cv.back.decisaoexata.com/api/leads",
        leadPayload,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Erro ao salvar os resultados:", error);
    }
    // Notify parent component about approved payment (pass the payload)
    onPaymentSuccess(leadPayload);
  };

  // Function to send email to the lead using the email endpoint
  const sendLeadEmail = async () => {
    const emailPayload = {
      score: pontuacaoTotal, // pass the computed score array
      user_name: userName,
      user_cellphone: userCellphone,
      user_email: userEmail,
      user_schoolYear: "Outro", // default value (adjust if you have input)
      user_careerChoiceCertainty: "Não tenho ideia do que escolher", // default value (adjust if you have input)
    };

    console.log("Sending email payload to email backend:", emailPayload);

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

  // Handle the click on "Revelar resultados"
  const handleRevealResults = () => {
    setAttemptedSubmit(true);
    if (!userName || !userCellphone || !userEmail) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Send lead data and email once the user clicks the button
    sendLeadData();
    sendLeadEmail();
    // Mark that the results have been revealed so the form won't show again on refresh
    setResultsRevealed(true);
  };

  if (!showForm) return null;

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const countdown = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1588693741639-c0321a438d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          alt="Success"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        {/* Show top section only if payment is not approved */}
        {paymentStatus !== "approved" && (
          <>
            <h2 className="text-center font-extrabold text-2xl md:text-3xl text-red-600 mb-2 relative z-10 uppercase tracking-wider">
              Oferta Relâmpago
            </h2>
            <p className="text-center text-gray-600 text-sm md:text-base font-medium mb-4 relative z-10">
              Aproveite antes que acabe! Tempo limitado.
            </p>

            <div className="flex flex-col items-center justify-center mb-4 relative z-10">
              <div className="flex items-baseline space-x-2">
                <span className="line-through text-red-600 text-sm md:text-base">
                  R$37,80
                </span>
                <span className="text-green-600 text-3xl md:text-4xl font-extrabold animate-pulse">
                  R$9,90
                </span>
              </div>
              <p className="text-gray-700 text-xs md:text-sm mt-1 font-semibold">
                Desconto exclusivo! Pague agora e descubra seu futuro
                profissional.
              </p>
            </div>

            <p className="text-center text-2xl md:text-3xl text-red-600 font-bold mb-4 relative z-10 animate-pulse">
              <span className="mr-2">O QR Code expira em:</span>
              <span className="underline">{countdown}</span>
            </p>
          </>
        )}

        {/* QR Code and Copy Button */}
        {loading && (
          <p className="text-center text-gray-500 mb-4 relative z-10">
            Gerando QR Code, aguarde...
          </p>
        )}
        {!loading &&
          qrCodeData &&
          timer > 0 &&
          paymentStatus !== "approved" && (
            <div className="flex flex-col items-center justify-center mb-4 relative z-10">
              <img
                src={qrCodeData}
                alt="QR Code para pagamento PIX"
                className="w-44 h-44 object-contain rounded shadow-lg border-4 border-green-500 mb-2"
              />
              {qrCodeText && (
                <div className="flex flex-col items-center">
                  <p className="text-sm text-gray-700 mb-2 font-medium">
                    Não consegue escanear? Copie a chave PIX:
                  </p>
                  <button
                    onClick={handleCopyPixKey}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-200"
                  >
                    Copiar Chave PIX
                  </button>
                  {copied && (
                    <span className="text-xs text-green-600 mt-1">
                      Copiado para a área de transferência!
                    </span>
                  )}
                </div>
              )}
            </div>
          )}

        {/* Payment Status Messages */}
        {paymentStatus === "pending" && (
          <p className="text-center text-blue-600 font-semibold mb-4 relative z-10">
            Pagamento Pendente...
          </p>
        )}
        {paymentStatus &&
          paymentStatus !== "approved" &&
          paymentStatus !== "pending" && (
            <p className="text-center text-gray-600 mt-2 relative z-10">
              Status do Pagamento: {paymentStatus}
            </p>
          )}
        {!loading && timer === 0 && !paymentStatus && (
          <p className="text-center text-red-600 font-bold mt-4 relative z-10">
            Tempo Esgotado! Feche esta janela e tente novamente.
          </p>
        )}

        {/* Input Fields and Reveal Button (shown when payment is approved) */}
        {paymentStatus === "approved" && (
          <div className="relative z-10 mt-4">
            <p className="text-center text-green-600 font-bold mb-4">
              Pagamento Aprovado! Preencha seus dados para revelar resultados.
            </p>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1">
                Seu Nome
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu nome"
                required
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  attemptedSubmit && !userName ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 font-semibold mb-1">
                Celular
              </label>
              <input
                type="tel"
                value={userCellphone}
                onChange={(e) => setUserCellphone(e.target.value)}
                placeholder="(XX) XXXXX-XXXX"
                required
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  attemptedSubmit && !userCellphone ? "border-red-500" : ""
                }`}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                required
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  attemptedSubmit && !userEmail ? "border-red-500" : ""
                }`}
              />
            </div>
            <button
              onClick={handleRevealResults}
              disabled={!userName || !userCellphone || !userEmail}
              className={`w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-200 ${
                !userName || !userCellphone || !userEmail
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100"
              }`}
            >
              Revelar resultados
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

PaymentCaptureForm.propTypes = {
  showForm: PropTypes.bool.isRequired,
  onPaymentSuccess: PropTypes.func.isRequired,
  pontuacaoTotal: PropTypes.array.isRequired,
  topCourses: PropTypes.array.isRequired,
};

export default PaymentCaptureForm;
