import PageManager from "../components/PageManager";
import PropertiesPanel from "../components/PropertiesPanel";

export default function BuilderPage() {
  return (
    <>
      <PageManager />

      <div className="flex-1 bg-gray-100 flex-items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-2xl">✦</span>
          </div>

          <p className="text-gray-500 font-medium">Canvas</p>
          <p className="text-gray-400 text-sm mt-1">
            Puck editor loads here in Phase 6
          </p>
        </div>
      </div>

      <PropertiesPanel />
    </>
  );
}
