"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

interface InvoiceStatsProps {
  totalInvoices: number;
  paid: number;
  overdue: number;
  unpaid: number;
}

const InvoiceStats: React.FC<InvoiceStatsProps> = ({
  totalInvoices,
  paid,
  overdue,
  unpaid,
}) => {
  const paidPercentage = (paid / totalInvoices) * 100;
  const overduePercentage = (overdue / totalInvoices) * 100;
  const unpaidPercentage = (unpaid / totalInvoices) * 100;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-96">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-black text-lg font-semibold">Invoice Statistics</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex h-72">
        <div className="w-1/2">
          <div className="relative w-full max-w-[200px] mx-auto h-full flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#f0f3f9"
                strokeWidth="20"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#ffe7d1"
                strokeWidth="20"
                strokeDasharray={`${unpaidPercentage * 2.51} 251`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#ff9f43"
                strokeWidth="20"
                strokeDasharray={`${overduePercentage * 2.51} 251`}
                strokeDashoffset={`${251 - unpaidPercentage * 2.51}`}
                transform="rotate(-90 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#111111"
                strokeWidth="20"
                strokeDasharray={`${paidPercentage * 2.51} 251`}
                strokeDashoffset={`${
                  251 - (unpaidPercentage + overduePercentage) * 2.51
                }`}
                transform="rotate(-90 50 50)"
              />
              <text
                x="50"
                y="45"
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="#111111"
              >
                {totalInvoices}
              </text>
              <text
                x="50"
                y="60"
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
              >
                Invoices
              </text>
            </svg>
          </div>
        </div>

        <div className="w-1/2 flex flex-col justify-center gap-5">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-black mr-3"></div>
            <div className="flex-1">
              <div className="text-sm text-black">Total Paid</div>
              <div className="text-lg font-bold text-[#ff6600]">{paid}</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#ff9f43] mr-3"></div>
            <div className="flex-1">
              <div className="text-sm text-black">Total Overdue</div>
              <div className="text-lg font-bold text-[#ff6600]">{overdue}</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-[#ffe7d1] mr-3 border border-[#ff9f43]"></div>
            <div className="flex-1">
              <div className="text-sm text-black">Total Unpaid</div>
              <div className="text-lg font-bold text-[#ff6600]">{unpaid}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceStats;
