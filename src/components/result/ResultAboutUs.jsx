// /componetes/result/ResultAboutUs.jsx
import { motion } from "framer-motion";
import AboutDecisaoExataMotion from "../../components/AboutDecisaoExataMotion";

const ResultAboutUs = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Sobre Nós
          </motion.h2>
          <div className="mt-2 border-b-4 border-blue-600 w-24 mx-auto"></div>
        </div>
        <AboutDecisaoExataMotion />
      </div>
    </section>
  );
};

export default ResultAboutUs;
