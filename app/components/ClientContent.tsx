"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Filter, ChevronDown } from "lucide-react";
import DesktopSidebar from "../components/DesktopSidebar";

// Sample data for customers
const customerData = [
  {
    id: "1001",
    name: "Joe Martin",
    avatar: "/avatars/joe.jpg",
    location: "132, My Street BG",
    regDate: "2023-05-15",
    currentState: "Active",
    status: "Verified",
  },
  {
    id: "1002",
    name: "Peterson",
    avatar: "/avatars/peterson.jpg",
    location: "8, My Street, Lagos",
    regDate: "2023-07-22",
    currentState: "Active",
    status: "Pending",
  },
  {
    id: "1003",
    name: "Shaleena",
    avatar: "/avatars/shaleena.jpg",
    location: "33 3rd Ave, NY",
    regDate: "2023-03-10",
    currentState: "Inactive",
    status: "Verified",
  },
  {
    id: "1004",
    name: "Patrik",
    avatar: "/avatars/patrik.jpg",
    location: "400 Broom St, NY",
    regDate: "2023-08-05",
    currentState: "Suspended",
    status: "Rejected",
  },
  {
    id: "1005",
    name: "Angeline",
    avatar: "/avatars/angeline.jpg",
    location: "25 U Square, NY",
    regDate: "2023-01-30",
    currentState: "Active",
    status: "Verified",
  },
  {
    id: "1006",
    name: "Denvar",
    avatar: "/avatars/denvar.jpg",
    location: "28 U Square, NY",
    regDate: "2023-11-12",
    currentState: "Active",
    status: "Verified",
  },
  {
    id: "1007",
    name: "Jamison",
    avatar: "/avatars/jamison.jpg",
    location: "22 seal street, NY",
    regDate: "2023-10-18",
    currentState: "Inactive",
    status: "Pending",
  },
];

export default function CustomerList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to navigate to customer detail page
  const navigateToCustomerDetail = (customerId) => {
    router.push(`/client/${customerId}`);
  };

  // Filter customers based on search query and filters
  const filteredCustomers = customerData.filter((customer) => {
    // Search filter
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.regDate.includes(searchQuery);

    // Status filter
    const matchesStatus =
      statusFilter === "" || customer.status === statusFilter;

    // State filter
    const matchesState =
      stateFilter === "" || customer.currentState === stateFilter;

    return matchesSearch && matchesStatus && matchesState;
  });

  // Function to determine status color classes
  const getStatusClasses = (status) => {
    switch (status) {
      case "Verified":
        return "text-green-600 bg-green-100";
      case "Pending":
        return "text-yellow-600 bg-yellow-100";
      case "Rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Function to determine state color classes
  const getStateClasses = (state) => {
    switch (state) {
      case "Active":
        return "text-green-600";
      case "Inactive":
        return "text-gray-600";
      case "Suspended":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  // Unique status and state values for filter dropdowns
  const statuses = [...new Set(customerData.map((c) => c.status))];
  const states = [...new Set(customerData.map((c) => c.currentState))];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex flex-1">
        {/* Desktop Sidebar - On the left side */}

        {/* Main content area */}
        <div className="flex-1 w-full overflow-auto bg-white">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Customers
              </h1>

              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search name, location..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <button
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Filters section */}
            {showFilters && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4">
                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current State
                  </label>
                  <select
                    className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-auto md:self-end">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    onClick={() => {
                      setStatusFilter("");
                      setStateFilter("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Reg Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Current State
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                        onClick={() => navigateToCustomerDetail(customer.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                <Image
                                  src={customer.avatar}
                                  alt={customer.name}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {customer.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: #{customer.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {customer.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(customer.regDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`text-sm ${getStateClasses(
                              customer.currentState
                            )}`}
                          >
                            {customer.currentState}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusClasses(
                              customer.status
                            )}`}
                          >
                            {customer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
