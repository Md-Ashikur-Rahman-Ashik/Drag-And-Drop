"use client";

import React, { useState } from "react";
import Button from "./ui/Button";

export default function Navbar({ siteName = "Untitle Site" }) {
  const [name, setName] = useState(siteName);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="h-12 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
          B
        </div>

        {isEditing ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsEditing(false)}
            autoFocus
            className="bg-gray-800 text-white text-sm px-2 py-1 rounded outline-none border border-blue-500"
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className="text-white text-sm font-medium cursor-pointer hover:text-gray-300"
          >
            {name}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="md">
          Preview
        </Button>
        <Button variant="primary" size="md">
          Publish
        </Button>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded hover:bg-gray-800"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
