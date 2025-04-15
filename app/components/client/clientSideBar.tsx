import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Activity,
  Wallet,
} from "lucide-react";

const CustomerSidebar = ({ customer }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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

  return (
    <div className="bg-white rounded-lg shadow divide-y divide-gray-200 overflow-hidden">
      {/* Wallet Information */}
      <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium">Wallet Balance</h2>
          <Wallet className="h-6 w-6 text-blue-100" />
        </div>
        <div className="text-3xl font-bold">
          {formatCurrency(customer.walletBalance)}
        </div>
        <div className="text-blue-100 text-sm mt-2">
          Status: {customer.status}
        </div>
      </div>

      {/* Contact Information */}
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Contact Information
        </h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <Mail className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-700">Email</div>
              <a
                href={`mailto:${customer.email}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {customer.email}
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-700">Phone</div>
              <a
                href={`tel:${customer.phone}`}
                className="text-sm text-gray-600"
              >
                {customer.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-700">Address</div>
              <div className="text-sm text-gray-600">
                {customer.address}
                <br />
                {customer.city}, {customer.state}
                {customer.lga && `, ${customer.lga}`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details */}
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Account Details
        </h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <Calendar className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-700">
                Registered
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(customer.registrationDate)}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <User className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-700">Status</div>
              <div className="text-sm text-green-600">{customer.status}</div>
            </div>
          </div>

          <div className="flex items-start">
            <Activity className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="text-sm font-medium text-gray-700">
                Last Activity
              </div>
              <div className="text-sm text-gray-600">
                {formatDate(customer.recentActivity[0].date)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSidebar;
