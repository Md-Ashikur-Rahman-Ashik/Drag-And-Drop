"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          {label}
        </label>
      )}

      {value && (
        <div className="relative group rounded-lg overflow-hidden border border-gray-200">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-white text-gray-900 text-xs font-medium px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              Replace
            </button>
            <button
              onClick={() => onChange("")}
              className="bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-md hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {!value && (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            transition-all duration-150
            ${
              isDragging
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }
          `}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-gray-400">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-lg">
                ↑
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">
                  Click to upload
                </p>
                <p className="text-xs text-gray-400 mt-0.5">or drag and drop</p>
              </div>
              <p className="text-[10px] text-gray-300">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-100 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL"
          className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-xs px-3 py-2 rounded-lg outline-none focus:border-blue-400 transition-colors placeholder-gray-300"
        />
      </div>
    </div>
  );
}
