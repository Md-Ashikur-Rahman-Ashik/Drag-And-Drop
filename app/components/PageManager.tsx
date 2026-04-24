"use client";

import { useState } from "react";

interface Page {
  id: number;
  title: string;
}

export default function PageManager() {
  const [pages, setPages] = useState<Page[]>([
    { id: 1, title: "Home" },
    { id: 2, title: "About" },
  ]);

  const [selectedId, setSelectedId] = useState(1);
  const [newTitle, setNewTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addPage = () => {
    if (newTitle.trim() === "") return;

    setPages([...pages, { id: Date.now(), title: newTitle.trim() }]);

    setNewTitle("");
    setIsAdding(false);
  };

  const deletePage = (id: number) => {
    if (pages.length == 1) return;

    setPages(pages.filter((page) => page.id !== id));
    if (selectedId === id) setSelectedId(pages[0].id);
  };

  return (
    <div className="w-52 bg-black border-r border-[#1a1a1a] flex felx-col h-full shrink-0">
      <div className="p-3 border-b border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium text-[#444] uppercase tracking-widest">
            Pages
          </span>
          <button
            onClick={() => setIsAdding(true)}
            className="text-[#444] hover:text-white transition-colors text-sm leading-none"
          >
            +
          </button>
        </div>

        <ul className="space-y-0.5">
          {pages.map((page) => (
            <li
              key={page.id}
              onClick={() => setSelectedId(page.id)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-md cursor-pointer text-xs group transition-colors ${selectedId === page.id ? "bg-[#111] text-white" : "text-[#555] hover:text-white hover:bg-[#0a0a0a]"}`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-1 h-1 rounded-full ${selectedId === page.id ? "bg-white" : "bg-[#333]"}`}
                />
                <span>{page.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePage(page.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-[#555] hover:text-red-400 transition-all text-xs"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {isAdding && (
          <div className="mt-2 flex gap-1.5">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addPage();
                if (e.key === "Escape") setIsAdding(false);
              }}
              placeholder={"Page name"}
              autoFocus
              className="flex-1 bg-[#0a0a0a] border border-[#333] text-white text-xs px-2 py-1.5 rounded-md outline-none placeholder-[#444] focus:border-[#555]"
            />
            <button
              onClick={addPage}
              className="bg-white text-black text-xs px-2 py-1.5 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Add
            </button>
          </div>
        )}
      </div>

      <div className="p-3 flex-1 overflow-y-auto">
        <span className="text-[10px] font-medium text-[#444] uppercase tracking-widest block mb-2">
          Components
        </span>
        <div className="space-y-1">
          {[
            "Hero Section",
            "Text Block",
            "Card",
            "Navbar",
            "Footer",
            "Gallery",
          ].map((component) => (
            <div
              key={component}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md border border-[#111] bg-[#0a0a0a] hover:border[#333] hover:bg-[#111] transition-all cursor-grab group"
            >
              <div className="w-3 h-3 border border-[#333] group-hover:border[#555] rounded-sm shrink-0 transition-colors" />
              <span className="text-xs text-[#555] group-hover:text-white transition-colors">
                {component}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
