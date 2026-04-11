export default function PropertiesPanel() {
  return (
    <div className="w-64 bg-gray-900 border-l border-gray-800 h-full p-4 overflow-y-auto">
      <h3 className="text-white font-semibold text-sm mb-4">Properties</h3>

      <div className="mb-6">
        <p className="text-gray-500 text-xs font-medium uppercase tracking wider mb-3">
          Typography
        </p>

        <div className="space-y-2">
          <div>
            <label className="text-gray-400 text-xs block mb-1">
              Font Size
            </label>
            <input
              type="number"
              defaultValue={16}
              className="w-full bg-gray-800 text-white text-sm px-3 py-1.5 rounded outline-none border border-transparent focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs block mb-1">
              Font Weight
            </label>
            <select className="w-full bg-gray-800 text-white text-sm px-3 py-1.5 rounded outline-none border border-transparent focus:border-blue-500">
              <option>Normal</option>
              <option>Medium</option>
              <option>Bold</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-500 text-xs font-medium uppercase tracking wider mb-3">
          Spacing
        </p>

        <div className="grid grid-cols-2 gap-2">
          {["Top, Right, Bottom, Left"].map((side) => (
            <div key={side}>
              <label className="text-gray-400 text-xs block mb-1">{side}</label>
              <input
                type="number"
                defaultValue={0}
                className="w-full bg-gray-800 text-white text-sm px-3 py-1.5 rounded outline-none border border-transparent focus:border-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking wider mb-3">
          Color
        </p>

        <div className="space-y-2">
          <div>
            <label className="text-gray-400 text-xs block mb-1">
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                defaultValue="#000000"
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                defaultValue="#000000"
                className="flex-1 bg-gray-800 text-white text-sm px-3 py-1.5 rounded outline-none border border-transparent focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
