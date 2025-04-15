"use client";

import React from "react";
import Image from "next/image";
import { MoreHorizontal, SlidersHorizontal } from "lucide-react";

interface Invoice {
  id: string;
  customerName: string;
  customerAvatar: string;
  itemName: string;
  itemImage: string;
  orderDate: string;
  status: "Paid" | "Pending" | "Overdue";
  price: number;
}

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-700 text-black text-lg font-medium">Recent Invoices</h3>
        <div className="flex gap-2">
          <button className="border border-gray-200 rounded-md px-4 py-2 flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-xs text-gray-500 uppercase">
              <th className="py-3.5 px-4 text-left">No</th>
              <th className="py-3.5 px-4 text-left">Id </th>
              <th className="py-3.5 px-4 text-left">name</th>
              <th className="py-3.5 px-4 text-left">Items Name</th>
              <th className="py-3.5 px-4 text-left">Order Date</th>
              <th className="py-3.5 px-4 text-left">Status</th>
              <th className="py-3.5 px-4 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-gray-700">{index + 1}</td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  #{invoice.id}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full mr-3 overflow-hidden bg-gray-100">
                      <Image
                        src={invoice.customerAvatar}
                        alt={invoice.customerName}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-700">
                      {invoice.customerName}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full mr-3 overflow-hidden bg-gray-100">
                      <Image
                        src={invoice.itemImage}
                        alt={invoice.itemName}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-sm text-gray-700">
                      {invoice.itemName}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {invoice.orderDate}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      invoice.status === "Paid"
                        ? "bg-green-50 text-green-700"
                        : invoice.status === "Pending"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700 text-right">
                  ${invoice.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTable;
