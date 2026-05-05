"use client";

import { useState } from "react";
import { templates, Template, getTemplatesByCategory } from "../lib/templates";

interface TemplatePickerProps {
  onSelect: (template: Template) => void;
  onClose?: () => void;
  title?: string;
}

export default function TemplatePicker({
  onSelect,
  onClose,
  title = "Choose a template",
}: TemplatePickerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categorized = getTemplatesByCategory();
  const categories = ["All", ...Object.keys(categorized)];

  const filtered =
    activeCategory === "All" ? templates : categorized[activeCategory] || [];

  const handleSelect = () => {
    const template = templates.find((t) => t.id === selectedId);
    if (template) onSelect(template);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Pick a template or start from scratch
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      <div className="px-6 py-3 border-b border-gray-100 flex gap-2 shrink-0">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === category
                ? "bg-brand-600 text-white"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedId(template.id)}
              className={`
                text-left rounded-xl border-2 overflow-hidden transition-all
                ${
                  selectedId === template.id
                    ? "border-brand-500 shadow-md shadow-brand-100"
                    : "border-gray-200 hover:border-gray-300"
                }
              `}
            >
              <div
                className={`h-28 flex items-center justify-center text-4xl ${
                  template.id === "blank"
                    ? "bg-gray-50 border-b border-gray-200 border-dashed"
                    : "bg-gradient-to-br from-brand-50 to-blue-50"
                }`}
              >
                {template.preview}
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-900">
                    {template.name}
                  </p>
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  {template.description}
                </p>
              </div>
              {selectedId === template.id && (
                <div className="px-3 pb-3">
                  <div className="w-full h-0.5 bg-brand-500 rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between shrink-0">
        <p className="text-xs text-gray-400">
          {selectedId
            ? `Selected: ${templates.find((t) => t.id === selectedId)?.name}`
            : "No template selected"}
        </p>
        <div className="flex gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSelect}
            disabled={!selectedId}
            className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
          >
            Use template →
          </button>
        </div>
      </div>
    </div>
  );
}
