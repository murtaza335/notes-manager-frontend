"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#3a3a3a] p-6 rounded-2xl shadow-lg w-full max-w-md space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl hover:text-[#34b7ff]"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
