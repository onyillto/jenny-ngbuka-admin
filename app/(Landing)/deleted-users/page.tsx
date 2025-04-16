"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Users,
  AlertTriangle,
  Trash2,
  RefreshCw,
  Calendar,
  User,
  Clock,
  Info,
  FileX,
  UserX,
  Database,
} from "lucide-react";

// Mock API response data for deleted users
const deletedUsersResponse = {
  status: 200,
  title: "Deleted Users",
  message: "Successfully fetched deleted users",
  entity: {
    count: 3,
    rows: [
      {
        id: "086c016c-69e3-4bc3-85ad-d330b7fcadfa",
        reason: "User requested account deletion",
        deletedAt: "2024-03-13T09:50:57.627Z",
        user: {
          firstname: "John",
          lastname: "Smith",
          isServiceProvider: false,
          email: "john.smith@example.com",
          username: "john_smith",
          profileImageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
        },
      },
      {
        id: "186c016c-79e3-4bc3-85ad-d330b7fcadfb",
        reason: "Inactive account",
        deletedAt: "2024-04-01T15:22:37.127Z",
        user: {
          firstname: "Sarah",
          lastname: "Johnson",
          isServiceProvider: true,
          email: "sarah.johnson@example.com",
          username: "sarah_johnson",
          profileImageUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
        },
      },
      {
        id: "286c016c-89e3-4bc3-85ad-d330b7fcadfc",
        reason: "Admin deletion due to policy violation",
        deletedAt: "2024-05-07T23:51:42.881Z",
        user: {
          firstname: "Michael",
          lastname: "Brown",
          isServiceProvider: false,
          email: "michael.brown@example.com",
          username: "michael_brown",
          profileImageUrl: null,
        },
      },
    ],
    deletedClientsCount: 2,
    deletedVendorsCount: 1,
    registeredUsersCount: 12,
  },
};

export default function Page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState("deletedAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToRestore, setUserToRestore] = useState(null);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [metrics, setMetrics] = useState({
    deletedClientsCount: 0,
    deletedVendorsCount: 0,
    registeredUsersCount: 0,
    totalDeletedCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch deleted users data
  useEffect(() => {
    const fetchDeletedUsers = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Use mock data
        setDeletedUsers(deletedUsersResponse.entity.rows);
        setMetrics({
          deletedClientsCount: deletedUsersResponse.entity.deletedClientsCount,
          deletedVendorsCount: deletedUsersResponse.entity.deletedVendorsCount,
          registeredUsersCount:
            deletedUsersResponse.entity.registeredUsersCount,
          totalDeletedCount:
            deletedUsersResponse.entity.deletedClientsCount +
            deletedUsersResponse.entity.deletedVendorsCount,
        });
      } catch (error) {
        console.error("Error fetching deleted users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeletedUsers();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  // Function to navigate to user detail page
  const navigateToUserDetail = (userId) => {
    router.push(`/users/${userId}`);
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

  // Handle restore user
  const handleRestoreUser = (user) => {
    setUserToRestore(user);
    setShowConfirmModal(true);
  };

  // Calculate time since deletion
  const getTimeSinceDeletion = (deletedAt) => {
    const deletionDate = new Date(deletedAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - deletionDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Less than a day
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays < 30) {
      // Days
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      // Months
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else {
      // Years
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""} ago`;
    }
  };

  // Check if user can be restored (within 30 days of deletion)
  const canRestoreUser = (deletedAt) => {
    const deletionDate = new Date(deletedAt);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - deletionDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 30; // Can restore if deleted within the last 30 days
  };

  // Confirm restore user
  const confirmRestoreUser = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Restoring user:", userToRestore.id);

      // Update local state to remove the user
      setDeletedUsers(
        deletedUsers.filter((user) => user.id !== userToRestore.id)
      );

      // Update metrics
      const isVendor = userToRestore.user.isServiceProvider;
      setMetrics({
        ...metrics,
        deletedClientsCount: isVendor
          ? metrics.deletedClientsCount
          : metrics.deletedClientsCount - 1,
        deletedVendorsCount: isVendor
          ? metrics.deletedVendorsCount - 1
          : metrics.deletedVendorsCount,
        totalDeletedCount: metrics.totalDeletedCount - 1,
      });

      setShowConfirmModal(false);
      setUserToRestore(null);

      // Show success message
      alert(
        `User ${userToRestore.user.firstname} ${userToRestore.user.lastname} has been restored successfully.`
      );
    } catch (error) {
      console.error("Error restoring user:", error);
      alert("Failed to restore user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort users
  const processedUsers = deletedUsers
    .filter((deletedUser) => {
      // Search filter
      const matchesSearch =
        deletedUser.user.firstname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        deletedUser.user.lastname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        deletedUser.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (deletedUser.user.email &&
          deletedUser.user.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (deletedUser.user.username &&
          deletedUser.user.username
            .toLowerCase()
            .includes(searchQuery.toLowerCase()));

      return matchesSearch;
    })
    .sort((a, b) => {
      // Handle sorting based on field
      if (sortField === "deletedAt") {
        const dateA = new Date(a.deletedAt);
        const dateB = new Date(b.deletedAt);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortField === "name") {
        const nameA = `${a.user.firstname} ${a.user.lastname}`.toLowerCase();
        const nameB = `${b.user.firstname} ${b.user.lastname}`.toLowerCase();
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

  // Function to render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;

    return sortDirection === "asc" ? (
      <ChevronUp className="inline-block h-4 w-4 ml-1" />
    ) : (
      <ChevronDown className="inline-block h-4 w-4 ml-1" />
    );
  };

  if (loading && deletedUsers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex flex-1">
        {/* Main content area */}
        <div className="flex-1 w-full overflow-auto bg-white">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            {/* Summary Statistics Box */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-red-50 rounded-lg">
                <Trash2 className="h-10 w-10 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Deleted Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.totalDeletedCount || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <UserX className="h-10 w-10 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Deleted Clients
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.deletedClientsCount || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <Database className="h-10 w-10 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Deleted Vendors
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.deletedVendorsCount || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Deleted Users
              </h1>

              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search deleted users..."
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

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("name")}
                      >
                        User {renderSortIndicator("name")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("reason")}
                      >
                        Reason {renderSortIndicator("reason")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("deletedAt")}
                      >
                        Deletion Date {renderSortIndicator("deletedAt")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
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
                    {processedUsers.length > 0 ? (
                      processedUsers.map((deletedUser) => (
                        <tr
                          key={deletedUser.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => navigateToUserDetail(deletedUser.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 relative">
                                {deletedUser.user.profileImageUrl ? (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                      src={deletedUser.user.profileImageUrl}
                                      alt={`${deletedUser.user.firstname} ${deletedUser.user.lastname}`}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-semibold">
                                    {deletedUser.user.firstname.charAt(0)}
                                    {deletedUser.user.lastname.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {deletedUser.user.firstname}{" "}
                                  {deletedUser.user.lastname}
                                </div>
                                {deletedUser.user.email && (
                                  <div className="text-sm text-gray-500">
                                    {deletedUser.user.email}
                                  </div>
                                )}
                                {deletedUser.user.username && (
                                  <div className="text-xs text-gray-400">
                                    @{deletedUser.user.username}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-normal max-w-xs">
                            <div className="text-sm text-gray-900">
                              {deletedUser.reason}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">
                                {formatDate(deletedUser.deletedAt)}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {getTimeSinceDeletion(deletedUser.deletedAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {canRestoreUser(deletedUser.deletedAt) ? (
                              <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                                Recoverable
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 border border-gray-300">
                                Permanent
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div
                              className="flex justify-center space-x-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {canRestoreUser(deletedUser.deletedAt) ? (
                                <button
                                  className="px-3 py-1 bg-green-50 text-green-700 rounded-md hover:bg-green-100 flex items-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRestoreUser(deletedUser);
                                  }}
                                  title="Restore User"
                                >
                                  <RefreshCw className="h-4 w-4 mr-1" />
                                  Restore
                                </button>
                              ) : (
                                <button
                                  className="px-3 py-1 bg-gray-100 text-gray-400 rounded-md cursor-not-allowed flex items-center"
                                  disabled
                                  title="Cannot restore user (over 30 days)"
                                >
                                  <FileX className="h-4 w-4 mr-1" />
                                  Unrecoverable
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No deleted users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Restore Modal */}
      {showConfirmModal && userToRestore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Restore
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to restore{" "}
                <span className="font-medium">
                  {userToRestore.user.firstname} {userToRestore.user.lastname}
                </span>
                ? This will reactivate the user account and allow them to access
                the platform again.
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-md mb-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-blue-700">
                    Deletion reason:{" "}
                    <span className="font-medium">{userToRestore.reason}</span>
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Deleted: {getTimeSinceDeletion(userToRestore.deletedAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                onClick={confirmRestoreUser}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-white"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Restore User
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
