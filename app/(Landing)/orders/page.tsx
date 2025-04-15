"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Package,
  CheckCircle,
  XCircle,
  ShoppingBag,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  Truck
} from "lucide-react";

// Mock API response data with just one order for demo
const orderApiResponse = {
  "status": 200,
  "title": "Ordered Items",
  "message": "Successfully fetched ordered items.",
  "entity": {
    "count": 1,
    "rows": [
      {
        "id": "6943fe3d-8634-45df-a682-ec309763bd84",
        "orderId": "70a991d7-33ec-4186-ad6d-d1da86726295",
        "productId": "f22c5258-a302-4637-8437-fdba5f611728",
        "status": "completed",
        "quantity": 1,
        "price": 16200,
        "billCode": "NG020106373958",
        "delivery": 0,
        "subtotal": 16200,
        "deletedAt": null,
        "createdAt": "2024-05-25T01:45:31.235Z",
        "updatedAt": "2024-05-25T18:07:25.425Z",
        "product": {
          "id": "f22c5258-a302-4637-8437-fdba5f611728",
          "name": "zappa coil",
          "price": 15000,
          "discount": 1500,
          "markup": 2700,
          "finalPrice": 16200,
          "quantityInStock": 9,
          "isPublished": true,
          "imageUrl": "https://images.unsplash.com/photo-1565534355217-85fcfb04ce71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTY0OTU0NDV8&ixlib=rb-4.0.3&q=80&w=400",
          "description": "Zappa x88 coil is the current best for enhanced performance",
          "dealerId": "f311937e-767c-4f2b-bbad-4e9b9947f68b",
          "slug": "zappa-coil",
          "specifications": {
            "color": "steel",
            "width": "45cm",
            "weight": 1
          },
          "discountPercentage": 10,
          "deletedAt": null,
          "createdAt": "2024-05-25T01:43:56.649Z",
          "updatedAt": "2024-05-25T01:45:31.247Z"
        },
        "order": {
          "id": "70a991d7-33ec-4186-ad6d-d1da86726295",
          "userId": "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
          "shippingFee": 4631,
          "deliveryMethod": "out of state",
          "orderedItemCount": 1,
          "address": "#5 some address",
          "city": "Bomadi",
          "town": "Ngwa",
          "state": "Delta",
          "subtotal": 16200,
          "total": 20831,
          "deletedAt": null,
          "createdAt": "2024-05-25T01:45:31.230Z",
          "updatedAt": "2024-05-25T01:45:31.230Z",
          "user": {
            "id": "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
            "firstname": "James",
            "lastname": "Brown",
            "email": "user1@example.com",
            "phoneNumber": "2348584764332",
            "username": "dee_d",
            "isEmailVerified": true,
            "verifiedEmailAt": "2024-05-25T01:43:13.126Z",
            "profileImageUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
            "role": "user",
            "status": "active",
            "isServiceProvider": false,
            "businessName": null,
            "cacNumber": null,
            "address": "#5 some address",
            "town": "Khana",
            "city": "Bori",
            "state": "Rivers",
            "longitude": "38.290",
            "latitude": "-39.2321",
            "deviceToken": "dTMeeob4TeeIL_amjsf4SG:APA91bEbyn6OW37cF4wh67cnmSe7YnAXAgEoMMyc62ASgcD-UUya9xL5wKkTmvdjHwPdor26lfW4Z3b9zm__HS3qCJkVCdV3kUSX5Hq0BVDpnXUSUWaCwDqKn5rDthgZap5xXVyel4OT",
            "mechanicType": null,
            "cars": [],
            "about": null,
            "languages": null,
            "isActive": true,
            "deletedAt": null,
            "createdAt": "2024-05-25T01:43:13.126Z",
            "updatedAt": "2024-05-25T01:43:13.126Z"
          }
        }
      }
    ]
  }
};

export default function OrderListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Use the orders array from the API response
  const orders = orderApiResponse.entity.rows;

  // Calculate summary statistics
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === "completed").length;
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const cancelledOrders = orders.filter(order => order.status === "cancelled").length;
  
  // Calculate total revenue from completed orders
  const totalRevenue = orders
    .filter(order => order.status === "completed")
    .reduce((sum, order) => sum + order.price * order.quantity, 0);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { 
      style: 'currency', 
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

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

  // Function to navigate to order detail page
  const navigateToOrderDetail = (orderId) => {
    router.push(`/orders/${orderId}`);
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

  // Helper functions to extract unique values for filters
  const getUniqueValues = (arr, key) => {
    const nestedKey = key.includes('.') ? key.split('.') : null;
    
    return [...new Set(arr.map(item => {
      if (nestedKey) {
        // Handle nested properties like 'order.state'
        return nestedKey.reduce((obj, k) => obj && obj[k], item);
      }
      return item[key];
    }))].filter(Boolean); // Filter out undefined/null values
  };

  // Extract unique states from orders
  const getUniqueStates = () => {
    return getUniqueValues(orders, 'order.state');
  };

  // Handle select/deselect all orders
  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedOrders(processedOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle select/deselect individual order
  const handleSelectOrder = (e, orderId) => {
    e.stopPropagation(); // Prevent row click from triggering
    
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
      // Check if all visible orders are now selected
      if (selectedOrders.length + 1 === processedOrders.length) {
        // All selected
      }
    }
  };

  // Filter and sort orders
  const processedOrders = orders
    .filter((order) => {
      // Search filter
      const matchesSearch =
        order.billCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${order.order.user.firstname} ${order.order.user.lastname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === "" || order.status === statusFilter;

      // State filter
      const matchesState = stateFilter === "" || order.order.state === stateFilter;

      return matchesSearch && matchesStatus && matchesState;
    })
    .sort((a, b) => {
      // Handle sorting based on field
      if (sortField === "price") {
        return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
      } else if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      } else if (sortField === "productName") {
        const nameA = a.product.name.toLowerCase();
        const nameB = b.product.name.toLowerCase();
        return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else if (sortField === "customerName") {
        const nameA = `${a.order.user.firstname} ${a.order.user.lastname}`.toLowerCase();
        const nameB = `${b.order.user.firstname} ${b.order.user.lastname}`.toLowerCase();
        return sortDirection === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else {
        // Default string comparison for other fields
        const valueA = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
        const valueB = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];
        
        if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      }
    });

  // Extract unique statuses and states for filters
  const statuses = [...new Set(orders.map(order => order.status))];
  const states = getUniqueStates();

  // Function to determine status color classes
  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "border border-green-500 text-green-600 bg-white";
      case "pending":
        return "border border-yellow-500 text-yellow-600 bg-white";
      case "cancelled":
        return "border border-red-500 text-red-600 bg-white";
      default:
        return "border border-gray-500 text-gray-600 bg-white";
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
                <Package className="h-10 w-10 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-10 w-10 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{completedOrders}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                <XCircle className="h-10 w-10 text-yellow-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <DollarSign className="h-10 w-10 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>

              <div className="flex space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search any field..."
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

            {/* Bulk Actions Bar */}
            {selectedOrders.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium text-gray-700">
                    {selectedOrders.length} order{selectedOrders.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      // Handle bulk action
                      console.log("Process selected orders:", selectedOrders);
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm flex items-center hover:bg-green-600"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Process
                  </button>
                  <button
                    onClick={() => {
                      // Handle cancel action
                      console.log("Cancel selected orders:", selectedOrders);
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm flex items-center hover:bg-red-600"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setSelectedOrders([]);
                    }}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

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
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state} value={state as string}>
                        {String(state)}
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
                        className="px-4 py-4 text-center text-sm font-medium text-gray-500 w-12"
                      >
                        <div className="flex items-center justify-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            checked={selectedOrders.length === processedOrders.length && processedOrders.length > 0}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("billCode")}
                      >
                        Order # {renderSortIndicator("billCode")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("productName")}
                      >
                        Product {renderSortIndicator("productName")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("customerName")}
                      >
                        Customer {renderSortIndicator("customerName")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("price")}
                      >
                        Amount {renderSortIndicator("price")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("createdAt")}
                      >
                        Date {renderSortIndicator("createdAt")}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSort("status")}
                      >
                        Status {renderSortIndicator("status")}
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
                    {processedOrders.length > 0 ? (
                      processedOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => navigateToOrderDetail(order.id)}
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                checked={selectedOrders.includes(order.id)}
                                onChange={(e) => handleSelectOrder(e, order.id)}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Package className="h-5 w-5 text-gray-400 mr-2" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {order.billCode}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Qty: {order.quantity}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 relative">
                                <div className="h-10 w-10 rounded bg-gray-200 overflow-hidden">
                                  {order.product.imageUrl ? (
                                    <img
                                      src={order.product.imageUrl}
                                      alt={order.product.name}
                                      className="h-10 w-10 object-cover"
                                    />
                                  ) : (
                                    <ShoppingBag className="h-10 w-10 p-2 text-gray-500" />
                                  )}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {order.product.name}
                                </div>
                                <div className="text-xs text-gray-500 truncate max-w-xs">
                                  {order.product.description.length > 60 ? 
                                    `${order.product.description.substring(0, 60)}...` : 
                                    order.product.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 relative">
                                {order.order.user.profileImageUrl ? (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                    <img
                                      src={order.order.user.profileImageUrl}
                                      alt={`${order.order.user.firstname} ${order.order.user.lastname}`}
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-indigo-700 flex items-center justify-center text-white font-semibold">
                                    {order.order.user.firstname.charAt(0)}{order.order.user.lastname.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {order.order.user.firstname} {order.order.user.lastname}
                                </div>
                                <div className="text-xs text-gray-500 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {order.order.city}, {order.order.state}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(order.price)}
                            </div>
                            {order.delivery > 0 && (
                              <div className="text-xs text-gray-500">
                                +{formatCurrency(order.delivery)} shipping
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex flex-col">
                              <span>{formatDate(order.createdAt)}</span>
                              <div className="text-xs text-gray-400 flex items-center">
                                <Truck className="h-3 w-3 mr-1" />
                                {order.order.deliveryMethod}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <span
                              className={`px-3 py-1 text-sm rounded-full inline-flex ${getStatusClasses(
                                order.status
                              )}`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
                              <button
                                className="p-1 text-blue-600 hover:text-blue-900"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigateToOrderDetail(order.id);
                                }}title="View Details"
                              >
                                <Eye className="h-5 w-5" />
                              </button>
                              {order.status === "pending" && (
                                <>
                                  <button
                                    className="p-1 text-green-600 hover:text-green-900"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Process order logic
                                      console.log("Process order:", order.id);
                                    }}
                                    title="Process Order"
                                  >
                                    <CheckCircle className="h-5 w-5" />
                                  </button>
                                  <button
                                    className="p-1 text-red-600 hover:text-red-900"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Cancel order logic
                                      console.log("Cancel order:", order.id);
                                    }}
                                    title="Cancel Order"
                                  >
                                    <XCircle className="h-5 w-5" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                          No orders found matching your filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Pagination Controls */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing <span className="font-medium">{processedOrders.length}</span> of <span className="font-medium">{totalOrders}</span> orders
              </div>
              
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  disabled={true}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  1
                </button>
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  disabled={true}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}