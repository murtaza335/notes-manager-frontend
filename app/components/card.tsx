'use client';

import React from 'react';
import ManagerPopup from './managerPopup';

type Status = 'pending' | 'assigned' | 'inprogress' | 'completed' | string;

export type Task = {
  id: number;
  title: string;
  description: string;
  tag: string;
  status: Status;
  createdById: number;
  assignedToId: number | null;
  createdAt: string;
  updatedAt: string;
};

interface TaskCardProps {
  task: Task;
  role?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onRefresh?: () => void; // add this
}

const TaskCard: React.FC<TaskCardProps> = ({ task, role, onEdit, onDelete ,onRefresh}) => {
  const [popupOpen, setPopupOpen] = React.useState(false);
  
  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'assigned':
        return 'bg-purple-500';
      case 'inprogress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-gray-500';
      case 'declined':
        return 'bg-red-500';
      default:
        return 'bg-gray-700';
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('en-GB');

  const getToken = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    const token = parsed?.token;
    return token;
  }
  return null;
};
const token = getToken();
  // --- API Call Handlers ---

  const handleEdit = () => {
    onEdit?.(task.id);
  };

  const handleDelete = async () => {
  const token = getToken();
  try {
    const res = await fetch(`http://192.168.162.4:5000/api/task/delete/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      onDelete?.(task.id);
      onRefresh?.(); // trigger refresh after deletion
    } else {
      console.error('Failed to delete task');
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
};

  const handleAssign = async () => {
    const token = getToken();
    try {
      const res = await fetch(`http://192.168.162.4:5000/api/task/all-managers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        }
      });
      if (!res.ok) throw new Error('Assign failed');
      // ✅ Show the popup after successful assign
      setPopupOpen(true);
    } catch (error) {
      console.error('Assign error:', error);
    }
  };

  const handleAccept = async () => {
    const token = getToken();
    try {
      const res = await fetch(`http://192.168.162.4:5000/api/task/accept/${task.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Accept failed');
      else {
        // Optionally refresh the task list or perform other actions
        console.log('Task accepted successfully');
        onRefresh?.();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDecline = async () => {
  const token = getToken();
  try {
    const res = await fetch(`http://192.168.162.4:5000/api/task/decline/${task.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Decline failed');
    onRefresh?.(); // refresh after declining
  } catch (error) {
    console.error(error);
  }
};

  const handleComplete = async () => {
  const token = getToken();
  console.log('Token:', token);
  try {
    const res = await fetch(`http://192.168.162.4:5000/api/task/complete/${task.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error('Complete failed');
    onRefresh?.(); // refresh after completing
  } catch (error) {
    console.error(error);
  }
};
  const renderButtons = (status: Status) => {
    if (status === 'pending' && role === 'employee') {
      return (
        <>
          <button
            className="px-4 py-2 bg-[#34b7ff] text-white text-sm rounded-md hover:bg-[#2aa9ed] transition shadow-sm"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition shadow-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </>
      );
    }

    if (status === 'assigned' && role === 'manager') {
      return (
        <>
          <button
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition shadow-sm"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition shadow-sm"
            onClick={handleDecline}
          >
            Decline
          </button>
        </>
      );
    }

    if (status === 'pending' && role === 'admin') {
      return (
        <div>
          <button
            className="ml-4 px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition shadow-sm"
            onClick={handleAssign}
          >
            Assign
          </button>
          <button
            className="ml-2 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition shadow-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      );
    }

    if (status === 'in_progress' && role === 'manager') {
      return (
        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition shadow-sm"
          onClick={handleComplete}
        >
          Complete
        </button>
      );
    }

    return null;
  };

  return (
    <div
      key={task.id}
      className="relative w-full rounded-xl pt-10 px-5 pb-5 bg-[#2a2a2a] border border-[#929292] shadow-md transition hover:bg-[#1f1f1f]"
    >
      <span
        className={`absolute top-3 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize shadow-sm ${getStatusColor(
          task.status
        )}`}
      >
        {task.status}
      </span>

      <h2 className="text-xl font-semibold text-white mb-1">{task.title}</h2>
      <p className="text-sm text-[#929292] mb-1">{task.description}</p>
      <p className="text-xs text-gray-400 mb-1">Tag: {task.tag}</p>
      <p className="text-xs text-gray-500 mb-1">
        Created By: {task.createdById}, Assigned To:{' '}
        {task.assignedToId ?? 'Unassigned'}
      </p>
      <p className="text-xs text-gray-600 mb-1">
        Created At: {formatDate(task.createdAt)}
      </p>
      <p className="text-xs text-gray-600">
        Updated At: {formatDate(task.updatedAt)}
      </p>

      <div className="mt-4 flex justify-end space-x-2">{renderButtons(task.status)}</div>

      <ManagerPopup
      taskId={task.id}
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        apiUrl="http://192.168.162.4:5000/api/task/all-managers" // replace with your API
      />
    </div>
  );
};

export default TaskCard;
