import React from "react";
import { motion } from "framer-motion";

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const FooterSection = () => (
  <motion.footer
    className="w-full bg-gray-900 text-gray-200 py-8 px-4 text-center"
    initial="hidden"
    animate="visible"
    variants={sectionVariant}
    transition={{ duration: 0.8, delay: 0.8 }}
  >
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Entre em Contato</h3>
      <p className="mb-2">
        <strong>Email:</strong> ryan@decisaoexata.com
      </p>
      <p className="mb-2">
        <strong>Telefone:</strong> +55 35 99145-9394
      </p>
      <p className="mb-4">
        <strong>Site:</strong>{" "}
        <a
          href="https://decisaoexata.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 underline"
        >
          decisaoexata.com
        </a>
      </p>
      <div>
        <a
          href="https://wa.me/5535991459394?text=Oi%2C%20preciso%20de%20ajuda%20para%20decidir%20meu%20curso!"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Fale Conosco no WhatsApp
        </a>
      </div>
      <p className="mt-4 text-sm">
        © {new Date().getFullYear()} Decisão Exata. Todos os direitos
        reservados.
      </p>
    </div>
  </motion.footer>
);

export default FooterSection;
