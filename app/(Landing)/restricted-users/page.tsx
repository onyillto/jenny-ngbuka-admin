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
  Lock,
  Unlock,
  Calendar,
  User,
  Shield,
  Clock,
  Info,
  Wrench,
} from "lucide-react";

// Mock API response data for banned users
const bannedUsersResponse = {
  status: 200,
  title: "Banned Users",
  message: "Successfully fetched banned users",
  entity: {
    count: 1,
    rows: [
      {
        id: "086c016c-69e3-4bc3-85ad-d330b7fcadfa",
        reason: "fraud",
        duration: 6,
        compound: "days",
        createdAt: "2023-09-13T09:50:57.627Z",
        user: {
          firstname: "Divinefavour",
          lastname: "shaw",
          isServiceProvider: false,
          // Additional properties for UI display
          email: "divinefavour.shaw@example.com",
          username: "divine_shaw",
          profileImageUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
        },
      },
    ],
    bannedClientsCount: 1,
    bannedVendorsCount: 0,
    registeredUsersCount: 12,
  },
};

export default function Page() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userToUnban, setUserToUnban] = useState(null);
  const [bannedUsers, setBannedUsers] = useState([]);
  const [metrics, setMetrics] = useState({
    bannedClientsCount: 0,
    bannedVendorsCount: 0,
    registeredUsersCount: 0,
    totalBannedCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch banned users data
  useEffect(() => {
    const fetchBannedUsers = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Use mock data
        setBannedUsers(bannedUsersResponse.entity.rows);
        setMetrics({
          bannedClientsCount: bannedUsersResponse.entity.bannedClientsCount,
          bannedVendorsCount: bannedUsersResponse.entity.bannedVendorsCount,
          registeredUsersCount: bannedUsersResponse.entity.registeredUsersCount,
          totalBannedCount:
            bannedUsersResponse.entity.bannedClientsCount +
            bannedUsersResponse.entity.bannedVendorsCount,
        });
      } catch (error) {
        console.error("Error fetching banned users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBannedUsers();
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

  // Handle unban user
  const handleUnbanUser = (user) => {
    setUserToUnban(user);
    setShowConfirmModal(true);
  };

  // Confirm unban user
  const confirmUnbanUser = async () => {
    try {
      setLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Unbanning user:", userToUnban.id);

      // Update local state to remove the user
      setBannedUsers(bannedUsers.filter((user) => user.id !== userToUnban.id));

      // Update metrics
      const isVendor = userToUnban.user.isServiceProvider;
      setMetrics({
        ...metrics,
        bannedClientsCount: isVendor
          ? metrics.bannedClientsCount
          : metrics.bannedClientsCount - 1,
        bannedVendorsCount: isVendor
          ? metrics.bannedVendorsCount - 1
          : metrics.bannedVendorsCount,
        totalBannedCount: metrics.totalBannedCount - 1,
      });

      setShowConfirmModal(false);
      setUserToUnban(null);

      // Show success message
      alert(
        `User ${userToUnban.user.firstname} ${userToUnban.user.lastname} has been unbanned successfully.`
      );
    } catch (error) {
      console.error("Error unbanning user:", error);
      alert("Failed to unban user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Calculate ban expiry date
  const calculateExpiryDate = (createdAt, duration, compound) => {
    const banDate = new Date(createdAt);
    const expiryDate = new Date(banDate);

    switch (compound.toLowerCase()) {
      case "days":
        expiryDate.setDate(banDate.getDate() + duration);
        break;
      case "weeks":
        expiryDate.setDate(banDate.getDate() + duration * 7);
        break;
      case "months":
        expiryDate.setMonth(banDate.getMonth() + duration);
        break;
      case "years":
        expiryDate.setFullYear(banDate.getFullYear() + duration);
        break;
      default:
        return "Unknown";
    }

    return formatDate(expiryDate);
  };

  // Check if ban is still active
  const isBanActive = (createdAt, duration, compound) => {
    const banDate = new Date(createdAt);
    const expiryDate = new Date(banDate);

    switch (compound.toLowerCase()) {
      case "days":
        expiryDate.setDate(banDate.getDate() + duration);
        break;
      case "weeks":
        expiryDate.setDate(banDate.getDate() + duration * 7);
        break;
      case "months":
        expiryDate.setMonth(banDate.getMonth() + duration);
        break;
      case "years":
        expiryDate.setFullYear(banDate.getFullYear() + duration);
        break;
      default:
        return true;
    }

    return new Date() < expiryDate;
  };

  // Filter and sort users
  const processedUsers = bannedUsers
    .filter((bannedUser) => {
      // Search filter
      const matchesSearch =
        bannedUser.user.firstname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        bannedUser.user.lastname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        bannedUser.reason.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      // Handle sorting based on field
      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortField === "name") {
        const nameA = `${a.user.firstname} ${a.user.lastname}`.toLowerCase();
        const nameB = `${b.user.firstname} ${b.user.lastname}`.toLowerCase();
        return sortDirection === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else if (sortField === "duration") {
        // Convert to comparable unit based on compound
        const getDurationInDays = (item: { compound: string; duration: number; }) => {
          switch (item.compound.toLowerCase()) {
            case "days":
              return item.duration;
            case "weeks":
              return item.duration * 7;
            case "months":
              return item.duration * 30; // approximation
            case "years":
              return item.duration * 365; // approximation
            default:
              return item.duration;
          }
        };

        const durationA = getDurationInDays(a);
        const durationB = getDurationInDays(b);

        return sortDirection === "asc"
          ? durationA - durationB
          : durationB - durationA;
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

  if (loading && bannedUsers.length === 0) {
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
                <Lock className="h-10 w-10 text-red-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Banned Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.totalBannedCount || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Users className="h-10 w-10 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Banned Clients
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.bannedClientsCount || 0}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <Wrench className="h-10 w-10 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Banned Vendors
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.bannedVendorsCount || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">
                Banned Users
              </h1>

              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search banned users..."
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

            {/* API Response Preview */}
           
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
                        onClick={() => handleSort("duration")}
                      >
                        Duration {renderSortIndicator("duration")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("createdAt")}
                      >
                        Ban Date {renderSortIndicator("createdAt")}
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
                      processedUsers.map((bannedUser) => (
                        <tr
                          key={bannedUser.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => navigateToUserDetail(bannedUser.id)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 relative">
                                {bannedUser.user.profileImageUrl ? (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                      src={bannedUser.user.profileImageUrl}
                                      alt={`${bannedUser.user.firstname} ${bannedUser.user.lastname}`}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-semibold">
                                    {bannedUser.user.firstname.charAt(0)}
                                    {bannedUser.user.lastname.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {bannedUser.user.firstname}{" "}
                                  {bannedUser.user.lastname}
                                </div>
                                {bannedUser.user.email && (
                                  <div className="text-sm text-gray-500">
                                    {bannedUser.user.email}
                                  </div>
                                )}
                                {bannedUser.user.username && (
                                  <div className="text-xs text-gray-400">
                                    @{bannedUser.user.username}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-normal max-w-xs">
                            <div className="text-sm text-gray-900 capitalize">
                              {bannedUser.reason}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {bannedUser.duration} {bannedUser.compound}
                            </div>
                            <div className="text-xs text-gray-500">
                              Expires:{" "}
                              {calculateExpiryDate(
                                bannedUser.createdAt,
                                bannedUser.duration,
                                bannedUser.compound
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-500">
                                {formatDate(bannedUser.createdAt)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {isBanActive(
                              bannedUser.createdAt,
                              bannedUser.duration,
                              bannedUser.compound
                            ) ? (
                              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 border border-red-300">
                                Active
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 border border-gray-300">
                                Expired
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div
                              className="flex justify-center space-x-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="px-3 py-1 bg-green-50 text-green-700 rounded-md hover:bg-green-100 flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUnbanUser(bannedUser);
                                }}
                                title="Unban User"
                              >
                                <Unlock className="h-4 w-4 mr-1" />
                                Unban
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No banned users found
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

      {/* Confirm Unban Modal */}
      {showConfirmModal && userToUnban && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Confirm Unban
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Are you sure you want to unban{" "}
                <span className="font-medium">
                  {userToUnban.user.firstname} {userToUnban.user.lastname}
                </span>
                ? This will remove the ban and allow the user to access the
                platform again.
              </p>
            </div>

            <div className="bg-yellow-50 p-3 rounded-md mb-4">
              <div className="flex">
                <Info className="h-5 w-5 text-yellow-400 mr-2" />
                <div>
                  <p className="text-sm text-yellow-700">
                    User was banned for:{" "}
                    <span className="font-medium capitalize">
                      {userToUnban.reason}
                    </span>
                  </p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Ban duration: {userToUnban.duration} {userToUnban.compound}
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
                onClick={confirmUnbanUser}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-white"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Unlock className="h-4 w-4 mr-1" />
                    Unban User
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
