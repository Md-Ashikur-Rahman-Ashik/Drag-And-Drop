import Navbar from "../components/Navbar";

export default function BuilderLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-950 overflow-hidden">
      <Navbar siteName="My First Site" />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
