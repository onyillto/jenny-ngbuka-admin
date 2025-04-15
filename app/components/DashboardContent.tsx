"use client";

import React from "react";
import { Users, DollarSign, Percent, FileText } from "lucide-react";
import StatsCard from "./StatCard";
import InvoiceStats from "./InvoiceStat";
import SalesChart from "./SalesChart";
import SalesChartArea from "./SalesChartArea";
import InvoiceTable from "./InvoiceTable";

// Sample data for the Nigerian States Sales Chart
const salesData = [
  { state: "Lagos", value: 9800 },
  { state: "Abuja FCT", value: 8400 },
  { state: "Rivers", value: 7200 },
  { state: "Kano", value: 6500 },
  { state: "Oyo", value: 5800 },
  { state: "Kaduna", value: 5200 },
  { state: "Enugu", value: 4900 },
  { state: "Delta", value: 4700 },
  { state: "Anambra", value: 4300 },
  { state: "Edo", value: 4100 },
  { state: "Imo", value: 3800 },
  { state: "Akwa Ibom", value: 3500 },
  { state: "Ogun", value: 3200 },
  { state: "Abia", value: 2900 },
  { state: "Bayelsa", value: 2700 },
  { state: "Plateau", value: 2500 },
  { state: "Cross River", value: 2300 },
  { state: "Benue", value: 2100 },
  { state: "Osun", value: 1900 },
  { state: "Nasarawa", value: 1700 },
  { state: "Kogi", value: 1500 },
  { state: "Sokoto", value: 1400 },
  { state: "Kwara", value: 1300 },
  { state: "Niger", value: 1200 },
  { state: "Ondo", value: 1100 },
  { state: "Ekiti", value: 1000 },
  { state: "Ebonyi", value: 950 },
  { state: "Taraba", value: 850 },
  { state: "Zamfara", value: 750 },
  { state: "Bauchi", value: 700 },
  { state: "Adamawa", value: 650 },
  { state: "Gombe", value: 600 },
  { state: "Jigawa", value: 550 },
  { state: "Kebbi", value: 500 },
  { state: "Katsina", value: 450 },
  { state: "Borno", value: 400 },
  { state: "Yobe", value: 350 },
];

// Sample data for the Invoice Table (Nigerian businesses)
const invoices = [
  {
    id: "NG2549",
    customerName: "Chioma Enterprises",
    customerAvatar: "/avatars/chioma.png",
    itemName: "10 x Premium Textiles",
    itemImage: "/products/textiles-premium.png",
    orderDate: "15/03/2025 09:45",
    state: "Lagos",
    status: "Paid" as "Paid",
    price: 12500,
  },
  {
    id: "NG3671",
    customerName: "Adamu Distributors",
    customerAvatar: "/avatars/adamu.png",
    itemName: "5 x Solar Panels",
    itemImage: "/products/solar-panels.png",
    orderDate: "22/03/2025 14:32",
    state: "Kano",
    status: "Pending" as "Pending",
    price: 28750,
  },
  {
    id: "NG2893",
    customerName: "Okonkwo Holdings",
    customerAvatar: "/avatars/okonkwo.png",
    itemName: "20 x Smartphone Cases",
    itemImage: "/products/phone-cases.png",
    orderDate: "18/03/2025 11:20",
    state: "Anambra",
    status: "Paid" as "Paid",
    price: 4500,
  },
  {
    id: "NG4102",
    customerName: "Tunde Technology",
    customerAvatar: "/avatars/tunde.png",
    itemName: "3 x Laptop Computers",
    itemImage: "/products/laptops.png",
    orderDate: "25/03/2025 16:15",
    state: "Abuja FCT",
    status: "Overdue" as "Overdue",
    price: 85000,
  },
];

const DashboardContent: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-[#fff8f0]">
      <h1 className="text-2xl font-bold text-stone-900">
        Nigerian Sales Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-black">
        <StatsCard
          title="Total Clients"
          value="1,842"
          change={32.5}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Registered Vendor"
          value="₦42.7M"
          change={27.8}
          icon={<DollarSign className="h-6 w-6" />}
        />
        <StatsCard
          title="All Transactions"
          value="12.8%"
          change={3.5}
          icon={<Percent className="h-6 w-6" />}
        />
        <StatsCard
          title="Active Orders"
          value="156"
          change={18.2}
          icon={<FileText className="h-6 w-6" />}
        />
      </div>
      {/* Invoice Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-stone-900">
            Recent Nigerian Orders
          </h2>
          <InvoiceTable invoices={invoices} />
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-stone-900">
            Nigerian Sales Stats
          </h2>
          <InvoiceStats
            totalInvoices={156}
            paid={102}
            overdue={18}
            unpaid={36}
          />
        </div>
      </div>
      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-stone-900">
          Nigeria State Sales Overview
        </h2>
        <SalesChartArea data={salesData} />
      </div>
    </div>
  );
};

export default DashboardContent;
