import React from "react";

interface DashboardProps {
  children: React.ReactElement;
}

export default function DashboardLayout({ children }: DashboardProps) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-black p-4">
        <h2 className="text-white font-bold mb-4">Dashboard</h2>
        <nav className="space-y-1">
          <a
            href="/"
            className="block text-white px-3 py-2 rounded hover:bg-gray-800 text-sm"
          >
            Home
          </a>
          <a
            href="dashboard/settings"
            className="block text-white px-3 py-2 rounded hover:bg-gray-800 text-sm"
          >
            Settings
          </a>
        </nav>
      </div>

      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
