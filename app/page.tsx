import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Drag And Drop Builder</h1>
      <Link href={"/dashboard"}>
        Navigate to Dashboard
      </Link>
    </div>
  );
}
