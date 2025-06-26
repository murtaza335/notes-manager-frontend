"use client"

import { useState, useEffect } from "react";
import Card from "../components/card";
import FeaturesBar from "../components/featuresBar";
import Cookies from 'js-cookie';


type Role = 'employee' | 'manager' | 'admin' | string;

export default function Dashboard() {

    const [role, setRole] = useState<Role>('admin');
    
    // 
    useEffect(() => {
  const fetchData = async () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setRole(parsed.user.role?.toLowerCase() || '');

        // const token = Cookies.get('jwt');
        // console.log("token", token)
        let user: { name: string; role: string , token: string} | null = null;
        user = JSON.parse(storedUser);
        // user = JSON.(user)
        if(!user){
          return
        }
        console.log(user.token)

        const response = await fetch(`http://192.168.162.64:5000/api/task/${role}-tasks`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "authorization": user.token
            
          },
        });

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log("Fetched data:", data);
      } catch (err) {
        console.error("Error parsing user or fetching data:", err);
      }
    }
  };

  fetchData(); // Call the async function
}, []);


  return (
    <div className="min-h-screen bg-[#111111] text-white p-6">
      {/* {features bar component} */}
      <FeaturesBar className="" role={role}/>
      

      {/* Main Body */}
      <div className="dashboard-body space-y-4">
        <Card role = {role}/>
        {/* Add more <Card />s if needed */}
      </div>
    </div>
  );
}
