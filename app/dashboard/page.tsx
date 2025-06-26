"use client"
import TaskList from "../components/taskList";
import dotenv from 'dotenv';
dotenv.config();


import { useState, useEffect } from "react";
import Card from "../components/card";
import FeaturesBar from "../components/featuresBar";
import Cookies from 'js-cookie';


type Role = 'employee' | 'manager' | 'admin' | string;

export default function Dashboard() {

  const [role, setRole] = useState<Role>('admin');

  // 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setRole(parsed.user.role?.toLowerCase() || '');
      }
      catch (err) {
        console.error("Error parsing user", err);
      }
    }
      
    }, []);


  return (
    <div className="min-h-screen bg-[#111111] text-white p-6">
      {/* {features bar component} */}
      <FeaturesBar className="" role={role} />


      {/* Main Body */}
      <div className="dashboard-body space-y-4">
        <TaskList role={role} />
      </div>

    </div>
  );
}
