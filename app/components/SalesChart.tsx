"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

interface SalesDataPoint {
  month: string;
  value: number;
}

interface SalesChartProps {
  data: SalesDataPoint[];
  highlightMonth?: string;
  highlightValue?: number;
}

const SalesChart: React.FC<SalesChartProps> = ({
  data,
  highlightMonth = "Apr",
  highlightValue = 1134,
}) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const chartHeight = 400;

  const getY = (value: number) =>
    chartHeight - (value / maxValue) * chartHeight;

  const points = data.map((d, i) => ({
    x: i * 50 + 50,
    y: getY(d.value),
    month: d.month,
    value: d.value,
  }));

  const highlightPoint = points.find((p) => p.month === highlightMonth);

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
    .join(" ");

  const areaPath = `${pathD} L ${points.at(-1)?.x},${chartHeight} L ${
    points[0].x
  },${chartHeight} Z`;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 text-lg font-medium">Sales Analytics</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="h-64 relative">
        {/* Chart Area */}
        <div className="ml-10 h-full relative">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 400">
            {/* Grid Lines */}
            {[...Array(5)].map((_, i) => (
              <line
                key={i}
                x1="0"
                x2="700"
                y1={(i * chartHeight) / 4}
                y2={(i * chartHeight) / 4}
                stroke="#e5e7eb"
              />
            ))}

            {/* Area under line */}
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f6cf7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4f6cf7" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#gradient)" />
            <path d={pathD} fill="none" stroke="#4f6cf7" strokeWidth="3" />

            {/* Data Points */}
            {points.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="5"
                fill="white"
                stroke="#4f6cf7"
                strokeWidth="2"
              />
            ))}

            {/* Highlight Tooltip */}
            {highlightPoint && (
              <>
                <circle
                  cx={highlightPoint.x}
                  cy={highlightPoint.y}
                  r="7"
                  fill="#4f6cf7"
                />
                <g
                  transform={`translate(${highlightPoint.x - 30}, ${
                    highlightPoint.y - 50
                  })`}
                >
                  <rect width="70" height="30" rx="5" fill="#1f2937" />
                  <text x="10" y="20" fill="#fff" fontSize="12">
                    ${highlightValue}
                  </text>
                </g>
              </>
            )}
          </svg>

          {/* X-axis Labels */}
          <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs text-gray-500">
            {data.map((d, i) => (
              <div
                key={i}
                className={`w-[50px] text-center ${
                  d.month === highlightMonth
                    ? "text-blue-600 font-semibold border-t-2 border-blue-600"
                    : ""
                }`}
              >
                {d.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
