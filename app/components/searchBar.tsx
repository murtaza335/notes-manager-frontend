"use client";
import { useState } from "react";

export default function SearchBar({ className = "" }) {
  const [searchBar, setsearchBar] = useState("Search Tasks by title");

  return (
    <div className={`flex items-center justify-between text-center ${className}`}>
      <input
        type="text"
        placeholder={searchBar}
        className="font-inherit text-white bg-[#3a3a3a] border-none px-4 py-2 rounded-full w-72 transition-all duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#34b7ff] hover:shadow-md mr-[-2rem] placeholder:text-[#929292] placeholder:font-light"
      />
      <button
        className="p-2 rounded-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#34b7ff] transition"
      >
        <svg
          className="h-5 w-5 fill-[#929292] hover:fill-white transition-colors duration-300"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </svg>
      </button>
    </div>
  );
}
