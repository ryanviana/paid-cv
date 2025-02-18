// src/components/DropdownQuestion.jsx
import PropTypes from "prop-types";
import Select from "react-select";
import { motion } from "framer-motion";

function DropdownQuestion({ label, options, value, onChange }) {
  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-gray-800 font-semibold mb-2">{label}</label>
      <Select
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={(selected) => onChange(selected?.value || "")}
        placeholder="Selecione..."
        className="w-full"
      />
    </motion.div>
  );
}

DropdownQuestion.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownQuestion;
