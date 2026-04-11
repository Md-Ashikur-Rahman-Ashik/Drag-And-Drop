import PageManager from "../components/PageManager";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
      <p className="text-gray-600 mt-2">Here are your sites.</p>
      <PageManager />
    </div>
  );
}
