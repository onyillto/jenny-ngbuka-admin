"use client";

import DesktopSidebar from "./components/DesktopSidebar";
import Navbar from "./components/Navbar";
import DashboardContent from "./components/DashboardContent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Navbar at the top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Desktop Sidebar - On the left side */}
        <div className="w-64 hidden lg:block shrink-0">
          <DesktopSidebar />
        </div>

        {/* Main content area - Takes up full remaining width */}
        <div className="flex-1 w-full overflow-auto bg-white">
          <DashboardContent />
        </div>
      </div>
    </div>
  );
}
