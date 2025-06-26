'use client';

import React, { useEffect, useState } from 'react';

type Status = 'pending' | 'assigned' | 'inprogress' | 'completed' | string;


type Task = {
  id: number;
  title: string;
  description: string;
  status: Status;
};

interface taskListProps{
  role? : string
}

export default function TaskList({role}: taskListProps) {
  

  // Dummy task data
  const tasks: Task[] = [
    { id: 1, title: 'Task One', description: 'Prepare project docs', status: 'pending' },
    { id: 2, title: 'Task Two', description: 'Assign team members', status: 'assigned' },
    { id: 3, title: 'Task Three', description: 'Approval for budget', status: 'inprogress' },
    { id: 4, title: 'Task Four', description: 'Implement API routes', status: 'inprogress' },
    { id: 5, title: 'Task Five', description: 'Finalize UI design', status: 'completed' },
  ];



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
          <button className="px-4 py-2 bg-[#34b7ff] text-white text-sm rounded-md hover:bg-[#2aa9ed] transition shadow-sm">
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition shadow-sm">
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
  let filteredTasks: Task[] = tasks; // default to all tasks
  // filtering the tasks based on the user role 
  if (role === "manager"){
   filteredTasks = tasks.filter(task => task.status === 'assigned' || task.status === 'inprogress')
  }
  return (

    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      
      {filteredTasks.map((task) => (

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
          <h2 className="text-xl font-semibold text-white mb-2">{task.title}</h2>

          {/* Description */}
          <p className="text-sm text-[#929292]">{task.description}</p>

          {/* Buttons */}
          <div className="mt-4 flex justify-end space-x-2">
            {renderButtons(task.status)}
          </div>
        </div>
      ))}
    </div>
  );
}
