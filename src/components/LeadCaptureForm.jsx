import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Select from "react-select";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

function LeadCaptureForm({ showLeadCapture, onSubmit }) {
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [vocationalHelp, setVocationalHelp] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!showLeadCapture) return null; // Hide form until full results are shown

  // Options for the dropdown
  const vocationalOptions = [
    { value: "I really want help", label: "Eu realmente quero ajuda" },
    { value: "I guess help is good", label: "Acho que ajuda é boa" },
    { value: "No help required", label: "Não preciso de ajuda" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // reset error

    if (!name || !cellphone || !vocationalHelp) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    // Validate Brazilian cellphone
    try {
      const phoneNumber = phoneUtil.parse(cellphone, "BR");
      if (!phoneUtil.isValidNumber(phoneNumber)) {
        setErrorMessage("Número de celular inválido. Verifique o formato e tente novamente.");
        return;
      }
    } catch (error) {
      setErrorMessage("Número de celular inválido. Verifique o formato e tente novamente.");
      return;
    }

    // Submit data if validation passes
    onSubmit({ name, cellphone, vocationalHelp: vocationalHelp.value });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        // Optionally close the form if clicking outside
      }}
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-jornadas-blue">
          Desbloqueie Seus Resultados
        </h2>
        <p className="mb-5 text-center text-gray-700">
          Preencha seus dados para descobrir seu caminho profissional e dar{" "}
          <strong>o próximo passo rumo ao sucesso!</strong>
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="Seu nome"
            required
          />
          <input
            type="tel"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            className="w-full p-3 border rounded-lg"
            placeholder="(XX) XXXXX-XXXX"
            required
          />
          <div className="w-full">
            <Select
              options={vocationalOptions}
              placeholder="O que você acha sobre ter um acompanhamento vocacional?"
              onChange={setVocationalHelp}
              value={vocationalHelp}
              className="w-full"
              classNamePrefix="react-select"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
          >
            Revelar Agora
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

LeadCaptureForm.propTypes = {
  showLeadCapture: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LeadCaptureForm;
