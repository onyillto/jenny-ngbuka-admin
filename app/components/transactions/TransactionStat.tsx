"use client";

import React from "react";
import { BarChart3, CheckCircle, XCircle, CreditCard } from "lucide-react";

export default function TransactionStats({
  allTransactions,
  successfulTransactions,
  failedTransactions,
  totalAmount,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid grid-cols-4 gap-4">
      <div className="flex items-center p-4 bg-blue-50 rounded-lg">
        <BarChart3 className="h-10 w-10 text-blue-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-500">All Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{allTransactions}</p>
        </div>
      </div>

      <div className="flex items-center p-4 bg-green-50 rounded-lg">
        <CheckCircle className="h-10 w-10 text-green-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-500">Successful</p>
          <p className="text-2xl font-bold text-gray-900">
            {successfulTransactions}
          </p>
        </div>
      </div>

      <div className="flex items-center p-4 bg-red-50 rounded-lg">
        <XCircle className="h-10 w-10 text-red-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-500">Failed/Cancelled</p>
          <p className="text-2xl font-bold text-gray-900">
            {failedTransactions}
          </p>
        </div>
      </div>

      <div className="flex items-center p-4 bg-purple-50 rounded-lg">
        <CreditCard className="h-10 w-10 text-purple-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-500">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">{totalAmount}</p>
        </div>
      </div>
    </div>
  );
}
