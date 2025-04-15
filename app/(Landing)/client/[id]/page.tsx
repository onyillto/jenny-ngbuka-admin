"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import CustomerHeader from "../../../components/client/header";
import CustomerSidebar from "../../../components/client/clientSideBar";
import TabOverview from "../../../components/client/Overview";
import TabMechanic from "../../../components/client/Mechanic";
import TabDealer from "../../../components/client/DealerTab";
import TabReviews from "../../../components/client/ReviewTab";

const CustomerDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("user");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState(null);

  // Fetch customer data (simulated)
  useEffect(() => {
    // This would be an API call in a real application
    setCustomerData({
      id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
      name: "James Brown",
      email: "user1@example.com",
      phone: "2348584764332",
      profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
      address: "#5 some address",
      city: "Bori",
      state: "Rivers",
      lga: "Khana",
      registrationDate: "2023-12-14",
      status: "Active",
      walletBalance: 1000000,
      analytics: {
        amountSpent: { mechanic: 0, sparepart: 0 },
        engagements: { mechanic: 0, sparepart: 1 },
        reviews: { mechanic: 0, sparepart: 0 },
      },
      recentActivity: [
        { date: "2023-12-15", action: "Added a new car", amount: null },
        {
          date: "2023-12-10",
          action: "Requested mechanic service",
          amount: null,
        },
        { date: "2023-11-25", action: "Purchased spare parts", amount: 25000 },
        {
          date: "2023-11-05",
          action: "Updated profile information",
          amount: null,
        },
      ],
      cars: [],
    });
  }, []);

  // Fetch transactions (simulated)
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const transactionData = {
          entity: {
            rows: [
              {
                id: "724f4940-3381-4ce3-83aa-b31724d5bff2",
                amount: 19000,
                status: "completed",
                createdAt: "2023-12-03T12:13:43.123Z",
                client: {
                  id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
                  firstname: "James",
                  lastname: "Brown",
                  profileImageUrl:
                    "https://randomuser.me/api/portraits/men/32.jpg",
                  role: "user",
                  address: "#5 some address",
                  lga: "Khana",
                  city: "Bori",
                  state: "Rivers",
                },
                vendor: {
                  id: "fd4f91b6-6c7b-4771-beb0-1c74347f8c07",
                  firstname: "Rita",
                  lastname: "Dennis",
                  profileImageUrl:
                    "https://randomuser.me/api/portraits/women/22.jpg",
                  role: "mechanic",
                  address: "22403 Kings Junction",
                  lga: "Andoni",
                  city: "Abonnema",
                  state: "Rivers",
                },
              },
              {
                id: "6a891bc5-ac0a-411a-b29a-2c00971a0076",
                amount: 40000,
                status: "completed",
                createdAt: "2023-12-03T11:45:38.987Z",
                client: {
                  id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
                  firstname: "James",
                  lastname: "Brown",
                  profileImageUrl:
                    "https://randomuser.me/api/portraits/men/32.jpg",
                  role: "user",
                  address: "#5 some address",
                  lga: "Khana",
                  city: "Bori",
                  state: "Rivers",
                },
                vendor: {
                  id: "f311937e-767c-4f2b-bbad-4e9b9947f68b",
                  firstname: "Dorcas",
                  lastname: "Etim",
                  profileImageUrl:
                    "https://randomuser.me/api/portraits/women/44.jpg",
                  role: "dealer",
                  address: "16 Waxwing Circle",
                  lga: "Abua/Odual",
                  city: "Abonnema",
                  state: "Rivers",
                },
              },
            ],
          },
        };

        setTransactions(transactionData.entity.rows);
        setLoading(false);
      }, 500);
    };

    fetchTransactions();
  }, []);

  // Function to go back (would use router in real implementation)
  const goBack = () => {
    console.log("Navigate back to customer list");
    // In a real implementation: router.push("/customers");
  };

  // Loading state
  if (!customerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={goBack}
            className="flex items-center text-gray-600 hover:text-blue-600 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to customers</span>
          </button>

          <CustomerHeader customer={customerData} />
        </div>

        {/* Role Selector (for demo purposes) */}
        <div className="mb-4 flex items-center gap-4 bg-white p-4 rounded-lg shadow">
          <span className="text-gray-700">Select Role:</span>
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${
                userRole === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setUserRole("user")}
            >
              User
            </button>
            <button
              className={`px-3 py-1 rounded ${
                userRole === "mechanic"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setUserRole("mechanic")}
            >
              Mechanic
            </button>
            <button
              className={`px-3 py-1 rounded ${
                userRole === "dealer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setUserRole("dealer")}
            >
              Dealer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 bg-white rounded-lg shadow">
          <nav className="flex px-6 border-b border-gray-200">
            <button
              className={`py-4 px-4 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>

            {/* Show Mechanic tab only for users with appropriate role */}
            {(userRole === "user" || userRole === "mechanic") && (
              <button
                className={`py-4 px-4 border-b-2 font-medium text-sm ${
                  activeTab === "mechanic"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("mechanic")}
              >
                Mechanic
              </button>
            )}

            {/* Show Dealer tab only for users with appropriate role */}
            {(userRole === "user" || userRole === "dealer") && (
              <button
                className={`py-4 px-4 border-b-2 font-medium text-sm ${
                  activeTab === "dealer"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("dealer")}
              >
                Dealers
              </button>
            )}

            {/* Reviews tab is always present */}
            <button
              className={`py-4 px-4 border-b-2 font-medium text-sm ${
                activeTab === "reviews"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Customer Info */}
          <div className="md:col-span-1">
            <CustomerSidebar customer={customerData} />
          </div>

          {/* Right Column - Tab Content */}
          <div className="md:col-span-2">
            {activeTab === "overview" && (
              <TabOverview customer={customerData} />
            )}

            {activeTab === "mechanic" && (
              <TabMechanic
                transactions={transactions.filter(
                  (t) => t.vendor.role === "mechanic"
                )}
                loading={loading}
              />
            )}

            {activeTab === "dealer" && (
              <TabDealer
                transactions={transactions.filter(
                  (t) => t.vendor.role === "dealer"
                )}
                loading={loading}
              />
            )}

            {activeTab === "reviews" && <TabReviews />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
