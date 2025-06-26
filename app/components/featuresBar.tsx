"use client";

import SearchBar from "./searchBar";
import NewButton from "./newButton";
import FilterButton from "./filterButton";

interface FeaturesBarProps {
  className?: string;
  role?: string;
}

export default function FeaturesBar({ className, role} : FeaturesBarProps) {
  return (
    <div className={`featuresBar flex justify-between items-center bg-[#1b1b1b] p-4 rounded-xl shadow-md mb-6 ${className}`}>
      <SearchBar className="p-2 bg-[#3a3a3a] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#34b7ff] placeholder:text-[#929292]" />
      {<FilterButton className="ml-auto" role={role}/>}
      <NewButton className="text-white px-4 py-2 rounded-md hover: transition" />
    </div>
  );
}
