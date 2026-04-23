"use client";

import { Puck } from "@measured/puck";
import { puckConfig } from "../lib/puck-config";
import "@measured/puck/dist/index.css";

export default function BuilderPage() {
  return (
    <div className="h-screen">
      <Puck
        config={puckConfig}
        data={{ content: [], root: {} }}
        onPublish={(data) => {
          console.log("Page data:", data);
        }}
      />
    </div>
  );
}
