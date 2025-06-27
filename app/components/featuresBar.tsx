"use client";

import SearchBar from "./searchBar";
import NewButton from "./newButton";
import FilterButton from "./filterButton";
import { useState } from "react";
import AddNotePopup from "./addNotePopup";

interface FeaturesBarProps {
  className?: string;
  role?: string;
}

export default function FeaturesBar({ className, role }: FeaturesBarProps) {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);

  return (
    <>
      <div className={`featuresBar flex justify-between items-center bg-[#1b1b1b] p-4 rounded-xl shadow-md mb-6 ${className}`}>
        <SearchBar className="p-2 bg-[#3a3a3a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#34b7ff] placeholder:text-[#929292]" />
        
        <FilterButton className="ml-auto mr-10" role={role} />
        
        {role === 'employee' && <button
          onClick={() => setIsAddNoteOpen(true)}
          className="text-white px-4 py-2 rounded-md bg-[#34b7ff] ml-4 hover:bg-[#2495d8] transition"
        >
          + New
        </button>
      }
      </div>

      {/* Add Note Popup */}
      <AddNotePopup isOpen={isAddNoteOpen} onClose={() => setIsAddNoteOpen(false)} />
    </>
  );
}
