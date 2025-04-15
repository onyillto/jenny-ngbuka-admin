"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataItem {
  state: string;
  value: number;
}

interface SalesChartProps {
  data: DataItem[];
}

const SalesChartArea: React.FC<SalesChartProps> = ({ data }) => {
  const [visibleStates, setVisibleStates] = useState(12);

  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const displayData = sortedData.slice(0, visibleStates);

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `₦${(value / 1000).toFixed(1)}K`;
    }
    return `₦${value}`;
  };

  const handleShowMore = () => {
    if (visibleStates === 12) {
      setVisibleStates(37); // Show all states + FCT
    } else {
      setVisibleStates(12); // Show only top 12
    }
  };

  return (
    <div className="w-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="state"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 10 }}
              interval={0}
            />
            <YAxis
              tickFormatter={formatValue}
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip
              formatter={(value) => [`₦${value.toLocaleString()}`, "Sales"]}
              labelFormatter={(label) => `State: ${label}`}
            />
            <Legend wrapperStyle={{ position: "relative", marginTop: 10 }} />
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              name="Sales (Naira)"
              stroke="#4f46e5"
              fill="url(#colorValue)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-2 mb-0">
        <button
          onClick={handleShowMore}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {visibleStates === 12 ? "Show Top 12 States" : "Show All States"}
        </button>
      </div>
    </div>
  );
};

export default SalesChartArea;
