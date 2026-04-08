"use client";

import { useState } from "react";

export default function PageManager() {
  const [pages, setPages] = useState(["Home", "About"]);
  const [newPage, setNewPage] = useState("");

  const addPage = () => {
    if (newPage == "") return;

    setPages([...pages, newPage]);
    setNewPage("");
  };

  return (
    <div>
      <h2> Pages {pages.length}</h2>

      <ul>
        {pages.map((page) => (
          <li key={page}>{page}</li>
        ))}
      </ul>

      <input
        value={newPage}
        onChange={(e) => setNewPage(e.target.value)}
        placeholder="New Page Name"
      />
      <button onClick={addPage}>Add Page</button>
    </div>
  );
}
