import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

function MultiSelectBox({ statement, onSelectionChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = (index) => {
    const updatedSelection = selectedOptions.includes(index)
      ? selectedOptions.filter((i) => i !== index)
      : [...selectedOptions, index];
    setSelectedOptions(updatedSelection);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
        {statement.title}
      </h2>
      {statement.description && (
        <p className="text-center text-gray-600 text-base md:text-lg mb-6 max-w-lg mx-auto">
          {statement.description}
        </p>
      )}

      <div className="flex flex-col gap-4 w-full">
        {statement.options.map((option, index) => (
          <motion.div
            key={index}
            onClick={() => handleToggle(index)}
            whileHover={{ scale: 1.02 }}
            className={`relative cursor-pointer rounded-lg px-4 py-3 flex items-center justify-between border-2 transition-all duration-300 ${
              selectedOptions.includes(index)
                ? "border-green-500 bg-green-100 shadow-md"
                : "border-gray-300 hover:border-gray-500"
            }`}
          >
            <span className="text-lg font-medium text-gray-800">{option}</span>
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full transition-opacity duration-200 ${
                selectedOptions.includes(index)
                  ? "bg-green-500 opacity-100"
                  : "opacity-0"
              }`}
            >
              <Check size={20} className="text-white" />
            </div>
          </motion.div>
        ))}
      </div>

      <button
        disabled={selectedOptions.length === 0}
        onClick={() => onSelectionChange(selectedOptions)}
        className={`mt-8 px-6 py-3 md:px-8 md:py-4 rounded-lg text-white font-semibold text-lg md:text-xl transition-colors duration-300 ${
          selectedOptions.length > 0
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Confirmar
      </button>
    </div>
  );
}

MultiSelectBox.propTypes = {
  statement: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

export default MultiSelectBox;
