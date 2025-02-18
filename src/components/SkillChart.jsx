// src/components/SkillChart.js
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FaCalculator,
  FaChartArea,
  FaFlask,
  FaAtom,
  FaDatabase,
  FaMicrochip,
  FaGlobe,
  FaComments,
  FaBriefcase,
  FaChalkboardTeacher,
  FaLaptopCode,
} from "react-icons/fa";

function getSkillIcon(skill) {
  const lower = skill.toLowerCase();
  if (lower.includes("matemática")) return <FaCalculator className="text-jornadas-blue mr-2" />;
  if (lower.includes("estatística")) return <FaChartArea className="text-jornadas-blue mr-2" />;
  if (lower.includes("química")) return <FaFlask className="text-jornadas-blue mr-2" />;
  if (lower.includes("física")) return <FaAtom className="text-jornadas-blue mr-2" />;
  if (lower.includes("banco")) return <FaDatabase className="text-jornadas-blue mr-2" />;
  if (lower.includes("eletrônica")) return <FaMicrochip className="text-jornadas-blue mr-2" />;
  if (lower.includes("inglês")) return <FaGlobe className="text-jornadas-blue mr-2" />;
  if (lower.includes("comunicação")) return <FaComments className="text-jornadas-blue mr-2" />;
  if (lower.includes("gestão")) return <FaBriefcase className="text-jornadas-blue mr-2" />;
  if (lower.includes("didática")) return <FaChalkboardTeacher className="text-jornadas-blue mr-2" />;
  if (lower.includes("programação")) return <FaLaptopCode className="text-jornadas-blue mr-2" />;
  return <FaLaptopCode className="text-jornadas-blue mr-2" />;
}

// Parent container variants for stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Child variants for each skill row
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

function SkillChart({ habilidades }) {
  if (!habilidades) return null;
  const skillNames = Object.keys(habilidades);
  if (skillNames.length === 0) return null;

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-2 self-start">
        Habilidades Importantes
      </h3>
      {skillNames.map((skill) => {
        const rating = habilidades[skill];
        const widthPercent = (rating / 5) * 100;
        return (
          <motion.div
            key={skill}
            className="w-full"
            variants={itemVariants}
          >
            <div className="flex items-center mb-1">
              {getSkillIcon(skill)}
              <span className="font-semibold text-gray-900">{skill}</span>
            </div>
            <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">
              <motion.div
                className="h-5 bg-gradient-to-r from-blue-500 to-jornadas-blue"
                style={{ width: `${widthPercent}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${widthPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

SkillChart.propTypes = {
  habilidades: PropTypes.object,
};

export default SkillChart;
