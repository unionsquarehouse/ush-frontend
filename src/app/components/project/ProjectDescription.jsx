"use client";

export default function ProjectDescription({ description }) {
  if (!description) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Description</h2>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
        {description}
      </div>
    </div>
  );
}
