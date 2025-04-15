import React from "react";

const CustomerHeader = ({ customer }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            <img
              src={customer.profileImage}
              alt={customer.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {customer.name}
            </h1>
            <div className="flex items-center mt-1">
              <span className="text-sm text-gray-500 mr-3">
                ID: {customer.id.substring(0, 8)}...
              </span>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {customer.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
            Edit Customer
          </button>
          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition text-sm">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;
