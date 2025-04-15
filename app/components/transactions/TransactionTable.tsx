"use client";

import React from "react";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  User,
  Wrench,
  ShoppingBag,
  Eye,
  Mail,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { formatCurrency, formatDate } from "../../data/transactions";

export default function TransactionTable({
  transactions,
  sortField,
  sortDirection,
  handleSort,
  onTransactionClick,
  selectedTransactions = [],
  onSelectTransaction,
  onSelectAll,
  onViewDetails,
}) {
  // Function to determine status color classes
  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "successful":
      case "payment_confirmed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Function to get role icon
  const getRoleIcon = (role) => {
    switch (role.toLowerCase()) {
      case "mechanic":
        return <Wrench className="h-4 w-4 mr-1 text-blue-600" />;
      case "dealer":
        return <ShoppingBag className="h-4 w-4 mr-1 text-purple-600" />;
      case "user":
      case "client":
        return <User className="h-4 w-4 mr-1 text-green-600" />;
      default:
        return null;
    }
  };

  // Function to render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;

    return sortDirection === "asc" ? (
      <ChevronUp className="inline-block h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block h-4 w-4 ml-1" />
    );
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (onSelectAll) {
      onSelectAll(e.target.checked);
    }
  };

  // Handle individual transaction selection
  const handleSelectTransaction = (e, transactionId) => {
    e.stopPropagation(); // Prevent row click event
    if (onSelectTransaction) {
      onSelectTransaction(transactionId, e.target.checked);
    }
  };

  // Check if all transactions are selected
  const allSelected =
    transactions.length > 0 &&
    selectedTransactions.length === transactions.length;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {onSelectTransaction && (
                <th scope="col" className="px-4 py-4 text-center w-10">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
              )}
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("id")}
              >
                Transaction ID {renderSortIndicator("id")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("amount")}
              >
                Amount {renderSortIndicator("amount")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("client.firstname")}
              >
                Client {renderSortIndicator("client.firstname")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("vendor.firstname")}
              >
                Vendor {renderSortIndicator("vendor.firstname")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("createdAt")}
              >
                Date {renderSortIndicator("createdAt")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                Status {renderSortIndicator("status")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() =>
                    onTransactionClick && onTransactionClick(transaction.id)
                  }
                >
                  {onSelectTransaction && (
                    <td
                      className="px-4 py-4 whitespace-nowrap text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                          checked={selectedTransactions.includes(
                            transaction.id
                          )}
                          onChange={(e) =>
                            handleSelectTransaction(e, transaction.id)
                          }
                        />
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.id.substring(0, 8)}...
                      </div>
                    </div>
                    {transaction.payment?.transactionReference && (
                      <div className="text-xs text-gray-500 mt-1 ml-7">
                        Ref: {transaction.payment.transactionReference}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.amount)}
                    </div>
                    {transaction.payment && (
                      <div className="text-xs text-gray-500">
                        Fee:{" "}
                        {formatCurrency(transaction.payment.platformFee || 0)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {transaction.client.profileImageUrl ? (
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={transaction.client.profileImageUrl}
                              alt={`${transaction.client.firstname} ${transaction.client.lastname}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-semibold">
                            {transaction.client.firstname.charAt(0)}
                            {transaction.client.lastname.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.client.firstname}{" "}
                          {transaction.client.lastname}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          {getRoleIcon(transaction.client.role)}
                          <span className="capitalize">
                            {transaction.client.role}
                          </span>
                        </div>
                        {transaction.client.email && (
                          <div className="text-xs text-gray-400 flex items-center mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            {transaction.client.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {transaction.vendor.profileImageUrl ? (
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={transaction.vendor.profileImageUrl}
                              alt={`${transaction.vendor.firstname} ${transaction.vendor.lastname}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            {transaction.vendor.firstname.charAt(0)}
                            {transaction.vendor.lastname.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.vendor.firstname}{" "}
                          {transaction.vendor.lastname}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          {getRoleIcon(transaction.vendor.role)}
                          <span className="capitalize">
                            {transaction.vendor.role}
                          </span>
                        </div>
                        {transaction.vendor.businessName && (
                          <div className="text-xs text-gray-400">
                            {transaction.vendor.businessName}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.createdAt)}
                    {transaction.appointment && (
                      <div className="text-xs text-blue-500 mt-1 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Appt: {transaction.appointment.date}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-3 py-1 text-sm rounded-full border inline-flex items-center justify-center ${getStatusClasses(
                        transaction.status
                      )}`}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() =>
                          onTransactionClick &&
                          onTransactionClick(transaction.id)
                        }
                        className="p-1 text-blue-600 hover:text-blue-900"
                        title="Quick View"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      {onViewDetails && (
                        <button
                          onClick={() => onViewDetails(transaction.id)}
                          className="p-1 text-green-600 hover:text-green-900"
                          title="View Full Details"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={onSelectTransaction ? 8 : 7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
