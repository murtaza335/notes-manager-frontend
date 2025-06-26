'use client';

import React from 'react';

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
}

const TaskCard: React.FC<TaskCardProps> = ({ task, role , onDelete, onEdit}) => {
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
      default:
        return 'bg-gray-700';
    }
  };

  const renderButtons = (status: Status) => {
    if (status === 'pending' && role === 'employee') {
      return (
        <>
          <button className="px-4 py-2 bg-[#34b7ff] text-white text-sm rounded-md hover:bg-[#2aa9ed] transition shadow-sm"
          onClick={() => onEdit?.(task.id)}>
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition shadow-sm"
          onClick={() => onDelete?.(task.id)}>
            Delete
          </button>
        </>
      );
    }

    if (status === 'assigned' && role === 'manager') {
      return (
        <>
          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition shadow-sm">
            Accept
          </button>
          <button className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition shadow-sm">
            Decline
          </button>
        </>
      );
    }

    if (status === 'pending' && role === 'admin') {
      return (
        <div>
          <button className="ml-4 px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition shadow-sm">
            Assign
          </button>
          <button className="ml-2 px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition shadow-sm">
            Delete
          </button>
        </div>
      );
    }

    if (status === 'inprogress' && role === 'manager') {
      return (
        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition shadow-sm">
          Complete
        </button>
      );
    }

    return null;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('en-GB');

  return (
    <div
      key={task.id}
      className="relative w-full rounded-xl p-5 bg-[#2a2a2a] border border-[#929292] shadow-md transition hover:bg-[#1f1f1f]"
    >
      {/* Status Tag */}
      <span
        className={`absolute top-3 right-4 text-white text-xs font-semibold px-3 py-1 rounded-full capitalize shadow-sm ${getStatusColor(
          task.status
        )}`}
      >
        {task.status}
      </span>

      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-1">{task.title}</h2>

      {/* Description */}
      <p className="text-sm text-[#929292] mb-1">{task.description}</p>

      {/* Tag */}
      <p className="text-xs text-gray-400 mb-1">Tag: {task.tag}</p>

      {/* Creator & Assignee */}
      <p className="text-xs text-gray-500 mb-1">
        Created By: {task.createdById}, Assigned To:{' '}
        {task.assignedToId ?? 'Unassigned'}
      </p>

      {/* Dates */}
      <p className="text-xs text-gray-600 mb-1">
        Created At: {formatDate(task.createdAt)}
      </p>
      <p className="text-xs text-gray-600">
        Updated At: {formatDate(task.updatedAt)}
      </p>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        {renderButtons(task.status)}
      </div>
    </div>
  );
};

export default TaskCard;
