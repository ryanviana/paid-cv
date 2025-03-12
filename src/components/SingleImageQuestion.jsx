import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

function SingleImageQuestion({ questionId, statement, updatePerguntaAtual }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (index) => {
    setSelected(index);
  };

  const handleNext = () => {
    if (selected === null) return;
    // Check the expected number of parameters of updatePerguntaAtual.
    if (updatePerguntaAtual.length === 1) {
      updatePerguntaAtual(1);
    } else {
      updatePerguntaAtual(selected, 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col items-center justify-start">
      {/* Title & Description */}
      <div className="w-full text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight px-2">
          {statement.title}
        </h2>
        {statement.description && (
          <p className="text-gray-600 text-sm md:text-lg mt-1 px-4">
            {statement.description}
          </p>
        )}
      </div>

      {/* Grid: 1 column on mobile, 2 columns on small/medium, 3 on large */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl place-items-center">
        {statement.images.map((img, index) => (
          <motion.div
            key={index}
            className={`relative cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-300 w-[80%] sm:w-full aspect-square flex items-center justify-center ${
              selected === index
                ? "border-4 border-blue-500 scale-105 shadow-lg"
                : "border border-gray-200 hover:shadow-lg hover:scale-105"
            }`}
            onClick={() => handleSelect(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={img.image}
              alt={img.label}
              className="w-full h-full object-cover rounded-xl"
            />
            {/* Label Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3 rounded-xl">
              <span className="text-white text-sm md:text-base font-semibold">
                {img.label}
              </span>
            </div>
            {/* Check Icon if Selected */}
            {selected === index && (
              <motion.div
                className="absolute top-3 right-3 bg-blue-500 rounded-full p-2 shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Check size={22} className="text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        disabled={selected === null}
        onClick={handleNext}
        className={`mt-8 mb-8 px-8 py-4 rounded-xl text-white font-semibold text-lg md:text-xl transition-all ${
          selected !== null
            ? "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        whileHover={selected !== null ? { scale: 1.05 } : {}}
      >
        Próxima
      </motion.button>
    </div>
  );
}

SingleImageQuestion.propTypes = {
  questionId: PropTypes.string.isRequired,
  statement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  updatePerguntaAtual: PropTypes.func.isRequired,
};

export default SingleImageQuestion;
