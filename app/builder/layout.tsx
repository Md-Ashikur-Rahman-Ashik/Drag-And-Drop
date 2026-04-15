import React from "react";
import Navbar from "../components/Navbar";

interface BuilderProps {
  children: React.ReactElement;
}

export default function BuilderLayout({ children }: BuilderProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-950 overflow-hidden">
      <Navbar siteName="My First Site" />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
