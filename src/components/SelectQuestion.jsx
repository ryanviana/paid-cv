import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  FaArrowCircleLeft, 
  FaArrowCircleRight 
} from 'react-icons/fa';

import AlertModal from '../components/AlertModal';
import * as Defines from '../data/Defines';

const MAX_SELECTIONS = 3;

function SelectQuestion({ weight_question, statement_question, updatePerguntaAtual }) {
  const [checkedItems, setCheckedItems] = useState([]); 
  const [flashIndices, setFlashIndices] = useState([]); 
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  /** Toggle a phrase's selection, max 3. */
  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => {
      if (prev.includes(index)) {
        // Unselect if already selected
        return prev.filter((item) => item !== index);
      }
      if (prev.length < MAX_SELECTIONS) {
        // Select a new item if less than 3
        return [...prev, index];
      }
      // If we already have 3, ignore or show a toast?
      return prev;
    });
  };

  /**
   * Compute the final scores.
   * Selected => add weights; unselected => subtract weights.
   * Then normalize if negative.
   */
  const calculaPontuacaoQuestao = () => {
    let pontuacao = Array(Defines.numAreas).fill(0);
    weight_question.forEach((pesoPorImagem, index) => {
      if (checkedItems.includes(index)) {
        // add
        pontuacao = pontuacao.map((val, i) => val + pesoPorImagem[i]);
      } else {
        // subtract
        pontuacao = pontuacao.map((val, i) => val - pesoPorImagem[i]);
      }
    });

    const minValue = Math.min(...pontuacao);
    if (minValue < 0) {
      pontuacao = pontuacao.map((val) => val + Math.abs(minValue));
    }
    return pontuacao;
  };

  /**
   * Must have exactly 3 selected. If not, highlight unselected & show error modal.
   */
  const proxPergunta = () => {
    if (checkedItems.length < MAX_SELECTIONS) {
      // Identify unselected
      const missing = statement_question.phrases
        .map((_, i) => i)
        .filter((i) => !checkedItems.includes(i));

      setFlashIndices(missing);
      setIsErrorModalOpen(true);
      return;
    }

    const pontuacao = calculaPontuacaoQuestao();
    updatePerguntaAtual(pontuacao, 1);
  };

  /**
   * "Voltar" => updatePerguntaAtual(null, -1).
   */
  const handleVoltar = () => {
    updatePerguntaAtual(null, -1);
  };

  // Clears the flash highlight after a short delay
  useEffect(() => {
    if (flashIndices.length > 0) {
      const timer = setTimeout(() => setFlashIndices([]), 800);
      return () => clearTimeout(timer);
    }
  }, [flashIndices]);

  // Utility function for "is phrase selected?"
  const isSelected = (index) => checkedItems.includes(index);

  // A simple progress bar: e.g. 0 => 0%, 1 => 33%, 2 => 66%, 3 => 100%
  const fillPercentage = (checkedItems.length / MAX_SELECTIONS) * 100;

  return (
    <div className="flex flex-col items-center p-7 w-full h-fit relative">

      {/* Title */}
      <h2 className="font-montserrat text-black font-bold text-xl sm:text-2xl lg:text-3xl text-center max-w-4xl mb-5">
        Escolha as três frases que mais combinam com você:
      </h2>

      {/* Progress Bar (like a smaller horizontal bar) */}
      <div className="w-full max-w-md mb-5">
        <div className="h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${fillPercentage}%` }}
          />
        </div>
        <p className="text-center text-sm text-gray-600 mt-1">
          {checkedItems.length} de {MAX_SELECTIONS} selecionadas
        </p>
      </div>

      {/* WRAPPER for the main content + arrows => negative margin to keep them close */}
      <div className="relative w-fit flex flex-col items-center">
        {/* LEFT ARROW (Voltar) => desktop */}
        <button
          type="button"
          onClick={handleVoltar}
          className="
            hidden
            md:flex
            items-center
            justify-center
            absolute
            left-[-6rem]
            top-1/2
            -translate-y-1/2
            text-5xl
            text-gray-400
            hover:text-jornadas-blue
            hover:scale-110
            transition
            duration-150
            focus:outline-none
            z-10
          "
        >
          <FaArrowCircleLeft />
        </button>

        {/* RIGHT ARROW (Próxima) => desktop */}
        <button
          type="button"
          onClick={proxPergunta}
          className="
            hidden
            md:flex
            items-center
            justify-center
            absolute
            right-[-6rem]
            top-1/2
            -translate-y-1/2
            text-5xl
            text-gray-400
            hover:text-jornadas-blue
            hover:scale-110
            transition
            duration-150
            focus:outline-none
            z-10
          "
        >
          <FaArrowCircleRight />
        </button>

        {/* The content with the phrases */}
        <div
          className="
            w-full
            max-w-3xl
            flex
            flex-col
            gap-6
            items-start
            font-questrial
            text-lg
            sm:text-xl
          "
        >
          {/* Additional sub-title or direction if needed */}
          <h1 className="font-montserrat text-lg sm:text-xl lg:text-2xl text-black">
            {statement_question.title}
          </h1>

          {/* Phrases (checkbox list) */}
          {statement_question.phrases.map((label, index) => {
            const selected = isSelected(index);
            // If user tried next & it's unselected => flash
            const flashClass = flashIndices.includes(index)
              ? 'animate-pulse border-l-4 border-red-400'
              : '';

            return (
              <div
                key={index}
                onClick={() => handleCheckboxChange(index)}
                className={`
                  w-full
                  flex
                  items-start
                  text-left
                  p-2
                  rounded
                  transition
                  cursor-pointer
                  hover:bg-gray-100
                  ${selected ? 'bg-blue-100' : 'bg-white'}
                  ${flashClass}
                `}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
                  className="
                    flex-shrink-0
                    cursor-pointer
                    mr-5
                    w-5
                    sm:w-6
                    h-5
                    sm:h-6
                    transition-all
                    duration-300
                    ease-in-out
                    hover:scale-110
                    focus:outline-none
                  "
                />
                <label className="cursor-pointer leading-snug">
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* SMALL ARROWS for mobile => displayed at bottom */}
      <div className="mt-6 md:hidden flex gap-8">
        <button
          type="button"
          onClick={handleVoltar}
          className="
            text-4xl
            text-gray-400
            hover:text-jornadas-blue
            hover:scale-110
            transition
            focus:outline-none
          "
        >
          <FaArrowCircleLeft />
        </button>
        <button
          type="button"
          onClick={proxPergunta}
          className="
            text-4xl
            text-gray-400
            hover:text-jornadas-blue
            hover:scale-110
            transition
            focus:outline-none
          "
        >
          <FaArrowCircleRight />
        </button>
      </div>

      {/* Error message in AlertModal if user tries to proceed with <3 */}
      <AlertModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message="Você precisa selecionar exatamente 3 frases para continuar."
      />
    </div>
  );
}

SelectQuestion.propTypes = {
  weight_question: PropTypes.array.isRequired,
  statement_question: PropTypes.object.isRequired,
  updatePerguntaAtual: PropTypes.func.isRequired
};

export default SelectQuestion;
