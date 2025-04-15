// components/Navbar.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MessageSquare, Bell, ChevronDown } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Welcome message */}
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Welcome Back, Ali Husni <span className="ml-1">👋</span>
          </h1>
        </div>

        {/* Right side elements */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Anything"
              className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-gray-300"></div>

          {/* Message Icon */}
          <button className="p-1 text-gray-600 hover:text-gray-900">
            <MessageSquare className="h-6 w-6" />
          </button>

          {/* Notification Bell */}
          <button className="p-1 text-gray-600 hover:text-gray-900">
            <Bell className="h-6 w-6" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden relative">
              <Image
                src="/profile-avatar.jpg"
                alt="Ali Husni"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load - safer approach
                  if (e.target instanceof HTMLImageElement) {
                    e.target.style.display = "none";
                    const parent = e.target.parentElement;
                    if (parent) {
                      const div = document.createElement("div");
                      div.className =
                        "bg-gray-300 h-full w-full flex items-center justify-center text-gray-600 font-bold";
                      div.textContent = "AH";
                      parent.appendChild(div);
                    }
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-800">Ali Husni</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
