import React from "react";
import {
  ShoppingBag,
  FileText,
  Star,
  Plus,
  Settings,
  Square,
  ChevronDown,
} from "lucide-react";

const TabOverview = ({ customer }) => {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Customer Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Total Spent</div>
            <ShoppingBag className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {formatCurrency(
              customer.analytics.amountSpent.mechanic +
                customer.analytics.amountSpent.sparepart
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">
              Total Orders
            </div>
            <FileText className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {customer.analytics.engagements.mechanic +
              customer.analytics.engagements.sparepart}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Reviews</div>
            <Star className="h-5 w-5 text-blue-500" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {customer.analytics.reviews.mechanic +
              customer.analytics.reviews.sparepart}
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Service Analytics
          </h3>
          <button className="p-1.5 bg-blue-600 text-white rounded-full">
            <Plus size={14} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mechanic Analytics */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
              <Settings className="w-4 h-4 mr-2 text-blue-500" />
              Mechanic Services
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Engagements</span>
                <span className="font-medium text-gray-900">
                  {customer.analytics.engagements.mechanic}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Reviews</span>
                <span className="font-medium text-gray-900">
                  {customer.analytics.reviews.mechanic}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount Spent</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(customer.analytics.amountSpent.mechanic)}
                </span>
              </div>
            </div>
          </div>

          {/* Spare Parts Analytics */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
              <Square className="w-4 h-4 mr-2 text-blue-500" />
              Spare Parts
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Engagements</span>
                <span className="font-medium text-gray-900">
                  {customer.analytics.engagements.sparepart}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Reviews</span>
                <span className="font-medium text-gray-900">
                  {customer.analytics.reviews.sparepart}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount Spent</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(customer.analytics.amountSpent.sparepart)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <button className="p-1.5 bg-blue-600 text-white rounded-full">
            <Plus size={14} />
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {customer.recentActivity.map((activity, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(activity.date)}
                  </div>
                </div>
                {activity.amount !== null && (
                  <div className="text-sm font-medium text-blue-600">
                    {formatCurrency(activity.amount)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center mx-auto">
            View All Activity
            <ChevronDown size={14} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabOverview;
