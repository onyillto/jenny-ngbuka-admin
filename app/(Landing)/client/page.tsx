"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Users,
  CheckCircle,
  XCircle,
  Trash2,
  Lock,
  Unlock,
  MoreHorizontal,
  Check,
  X,
  RefreshCw,
} from "lucide-react";

// Reduced sample data for users
const userData = [
  {
    id: "1001",
    name: "Joe Martin",
    email: "joe.martin@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "New York, NY",
    regDate: "2023-05-15",
    accountStatus: "Active",
    verificationStatus: "Verified",
    transactionCount: 12,
    ordersCount: 5,
    complaintsCount: 1,
  },
  {
    id: "1002",
    name: "Peterson Smith",
    email: "peterson.smith@example.com",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    location: "Lagos, Nigeria",
    regDate: "2023-07-22",
    accountStatus: "Active",
    verificationStatus: "Pending",
    transactionCount: 8,
    ordersCount: 3,
    complaintsCount: 0,
  },
  {
    id: "1003",
    name: "Shaleena Kumar",
    email: "shaleena.k@example.com",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    location: "New York, NY",
    regDate: "2023-03-10",
    accountStatus: "Inactive",
    verificationStatus: "Verified",
    transactionCount: 4,
    ordersCount: 2,
    complaintsCount: 1,
  },
  {
    id: "1004",
    name: "Patrik Johnson",
    email: "patrik.j@example.com",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    location: "New York, NY",
    regDate: "2023-08-05",
    accountStatus: "Restricted",
    verificationStatus: "Rejected",
    transactionCount: 1,
    ordersCount: 1,
    complaintsCount: 2,
  },
  {
    id: "1005",
    name: "Angeline Woods",
    email: "angeline.w@example.com",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    location: "Chicago, IL",
    regDate: "2023-01-30",
    accountStatus: "Active",
    verificationStatus: "Verified",
    transactionCount: 15,
    ordersCount: 7,
    complaintsCount: 0,
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [accountStatusFilter, setAccountStatusFilter] = useState("");
  const [verificationStatusFilter, setVerificationStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showBulkActionMenu, setShowBulkActionMenu] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean;
    action: string;
    message: string;
    userId?: string | null;
  }>({
    show: false,
    action: "",
    message: "",
    userId: null,
  });

  // Calculate summary statistics
  const totalUsers = userData.length;
  const verifiedUsers = userData.filter(
    (user) => user.verificationStatus === "Verified"
  ).length;
  const activeUsers = userData.filter(
    (user) => user.accountStatus === "Active"
  ).length;
  const restrictedUsers = userData.filter(
    (user) => user.accountStatus === "Restricted"
  ).length;

  // Extract unique locations for filter
  const uniqueLocations = [
    ...new Set(
      userData.map((user) => {
        const [city] = user.location.split(", ");
        return city;
      })
    ),
  ];

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter and sort users
  const processedUsers = userData
    .filter((user) => {
      // Search filter
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.regDate.includes(searchQuery) ||
        user.accountStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.verificationStatus
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Account status filter
      const matchesAccountStatus =
        accountStatusFilter === "" ||
        user.accountStatus === accountStatusFilter;

      // Verification status filter
      const matchesVerificationStatus =
        verificationStatusFilter === "" ||
        user.verificationStatus === verificationStatusFilter;

      // Location filter
      const matchesLocation =
        locationFilter === "" ||
        user.location.toLowerCase().includes(locationFilter.toLowerCase());

      return (
        matchesSearch &&
        matchesAccountStatus &&
        matchesVerificationStatus &&
        matchesLocation
      );
    })
    .sort((a, b) => {
      // Handle different field types for sorting
      if (sortField === "regDate") {
        // Date sorting
        const dateA = new Date(a[sortField]);
        const dateB = new Date(b[sortField]);
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      } else {
        // String sorting
        const valueA = String(a[sortField]).toLowerCase();
        const valueB = String(b[sortField]).toLowerCase();

        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });

  // Handle select all checkbox
  useEffect(() => {
    if (selectAll) {
      setSelectedUsers(processedUsers.map((user) => user.id));
    } else if (selectedUsers.length === processedUsers.length) {
      setSelectedUsers([]);
    }
  }, [selectAll]);

  // Update selectAll state when all users are manually selected/deselected
  useEffect(() => {
    if (
      selectedUsers.length === processedUsers.length &&
      processedUsers.length > 0
    ) {
      setSelectAll(true);
    } else if (selectAll && selectedUsers.length !== processedUsers.length) {
      setSelectAll(false);
    }
  }, [selectedUsers]);

  // Function to navigate to user detail page
  const navigateToUserDetail = (userId) => {
    router.push(`/client/${userId}`);
  };

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

  // Function to handle user selection
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Function to handle bulk select all
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  // Function to handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case "restrict":
        setConfirmDialog({
          show: true,
          action: "restrict",
          message: `Are you sure you want to restrict ${selectedUsers.length} user account(s)?`,
        });
        break;
      case "activate":
        setConfirmDialog({
          show: true,
          action: "activate",
          message: `Are you sure you want to activate ${selectedUsers.length} user account(s)?`,
        });
        break;
      case "delete":
        setConfirmDialog({
          show: true,
          action: "delete",
          message: `Are you sure you want to delete ${selectedUsers.length} user account(s)? This action cannot be undone.`,
        });
        break;
      default:
        break;
    }
    setShowBulkActionMenu(false);
  };

  // Function to confirm bulk action
  const confirmBulkAction = () => {
    // Here you would implement the actual API calls to perform the action
    console.log(`Performing ${confirmDialog.action} on users:`, selectedUsers);

    // Reset selections and close dialog
    setSelectedUsers([]);
    setSelectAll(false);
    setConfirmDialog({ show: false, action: "", message: "" });

    // In a real app, you would update state after the API call succeeds
    console.log(`${confirmDialog.action} action completed`);
  };

  // Function to handle individual user actions
  const handleUserAction = (e, userId, action) => {
    e.stopPropagation(); // Prevent row click
    console.log(`Performing ${action} on user ${userId}`);

    // Handle verify action
    if (action === "verify") {
      // In a real app, you would make an API call here
      console.log(`Verifying user ${userId}`);
    }

    // Handle delete action
    if (action === "delete") {
      setConfirmDialog({
        show: true,
        action: "delete-single",
        message: `Are you sure you want to delete this user? This action cannot be undone.`,
        userId,
      });
    }

    // Handle restrict action
    if (action === "restrict") {
      setConfirmDialog({
        show: true,
        action: "restrict-single",
        message: `Are you sure you want to restrict this user's account?`,
        userId,
      });
    }

    // Handle activate action
    if (action === "activate") {
      setConfirmDialog({
        show: true,
        action: "activate-single",
        message: `Are you sure you want to activate this user's account?`,
        userId,
      });
    }
  };

  // Function to confirm single user action
  const confirmSingleUserAction = () => {
    const { action, userId } = confirmDialog;
    console.log(`Performing ${action} on user ${userId}`);

    // Close dialog
    setConfirmDialog({ show: false, action: "", message: "", userId: null });
  };

  // Function to determine verification status color classes
  const getVerificationStatusClasses = (status) => {
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

  // Function to determine account status color classes
  const getAccountStatusClasses = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-50";
      case "Inactive":
        return "text-gray-600 bg-gray-50";
      case "Restricted":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
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

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex flex-1">
        {/* Main content area */}
        <div className="flex-1 w-full overflow-auto bg-white">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Summary Statistics Box */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid grid-cols-4 gap-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Users className="h-10 w-10 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalUsers}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-10 w-10 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {verifiedUsers}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <Unlock className="h-10 w-10 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeUsers}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <Lock className="h-10 w-10 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Restricted
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {restrictedUsers}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Users Management
              </h1>

              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, email, location..."
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
                    Account Status
                  </label>
                  <select
                    className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={accountStatusFilter}
                    onChange={(e) => setAccountStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Restricted">Restricted</option>
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Verification Status
                  </label>
                  <select
                    className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={verificationStatusFilter}
                    onChange={(e) =>
                      setVerificationStatusFilter(e.target.value)
                    }
                  >
                    <option value="">All Statuses</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {uniqueLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-auto md:self-end">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    onClick={() => {
                      setAccountStatusFilter("");
                      setVerificationStatusFilter("");
                      setLocationFilter("");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="flex items-center justify-between mb-4 p-2 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-gray-700">
                  {selectedUsers.length} users selected
                </div>
                <div className="relative">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    onClick={() => setShowBulkActionMenu(!showBulkActionMenu)}
                  >
                    Bulk Actions
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>

                  {showBulkActionMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleBulkAction("restrict")}
                        >
                          Restrict Accounts
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleBulkAction("activate")}
                        >
                          Activate Accounts
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => handleBulkAction("delete")}
                        >
                          Delete Accounts
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </th>
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
                        onClick={() => handleSort("accountStatus")}
                      >
                        Account Status {renderSortIndicator("accountStatus")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("verificationStatus")}
                      >
                        Verification {renderSortIndicator("verificationStatus")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processedUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => navigateToUserDetail(user.id)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div
                            className="flex items-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => handleSelectUser(user.id)}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                <img
                                  src={user.avatar}
                                  alt={user.name}
                                  className="h-10 w-10 rounded-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: #{user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.regDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getAccountStatusClasses(
                              user.accountStatus
                            )}`}
                          >
                            {user.accountStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getVerificationStatusClasses(
                              user.verificationStatus
                            )}`}
                          >
                            {user.verificationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div
                            className="flex items-center space-x-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {user.verificationStatus !== "Verified" && (
                              <button
                                className="p-1 text-blue-600 hover:text-blue-800"
                                onClick={(e) =>
                                  handleUserAction(e, user.id, "verify")
                                }
                                title="Verify Account"
                              >
                                <Check className="h-5 w-5" />
                              </button>
                            )}

                            {user.accountStatus === "Active" ? (
                              <button
                                className="p-1 text-yellow-600 hover:text-yellow-800"
                                onClick={(e) =>
                                  handleUserAction(e, user.id, "restrict")
                                }
                                title="Restrict Account"
                              >
                                <Lock className="h-5 w-5" />
                              </button>
                            ) : (
                              <button
                                className="p-1 text-green-600 hover:text-green-800"
                                onClick={(e) =>
                                  handleUserAction(e, user.id, "activate")
                                }
                                title="Activate Account"
                              >
                                <Unlock className="h-5 w-5" />
                              </button>
                            )}

                            <button
                              className="p-1 text-red-600 hover:text-red-800"
                              onClick={(e) =>
                                handleUserAction(e, user.id, "delete")
                              }
                              title="Delete User"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Confirmation Dialog */}
            {confirmDialog.show && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-sm w-full">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Confirm Action
                  </h3>
                  <p className="text-gray-700 mb-6">{confirmDialog.message}</p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                      onClick={() =>
                        setConfirmDialog({
                          show: false,
                          action: "",
                          message: "",
                        })
                      }
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      onClick={
                        confirmDialog.action.includes("-single")
                          ? confirmSingleUserAction
                          : confirmBulkAction
                      }
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
