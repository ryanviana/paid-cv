import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "@fontsource/ubuntu"; // Import Ubuntu font
import { usePersistedState } from "../hooks/usePersistedState";
import RadarLogo from "../components/RadarLogo"; // Import the RadarLogo component

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.75rem",
    borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(37,99,235,0.4)" : "none",
    fontSize: "1rem",
    padding: "0.5rem",
    transition: "all 0.2s ease-in-out",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#eef2ff" : "#fff",
    color: "#1f2937",
    transition: "background-color 0.2s ease-in-out",
  }),
};

function LandingPage() {
  const navigate = useNavigate();
  const [schoolType, setSchoolType] = usePersistedState(
    "landing_schoolType",
    ""
  );
  const [schoolYear, setSchoolYear] = usePersistedState(
    "landing_schoolYear",
    ""
  );
  const [certainty, setCertainty] = usePersistedState("landing_certainty", "");
  const [guidance, setGuidance] = usePersistedState("landing_guidance", "");
  const [concern, setConcern] = usePersistedState("landing_concern", "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!schoolYear || !schoolType || !certainty || !guidance || !concern) {
    //   alert("Por favor, preencha todas as perguntas antes de continuar.");
    //   return;
    // }

    localStorage.setItem(
      "preTestData",
      JSON.stringify({ schoolYear, schoolType, certainty, guidance, concern })
    );

    navigate("/questions");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 md:px-8 py-12 font-[Ubuntu]">
      <div className="text-center w-full max-w-3xl mx-auto">
        {/* Radar Chart Logo */}
        <div className="flex justify-center mb-4">
          <RadarLogo />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Cálculo Vocacional
        </h1>

        <h2 className="text-lg md:text-xl font-medium text-gray-700 mt-4">
          Encontre o curso de exatas ideal para você!
        </h2>
        <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
          Antes de começarmos, queremos te conhecer melhor para oferecer
          recomendações mais precisas.
        </p>
      </div>

      {/* Feature Points */}
      <div className="mt-6 text-gray-700 text-lg space-y-3 text-center">
        <p className="flex items-center justify-center gap-3">
          ✅ <span>Descubra carreiras alinhadas ao seu perfil</span>
        </p>
        <p className="flex items-center justify-center gap-3">
          ✅ <span>Inclua seus interesses e habilidades</span>
        </p>
        <p className="flex items-center justify-center gap-3">
          ✅ <span>Receba recomendações personalizadas</span>
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-6"
      >
        {/*
        // Question fields are commented out
        */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Quero começar!
        </button>
      </form>
    </div>
  );
}

export default LandingPage;
