"use client";

import { useState } from "react";

export default function ElementCard({ title, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 ${isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"}`}
    >
      <p
        className={`font-medium text-sm ${isSelected ? "text-blue-700" : "text-gray-700"}`}
      >
        {title}
      </p>
    </div>
  );
}
