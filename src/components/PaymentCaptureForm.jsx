// src/components/PaymentCaptureForm.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import io from "socket.io-client";
import axios from "axios";

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
  const [testId, setTestId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [qrCodeText, setQrCodeText] = useState(null);
  const [copied, setCopied] = useState(false);

  // Lead data – stored in localStorage
  const [userName, setUserName] = useState("");
  const [userCellphone, setUserCellphone] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Rehydrate lead data from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("leadName");
    const storedCellphone = localStorage.getItem("leadCellphone");
    const storedEmail = localStorage.getItem("leadEmail");
    if (storedName) setUserName(storedName);
    if (storedCellphone) setUserCellphone(storedCellphone);
    if (storedEmail) setUserEmail(storedEmail);
  }, []);

  // Persist lead data as user types
  useEffect(() => {
    localStorage.setItem("leadName", userName);
  }, [userName]);
  useEffect(() => {
    localStorage.setItem("leadCellphone", userCellphone);
  }, [userCellphone]);
  useEffect(() => {
    localStorage.setItem("leadEmail", userEmail);
  }, [userEmail]);

  // When modal shows, start PIX payment and countdown
  useEffect(() => {
    if (!showForm) return;
    startPixPayment();
    const interval = setInterval(() => {
      setTimer((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [showForm]);

  // Listen for payment status updates via Socket.IO
  useEffect(() => {
    socket.on("paymentStatusUpdate", (data) => {
      if (data.testId === testId) {
        setPaymentStatus(data.paymentStatus);
        if (data.paymentStatus === "approved") {
          // Optionally hide QR code when approved
          setQrCodeData(null);
          // Send the lead data to the backend
          sendLeadData();
        }
      }
    });
    return () => socket.off("paymentStatusUpdate");
  }, [testId, userName, userCellphone, userEmail]);

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

  // When payment is approved, send lead data with proper field names and valid defaults
  const sendLeadData = async () => {
    const leadPayload = {
      name: userName,
      cellphone: userCellphone,
      email: userEmail,
      topCourses: topCourses,
      // Provide default valid enum values if these fields are not captured by the form:
      schoolYear: "Outro", // valid value from: "Ensino Médio – 1º Ano", "Ensino Médio – 2º Ano", "Ensino Médio – 3º Ano", "Cursinho", "Já estou na Universidade", "Outro"
      careerChoiceCertainty: "Não tenho ideia do que escolher", // valid value from the enum
      vocationalHelp: "Não preciso de ajuda", // valid value from the enum
    };

    console.log("Sending lead payload to backend:", leadPayload);

    try {
      await axios.post(
        "https://cv.back.decisaoexata.com/api/leads",
        leadPayload,
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Erro ao salvar os resultados e enviar email:", error);
    }
    // Notify parent component about approved payment (pass the payload)
    onPaymentSuccess(leadPayload);
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
        {/* Offer Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-center text-jornadas-blue relative z-10">
          OFERTA RELÂMPAGO
        </h2>
        <p className="text-center text-gray-800 text-xl font-bold mb-2 relative z-10">
          De <span className="line-through text-red-600">R$78,90</span> por{" "}
          <span className="text-green-600">R$9,90</span>
        </p>
        <p className="text-center text-gray-600 mb-4 relative z-10">
          Pague agora e descubra seu futuro profissional!
        </p>
        {/* Countdown */}
        <p className="text-center text-sm md:text-base text-gray-700 font-semibold mb-4 relative z-10">
          O QR Code expira em{" "}
          <span className="text-red-600 text-lg md:text-xl">{countdown}</span>
        </p>
        {/* QR Code and Copy Button */}
        {loading && (
          <p className="text-center text-gray-500 mb-4 relative z-10">
            Gerando QR Code, aguarde...
          </p>
        )}
        {!loading && qrCodeData && timer > 0 && (
          <div className="flex flex-col items-center justify-center mb-4 relative z-10">
            <img
              src={qrCodeData}
              alt="QR Code para pagamento PIX"
              className="w-44 h-44 object-contain rounded shadow-lg border-2 border-green-500 mb-2"
            />
            {qrCodeText && (
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-700 mb-2">
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
        {/* Input Fields for Lead Data */}
        <div className="relative z-10 mb-4">
          <label className="block text-gray-800 font-semibold mb-1">
            Seu Nome
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative z-10 mb-4">
          <label className="block text-gray-800 font-semibold mb-1">
            Celular
          </label>
          <input
            type="tel"
            value={userCellphone}
            onChange={(e) => setUserCellphone(e.target.value)}
            placeholder="(XX) XXXXX-XXXX"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative z-10 mb-4">
          <label className="block text-gray-800 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="seuemail@exemplo.com"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Payment Status */}
        {paymentStatus === "approved" && (
          <p className="text-center text-green-600 font-bold mt-4 relative z-10">
            Pagamento Aprovado! Carregando resultados...
          </p>
        )}
        {paymentStatus === "pending" && (
          <p className="text-center text-blue-600 font-semibold mt-4 relative z-10">
            Pagamento Pendente...
          </p>
        )}
        {paymentStatus &&
          paymentStatus !== "approved" &&
          paymentStatus !== "pending" && (
            <p className="text-center text-gray-600 mt-4 relative z-10">
              Status do Pagamento: {paymentStatus}
            </p>
          )}
        {!loading && timer === 0 && !paymentStatus && (
          <p className="text-center text-red-600 font-bold mt-4 relative z-10">
            Tempo Esgotado! Feche esta janela e tente novamente.
          </p>
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
