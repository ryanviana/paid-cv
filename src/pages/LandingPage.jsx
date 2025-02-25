import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "@fontsource/ubuntu"; // Import Ubuntu font

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
  const [schoolType, setSchoolType] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [certainty, setCertainty] = useState("");
  const [guidance, setGuidance] = useState("");
  const [concern, setConcern] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!schoolYear || !schoolType || !certainty || !guidance || !concern) {
      alert("Por favor, preencha todas as perguntas antes de continuar.");
      return;
    }

    localStorage.setItem(
      "preTestData",
      JSON.stringify({ schoolYear, schoolType, certainty, guidance, concern })
    );

    navigate("/questions");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 md:px-8 py-12 font-[Ubuntu]">
      {/* Header */}
      <div className="text-center w-full max-w-3xl mx-auto">
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
        {/* School Year */}
        <div>
          <label className="block text-gray-800 font-medium mb-2 text-lg">
            Em qual etapa da sua educação você está?
          </label>
          <Select
            options={[
              {
                value: "Ensino Médio – 1º Ano",
                label: "Ensino Médio – 1º Ano",
              },
              {
                value: "Ensino Médio – 2º Ano",
                label: "Ensino Médio – 2º Ano",
              },
              {
                value: "Ensino Médio – 3º Ano",
                label: "Ensino Médio – 3º Ano",
              },
              { value: "Cursinho", label: "Cursinho" },
              {
                value: "Já estou na Universidade",
                label: "Já estou na Universidade",
              },
              { value: "Outro", label: "Outro" },
            ]}
            value={schoolYear ? { value: schoolYear, label: schoolYear } : null}
            onChange={(selected) => setSchoolYear(selected?.value || "")}
            placeholder="Selecione..."
            styles={customSelectStyles}
          />
        </div>

        {/* NEW FIELD: School Type */}
        <div>
          <label className="block text-gray-800 font-medium mb-2 text-lg">
            Em que tipo de escola você estuda?
          </label>
          <Select
            options={[
              { value: "Pública", label: "Pública" },
              { value: "Privada", label: "Privada" },
              { value: "Técnica", label: "Técnica" },
            ]}
            value={schoolType ? { value: schoolType, label: schoolType } : null}
            onChange={(selected) => setSchoolType(selected?.value || "")}
            placeholder="Selecione..."
            styles={customSelectStyles}
          />
        </div>

        {/* Career Certainty */}
        <div>
          <label className="block text-gray-800 font-medium mb-2 text-lg">
            Qual é a sua certeza sobre a carreira que escolheu?
          </label>
          <Select
            options={[
              {
                value: "Tenho uma opção e estou seguro dela",
                label: "Tenho uma opção e estou seguro dela",
              },
              {
                value: "Tenho algumas opções em mente",
                label: "Tenho algumas opções em mente",
              },
              {
                value: "Não tenho ideia do que escolher",
                label: "Não tenho ideia do que escolher",
              },
            ]}
            value={certainty ? { value: certainty, label: certainty } : null}
            onChange={(selected) => setCertainty(selected?.value || "")}
            placeholder="Selecione..."
            styles={customSelectStyles}
          />
        </div>

        {/* Vocational Guidance */}
        <div>
          <label className="block text-gray-800 font-medium mb-2 text-lg">
            Você já recebeu orientação vocacional?
          </label>
          <Select
            options={[
              {
                value: "Sim, com um psicólogo profissional",
                label: "Sim, com um psicólogo profissional",
              },
              {
                value: "Sim, através de programas escolares/de orientação",
                label: "Sim, através de programas escolares/de orientação",
              },
              { value: "Não, nunca fiz um", label: "Não, nunca fiz um" },
            ]}
            value={guidance ? { value: guidance, label: guidance } : null}
            onChange={(selected) => setGuidance(selected?.value || "")}
            placeholder="Selecione..."
            styles={customSelectStyles}
          />
        </div>

        {/* Concern */}
        <div>
          <label className="block text-gray-800 font-medium mb-2 text-lg">
            Qual sua maior preocupação ao escolher um curso?
          </label>
          <Select
            options={[
              {
                value: "Não saber qual carreira se encaixa em mim",
                label: "Não saber qual carreira se encaixa em mim",
              },
              {
                value: "Preocupar-me em escolher o curso errado",
                label: "Preocupar-me em escolher o curso errado",
              },
              {
                value: "Encontrar um curso com boas oportunidades de emprego",
                label: "Encontrar um curso com boas oportunidades de emprego",
              },
              {
                value: "Garantir que vou gostar do trabalho no futuro",
                label: "Garantir que vou gostar do trabalho no futuro",
              },
              { value: "Outro", label: "Outro" },
            ]}
            value={concern ? { value: concern, label: concern } : null}
            onChange={(selected) => setConcern(selected?.value || "")}
            placeholder="Selecione..."
            styles={customSelectStyles}
          />
        </div>

        {/* Submit Button */}
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
