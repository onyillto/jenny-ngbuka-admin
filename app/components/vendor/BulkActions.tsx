"use client";

import React from "react";
import { Trash2, Ban, CheckCircle } from "lucide-react";

export default function BulkActions({ selectedCount, onAction, onCancel }) {
  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
      <div className="text-sm font-medium text-blue-700">
        {selectedCount} vendor{selectedCount !== 1 ? "s" : ""} selected
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onAction("verify")}
          className="flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Verify
        </button>
        <button
          onClick={() => onAction("suspend")}
          className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-md hover:bg-yellow-200"
        >
          <Ban className="h-4 w-4 mr-1" />
          Suspend
        </button>
        <button
          onClick={() => onAction("delete")}
          className="flex items-center px-3 py-1 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
