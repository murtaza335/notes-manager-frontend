"use client"
import TaskList from "../components/taskList";
import IncomingRequestsList from "../components/incomingRequestsSection";


import { useState, useEffect } from "react";
import FeaturesBar from "../components/featuresBar";


type Role = 'employee' | 'manager' | 'admin' | string;

export default function Dashboard() {

  const [role, setRole] = useState<Role>('');

  // 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        console.log("Parsed user:", parsed.user.role);
        setRole(parsed.user.role?.toLowerCase() || '');
      }
      catch (err) {
        console.error("Error parsing user", err);
      }
    }

  }, []);
  console.log("Role in dashboard:", role);


  return (
    <div className="min-h-screen bg-[#111111] text-white p-6">
      {/* {features bar component} */}
      <FeaturesBar className="" role={role} />


      {/* Main Body */}
      <div className="dashboard-body space-y-4 flex">
        <TaskList role={role} />
        {role === "admin" &&
          <IncomingRequestsList className="w-100"/>
        }
      </div>

    </div>
  );
}
