export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="bg-white max-w-2xl rounded p-4 mx-auto">
        <h1 className="text-4xl text-center font-bold text-gray-900 mb-4">
          My Website Builder
        </h1>

        <p className="text-lg text-center text-gray-600 mb-8">
          Build beautiful websites without code.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Get Ready
        </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg">
          Cancel
        </button>
        </div>
      </div>
    </div>
  );
}
