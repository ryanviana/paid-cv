import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutForm from "./CheckoutForm";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const OfferSection = ({ originalPrice, discountedPrice }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const [buyers, setBuyers] = useState(0);

  useEffect(() => {
    // Random buyer count for demonstration
    setBuyers(Math.floor(Math.random() * (100 - 15 + 1)) + 15);

    const now = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);

    setTimer(Math.floor((endOfWeek - now) / 1000));

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  const closeModal = (e) => {
    if (e.target.id === "modal-backdrop") {
      setModalOpen(false);
    }
  };

  return (
    <motion.section
      id="payment-offer"
      initial="hidden"
      animate="visible"
      variants={sectionVariant}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="py-8 md:py-16 px-4 md:px-6 bg-yellow-50 flex justify-center"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Offer Details */}
        <div className="text-left space-y-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">
            🚀 Última Chance Para Pagar Menos!
          </h2>
          <div className="inline-block bg-red-600 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-md">
            ⏳ Oferta termina em {formatTime(timer)}
          </div>
          <p className="text-base md:text-lg text-gray-700">
            🔥 Mais de <strong>{buyers} pessoas</strong> compraram essa oferta
            hoje!
          </p>
          <div className="flex flex-wrap items-center mt-4 space-x-3">
            <span className="text-base md:text-lg line-through text-red-500 font-bold">
              R$ {originalPrice.toFixed(2)}
            </span>
            <span className="text-3xl md:text-5xl font-extrabold text-green-600">
              R$ {discountedPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-base md:text-lg text-gray-800 font-bold">
            🎯 Use o cupom{" "}
            <span className="bg-yellow-300 px-2 py-1 rounded-md">CALCULO9</span>{" "}
            e pague <strong>APENAS R$9,90</strong>!
          </p>
          <p className="text-sm text-red-600 font-semibold">
            📉 O preço voltará ao normal em breve!
          </p>
        </div>

        {/* Right Side - Checkout Button */}
        <div className="bg-white rounded-lg p-6 shadow-lg text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full px-6 py-3 bg-green-600 text-white text-xl font-bold rounded-md hover:bg-green-700 transition"
          >
            🔥 Obter Acesso Agora
          </button>
          <p className="text-sm text-gray-600 mt-2">
            ✅ Compra 100% segura – Garantia de satisfação!
          </p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            id="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto p-4"
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeModal}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg md:max-w-2xl"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
              >
                ✖
              </button>
              <CheckoutForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default OfferSection;
