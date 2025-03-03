// src/components/RadarLogo.jsx
import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const data = [
  { value: 130 },
  { value: 115 },
  { value: 100 },
  { value: 95 },
  { value: 120 },
];

function RadarLogo() {
  return (
    <RadarChart
      width={280}
      height={280}
      cx="50%"
      cy="50%"
      outerRadius={110}
      data={data}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    >
      {/* Grid lines for a subtle background */}
      <PolarGrid stroke="#e5e7eb" radialLines={false} />

      {/* Hide all angle and radius labels */}
      <PolarAngleAxis tick={false} axisLine={false} tickLine={false} />
      <PolarRadiusAxis
        angle={30}
        domain={[0, 140]}
        tick={false}
        axisLine={false}
      />

      {/* The radar shape itself */}
      <Radar
        dataKey="value"
        stroke="#2563eb"
        fill="#2563eb"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
}

export default RadarLogo;
