"use client";

import React from "react";

export default function SimpleDialog({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end space-x-2">{actions}</div>
      </div>
    </div>
  );
}
