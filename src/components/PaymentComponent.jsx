import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./PaymentComponent.css";

// Connect to your backend's Socket.IO (adjust the URL if necessary)
const socket = io("https://paid.cv.backend.decisaoexata.com");

const PaymentComponent = ({ onClose, onPaymentComplete }) => {
  const [loading, setLoading] = useState(false);
  const [testId, setTestId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [price] = useState(0.2); // Price in BRL

  useEffect(() => {
    // Listen for real-time payment status updates
    socket.on("paymentStatusUpdate", (data) => {
      console.log("Received payment status update:", data);
      if (data.testId === testId) {
        setPaymentStatus(data.paymentStatus);
        if (data.paymentStatus === "approved") {
          setQrCodeData(null); // Hide QR code if payment is confirmed
          onPaymentComplete(data);
        }
      }
    });
    return () => {
      socket.off("paymentStatusUpdate");
    };
  }, [testId, onPaymentComplete]);

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

      // Set the QR code data for display (inline if available)
      if (data.qrCodeBase64) {
        setQrCodeData("data:image/png;base64," + data.qrCodeBase64);
      } else if (data.qrCodeUrl) {
        setQrCodeData(data.qrCodeUrl);
      }
    } catch (error) {
      console.error("Error starting PIX payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal">
        <button className="payment-close-btn" onClick={onClose}>
          &times;
        </button>
        <h2 className="payment-title">Pagamento PIX</h2>
        <p className="payment-price">Valor: R$ {price.toFixed(2)}</p>
        <p className="payment-subtitle">
          Escaneie o QR Code com seu app bancário:
        </p>
        {!testId && !loading && (
          <button className="payment-action-btn" onClick={startPixPayment}>
            Iniciar Pagamento
          </button>
        )}
        {loading && <p className="payment-loading">Processando...</p>}
        {qrCodeData && (
          <div className="payment-qrcode-container">
            <img
              src={qrCodeData}
              alt="Código QR do PIX"
              className="payment-qrcode"
            />
          </div>
        )}
        {paymentStatus && (
          <p className="payment-status">
            {paymentStatus === "approved"
              ? "Pagamento Aprovado!"
              : paymentStatus === "pending"
              ? "Pagamento Pendente"
              : `Pagamento: ${paymentStatus}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentComponent;
