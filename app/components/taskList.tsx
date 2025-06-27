'use client';

import React, { useEffect, useState } from 'react';
import TaskCard, { Task } from './card'; // adjust path if needed
import dotenv from 'dotenv';
dotenv.config();

interface TaskListProps {
  role?: string;
}

const TaskList: React.FC<TaskListProps> = ({ role }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchData = async () => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (!userData) return;

        const token = userData.token;
        const userRole = userData.user?.role?.toLowerCase() || '';
        role = userRole;

        console.log('Role in TaskList:', userRole);

        const response = await fetch(`http://192.168.162.4:5000/api/task/${userRole}-tasks`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        setTasks(data);
        console.log('Fetched data:', data);
      } catch (err) {
        console.error('Error parsing user or fetching data:', err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          role={role}
          onRefresh={fetchData} // ✅ This is the fix
        />
      ))}
    </div>
  );
};

export default TaskList;
