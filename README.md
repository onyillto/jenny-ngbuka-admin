# Kliner-Web-App
cleaming



import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Wallet,
  ShoppingBag,
  Star,
  ArrowLeft,
  ChevronDown,
  FileText,
  Plus,
  Clock,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Square
} from 'lucide-react';

const CustomerDetail = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState("user"); // Can be "user", "mechanic", or "dealer"
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample data based on the provided API response
  const customerData = {
    id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
    name: "James Brown",
    email: "user1@example.com",
    phone: "2348584764332",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
    address: "#5 some address",
    city: "Bori",
    state: "Rivers",
    lga: "Khana",
    registrationDate: "2023-12-14",
    status: "Active",
    walletBalance: 1000000,
    analytics: {
      amountSpent: {
        mechanic: 0,
        sparepart: 0,
      },
      engagements: {
        mechanic: 0,
        sparepart: 1,
      },
      reviews: {
        mechanic: 0,
        sparepart: 0,
      },
    },
    recentActivity: [
      { date: "2023-12-15", action: "Added a new car", amount: null },
      { date: "2023-12-10", action: "Requested mechanic service", amount: null },
      { date: "2023-11-25", action: "Purchased spare parts", amount: 25000 },
      { date: "2023-11-05", action: "Updated profile information", amount: null },
    ],
    cars: [],
  };

  // Fetch transactions (simulated)
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const transactionData = {
          "status": 200,
          "title": "Client Transactions",
          "message": "Successfully fetched clients transaction history",
          "entity": {
            "count": 2,
            "rows": [
              {
                "id": "724f4940-3381-4ce3-83aa-b31724d5bff2",
                "amount": 19000,
                "status": "completed",
                "createdAt": "2023-12-03T12:13:43.123Z",
                "client": {
                  "id": "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
                  "firstname": "James",
                  "lastname": "Brown",
                  "profileImageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
                  "role": "user",
                  "address": "#5 some address",
                  "lga": "Khana",
                  "city": "Bori",
                  "state": "Rivers"
                },
                "vendor": {
                  "id": "fd4f91b6-6c7b-4771-beb0-1c74347f8c07",
                  "firstname": "Rita",
                  "lastname": "Dennis",
                  "profileImageUrl": "https://images.unsplash.com/photo-1521252659862-eec69941b071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
                  "role": "mechanic",
                  "address": "22403 Kings Junction",
                  "lga": "Andoni",
                  "city": "Abonnema",
                  "state": "Rivers"
                }
              },
              {
                "id": "6a891bc5-ac0a-411a-b29a-2c00971a0076",
                "amount": 40000,
                "status": "completed",
                "createdAt": "2023-12-03T11:45:38.987Z",
                "client": {
                  "id": "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
                  "firstname": "James",
                  "lastname": "Brown",
                  "profileImageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
                  "role": "user",
                  "address": "#5 some address",
                  "lga": "Khana",
                  "city": "Bori",
                  "state": "Rivers"
                },
                "vendor": {
                  "id": "f311937e-767c-4f2b-bbad-4e9b9947f68b",
                  "firstname": "Dorcas",
                  "lastname": "Etim",
                  "profileImageUrl": "https://images.unsplash.com/photo-1579538506280-84e461ad0077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
                  "role": "dealer",
                  "address": "16 Waxwing Circle",
                  "lga": "Abua/Odual",
                  "city": "Abonnema",
                  "state": "Rivers"
                }
              }
            ]
          }
        };
        
        setTransactions(transactionData.entity.rows);
        setLoading(false);
      }, 500);
    };

    fetchTransactions();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date to display in a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-400" />;
    }
  };

  // Function to go back (would use router in real implementation)
  const goBack = () => {
    console.log("Navigate back to customer list");
    // In a real implementation: router.push("/customers");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={goBack}
            className="flex items-center text-gray-400 hover:text-purple-400 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back to customers</span>
          </button>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-16 w-16 rounded-full bg-gray-700 overflow-hidden mr-4">
                  <img
                    src={customerData.profileImage}
                    alt={customerData.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {customerData.name}
                  </h1>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-gray-400 mr-3">
                      ID: {customerData.id.substring(0, 8)}...
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-900 text-purple-200">
                      {customerData.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition text-sm">
                  Edit Customer
                </button>
                <button className="px-4 py-2 border border-orange-600 text-orange-400 rounded-lg hover:bg-orange-900 hover:bg-opacity-30 transition text-sm">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Role Selector (for demo purposes) */}
        <div className="mb-4 flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
          <span className="text-white">Select Role:</span>
          <div className="flex gap-2">
            <button 
              className={`px-3 py-1 rounded ${userRole === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setUserRole('user')}
            >
              User
            </button>
            <button 
              className={`px-3 py-1 rounded ${userRole === 'mechanic' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setUserRole('mechanic')}
            >
              Mechanic
            </button>
            <button 
              className={`px-3 py-1 rounded ${userRole === 'dealer' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setUserRole('dealer')}
            >
              Dealer
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 bg-gray-800 rounded-lg shadow-lg">
          <nav className="flex px-6 border-b border-gray-700">
            <button
              className={`py-4 px-4 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            
            {/* Show Mechanic tab only for users with appropriate role */}
            {(userRole === 'user' || userRole === 'mechanic') && (
              <button
                className={`py-4 px-4 border-b-2 font-medium text-sm ${
                  activeTab === "mechanic"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
                }`}
                onClick={() => setActiveTab("mechanic")}
              >
                Mechanic
              </button>
            )}
            
            {/* Show Dealer tab only for users with appropriate role */}
            {(userRole === 'user' || userRole === 'dealer') && (
              <button
                className={`py-4 px-4 border-b-2 font-medium text-sm ${
                  activeTab === "dealer"
                    ? "border-purple-500 text-purple-400"
                    : "border-transparent text-gray-400 hover:text-gray-300"
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
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-400 hover:text-gray-300"
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
            <div className="bg-gray-800 rounded-lg shadow-lg divide-y divide-gray-700 overflow-hidden">
              {/* Wallet Information */}
              <div className="p-6 bg-gradient-to-r from-purple-800 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium">Wallet Balance</h2>
                  <Wallet className="h-6 w-6 text-purple-200" />
                </div>
                <div className="text-3xl font-bold">
                  {formatCurrency(customerData.walletBalance)}
                </div>
                <div className="text-purple-200 text-sm mt-2">
                  Status: {customerData.status}
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Contact Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-300">
                        Email
                      </div>
                      <a
                        href={`mailto:${customerData.email}`}
                        className="text-sm text-purple-400 hover:underline"
                      >
                        {customerData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-300">
                        Phone
                      </div>
                      <a
                        href={`tel:${customerData.phone}`}
                        className="text-sm text-gray-400"
                      >
                        {customerData.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-300">
                        Address
                      </div>
                      <div className="text-sm text-gray-400">
                        {customerData.address}
                        <br />
                        {customerData.city}, {customerData.state}
                        {customerData.lga && `, ${customerData.lga}`}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-4">
                  Account Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-300">
                        Registered
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatDate(customerData.registrationDate)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <User className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-300">
                        Status
                      </div>
                      <div className="text-sm text-green-400">
                        {customerData.status}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Activity className="w-5 h-5 text-purple-400 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-300">
                        Last Activity
                      </div>
                      <div className="text-sm text-gray-400">
                        {formatDate(customerData.recentActivity[0].date)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tab Content */}
          <div className="md:col-span-2">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Customer Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">
                        Total Spent
                      </div>
                      <ShoppingBag className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      {formatCurrency(
                        customerData.analytics.amountSpent.mechanic +
                          customerData.analytics.amountSpent.sparepart
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">
                        Total Orders
                      </div>
                      <FileText className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      {customerData.analytics.engagements.mechanic +
                        customerData.analytics.engagements.sparepart}
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-gray-400">
                        Reviews
                      </div>
                      <Star className="h-5 w-5 text-orange-400" />
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      {customerData.analytics.reviews.mechanic +
                        customerData.analytics.reviews.sparepart}
                    </div>
                  </div>
                </div>

                {/* Analytics Cards */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">
                      Service Analytics
                    </h3>
                    <button className="p-1.5 bg-purple-700 text-white rounded-full">
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mechanic Analytics */}
                    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                      <h4 className="text-base font-medium text-white mb-3 flex items-center">
                        <Settings className="w-4 h-4 mr-2 text-purple-400" />
                        Mechanic Services
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">
                            Engagements
                          </span>
                          <span className="font-medium text-white">
                            {customerData.analytics.engagements.mechanic}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Reviews</span>
                          <span className="font-medium text-white">
                            {customerData.analytics.reviews.mechanic}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">
                            Amount Spent
                          </span>
                          <span className="font-medium text-white">
                            {formatCurrency(
                              customerData.analytics.amountSpent.mechanic
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Spare Parts Analytics */}
                    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800">
                      <h4 className="text-base font-medium text-white mb-3 flex items-center">
                        <Square className="w-4 h-4 mr-2 text-orange-400" />
                        Spare Parts
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">
                            Engagements
                          </span>
                          <span className="font-medium text-white">
                            {customerData.analytics.engagements.sparepart}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Reviews</span>
                          <span className="font-medium text-white">
                            {customerData.analytics.reviews.sparepart}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">
                            Amount Spent
                          </span>
                          <span className="font-medium text-white">
                            {formatCurrency(
                              customerData.analytics.amountSpent.sparepart
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-medium text-white">
                      Recent Activity
                    </h3>
                    <button className="p-1.5 bg-purple-700 text-white rounded-full">
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="divide-y divide-gray-700">
                    {customerData.recentActivity.map((activity, index) => (
                      <div key={index} className="px-6 py-4">
                        <div className="flex justify-between">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {activity.action}
                            </div>
                            <div className="text-sm text-gray-400">
                              {formatDate(activity.date)}
                            </div>
                          </div>
                          {activity.amount !== null && (
                            <div className="text-sm font-medium text-orange-400">
                              {formatCurrency(activity.amount)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 bg-gray-900 border-t border-gray-700">
                    <button className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center mx-auto">
                      View All Activity{" "}
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Mechanic Tab */}
            {activeTab === "mechanic" && (
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-white flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-purple-400" />
                    Mechanic Transactions
                  </h3>
                  <select className="bg-gray-700 border-gray-600 text-gray-200 rounded-md text-sm py-1 px-3">
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
                  </div>
                ) : (
                  <>
                    <div className="divide-y divide-gray-700">
                      {transactions.filter(t => t.vendor.role === 'mechanic').map((transaction) => (
                        <div key={transaction.id} className="px-6 py-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden mr-3">
                                <img
                                  src={transaction.vendor.profileImageUrl}
                                  alt={`${transaction.vendor.firstname} ${transaction.vendor.lastname}`}
                                  className="h-10 w-10 object-cover"
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {transaction.vendor.firstname} {transaction.vendor.lastname}
                                </div>
                                <div className="flex items-center mt-1">
                                  <div className="text-xs text-gray-400">
                                    {formatDate(transaction.createdAt)}
                                  </div>
                                  <div className="mx-2 h-1 w-1 rounded-full bg-gray-600"></div>
                                  <div className="flex items-center text-xs">
                                    {getStatusIcon(transaction.status)}
                                    <span className="ml-1 text-gray-300 capitalize">{transaction.status}</span>
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {transaction.vendor.address}, {transaction.vendor.city}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-semibold text-orange-400">
                              {formatCurrency(transaction.amount)}
                            </div>
                          </div>
                        </div>
                      ))}

                      {transactions.filter(t => t.vendor.role === 'mechanic').length === 0 && (
                        <div className="py-12 text-center">
                          <Settings className="h-12 w-12 mx-auto text-gray-600 mb-3" />
                          <h3 className="text-lg text-white mb-2">No mechanic transactions