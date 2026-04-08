"use client";
import { useState } from "react";

export default function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Hide" : "Show"} Details
      </button>

      {isOpen && <p>Here are the hidden details you wanted to see!</p>}
    </div>
  );
}
