"use client";

import { useState } from "react";

export default function TitleDescriptionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#111111] min-h-screen flex items-center justify-center px-4"
    >
      <div className="bg-[#3a3a3a] p-6 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-white text-xl font-semibold">Submit Details</h2>

        <div>
          <label htmlFor="title" className="block text-[#ffffff] mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#1b1b1b] text-white border border-[#929292] focus:outline-none focus:ring-2 focus:ring-[#34b7ff]"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-[#ffffff] mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[#1b1b1b] text-white border border-[#929292] focus:outline-none focus:ring-2 focus:ring-[#34b7ff]"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-[#34b7ff] text-[#111111] font-semibold hover:bg-[#2aa9f2] transition"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
