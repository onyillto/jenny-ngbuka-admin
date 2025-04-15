"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  XCircle,
  ShoppingBag,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  Phone,
  Mail,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Clock,
  Tag,
  Info,
  CreditCard,
} from "lucide-react";

// Mock order detail data response
const orderDetailResponse = {
  status: 200,
  title: "Ordered Item Details",
  message: "Successfully fetched ordered item details",
  entity: {
    id: "6943fe3d-8634-45df-a682-ec309763bd84",
    orderId: "70a991d7-33ec-4186-ad6d-d1da86726295",
    productId: "f22c5258-a302-4637-8437-fdba5f611728",
    status: "completed",
    quantity: 1,
    price: 16200,
    billCode: "NG020106373958",
    delivery: 0,
    subtotal: 16200,
    deletedAt: null,
    createdAt: "2024-05-25T01:45:31.235Z",
    updatedAt: "2024-05-25T18:07:25.425Z",
    product: {
      id: "f22c5258-a302-4637-8437-fdba5f611728",
      name: "zappa coil",
      description:
        "Zappa x88 coil is the current best for enhanced performance",
      imageUrl:
        "https://images.unsplash.com/photo-1565534355217-85fcfb04ce71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTY0OTU0NDV8&ixlib=rb-4.0.3&q=80&w=400",
      specifications: {
        color: "steel",
        width: "45cm",
        weight: 1,
      },
      price: 15000,
      discount: 1500,
      finalPrice: 16200,
      dealerId: "f311937e-767c-4f2b-bbad-4e9b9947f68b",
      dealer: {
        id: "f311937e-767c-4f2b-bbad-4e9b9947f68b",
        businessName: "Some shop",
        address: "#5 some address",
        city: "Agege",
        town: "Iloro/Onipetesi",
        state: "Lagos",
        longitude: "-122.33221",
        latitude: "789.9987",
        phoneNumber: "+420 810 5716",
        profileImageUrl:
          "https://images.unsplash.com/photo-1579538506280-84e461ad0077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
        firstname: "Dorcas",
        lastname: "Etim",
      },
    },
    order: {
      id: "70a991d7-33ec-4186-ad6d-d1da86726295",
      deliveryMethod: "out of state",
      address: "#5 some address",
      city: "Bomadi",
      town: "Ngwa",
      state: "Delta",
      user: {
        id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
        username: "dee_d",
        deviceToken:
          "dTMeeob4TeeIL_amjsf4SG:APA91bEbyn6OW37cF4wh67cnmSe7YnAXAgEoMMyc62ASgcD-UUya9xL5wKkTmvdjHwPdor26lfW4Z3b9zm__HS3qCJkVCdV3kUSX5Hq0BVDpnXUSUWaCwDqKn5rDthgZap5xXVyel4OT",
        email: "user1@example.com",
        phoneNumber: "2348584764332",
        address: "#5 some address",
        city: "Bori",
        town: "Khana",
        state: "Rivers",
      },
    },
  },
};

// Add a timeline for the order (this would typically come from the API)
const orderTimeline = [
  {
    status: "created",
    timestamp: "2024-05-25T01:45:31.235Z",
    description: "Order placed by customer",
  },
  {
    status: "processing",
    timestamp: "2024-05-25T02:30:15.000Z",
    description: "Order confirmed and processing started",
  },
  {
    status: "shipping",
    timestamp: "2024-05-25T09:15:45.000Z",
    description: "Order shipped via courier service",
  },
  {
    status: "completed",
    timestamp: "2024-05-25T18:07:25.425Z",
    description: "Order delivered and marked as completed",
  },
];

export default function OrderDetailPage({ params }) {
  const router = useRouter();
  const { orderId } = params || {
    orderId: "6943fe3d-8634-45df-a682-ec309763bd84",
  }; // Default for preview
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [expandedSection, setExpandedSection] = useState({
    productDetails: true,
    customerInfo: true,
    dealerInfo: true,
    orderTimeline: true,
    shippingDetails: true,
  });

  // Fetch order data
  useEffect(() => {
    // In a real app, this would be an API call using the orderId
    const fetchOrderData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // For demo purposes, always return the mock data
        // In a real app, you would fetch the data based on the orderId
        setOrder({
          ...orderDetailResponse.entity,
          timeline: orderTimeline, // Add the timeline to the order object
        });
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, [orderId]);

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection({
      ...expandedSection,
      [section]: !expandedSection[section],
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Function to determine status color classes
  const getStatusClasses = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
      case "processing":
      case "created":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "shipping":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Section Header Component
  const SectionHeader = ({ title, expanded, onToggle, icon }) => (
    <div
      className="flex items-center justify-between p-4 bg-gray-50 rounded-t-lg cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-center">
        {icon}
        <h3 className="text-lg font-medium text-gray-800 ml-2">{title}</h3>
      </div>
      {expanded ? (
        <ChevronUp className="h-5 w-5 text-gray-900" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-900" />
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Order Not Found
          </h2>
          <p className="text-red-600 mb-4">
            The order you're looking for could not be found.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <button
        onClick={() => router.push("/orders")}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Orders
      </button>

      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Order Details
            </h1>
            <div className="flex items-center">
              <Package className="h-5 w-5 text-gray-900 mr-2" />
              <span className="text-sm text-gray-900 mr-2">Order Number:</span>
              <span className="font-medium">{order.billCode}</span>
            </div>
          </div>
          <span
            className={`px-4 py-2 rounded-full border text-sm font-medium mt-4 md:mt-0 ${getStatusClasses(
              order.status
            )}`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-6">
          <div className="mb-4 md:mb-0">
            <div className="text-sm text-gray-900">Date Ordered</div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-900 mr-2" />
              <span className="font-medium">{formatDate(order.createdAt)}</span>
            </div>
          </div>
          <div className="mb-4 md:mb-0">
            <div className="text-sm text-gray-900">Last Updated</div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-900 mr-2" />
              <span className="font-medium">{formatDate(order.updatedAt)}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-900">Total Amount</div>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-gray-900 mr-2" />
              <span className="font-medium text-xl">
                {formatCurrency(order.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <SectionHeader
          title="Product Details"
          expanded={expandedSection.productDetails}
          onToggle={() => toggleSection("productDetails")}
          icon={<ShoppingBag className="h-5 w-5 text-purple-600" />}
        />

        {expandedSection.productDetails && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-4 md:mb-0">
                <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                  {order.product.imageUrl ? (
                    <img
                      src={order.product.imageUrl}
                      alt={order.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-16 w-16 text-gray-900" />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-2/3 md:pl-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {order.product.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {order.product.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-900">Original Price</div>
                    <div className="font-medium">
                      {formatCurrency(order.product.price)}
                    </div>
                  </div>

                  {order.product.discount > 0 && (
                    <div>
                      <div className="text-sm text-gray-900">Discount</div>
                      <div className="font-medium text-green-600">
                        -{formatCurrency(order.product.discount)}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="text-sm text-gray-900">Quantity</div>
                    <div className="font-medium">{order.quantity}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-900">Final Price</div>
                    <div className="font-bold">
                      {formatCurrency(order.product.finalPrice)}
                    </div>
                  </div>
                </div>

                {order.product.specifications && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Specifications
                    </h3>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {Object.entries(order.product.specifications).map(
                          ([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <dt className="text-xs text-gray-900 capitalize">
                                {key}
                              </dt>
                              <dd className="text-sm font-medium">
                                {String(value)}
                              </dd>
                            </div>
                          )
                        )}
                      </dl>
                    </div>
                  </div>
                )}

                {order.product.dealer && (
                  <div className="flex items-start mt-2">
                    <Tag className="h-4 w-4 text-gray-900 mr-2 mt-0.5" />
                    <div>
                      <span className="text-sm text-gray-900">Sold by: </span>
                      <button
                        className="text-sm text-blue-600 hover:text-blue-800"
                        onClick={() => toggleSection("dealerInfo")}
                      >
                        {order.product.dealer.businessName ||
                          `${order.product.dealer.firstname} ${order.product.dealer.lastname}`}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Customer Information */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <SectionHeader
          title="Customer Information"
          expanded={expandedSection.customerInfo}
          onToggle={() => toggleSection("customerInfo")}
          icon={<User className="h-5 w-5 text-green-600" />}
        />

        {expandedSection.customerInfo && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 mb-4 md:mb-0">
                <h3 className="text-md font-medium text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-900 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium text-black">
                        {order.order.user.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-900 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-900">{order.order.user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-900 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-900">
                        {order.order.user.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href={`/customers/${order.order.user.id}`}>
                    <span className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      View Customer Profile{" "}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2">
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Billing Address
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-900 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-900">
                        {order.order.user.address}
                      </p>
                      <p className="text-gray-900">
                        {order.order.user.city}, {order.order.user.state}
                      </p>
                      <p className="text-gray-900">{order.order.user.town}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dealer Information */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <SectionHeader
          title="Dealer Information"
          expanded={expandedSection.dealerInfo}
          onToggle={() => toggleSection("dealerInfo")}
          icon={<ShoppingBag className="h-5 w-5 text-purple-600" />}
        />

        {expandedSection.dealerInfo && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  {order.product.dealer.profileImageUrl ? (
                    <img
                      src={order.product.dealer.profileImageUrl}
                      alt={`${order.product.dealer.firstname} ${order.product.dealer.lastname}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-100">
                      <div className="text-3xl font-bold text-purple-700">
                        {order.product.dealer.firstname.charAt(0)}
                        {order.product.dealer.lastname.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-3/4 md:pl-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      {order.product.dealer.firstname}{" "}
                      {order.product.dealer.lastname}
                    </h2>
                    {order.product.dealer.businessName && (
                      <p className="text-gray-900 font-medium mb-3">
                        {order.product.dealer.businessName}
                      </p>
                    )}
                  </div>

                  <div className="mt-2 md:mt-0">
                    <Link href={`/vendors/${order.product.dealer.id}`}>
                      <span className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                        View Dealer Profile{" "}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      {order.product.dealer.phoneNumber && (
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 text-gray-900 mr-2 mt-0.5" />
                          <div>
                            <p>{order.product.dealer.phoneNumber}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Location
                    </h3>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-gray-900 mr-2 mt-0.5" />
                      <div>
                        <p>{order.product.dealer.address}</p>
                        <p>
                          {order.product.dealer.city},{" "}
                          {order.product.dealer.state}
                        </p>
                        <p>{order.product.dealer.town}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shipping Details */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <SectionHeader
          title="Shipping Details"
          expanded={expandedSection.shippingDetails}
          onToggle={() => toggleSection("shippingDetails")}
          icon={<Truck className="h-5 w-5 text-blue-600" />}
        />

        {expandedSection.shippingDetails && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Delivery Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 text-gray-900 mr-2 mt-0.5" />
                    <div>
                      <div className="font-medium">Delivery Method</div>
                      <p className="text-gray-600">
                        {order.order.deliveryMethod}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Shipping Address
                </h3>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-900 mr-2 mt-0.5" />
                  <div>
                    <p>{order.order.address}</p>
                    <p>
                      {order.order.city}, {order.order.state}
                    </p>
                    <p>{order.order.town}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Timeline */}
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        <SectionHeader
          title="Order Timeline"
          expanded={expandedSection.orderTimeline}
          onToggle={() => toggleSection("orderTimeline")}
          icon={<Clock className="h-5 w-5 text-blue-600" />}
        />

        {expandedSection.orderTimeline && (
          <div className="p-6">
            <div className="relative">
              {order.timeline &&
                order.timeline.map((event, index) => (
                  <div key={index} className="flex mb-8 last:mb-0">
                    <div className="flex flex-col items-center mr-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          event.status.toLowerCase().includes("cancel") ||
                          event.status.toLowerCase().includes("fail")
                            ? "bg-red-100 text-red-600"
                            : event.status.toLowerCase().includes("complet") ||
                              event.status.toLowerCase().includes("success")
                            ? "bg-green-100 text-green-600"
                            : event.status.toLowerCase().includes("ship")
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {event.status.toLowerCase().includes("cancel") ||
                        event.status.toLowerCase().includes("fail") ? (
                          <XCircle className="h-5 w-5" />
                        ) : event.status.toLowerCase().includes("complet") ||
                          event.status.toLowerCase().includes("success") ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : event.status.toLowerCase().includes("ship") ? (
                          <Truck className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div className="h-full w-0.5 bg-gray-200 flex-grow mt-1"></div>
                      )}
                    </div>
                    <div className="flex-grow pt-1">
                      <h4 className="font-medium text-gray-900 capitalize">
                        {event.status.replace(/_/g, " ")}
                      </h4>
                      <p className="text-sm text-gray-900">
                        {event.description}
                      </p>
                      <p className="text-xs text-gray-900 mt-1">
                        {formatDate(event.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-4 mt-6">
        <button
          onClick={() => router.push("/orders")}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 md:order-1"
        >
          Back to Orders
        </button>

        {/* Conditional buttons based on order status */}
        {order.status === "pending" && (
          <>
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center md:order-2">
              <XCircle className="h-5 w-5 mr-1" />
              Cancel Order
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center md:order-3">
              <CheckCircle className="h-5 w-5 mr-1" />
              Process Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}
