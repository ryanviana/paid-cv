import React from "react";
import { motion } from "framer-motion";
import CheckoutForm from "./CheckoutForm";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const OfferSection = ({ originalPrice, discountedPrice }) => (
  <motion.section
    id="payment-offer"
    initial="hidden"
    animate="visible"
    variants={sectionVariant}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="py-16 px-4 bg-gray-50 text-center"
  >
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
      <div className="flex-1 flex flex-col justify-center space-y-6 text-left py-6 pr-8">
        <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
          🔓 Desbloqueie Seu Resultado Agora
        </h2>
        <div className="inline-block bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-md">
          OFERTA EXCLUSIVA, SÓ ESSA SEMANA!
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">
            Aproveite antes que acabe!
          </p>
          <div className="flex items-baseline mt-2 space-x-3">
            <span className="text-lg line-through text-red-500 font-bold">
              R$ {originalPrice.toFixed(2)}
            </span>
            <span className="text-5xl font-extrabold text-green-600">
              R$ {discountedPrice.toFixed(2)}
            </span>
          </div>
          <p className="mt-4 text-lg text-gray-700">
            Use o cupom <strong>CALCULO9</strong> para pagar apenas R$9,90!
          </p>
        </div>
      </div>
      <div className="md:w-1/2 bg-white rounded-lg p-6 shadow space-y-6 text-center md:text-left">
        <CheckoutForm />
      </div>
    </div>
  </motion.section>
);

export default OfferSection;
