import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaArrowCircleLeft,
  FaArrowCircleRight
} from 'react-icons/fa';

import AlertModal from '../components/AlertModal';
import * as Defines from '../data/Defines';

const INTEREST_LIKE = '1';
const INTEREST_DISLIKE = '-1';

function ImageQuestion({ weight_question, statement_question, updatePerguntaAtual }) {
  const [interests, setInterests] = useState(['', '', '', '']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Indices of unselected images that flash if user tries next
  const [flashIndices, setFlashIndices] = useState([]);

  /** Toggle or set "like"/"dislike" for a specific image */
  const handleInterestSelection = (index, chosenInterest) => {
    setInterests((prev) => {
      const updated = [...prev];
      // If already chosen => toggle off
      updated[index] = updated[index] !== chosenInterest ? chosenInterest : '';
      return updated;
    });
  };

  /** Validate that every image is chosen */
  const validateInterests = () => {
    const missing = interests.reduce((arr, val, i) => {
      if (!val) arr.push(i);
      return arr;
    }, []);
    if (missing.length > 0) {
      // Highlight unselected
      setFlashIndices(missing);
      setIsModalOpen(true);
      return false;
    }
    return true;
  };

  // Clear flash after ~0.8s
  useEffect(() => {
    if (flashIndices.length > 0) {
      const timer = setTimeout(() => setFlashIndices([]), 800);
      return () => clearTimeout(timer);
    }
  }, [flashIndices]);

  /** Calculate question score */
  const calculaPontuacaoQuestao = () => {
    let pontuacao = Array(Defines.numAreas).fill(0);

    weight_question.forEach((pesoPorImagem, imageIdx) => {
      const interestNumeric = parseInt(interests[imageIdx], 10) || 0;
      pontuacao = pontuacao.map(
        (prevVal, areaIdx) => prevVal + pesoPorImagem[areaIdx] * interestNumeric
      );
    });

    // Normalize if negative
    const minValue = Math.min(...pontuacao);
    if (minValue < 0) {
      pontuacao = pontuacao.map((val) => val + Math.abs(minValue));
    }
    return pontuacao;
  };

  /** Goes to next question if valid */
  const proxPergunta = () => {
    if (!validateInterests()) return;
    const pontuacao = calculaPontuacaoQuestao();
    updatePerguntaAtual(pontuacao, 1);
  };

  /** ring color logic */
  const getRingColor = (index) => {
    const val = interests[index];
    if (val === INTEREST_LIKE) return 'ring-green-500';
    if (val === INTEREST_DISLIKE) return 'ring-red-500';
    return 'ring-gray-300';
  };

  // flash if user tries next w/o selecting
  const getFlashClass = (index) =>
    flashIndices.includes(index) ? 'animate-pulse ring-red-500' : '';

  // dim if unselected, bright if selected
  const getImageOpacity = (index) =>
    interests[index] ? 'opacity-100' : 'opacity-60 group-hover:opacity-90';

  // color overlay for like/dislike
  const getColorOverlay = (index) => {
    if (interests[index] === INTEREST_LIKE) return 'bg-green-500 bg-opacity-20';
    if (interests[index] === INTEREST_DISLIKE) return 'bg-red-500 bg-opacity-20';
    return 'bg-transparent';
  };

  /** Click “Voltar” => updatePerguntaAtual(null, -1) */
  const handleBack = () => {
    updatePerguntaAtual(null, -1);
  };

  return (
    <div className="p-7 w-full flex flex-col items-center">
      {/* Title */}
      <h2 className="font-montserrat text-black font-bold text-xl sm:text-2xl lg:text-3xl text-center max-w-4xl mb-5">
        {statement_question.title}
      </h2>

      {/* WRAPPER for images + arrows => so arrows are near the grid */}
      <div className="relative w-fit flex justify-center items-center">
        {/* LEFT ARROW (Voltar), shown on md+ */}
        <button
          type="button"
          onClick={handleBack}
          className="
            hidden
            md:flex
            items-center
            justify-center
            absolute
            left-[-10rem]   /* large negative margin to keep arrow close to images */
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

        {/* RIGHT ARROW (Próxima), shown on md+ */}
        <button
          type="button"
          onClick={proxPergunta}
          className="
            hidden
            md:flex
            items-center
            justify-center
            absolute
            right-[-10rem]
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

        {/* IMAGES GRID */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {statement_question.images.map((img, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* IMAGE BOX */}
                <div
                  className={`
                    group
                    relative
                    w-64
                    h-64
                    ring-4
                    ${getRingColor(index)}
                    ${getFlashClass(index)}
                    rounded-md
                    overflow-hidden
                    transition-all
                    duration-300
                    flex-shrink-0
                  `}
                >
                  {/* The image (dim if unselected) */}
                  <img
                    src={img.image}
                    alt=""
                    className={`
                      w-full
                      h-full
                      object-cover
                      transition-all
                      duration-300
                      ${getImageOpacity(index)}
                    `}
                  />

                  {/* Overlay if liked/disliked */}
                  <div
                    className={`
                      pointer-events-none
                      absolute
                      inset-0
                      transition
                      duration-300
                      ${getColorOverlay(index)}
                    `}
                  />

                  {/* ICONS in center, side by side */}
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      gap-8
                      pointer-events-none
                    "
                  >
                    {/* LIKE ICON */}
                    <button
                      type="button"
                      aria-label="Gostei"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInterestSelection(index, INTEREST_LIKE);
                      }}
                      className={`
                        pointer-events-auto
                        bg-white
                        rounded-full
                        shadow
                        text-green-600
                        p-3
                        text-3xl
                        opacity-50
                        group-hover:opacity-100
                        group-hover:scale-125
                        transition
                        duration-200
                        focus:outline-none
                      `}
                    >
                      <FaThumbsUp />
                    </button>

                    {/* DISLIKE ICON */}
                    <button
                      type="button"
                      aria-label="Não gostei"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInterestSelection(index, INTEREST_DISLIKE);
                      }}
                      className={`
                        pointer-events-auto
                        bg-white
                        rounded-full
                        shadow
                        text-red-600
                        p-3
                        text-3xl
                        opacity-50
                        group-hover:opacity-100
                        group-hover:scale-125
                        transition
                        duration-200
                        focus:outline-none
                      `}
                    >
                      <FaThumbsDown />
                    </button>
                  </div>
                </div>

                {/* TEXT BELOW THE IMAGE */}
                <div
                  className="
                    mt-2
                    text-gray-800
                    text-sm
                    font-semibold
                    px-3
                    py-1
                    bg-gray-100
                    rounded
                    w-56
                    text-center
                    leading-snug
                  "
                >
                  {img.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SMALL ARROWS for mobile */}
      <div className="mt-5 md:hidden flex gap-5">
        <button
          type="button"
          onClick={handleBack}
          className="
            text-4xl
            text-jornadas-blue
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
            text-jornadas-blue
            hover:scale-110
            transition
            focus:outline-none
          "
        >
          <FaArrowCircleRight />
        </button>
      </div>

      {/* ALERT MODAL */}
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message="Por favor, selecione Gostei ou Não gostei para todas as imagens."
      />
    </div>
  );
}

ImageQuestion.propTypes = {
  weight_question: PropTypes.array.isRequired,
  statement_question: PropTypes.object.isRequired,
  updatePerguntaAtual: PropTypes.func.isRequired
};

export default ImageQuestion;
