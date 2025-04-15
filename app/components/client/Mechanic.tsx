import React, { useState } from "react";
import {
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const TabMechanic = ({ transactions, loading }) => {
  const [statusFilter, setStatusFilter] = useState("");

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  // Filter transactions based on status if a filter is selected
  const filteredTransactions = statusFilter
    ? transactions.filter(
        (t) => t.status.toLowerCase() === statusFilter.toLowerCase()
      )
    : transactions;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-blue-500" />
          Mechanic Transactions
        </h3>
        <select
          className="bg-white border border-gray-300 text-gray-700 rounded-md text-sm py-1 px-3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                        <img
                          src={transaction.vendor.profileImageUrl}
                          alt={`${transaction.vendor.firstname} ${transaction.vendor.lastname}`}
                          className="h-10 w-10 object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.vendor.firstname}{" "}
                          {transaction.vendor.lastname}
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="text-xs text-gray-500">
                            {formatDate(transaction.createdAt)}
                          </div>
                          <div className="mx-2 h-1 w-1 rounded-full bg-gray-300"></div>
                          <div className="flex items-center text-xs">
                            {getStatusIcon(transaction.status)}
                            <span className="ml-1 text-gray-700 capitalize">
                              {transaction.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {transaction.vendor.address},{" "}
                          {transaction.vendor.city}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-600">
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <Settings className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <h3 className="text-lg text-gray-700 mb-2">
                  No mechanic transactions
                </h3>
                <p className="text-sm text-gray-500">
                  No transactions with mechanics found.
                </p>
              </div>
            )}
          </div>

          {filteredTransactions.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition">
                View All Transactions
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TabMechanic;
