"use client";

import { useState } from "react";
import Input from "../components/ui/Input";

export default function PageManager() {
  const [pages, setPages] = useState([
    { id: 1, title: "Home" },
    { id: 2, title: "About" },
    { id: 3, title: "Contact" },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [newTitle, setNewTitle] = useState("");

  const addPage = () => {
    if (newTitle.trim() === "") return;

    const newPage = {
      id: Date.now(),
      title: newTitle.trim(),
    };

    setPages([...pages, newPage]);
    setNewTitle("");
  };

  const deletePage = (id : Number) => {
    if (pages.length == 1) return;

    setPages(pages.filter((page) => page.id !== id));
    if (selectedId === id) setSelectedId(pages[0].id);
  };

  return (
    <div className="w-64 bg-gray-900 min-h-screen py-4 px-1">
      <h2 className="text-white font-bold text-lg mb-6 px-1">Pages</h2>

      <ul className="space-y-1 mb-6">
        {pages.map((page) => (
          <li
            key={page.id}
            onClick={() => setSelectedId(page.id)}
            className={`px-3 flex justify-between py-2 rounded cursor-pointer text-sm font-medium group ${selectedId === page.id ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
          >
            <span>{page.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deletePage(page.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-xs hover:text-red-400 transition-opacity"
            >
              X
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-1">
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addPage()}
          placeholder={"New Page..."}
        />

        <button
          onClick={addPage}
          className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
