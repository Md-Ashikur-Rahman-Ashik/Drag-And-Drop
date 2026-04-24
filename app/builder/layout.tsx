import React from "react";
import Navbar from "../components/Navbar";

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-[#111] overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
