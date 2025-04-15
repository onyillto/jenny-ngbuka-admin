"use client";

import React from "react";
import { Search, Filter, Calendar } from "lucide-react";

export default function TransactionFilters({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  dateRange,
  setDateRange,
}) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Search transactions..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {dateRange && (
        <div className="relative flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Calendar className="h-5 w-5 text-gray-400 mr-2" />
          <div className="text-sm">
            <span>
              {dateRange.start
                ? new Date(dateRange.start).toLocaleDateString()
                : "All time"}
            </span>
            {dateRange.end && (
              <>
                <span className="mx-2">-</span>
                <span>{new Date(dateRange.end).toLocaleDateString()}</span>
              </>
            )}
          </div>
          {(dateRange.start || dateRange.end) && (
            <button
              className="ml-2 text-gray-400 hover:text-gray-600"
              onClick={() => setDateRange({ start: null, end: null })}
            >
              &times;
            </button>
          )}
        </div>
      )}

      <button
        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className="h-5 w-5 text-gray-500 mr-1" />
        <span className="text-sm font-medium">Filters</span>
      </button>
    </div>
  );
}
