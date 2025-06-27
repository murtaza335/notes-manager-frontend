'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface User {
  id : string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface IncomingRequestCardProps {
  user: User;
  index: number;
  onAction?: (email: string) => void; // Optional callback to parent to remove user after action
}

export default function IncomingRequestCard({ user, index, onAction }: IncomingRequestCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
    // console.log("incoming request card: ", user.id);
  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      const stored = localStorage.getItem('user');
      if (!stored) throw new Error('No user token');
      const { token } = JSON.parse(stored);

      const res = await fetch(`http://192.168.162.4:5000/api/auth/approve/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to approve user');

      console.log('User approved:', user.id);
      onAction?.(user.id); // notify parent
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    setIsProcessing(true);
    try {
      const stored = localStorage.getItem('user');
      if (!stored) throw new Error('No user token');
      const { token } = JSON.parse(stored);

      const res = await fetch(`http://192.168.162.4:5000/api/auth/reject/${user.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to decline user');

      console.log('User declined:', user.email);
      onAction?.(user.email); // notify parent
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow w-[300px]">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <div className="flex gap-3">
          <button onClick={handleAccept} disabled={isProcessing} title="Accept">
            <CheckCircle className={`w-6 h-6 ${isProcessing ? 'text-gray-400' : 'text-green-500'}`} />
          </button>
          <button onClick={handleDecline} disabled={isProcessing} title="Decline">
            <XCircle className={`w-6 h-6 ${isProcessing ? 'text-gray-400' : 'text-red-500'}`} />
          </button>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-400 mt-3 text-sm hover:underline"
      >
        {isExpanded ? 'Hide details ▲' : 'View more ▼'}
      </button>

      {isExpanded && (
        <div className="mt-3 text-sm text-gray-300 space-y-1">
          <p><span className="text-gray-400">Email:</span> {user.email}</p>
          <p><span className="text-gray-400">Role:</span> {user.role}</p>
          <p><span className="text-gray-400">Created At:</span> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
