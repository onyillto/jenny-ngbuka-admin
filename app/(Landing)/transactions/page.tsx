"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import TransactionStats from "../../components/transactions/TransactionStat";
import TransactionFilters from "../../components/transactions/TransactionFilter";
import TransactionTable from "../../components/transactions/TransactionTable";
import FilterSelect from "../../components/transactions/FilterSelect";
import TransactionDetailModal from "../../components/transactions/TransactionDetailModal";

// Import transaction data and helper functions
import { formatCurrency, formatDate } from "../../data/transactions";

// Mock API response data for demo
const transactionApiResponse = {
  status: 200,
  title: "Transactions",
  message: "Successfully fetched transactions",
  entity: {
    count: 2,
    rows: [
      {
        id: "968ab1a8-a8a9-44da-b700-daaf91308cc8",
        amount: 20000,
        status: "cancelled",
        createdAt: "2023-12-18T09:32:37.561Z",
        client: {
          id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
          firstname: "James",
          lastname: "Brown",
          profileImageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
          role: "user",
          address: "#5 some address",
          lga: "Khana",
          city: "Bori",
          state: "Rivers",
          email: "james.brown@example.com",
          phone: "+234 812 345 6789",
        },
        vendor: {
          id: "f311937e-767c-4f2b-bbad-4e9b9947f68b",
          firstname: "Dorcas",
          lastname: "Etim",
          profileImageUrl:
            "https://images.unsplash.com/photo-1579538506280-84e461ad0077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
          role: "dealer",
          address: "16 Waxwing Circle",
          lga: "Abua/Odual",
          city: "Abonnema",
          state: "Rivers",
          email: "dorcas.etim@example.com",
          phone: "+234 803 987 6543",
          businessName: "AutoParts Plus",
        },
        payment: {
          clientAmount: 20000,
          platformFee: 2000,
          vendorAmount: 18000,
          paymentMethod: "Card Payment",
          transactionReference: "TRX-20231218-12345",
        },
        products: [
          {
            id: "prod-001",
            name: "Front Bumper - Toyota Camry 2020",
            description:
              "OEM replacement front bumper for Toyota Camry 2020 model",
            quantity: 1,
            unitPrice: 15000,
            totalPrice: 15000,
          },
          {
            id: "prod-002",
            name: "Headlight Assembly",
            description: "Right side headlight assembly with LED lights",
            quantity: 1,
            unitPrice: 5000,
            totalPrice: 5000,
          },
        ],
        timeline: [
          {
            status: "created",
            timestamp: "2023-12-18T09:30:00.000Z",
            description: "Order created",
          },
          {
            status: "processing",
            timestamp: "2023-12-18T09:31:00.000Z",
            description: "Payment processing",
          },
          {
            status: "cancelled",
            timestamp: "2023-12-18T09:32:37.561Z",
            description: "Order cancelled by client",
          },
        ],
      },
      {
        id: "acca608a-e642-4e6e-a43f-fd6213b833b1",
        amount: 29000,
        status: "cancelled",
        createdAt: "2023-12-18T00:00:23.036Z",
        client: {
          id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
          firstname: "James",
          lastname: "Brown",
          profileImageUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
          role: "user",
          address: "#5 some address",
          lga: "Khana",
          city: "Bori",
          state: "Rivers",
          email: "james.brown@example.com",
          phone: "+234 812 345 6789",
        },
        vendor: {
          id: "fd4f91b6-6c7b-4771-beb0-1c74347f8c07",
          firstname: "Rita",
          lastname: "Dennis",
          profileImageUrl:
            "https://images.unsplash.com/photo-1521252659862-eec69941b071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
          role: "mechanic",
          address: "22403 Kings Junction",
          lga: "Andoni",
          city: "Abonnema",
          state: "Rivers",
          email: "rita.dennis@example.com",
          phone: "+234 705 123 4567",
          businessName: "Rita's Auto Repair",
        },
        payment: {
          clientAmount: 29000,
          platformFee: 2900,
          vendorAmount: 26100,
          paymentMethod: "Bank Transfer",
          transactionReference: "TRX-20231218-67890",
        },
        services: [
          {
            id: "serv-001",
            name: "Full Engine Service",
            description:
              "Complete engine service including oil change and filter replacement",
            price: 15000,
          },
          {
            id: "serv-002",
            name: "Brake System Inspection",
            description: "Full inspection and adjustment of brake system",
            price: 8000,
          },
          {
            id: "serv-003",
            name: "Wheel Alignment",
            description: "Four-wheel alignment service",
            price: 6000,
          },
        ],
        appointment: {
          date: "2023-12-20",
          time: "10:00 AM",
          location: "Rita's Auto Repair Shop",
          notes: "Vehicle should be dropped off 30 minutes before appointment",
        },
        timeline: [
          {
            status: "created",
            timestamp: "2023-12-17T23:55:00.000Z",
            description: "Appointment booked",
          },
          {
            status: "processing",
            timestamp: "2023-12-17T23:57:00.000Z",
            description: "Payment processing",
          },
          {
            status: "payment_confirmed",
            timestamp: "2023-12-17T23:59:00.000Z",
            description: "Payment confirmed",
          },
          {
            status: "cancelled",
            timestamp: "2023-12-18T00:00:23.036Z",
            description: "Appointment cancelled by vendor",
          },
        ],
      },
    ],
    analytics: {
      allTransactionCount: 2,
      failedTransactionCount: 2,
      successfulTransactionCount: 0,
    },
  },
};

export default function TransactionPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Get transaction data from API response
  const transactions = transactionApiResponse.entity.rows;

  // Analytics data from API response
  const analytics = transactionApiResponse.entity.analytics;

  // Calculate total amount of all transactions
  const totalAmount = formatCurrency(
    transactions.reduce((sum, transaction) => sum + transaction.amount, 0)
  );

  // Function to handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Function to view transaction details
  const handleViewTransaction = (transactionId) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setShowTransactionDetail(true);
    }
  };

  // Function to navigate to transaction detail page
  const handleViewDetailPage = (transactionId) => {
    router.push(`/transactions/${transactionId}`);
  };

  // Handle select/deselect all transactions
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedTransactions(
        processedTransactions.map((transaction) => transaction.id)
      );
    } else {
      setSelectedTransactions([]);
    }
  };

  // Handle select/deselect individual transaction
  const handleSelectTransaction = (transactionId, isSelected) => {
    if (isSelected) {
      setSelectedTransactions([...selectedTransactions, transactionId]);
    } else {
      setSelectedTransactions(
        selectedTransactions.filter((id) => id !== transactionId)
      );
    }
  };

  // Helper function to check if a date is within the selected range
  const isDateInRange = (dateString) => {
    if (!dateRange.start && !dateRange.end) return true;

    const date = new Date(dateString);
    const start = dateRange.start ? new Date(dateRange.start) : null;
    const end = dateRange.end ? new Date(dateRange.end) : null;

    if (start && !end) return date >= start;
    if (!start && end) return date <= end;
    return date >= start && date <= end;
  };

  // Helper functions to extract unique values for filters
  const getUniqueValues = (arr, key) => {
    const nestedKey = key.includes(".") ? key.split(".") : null;

    return [
      ...new Set(
        arr.map((item) => {
          if (nestedKey) {
            // Handle nested properties like 'client.city'
            return nestedKey.reduce((obj, k) => obj && obj[k], item);
          }
          return item[key];
        })
      ),
    ].filter(Boolean); // Filter out undefined/null values
  };

  // Extract unique cities and states from both clients and vendors
  const getUniqueCities = () => {
    const clientCities = getUniqueValues(transactions, "client.city");
    const vendorCities = getUniqueValues(transactions, "vendor.city");
    return [...new Set([...clientCities, ...vendorCities])];
  };

  const getUniqueStates = () => {
    const clientStates = getUniqueValues(transactions, "client.state");
    const vendorStates = getUniqueValues(transactions, "vendor.state");
    return [...new Set([...clientStates, ...vendorStates])];
  };

  // Filter and sort transactions
  const processedTransactions = transactions
    .filter((transaction) => {
      // Search filter - check client, vendor, transaction ID, etc.
      const matchesSearch =
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${transaction.client.firstname} ${transaction.client.lastname}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        `${transaction.vendor.firstname} ${transaction.vendor.lastname}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.amount.toString().includes(searchQuery) ||
        transaction.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.payment?.transactionReference &&
          transaction.payment.transactionReference
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      // Status filter
      const matchesStatus =
        statusFilter === "" ||
        transaction.status.toLowerCase() === statusFilter.toLowerCase();

      // State filter - checks both client and vendor states
      const matchesState =
        stateFilter === "" ||
        transaction.client.state.toLowerCase() === stateFilter.toLowerCase() ||
        transaction.vendor.state.toLowerCase() === stateFilter.toLowerCase();

      // City filter - checks both client and vendor cities
      const matchesCity =
        cityFilter === "" ||
        transaction.client.city.toLowerCase() === cityFilter.toLowerCase() ||
        transaction.vendor.city.toLowerCase() === cityFilter.toLowerCase();

      // Role filter - checks both client and vendor roles
      const matchesRole =
        roleFilter === "" ||
        transaction.client.role.toLowerCase() === roleFilter.toLowerCase() ||
        transaction.vendor.role.toLowerCase() === roleFilter.toLowerCase();

      // Date range filter
      const matchesDateRange = isDateInRange(transaction.createdAt);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesState &&
        matchesCity &&
        matchesRole &&
        matchesDateRange
      );
    })
    .sort((a, b) => {
      // Handle sorting based on field
      if (sortField === "amount") {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      } else if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortField === "client.firstname") {
        const nameA =
          `${a.client.firstname} ${a.client.lastname}`.toLowerCase();
        const nameB =
          `${b.client.firstname} ${b.client.lastname}`.toLowerCase();
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortField === "vendor.firstname") {
        const nameA =
          `${a.vendor.firstname} ${a.vendor.lastname}`.toLowerCase();
        const nameB =
          `${b.vendor.firstname} ${b.vendor.lastname}`.toLowerCase();
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        // Default string comparison for other fields
        const valueA =
          typeof a[sortField] === "string"
            ? a[sortField].toLowerCase()
            : a[sortField];
        const valueB =
          typeof b[sortField] === "string"
            ? b[sortField].toLowerCase()
            : b[sortField];

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });

  // Extract unique filter options
  const statuses = [
    ...new Set(transactions.map((t) => t.status.toLowerCase())),
  ];
  const cities = getUniqueCities();
  const states = getUniqueStates();
  const roles = ["client", "mechanic", "dealer", "user"];

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex flex-1">
        <div className="flex-1 w-full overflow-auto bg-white">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <TransactionStats
              allTransactions={analytics.allTransactionCount}
              successfulTransactions={analytics.successfulTransactionCount}
              failedTransactions={analytics.failedTransactionCount}
              totalAmount={totalAmount}
            />

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Transactions
              </h1>
              <TransactionFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
            </div>

            {showFilters && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4">
                <FilterSelect
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={[
                    { value: "", label: "All Statuses" },
                    ...statuses.map((status) => ({
                      value: status,
                      label: status.charAt(0).toUpperCase() + status.slice(1),
                    })),
                  ]}
                />

                <FilterSelect
                  label="Role"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  options={[
                    { value: "", label: "All Roles" },
                    ...roles.map((role) => ({
                      value: role,
                      label: role.charAt(0).toUpperCase() + role.slice(1),
                    })),
                  ]}
                />

                <FilterSelect
                  label="City"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  options={[
                    { value: "", label: "All Cities" },
                    ...cities.map((city) => ({
                      value: city,
                      label: city,
                    })),
                  ]}
                />

                <FilterSelect
                  label="State"
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  options={[
                    { value: "", label: "All States" },
                    ...states.map((state) => ({
                      value: state,
                      label: state,
                    })),
                  ]}
                />

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      className="p-2 border border-gray-300 rounded-lg text-sm"
                      value={dateRange.start || ""}
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          start: e.target.value || null,
                        })
                      }
                    />
                    <input
                      type="date"
                      className="p-2 border border-gray-300 rounded-lg text-sm"
                      value={dateRange.end || ""}
                      onChange={(e) =>
                        setDateRange({
                          ...dateRange,
                          end: e.target.value || null,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="w-full md:w-auto md:self-end">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    onClick={() => {
                      setStatusFilter("");
                      setStateFilter("");
                      setCityFilter("");
                      setRoleFilter("");
                      setDateRange({ start: null, end: null });
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            <TransactionTable
              transactions={processedTransactions}
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
              onTransactionClick={handleViewTransaction}
              selectedTransactions={selectedTransactions}
              onSelectTransaction={handleSelectTransaction}
              onSelectAll={handleSelectAll}
              onViewDetails={handleViewDetailPage}
            />

            {/* Enhanced Transaction detail modal */}
            <TransactionDetailModal
              isOpen={showTransactionDetail}
              onClose={() => setShowTransactionDetail(false)}
              transaction={selectedTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
