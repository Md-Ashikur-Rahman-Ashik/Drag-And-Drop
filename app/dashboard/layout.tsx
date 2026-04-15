export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-900 p-4">
        <h2 className="text-white font-bold mb-4">Dashboard</h2>
        <nav className="space-y-1">
          <a
            href="/dashboard"
            className="block text-gray-400 hover:text-white px-3 py-2 rounded hover:bg-gray-800 text-sm"
          >
            Home
          </a>
          <a
            href="dashboard/settings"
            className="block text-gray-400 hover:text-white px-3 py-2 rounded hover:bg-gray-800 text-sm"
          >
            Settings
          </a>
        </nav>
      </div>

      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
