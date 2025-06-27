'use client';

import { useEffect, useState } from 'react';
import IncomingRequestCard from './incomingRequestCard';

interface User {
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function IncomingRequestsList({ className = "" }) {
  const [requests, setRequests] = useState<User[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const storedUser = localStorage.getItem('user');
      console.log("incoming request section: ", storedUser);

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          const name = parsed?.user?.name;
          const token = parsed?.token;
          const role = parsed?.user?.role;

          if (!name || !token || !role) return;

          const response = await fetch(`http://192.168.162.4:5000/api/auth/pending-users`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) throw new Error('Failed to fetch data');

          const data = await response.json();
          console.log('Fetched data:', data);

          // ✅ FIXED
          setRequests(Array.isArray(data.users) ? data.users : []);
        } catch (err) {
          console.error('Error parsing user or fetching data:', err);
        }
      }
    };

    fetchRequests();
  }, []);


  return (
    <div className={`space-y-4 ${className} bg-[#1a1a1a] p-6 rounded-lg`}>
      <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
      {requests.length === 0 && (
        <div className="text-gray-400 text-center">
          No incoming requests at the moment.
        </div>
      )}
      {requests.map((user, index) => (
        console.log("user: ", user),
        <IncomingRequestCard
          key={index}
          user={user}
          index={index}
          onAction={(email) => {
            setRequests((prev) => prev.filter((u) => u.email !== email));
          }}
        />

      ))}
    </div>
  );
}
