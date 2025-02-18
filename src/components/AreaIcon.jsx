// src/components/AreaIcon.js
import React from "react";
import {
  FaLaptopCode,
  FaBolt,
  FaRobot,
  FaPlane,
  FaChalkboardTeacher,
  FaIndustry,
  FaCubes,
  FaBuilding,
  FaLeaf,
} from "react-icons/fa";

function getAreaIcon(areaName) {
  const lower = areaName.toLowerCase();
  if (lower.includes("comput")) return <FaLaptopCode className="text-2xl text-jornadas-blue" />;
  if (lower.includes("elétrica")) return <FaBolt className="text-2xl text-yellow-500" />;
  if (lower.includes("mecatrônica") || lower.includes("mecânica")) return <FaRobot className="text-2xl text-gray-700" />;
  if (lower.includes("aeronáutica")) return <FaPlane className="text-2xl text-blue-500" />;
  if (lower.includes("licenciatura")) return <FaChalkboardTeacher className="text-2xl text-green-600" />;
  if (lower.includes("produção")) return <FaIndustry className="text-2xl text-red-500" />;
  if (lower.includes("materiais")) return <FaCubes className="text-2xl text-purple-500" />;
  if (lower.includes("civil")) return <FaBuilding className="text-2xl text-indigo-500" />;
  if (lower.includes("ambiental")) return <FaLeaf className="text-2xl text-green-500" />;
  return <FaLaptopCode className="text-2xl text-jornadas-blue" />;
}

export default getAreaIcon;
