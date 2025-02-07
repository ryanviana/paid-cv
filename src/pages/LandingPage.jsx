import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Focus the input when an error is present
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normalize the input and validate the code
    if (code.trim().toLowerCase() === "turmazero") {
      navigate("/questions");
    } else {
      setError("Código inválido. Por favor, insira o código correto.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 md:gap-7 p-5">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold">
        Cálculo Vocacional
      </h1>
      <h2 className="text-xl md:text-4xl lg:text-5xl font-bold">
        Encontre o curso de exatas ideal para você!
      </h2>
      <div className="space-y-2">
        <p className="font-medium text-base md:text-lg lg:text-xl">
          ✅ Explore as diferentes áreas e carreiras;
        </p>
        <p className="font-medium text-base md:text-lg lg:text-xl">
          ✅ Insira suas habilidades, interesses e sonhos;
        </p>
        <p className="font-medium text-base md:text-lg lg:text-xl">
          ✅ E receba um mapa dos cursos de exatas que mais combinam com você.
        </p>
      </div>

      {/* Wrap the input and button in a form for better accessibility */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-5">
        <div className="mb-4">
          {/* Visually hidden label for accessibility */}
          <label htmlFor="access-code" className="block text-sm font-medium text-gray-700 sr-only">
            Código de acesso
          </label>
          <input
            ref={inputRef}
            id="access-code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError("");
            }}
            placeholder="Digite o código"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "error-message" : undefined}
            className={`w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && (
            <p id="error-message" className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={!code.trim()}
          className={`w-full md:text-xl bg-jornadas-blue rounded-lg text-black font-questrial font-semibold py-2 px-4 shadow-xg transition-all focus:ring-2 focus:ring-white focus:ring-opacity-75 focus:outline-none hover:bg-jornadas-blue-dark hover:scale-105 ${
            !code.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Quero começar!
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
