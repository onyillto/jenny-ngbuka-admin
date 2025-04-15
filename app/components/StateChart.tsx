"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
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

const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
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
          <BarChart
            data={displayData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 80,
            }}
            barSize={20}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="state"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12 }}
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
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
            <Legend wrapperStyle={{ bottom: 0, left: 25, paddingTop: 20 }} />
            <Bar
              dataKey="value"
              name="Sales (Naira)"
              fill="#4f46e5"
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleShowMore}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {visibleStates === 12 ? "Show All States" : "Show Top 12 States"}
        </button>
      </div>
    </div>
  );
};

export default SalesChart;
