"use client";

import React from "react";
import { Users, CheckCircle, XCircle, Settings, Wrench } from "lucide-react";

export default function VendorStats({
  totalVendors,
  mechanicsCount,
  dealersCount,
  verifiedVendors,
}) {
  const unverifiedVendors = totalVendors - verifiedVendors;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid grid-cols-4 gap-4">
      <div className="flex items-center p-4 bg-blue-50 rounded-lg">
        <Users className="h-10 w-10 text-blue-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-500">Vendors</p>
          <p className="text-2xl font-bold text-gray-900">{totalVendors}</p>
        </div>
      </div>

      <div className="flex items-center p-4 bg-green-50 rounded-lg">
        <CheckCircle className="h-10 w-10 text-green-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-500">Mechanics</p>
          <p className="text-2xl font-bold text-gray-900">{mechanicsCount}</p>
        </div>
      </div>

      <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
        <Settings className="h-10 w-10 text-yellow-500 mr-3" />
        <div>
          <p className="text-sm font-medium text-gray-500">
            Spare part dealers
          </p>
          <p className="text-2xl font-bold text-gray-900">{dealersCount}</p>
        </div>
      </div>

      <div className="flex items-center p-4 bg-purple-50 rounded-lg">
        <div className="flex flex-row h-10 w-10 text-purple-500 mr-3 items-center justify-center">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <span className="mx-1">/</span>
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">
            Verified/Unverified
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {verifiedVendors}/{unverifiedVendors}
          </p>
        </div>
      </div>
    </div>
  );
}
