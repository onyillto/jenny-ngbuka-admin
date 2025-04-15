"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wrench,
  ArrowLeftRight,
  ShoppingBag,
  UserX,
  Trash2,
  HeadphonesIcon,
  FileText,
  Wallet,
  CreditCard,
  UserCircle,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="w-6 h-6" />,
    },
    {
      title: "Clients",
      path: "/client",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Vendors",
      path: "/vendor",
      icon: <Wrench className="w-6 h-6" />,
    },
    {
      title: "Transactions",
      path: "/transactions",
      icon: <ArrowLeftRight className="w-6 h-6" />,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: <ShoppingBag className="w-6 h-6" />,
    },
    {
      title: "Restricted Users",
      path: "/restricted-users",
      icon: <UserX className="w-6 h-6" />,
    },
    {
      title: "Deleted Accounts",
      path: "/deleted-accounts",
      icon: <Trash2 className="w-6 h-6" />,
    },
    {
      title: "User Support Hub",
      path: "/support",
      icon: <HeadphonesIcon className="w-6 h-6" />,
    },
    {
      title: "Complaint Resolution",
      path: "/complaints",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Wallet Records",
      path: "/wallet-records",
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      title: "Withdrawals",
      path: "/withdrawals",
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <UserCircle className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <img src="/images/logo.svg" alt="Logo" className="h-8" />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 ${
                  pathname === item.path
                    ? "text-orange-500 border-l-4 border-orange-500 bg-orange-50"
                    : ""
                }`}
              >
                <span className="mr-3 text-current">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
