export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-gray-500 text-lg mb-8">This page doesn't exist.</p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
