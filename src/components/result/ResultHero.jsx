// /componetes/result/ResultHero.jsx
import { motion } from "framer-motion";

const ResultHero = ({ isTotal }) => {
  return (
    <section className="w-full bg-white pt-16 pb-6">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          className="text-4xl font-extrabold text-gray-900 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {isTotal ? "Seu Futuro Te Aguarda" : "Você Está Quase Lá!"}
        </motion.h1>
        <motion.p
          className="text-xl text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {isTotal
            ? "Desbloqueie sua jornada e descubra as áreas que vão impulsionar seu sucesso profissional!"
            : "Continue avançando para ver uma prévia do seu caminho brilhante."}
        </motion.p>
      </div>
    </section>
  );
};

export default ResultHero;
