// src/components/CourseDetails.jsx
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import SkillChart from "./SkillChart";

function CourseDetails({ course, onClose }) {
  if (!course) return null;

  const getSalaryStars = (salario) => {
    const starsMap = {
      "Altíssimo": 5,
      "Alto": 4,
      "Médio": 4,
      "Baixo": 3,
      "Baixíssimo": 2,
    };
    return starsMap[salario] || 0;
  };

  return (
    // 1) Use "absolute" overlay so the entire page behind it can scroll.
    <motion.div
      className="absolute top-0 left-0 w-full min-h-screen bg-black bg-opacity-70 z-50 px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose} // close if user clicks outside
      style={{ position: "absolute" }} // ensures absolute positioning
    >
      {/* 2) The modal container has NO max-height or overflow, so no internal scroll. */}
      <motion.div
        className="relative bg-white px-6 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 rounded-lg shadow-xl max-w-2xl w-full mx-auto mt-10"
        onClick={(e) => e.stopPropagation()} // prevent closing if clicked inside
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={24} />
        </button>

        {/* Optional course image */}
        {course.imagem && (
          <img
            src={course.imagem}
            alt={course.nome}
            className="w-full rounded-md mb-6 object-cover"
          />
        )}

        <h2 className="text-2xl font-bold mb-2 text-gray-900">{course.nome}</h2>
        <p className="text-gray-700 mb-4">{course.descricao}</p>

        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <div className="flex items-center mb-2">
            <FaMoneyBillWave className="text-green-500 mr-2" />
            <span className="text-lg font-bold">Faixa Salarial</span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
              const Icon =
                i < getSalaryStars(course.salario) ? AiFillStar : AiOutlineStar;
              return <Icon key={i} className="text-yellow-400 text-xl mr-1" />;
            })}
          </div>
          <p className="text-sm text-gray-700 mt-2">{course.media_salarial}</p>
        </div>

        {/* SkillChart bigger & centered */}
        {course.habilidades && (
          <div className="mb-6">
            <SkillChart habilidades={course.habilidades} />
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-2">Cargos Típicos</h3>
        <ul className="list-disc pl-5 mb-6 text-gray-700">
          {/* Show only top 3 cargos if you like */}
          {course.cargos.slice(0, 3).map((cargo, i) => (
            <li key={i} className="mb-2">
              <strong>{cargo.cargo}:</strong> {cargo.descricao}
            </li>
          ))}
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Perfil do Estudante</h3>
        <p className="text-gray-700 mb-6">{course.perfil_estudante}</p>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition"
        >
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
}

CourseDetails.propTypes = {
  course: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default CourseDetails;
