"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  period?: string;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  period = "Since last week",
  icon,
}) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm w-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-900 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="p-3 rounded-lg bg-orange-50 text-orange-500">{icon}</div>
      </div>
      <div className="flex items-center">
        {isPositive ? (
          <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
        ) : (
          <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
        )}
        <span
          className={`text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {change.toFixed(1)}%
        </span>
        <span className="text-sm text-gray-500 ml-1">{period}</span>
      </div>
    </div>
  );
};

export default StatsCard;
