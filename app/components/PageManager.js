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

  const deletePage = (pageToDelete) => {
    setPages(pages.filter((page) => page != pageToDelete));
  };

  return (
    <div>
      <h2> Pages {pages.length}</h2>

      <ul>
        {pages.map((page) => (
          <li key={page}>
            {page}{" "}
            <button onClick={() => deletePage(page)}>Delete Page</button>
          </li>
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
