export default function PropertiesPanel() {
  return (
    <div className="w-56 bg-black border-l border-[#1a1a1a] flex flex-col h-full shrink-0">
      <div className="px-3 py-2.5 border-b border-[#1a1a1a]">
        <span className="text-[10px] font-medium text-[#444] uppercase tracking-widest">
          Properties
        </span>
      </div>

      <div className="p-3 overflow-y-auto flex-1">
        <div className="mb-5">
          <p className="text-[10px] font-medium text-[#444] uppercase tracking-widest mb-2.5">
            Typography
          </p>

          <div className="space-y-2">
            <div>
              <label className="text-[10px] text-[#555] block mb-1">
                Font Size
              </label>
              <input
                type="number"
                defaultValue={16}
                className="w-full bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs px-2.5 py-1.5 rounded-md outline-none focus:border-[#333] transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#555] block mb-1">
                Weight
              </label>
              <select className="w-full bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs px-2.5 py-1.5 rounded-md outline-none focus:border-[#333] transition-colors">
                <option>Normal</option>
                <option>Medium</option>
                <option>Bold</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <p className="text-[10px] font-medium text-[#444] uppercase tracking-widest mb-2.5">
            Spacing
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            {["Top, Right, Bottom, Left"].map((side) => (
              <div key={side}>
                <label className="text-[10px] text-[#555] block mb-1">
                  {side}
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  className="w-full bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs px-2.5 py-1.5 rounded-md outline-none focus:border-[#333] transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-medium text-[#444] uppercase tracking-widest mb-2.5">
            Color
          </p>

          <div>
            <label className="text-[10px] text-[#555] block mb-1">
              Text Color
            </label>
            <div className="flex gap-1.5">
              <input
                type="color"
                defaultValue="#ffffff"
                className="w-7 h-7 rounded cursor-pointer bg-transparent border-0 p-0"
              />
              <input
                type="text"
                defaultValue="#ffffff"
                className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs px-2.5 py-1.5 rounded-md outline-none foncus:border-[#333] transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
