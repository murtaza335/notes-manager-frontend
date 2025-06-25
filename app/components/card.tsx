'use client';

import React, { useEffect, useState } from 'react';

type Status = 'pending' | 'approved' | 'rejected' | string;

export default function Card() {
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    const fetchStatus = async () => {
      const response = await new Promise<string>((resolve) =>
        setTimeout(() => resolve('pending'), 1000)
      );
      setStatus(response);
    };

    fetchStatus();
  }, []);

  return (
    <div className="relative w-[400px] rounded-xl p-5 bg-[#2a2a2a] border border-[#929292] shadow-md transition hover:bg-[#1f1f1f]">
      {/* Status Tag */}
      <span className="absolute top-3 right-4 bg-[#34b7ff] text-white text-xs font-semibold px-3 py-1 rounded-full capitalize shadow-sm">
        {status}
      </span>

      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-2">Project Title</h2>

      {/* Description */}
      <p className="text-sm text-[#929292]">
        This is a brief description of the project or task. It is concise and informative.
      </p>

      {/* Action Buttons (shown only if status is "pending") */}
      {status === 'pending' && (
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-[#34b7ff] text-white text-sm rounded-md hover:bg-[#2aa9ed] transition shadow-sm">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition shadow-sm">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
