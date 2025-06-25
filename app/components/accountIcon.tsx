"use client";

export default function AccountIcon({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full hover:bg-[#303030] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#34b7ff] ${className}`}
      title="Account"
    >
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A9.004 9.004 0 0112 15c2.282 0 4.35.854 5.879 2.265M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 1c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z"
        />
      </svg>
    </button>
  );
}
