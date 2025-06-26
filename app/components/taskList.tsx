'use client';

import React, { useEffect, useState } from 'react';
import TaskCard ,{Task} from './card'; // adjust the path based on your project
import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;

interface TaskListProps {
  role?: string;
}

const TaskList: React.FC<TaskListProps> = ({ role }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          try {

            let user: { name: string; role: string, token: string } | null = null;
            user = JSON.parse(storedUser);
            if (!user) {
              return
            }

            const response = await fetch(`${BASE_URL}/api/task/${role}-tasks`, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${user.token}`

              },
            });

            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            setTasks(data);
            console.log("Fetched data:", data);
          } catch (err) {
            console.error("Error parsing user or fetching data:", err);
          }
        }
      };

      fetchData(); // Call the async function

    
  }, []);

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} role={role} />
      ))}
    </div>
  );
};

export default TaskList;
