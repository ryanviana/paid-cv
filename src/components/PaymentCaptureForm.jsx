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
  // 1. Persist all important states so they survive page refresh
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

  // 2. Persist the user’s name, phone, and email
  const [userName, setUserName] = usePersistedState("leadName", "");
  const [userCellphone, setUserCellphone] = usePersistedState(
    "leadCellphone",
    ""
  );
  const [userEmail, setUserEmail] = usePersistedState("leadEmail", "");

  // 3. Track whether the user already revealed results
  const [resultsRevealed, setResultsRevealed] = usePersistedState(
    "resultsRevealed",
    false
  );

  // 4. Other local states
  const [timer, setTimer] = useState(15 * 60); // 15 min in seconds
  const [loading, setLoading] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [copied, setCopied] = useState(false);

  // If the parent says not to show, bail out
  if (!showForm) return null;

  //
  // ─────────────────────────────────────────────────────────────
  //   ::::: USE EFFECTS :::::
  // ─────────────────────────────────────────────────────────────
  //

  // A) Start PIX Payment (if needed) and start the countdown timer
  useEffect(() => {
    // Only start a new payment if we don't have a testId yet and not approved
    if (!testId && paymentStatus !== "approved") {
      startPixPayment();
    }
    // Start the countdown
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [testId, paymentStatus, showForm]);

  // B) Listen for payment updates from the socket
  useEffect(() => {
    socket.on("paymentStatusUpdate", (data) => {
      if (data.testId === testId) {
        setPaymentStatus(data.paymentStatus);
        if (data.paymentStatus === "approved") {
          // Optionally hide the QR code when approved
          setQrCodeData(null);
          setQrCodeText(null);
        }
      }
    });
    return () => socket.off("paymentStatusUpdate");
  }, [
    testId,
    setPaymentStatus,
    setQrCodeData,
    setQrCodeText,
    userName,
    userCellphone,
    userEmail,
    pontuacaoTotal,
    topCourses,
  ]);

  //
  // ─────────────────────────────────────────────────────────────
  //   ::::: BACKEND CALLS :::::
  // ─────────────────────────────────────────────────────────────
  //

  // Call the backend to get the PIX QR code
  const startPixPayment = async () => {
    setLoading(true);
    try {
      const payload = {
        email: "user@example.com", // used for payment creation
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
      setPaymentStatus("pending"); // start in pending
      // Store the QR code in persisted state
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

  // Send lead data to the CRM endpoint
  const sendLeadData = async () => {
    const leadPayload = {
      name: userName,
      cellphone: userCellphone,
      email: userEmail,
      topCourses: topCourses,
      // Provide default valid enum values
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

    // Tell the parent that the payment was a success
    onPaymentSuccess(leadPayload);
  };

  // Send lead email
  const sendLeadEmail = async () => {
    const emailPayload = {
      score: pontuacaoTotal,
      user_name: userName,
      user_cellphone: userCellphone,
      user_email: userEmail,
      user_schoolYear: "Outro",
      user_careerChoiceCertainty: "Não tenho ideia do que escolher",
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

  //
  // ─────────────────────────────────────────────────────────────
  //   ::::: EVENT HANDLERS :::::
  // ─────────────────────────────────────────────────────────────
  //

  // Copy the plain-text PIX key
  const handleCopyPixKey = () => {
    if (qrCodeText) {
      navigator.clipboard.writeText(qrCodeText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Reveal the results (send lead data + email)
  const handleRevealResults = () => {
    setAttemptedSubmit(true);
    if (!userName || !userCellphone || !userEmail) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    // Send the data
    sendLeadData();
    sendLeadEmail();
    // Mark results as revealed so we can skip this form next time if you wish
    setResultsRevealed(true);
  };

  //
  // ─────────────────────────────────────────────────────────────
  //   ::::: RENDER LOGIC :::::
  // ─────────────────────────────────────────────────────────────
  //

  // Countdown display
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
        {/* Background image (faded) */}
        <img
          src="https://images.unsplash.com/photo-1588693741639-c0321a438d6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200"
          alt="Success"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        {/* If user already revealed results, show a simple confirmation */}
        {resultsRevealed ? (
          <div className="relative z-10 text-center">
            <p className="text-green-600 font-bold text-xl">
              Obrigado! Seus dados foram enviados com sucesso.
            </p>
          </div>
        ) : paymentStatus === "approved" ? (
          // ─────────────────────────────────────────────────────
          // IF PAYMENT APPROVED (BUT NOT REVEALED), SHOW THE FORM
          // ─────────────────────────────────────────────────────
          <div className="relative z-10">
            <p className="text-center text-green-600 font-bold mb-4 text-xl">
              Pagamento Aprovado!
            </p>
            <p className="text-center text-gray-700 font-medium mb-6">
              Preencha seus dados para revelar os resultados.
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
        ) : (
          // ───────────────────────────────────────────────────────────
          // ELSE: PAYMENT NOT APPROVED YET => SHOW QR CODE OR TIMEOUT
          // ───────────────────────────────────────────────────────────
          <>
            {/* Title / Urgency */}
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

            {/* Loading message */}
            {loading && (
              <p className="text-center text-gray-500 mb-4 relative z-10">
                Gerando QR Code, aguarde...
              </p>
            )}

            {/* QR Code Display */}
            {!loading && qrCodeData && timer > 0 && (
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

            {/* Payment status messages */}
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

            {/* Time ran out? */}
            {!loading && timer === 0 && !paymentStatus && (
              <p className="text-center text-red-600 font-bold mt-4 relative z-10">
                Tempo Esgotado! Feche esta janela e tente novamente.
              </p>
            )}
          </>
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
