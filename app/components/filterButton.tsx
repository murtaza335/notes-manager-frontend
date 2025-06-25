"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react"; // optional, if you're using Lucide icons

export default function FilterButton({
  className = "",
  options = ["Status", "Date", "Priority"],
  onSelect = (option: string) => {},
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#1b1b1b] text-white border border-[#303030] rounded-md hover:bg-[#303030] transition"
      >
        Filter By
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-40 bg-[#1b1b1b] border border-[#303030] rounded-md shadow-lg">
          <ul className="py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3a3a3a] transition"
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
