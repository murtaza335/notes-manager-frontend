'use client';

import { useEffect, useState } from 'react';

interface Manager {
  id: number;
  name: string;
  email: string;
}

interface ManagerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  apiUrl: string;
  taskId: number;
}

export default function ManagerPopup({ isOpen, onClose, apiUrl, taskId }: ManagerPopupProps) {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [selectedManagerId, setSelectedManagerId] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      const storedUser = localStorage.getItem("user");
      const parsed = storedUser ? JSON.parse(storedUser) : null;
      const token = parsed?.token;

      fetch("http://192.168.162.4:5000/api/task/all-managers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const approved = data.filter((m: any) => m.isApproved === 1); // filtering without typing
          setManagers(approved);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching managers:", err);
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleAssign = async (managerId: number) => {
    console.log("Assigning task to manager:", managerId);
  setAssigning(true);
  setSelectedManagerId(managerId);

  const storedUser = localStorage.getItem("user");
  const parsed = storedUser ? JSON.parse(storedUser) : null;
  const token = parsed?.token;

  try {
    const res = await fetch(`http://192.168.162.4:5000/api/task/assign/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ managerId: managerId }),
    });

    if (res.ok) {
      alert('Task successfully assigned!');
      onClose();
    } else {
      alert('Failed to assign task.');
    }
  } catch (err) {
    console.error('Error assigning task:', err);
  } finally {
    setAssigning(false);
    setSelectedManagerId(null);
  }
};


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#111111] bg-opacity-90 flex justify-center items-center z-50">
      <div className="bg-[#1b1b1b] text-white rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Assign Task to Manager</h2>

        {loading ? (
          <p className="text-[#929292]">Loading...</p>
        ) : managers.length === 0 ? (
          <p className="text-[#929292]">No approved managers found.</p>
        ) : (
          <ul className="space-y-2">
            {managers.map((manager) => (
              <li
                key={manager.id}
                onClick={() => handleAssign(manager.id)}
                className={`cursor-pointer border rounded p-3 transition-colors duration-200 ${
                  selectedManagerId === manager.id && assigning
                    ? 'bg-[#34b7ff] text-black'
                    : 'bg-[#3a3a3a] hover:bg-[#303030]'
                }`}
              >
                <p className="font-medium">{manager.id} - {manager.name}</p>
                <p className="text-sm text-[#929292]">{manager.email}</p>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-[#34b7ff] text-black px-4 py-2 rounded hover:bg-blue-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
