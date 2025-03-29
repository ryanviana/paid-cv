import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Email({ pontuacaoTotal, onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("ready");

  const enviarEmail = async () => {
    setStatus("loading");

    try {
      // Salva os resultados primeiro
      await axios.post("https://back.cv.ryanviana.com/save-results", {
        score: pontuacaoTotal,
        user_email: email,
      });
    } catch (error) {
      setStatus("error1");
      console.error("Erro ao salvar os resultados:", error);
      return;
    }

    try {
      // Em seguida, envia o email
      await axios.post("https://back.cv.ryanviana.com/send-email", {
        score: pontuacaoTotal,
        user_email: email,
      });
      setStatus("send");
    } catch (error) {
      setStatus("error2");
      console.error("Erro ao enviar email:", error);
    }
  };

  // Handle clicks outside the modal container
  const handleOverlayClick = (e) => {
    // Close only if the user clicked on the actual overlay, not on the child
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
      onClick={handleOverlayClick}
    >
      {/* Modal container */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {/* Close button */}
        <button
          type="button"
          onClick={() => onClose?.()}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          X
        </button>

        <h1 className="text-xl font-semibold text-center mb-4">
          Digite seu email
        </h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@exemplo.com"
          className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={enviarEmail}
          disabled={status === "loading" || !email}
          className="w-full bg-jornadas-blue text-white font-bold py-3 rounded-lg transition duration-150 hover:bg-jornadas-blue-dark disabled:opacity-50"
        >
          Enviar email
        </button>

        {/* Status messages */}
        {status === "loading" && (
          <p className="mt-4 text-center text-blue-600">Enviando email...</p>
        )}
        {status === "send" && (
          <p className="mt-4 text-center text-green-600">
            Email enviado e resultados salvos.
          </p>
        )}
        {status === "error1" && (
          <p className="mt-4 text-center text-red-600">
            Erro ao salvar os resultados!
          </p>
        )}
        {status === "error2" && (
          <p className="mt-4 text-center text-red-600">
            Erro ao enviar o email!
          </p>
        )}
      </div>
    </div>
  );
}

Email.propTypes = {
  pontuacaoTotal: PropTypes.array.isRequired,
  onClose: PropTypes.func,
};

export default Email;
