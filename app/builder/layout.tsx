import { Suspense } from "react";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center bg-white">
            <div className="w-6 h-6 border border-gray-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
