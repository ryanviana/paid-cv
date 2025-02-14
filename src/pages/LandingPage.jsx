import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  const [certainty, setCertainty] = useState("");

  const options = [
    "Muito certo",
    "Em dúvida",
    "Não faço ideia",
    "Outro"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!certainty) {
      alert("Por favor, selecione seu nível de certeza sobre sua escolha de carreira.");
      return;
    }
    // Save the certainty for later use if needed
    localStorage.setItem("careerCertainty", certainty);
    navigate("/questions");
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

      <form onSubmit={handleSubmit} className="w-full max-w-sm mt-5">
        <label htmlFor="certainty" className="block text-lg font-medium text-gray-700 mb-2">
          Qual é a sua certeza sobre a carreira que você escolheu hoje?
        </label>
        <select
          id="certainty"
          value={certainty}
          onChange={(e) => setCertainty(e.target.value)}
          className="w-full border rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-5"
        >
          <option value="">Selecione uma opção</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={!certainty}
          className={`w-full md:text-xl bg-jornadas-blue rounded-lg text-black font-questrial font-semibold py-2 px-4 shadow-xg transition-all focus:ring-2 focus:ring-white focus:ring-opacity-75 focus:outline-none hover:bg-jornadas-blue-dark hover:scale-105 ${
            !certainty ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Quero começar!
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
