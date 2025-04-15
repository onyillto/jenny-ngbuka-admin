"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  CreditCard,
  Calendar,
  MapPin,
  Clock,
  User,
  Wrench,
  ShoppingBag,
  Phone,
  Mail,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Percent,
} from "lucide-react";
import { formatCurrency, formatDate } from "../../data/transactions";

export default function TransactionDetailModal({
  isOpen,
  onClose,
  transaction,
}) {
  const [expandedSection, setExpandedSection] = useState({
    payment: true,
    clientInfo: false,
    vendorInfo: false,
    orderDetails: true,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection({
      ...expandedSection,
      [section]: !expandedSection[section],
    });
  };

  if (!isOpen || !transaction) return null;

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
        return <Wrench className="h-5 w-5 mr-2 text-blue-600" />;
      case "dealer":
        return <ShoppingBag className="h-5 w-5 mr-2 text-purple-600" />;
      case "user":
      case "client":
        return <User className="h-5 w-5 mr-2 text-green-600" />;
      default:
        return null;
    }
  };

  // Section Header Component
  const SectionHeader = ({ title, expanded, onToggle, icon }) => (
    <div
      className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center">
        {icon}
        <h3 className="text-md font-medium text-gray-800 ml-1">{title}</h3>
      </div>
      {expanded ? (
        <ChevronUp className="h-4 w-4 text-gray-900" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-900" />
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Transaction Details
            </h2>
            <div className="flex items-center text-sm text-gray-900">
              <CreditCard className="h-4 w-4 mr-1" />
              <span className="truncate">{transaction.id}</span>
            </div>
          </div>
          <div className="flex items-center">
            <span
              className={`px-3 py-1 rounded-full border text-sm font-medium mr-3 ${getStatusClasses(
                transaction.status
              )}`}
            >
              {transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1)}
            </span>
            <button
              onClick={onClose}
              className="text-gray-900 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Amount and Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <DollarSign className="h-4 w-4 text-gray-900 mr-1" />
                <span className="text-sm text-gray-900">Amount</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(transaction.amount)}
              </p>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <Calendar className="h-4 w-4 text-gray-900 mr-1" />
                <span className="text-sm text-gray-900">Date</span>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {formatDate(transaction.createdAt)}
              </p>
            </div>

            {transaction.payment?.transactionReference && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-1">
                  <CreditCard className="h-4 w-4 text-gray-900 mr-1" />
                  <span className="text-sm text-gray-900">Reference</span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {transaction.payment.transactionReference}
                </p>
              </div>
            )}
          </div>

          {/* Cancellation Alert */}
          {transaction.status.toLowerCase() === "cancelled" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-700 text-sm">
                    Transaction Cancelled
                  </h4>
                  <p className="text-xs text-red-600">
                    {transaction.cancellationReason ||
                      "This transaction was cancelled."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Payment Breakdown */}
          <div className="border rounded-lg mb-4 overflow-hidden">
            <SectionHeader
              title="Payment Breakdown"
              expanded={expandedSection.payment}
              onToggle={() => toggleSection("payment")}
              icon={<DollarSign className="h-4 w-4 text-green-600" />}
            />

            {expandedSection.payment && (
              <div className="p-4">
                <div className="grid grid-cols-3 gap-3 mb-3 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-xs text-gray-900">Client Paid</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(
                        transaction.payment?.clientAmount || transaction.amount
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-xs text-gray-900 flex items-center">
                      Platform Fee <Percent className="h-3 w-3 ml-1" />
                    </div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(transaction.payment?.platformFee || 0)}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-xs text-gray-900">Vendor Received</div>
                    <div className="font-bold text-gray-900">
                      {formatCurrency(transaction.payment?.vendorAmount || 0)}
                    </div>
                  </div>
                </div>

                {transaction.payment?.paymentMethod && (
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">Payment Method:</span>{" "}
                    {transaction.payment.paymentMethod}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Client & Vendor Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Client Information */}
            <div className="border rounded-lg overflow-hidden">
              <SectionHeader
                title="Client Information"
                expanded={expandedSection.clientInfo}
                onToggle={() => toggleSection("clientInfo")}
                icon={<User className="h-4 w-4 text-green-600" />}
              />

              {expandedSection.clientInfo && (
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      {transaction.client.profileImageUrl ? (
                        <img
                          src={transaction.client.profileImageUrl}
                          alt={`${transaction.client.firstname} ${transaction.client.lastname}`}
                          className="h-10 w-10 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                          {transaction.client.firstname.charAt(0)}
                          {transaction.client.lastname.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.client.firstname}{" "}
                        {transaction.client.lastname}
                      </p>
                      <Link href={`/clients/${transaction.client.id}`}>
                        <span className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                          View Profile <ExternalLink className="h-3 w-3 ml-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {transaction.client.phone && (
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 text-gray-900 mr-2" />
                        <span>{transaction.client.phone}</span>
                      </div>
                    )}
                    {transaction.client.email && (
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 text-gray-900 mr-2" />
                        <span>{transaction.client.email}</span>
                      </div>
                    )}
                    <div className="flex items-start">
                      <MapPin className="h-3 w-3 text-gray-900 mr-2 mt-0.5" />
                      <div>
                        <p>{transaction.client.address}</p>
                        <p>
                          {transaction.client.city}, {transaction.client.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Vendor Information */}
            <div className="border rounded-lg overflow-hidden">
              <SectionHeader
                title="Vendor Information"
                expanded={expandedSection.vendorInfo}
                onToggle={() => toggleSection("vendorInfo")}
                icon={getRoleIcon(transaction.vendor.role)}
              />

              {expandedSection.vendorInfo && (
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                      {transaction.vendor.profileImageUrl ? (
                        <img
                          src={transaction.vendor.profileImageUrl}
                          alt={`${transaction.vendor.firstname} ${transaction.vendor.lastname}`}
                          className="h-10 w-10 object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                          {transaction.vendor.firstname.charAt(0)}
                          {transaction.vendor.lastname.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.vendor.firstname}{" "}
                        {transaction.vendor.lastname}
                      </p>
                      {transaction.vendor.businessName && (
                        <p className="text-xs text-gray-600">
                          {transaction.vendor.businessName}
                        </p>
                      )}
                      <Link href={`/vendors/${transaction.vendor.id}`}>
                        <span className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                          View Profile <ExternalLink className="h-3 w-3 ml-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    {transaction.vendor.phone && (
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 text-gray-900 mr-2" />
                        <span>{transaction.vendor.phone}</span>
                      </div>
                    )}
                    {transaction.vendor.email && (
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 text-gray-900 mr-2" />
                        <span>{transaction.vendor.email}</span>
                      </div>
                    )}
                    <div className="flex items-start">
                      <MapPin className="h-3 w-3 text-gray-900 mr-2 mt-0.5" />
                      <div>
                        <p>{transaction.vendor.address}</p>
                        <p>
                          {transaction.vendor.city}, {transaction.vendor.state}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="border rounded-lg mb-4 overflow-hidden">
            <SectionHeader
              title="Order Details"
              expanded={expandedSection.orderDetails}
              onToggle={() => toggleSection("orderDetails")}
              icon={
                transaction.vendor.role.toLowerCase() === "mechanic" ? (
                  <Wrench className="h-4 w-4 text-blue-600" />
                ) : (
                  <ShoppingBag className="h-4 w-4 text-purple-600" />
                )
              }
            />

            {expandedSection.orderDetails && (
              <div className="p-4">
                {/* For Mechanics: Service details */}
                {transaction.vendor.role.toLowerCase() === "mechanic" &&
                  transaction.services && (
                    <>
                      {transaction.appointment && (
                        <div className="bg-blue-50 p-3 rounded mb-3 text-xs">
                          <div className="font-medium text-blue-800 mb-1 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" /> Appointment
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-blue-700">Date:</span>{" "}
                              {transaction.appointment.date}
                            </div>
                            <div>
                              <span className="text-blue-700">Time:</span>{" "}
                              {transaction.appointment.time}
                            </div>
                            <div className="col-span-2">
                              <span className="text-blue-700">Location:</span>{" "}
                              {transaction.appointment.location}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="text-xs font-medium mb-2">
                        Services Booked
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-xs">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left font-medium text-gray-900"
                              >
                                Service
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-right font-medium text-gray-900"
                              >
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {transaction.services.map((service) => (
                              <tr key={service.id}>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <div className="font-medium text-gray-900">
                                    {service.name}
                                  </div>
                                  <div className="text-gray-900 text-xs">
                                    {service.description}
                                  </div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-right font-medium">
                                  {formatCurrency(service.price)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-50">
                              <td className="px-3 py-2 font-medium text-gray-900">
                                Total
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </>
                  )}

                {/* For Dealers: Product details */}
                {transaction.vendor.role.toLowerCase() === "dealer" &&
                  transaction.products && (
                    <>
                      <div className="text-xs font-medium mb-2 text-black">
                        Products Ordered
                      </div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-900 text-xs">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-2 text-left font-medium text-gray-900"
                              >
                                Product
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-center font-medium text-gray-900"
                              >
                                Qty
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-right font-medium text-gray-900"
                              >
                                Unit Price
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-2 text-right font-medium text-gray-900"
                              >
                                Total
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {transaction.products.map((product) => (
                              <tr key={product.id}>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <div className="font-medium text-gray-900">
                                    {product.name}
                                  </div>
                                  <div className="text-gray-900 text-xs">
                                    {product.description}
                                  </div>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-center">
                                  {product.quantity}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-right text-black">
                                  {formatCurrency(product.unitPrice)}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-right font-medium text-gray-900">
                                  {formatCurrency(product.totalPrice)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="bg-gray-50">
                              <td
                                colSpan={3}
                                className="px-3 py-2 font-medium text-gray-900"
                              >
                                Total
                              </td>
                              <td className="px-3 py-2 text-right font-bold text-gray-900">
                                {formatCurrency(transaction.amount)}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </>
                  )}

                {/* If neither products nor services are available */}
                {!transaction.products && !transaction.services && (
                  <div className="text-center py-4 text-gray-900 text-sm">
                    No detailed order information available
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Timeline (in modal we'll show compact version) */}
          {transaction.timeline && (
            <div className="border rounded-lg overflow-hidden">
              <div className="p-3 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-800 flex items-center">
                  <Clock className="h-4 w-4 text-blue-600 mr-2" />
                  Transaction Timeline
                </h3>
              </div>
              <div className="p-3 text-xs space-y-2">
                {transaction.timeline.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`h-5 w-5 rounded-full flex-shrink-0 flex items-center justify-center mr-2 ${
                        event.status.toLowerCase().includes("cancel") ||
                        event.status.toLowerCase().includes("fail")
                          ? "bg-red-100 text-red-600"
                          : event.status.toLowerCase().includes("complet") ||
                            event.status.toLowerCase().includes("success")
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <span className="text-xs">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 capitalize">
                        {event.status.replace(/_/g, " ")}
                      </div>
                      <div className="text-gray-900">{event.description}</div>
                      <div className="text-gray-400 text-xs">
                        {formatDate(event.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
