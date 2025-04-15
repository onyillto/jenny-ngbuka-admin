"use client";

import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Wrench,
  Settings,
  Mail,
  Trash2,
  UserCheck,
} from "lucide-react";

export default function VendorTable({
  vendors,
  sortField,
  sortDirection,
  handleSort,
  onVendorClick,
  onDeleteVendor,
  onVerifyVendor,
  selectedVendors = [],
  onSelectVendor,
  onSelectAll,
}) {
  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Function to determine status color classes
  const getStatusClasses = (status) => {
    switch (status) {
      case "Verified":
        return "border border-green-500 text-green-600 bg-white";
      case "Unverified":
        return "border border-red-500 text-red-600 bg-white";
      default:
        return "border border-gray-500 text-gray-600 bg-white";
    }
  };

  // Function to determine state color classes
  const getStateClasses = (state) => {
    switch (state) {
      case "ACTIVE":
        return "text-gray-900 font-semibold";
      case "INACTIVE":
        return "text-gray-700";
      case "BANNED":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  // Function to get vendor type icon
  const getVendorTypeIcon = (type) => {
    if (type === "mechanic") {
      return <Wrench className="h-4 w-4 mr-1 text-blue-600" />;
    } else if (type === "dealer") {
      return <Settings className="h-4 w-4 mr-1 text-purple-600" />;
    }
    return null;
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

  // Handle individual vendor selection
  const handleSelectVendor = (e, vendorId) => {
    e.stopPropagation(); // Prevent row click event
    if (onSelectVendor) {
      onSelectVendor(vendorId, e.target.checked);
    }
  };

  // Check if all vendors are selected
  const allSelected =
    vendors.length > 0 && selectedVendors.length === vendors.length;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {onSelectVendor && (
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
                onClick={() => handleSort("name")}
              >
                Name {renderSortIndicator("name")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("email")}
              >
                Email {renderSortIndicator("email")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("location")}
              >
                Location {renderSortIndicator("location")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("regDate")}
              >
                Reg Date {renderSortIndicator("regDate")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("currentState")}
              >
                State {renderSortIndicator("currentState")}
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                Status {renderSortIndicator("status")}
              </th>
              {(onDeleteVendor || onVerifyVendor) && (
                <th
                  scope="col"
                  className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vendors.length > 0 ? (
              vendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => onVendorClick(vendor.id)}
                >
                  {onSelectVendor && (
                    <td
                      className="px-4 py-4 whitespace-nowrap text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                          checked={selectedVendors.includes(vendor.id)}
                          onChange={(e) => handleSelectVendor(e, vendor.id)}
                        />
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 relative">
                        {vendor.avatar ? (
                          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                            <img
                              src={vendor.avatar}
                              alt={vendor.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-indigo-700 flex items-center justify-center text-white font-semibold">
                            {vendor.initials}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vendor.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          {getVendorTypeIcon(vendor.type)}
                          <span className="capitalize">{vendor.type}</span>
                          {vendor.company && (
                            <div className="text-xs text-gray-400 ml-2">
                              {vendor.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {vendor.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vendor.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(vendor.regDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm ${getStateClasses(
                        vendor.currentState
                      )}`}
                    >
                      {vendor.currentState}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`px-3 py-1 text-sm rounded-full inline-flex ${getStatusClasses(
                        vendor.status
                      )}`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  {(onDeleteVendor || onVerifyVendor) && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div
                        className="flex justify-center space-x-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {onVerifyVendor && vendor.status === "Unverified" && (
                          <button
                            className="p-1 text-green-600 hover:text-green-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              onVerifyVendor(vendor, e);
                            }}
                            title="Verify Vendor"
                          >
                            <UserCheck className="h-5 w-5" />
                          </button>
                        )}
                        {onDeleteVendor && (
                          <button
                            className="p-1 text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteVendor(vendor, e);
                            }}
                            title="Delete Vendor"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={onSelectVendor ? 8 : 7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No vendors found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
