import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen">
      <h1 className="text-8xl font-mono">Drag And Drop Builder</h1> 
      <Link href={"/dashboard"} className="text-4xl font-medium rounded-xl transition-all duration-150 bg-black text-white hover:bg-gray-700 px-6 py-3">
        Navigate to Dashboard
      </Link>
    </div>
  );
}
