import React from "react";
import { Star } from "lucide-react";

const TabReviews = () => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Reviews & Ratings
        </h3>
        <select className="bg-white border border-gray-300 text-gray-700 rounded-md text-sm py-1 px-3">
          <option>All Services</option>
          <option>Mechanic</option>
          <option>Dealer</option>
        </select>
      </div>

      <div className="py-12 text-center">
        <Star className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg text-gray-700 mb-2">No reviews yet</h3>
        <p className="text-sm text-gray-500">
          After using our services, the customer will be able to leave reviews
          here.
        </p>
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
          View Service History
        </button>
      </div>
    </div>
  );
};

export default TabReviews;
