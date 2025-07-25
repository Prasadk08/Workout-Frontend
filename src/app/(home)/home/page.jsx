// app/dashboard/page.jsx
"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [owner, setOwner] = useState();
  const [stats, setStats] = useState({
    totalMembers: 30,
    activePlans: 22,
    expiredPlans: 8,
    revenue: 22000,
  });

  const expiringSoon = [
    { name: "Rohan Kale", plan: "Premium", expiresIn: "3 days" },
    { name: "Amit Desai", plan: "Standard", expiresIn: "5 days" },
  ];

  const notifications = [
    { msg: "New member added: Sunil", time: "2 hrs ago" },
    { msg: "Plan expired for Ravi", time: "1 day ago" },
  ];

  useEffect(()=>{
    const fetchData = async()=>{
      let token = localStorage.getItem('token')
      let res = await axios.get("http://localhost:8080/home/ownerdata",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

    }
    fetchData()
  },[])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {owner} 👋
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Members" value={stats.totalMembers} color="blue" />
        <StatCard title="Active Plans" value={stats.activePlans} color="green" />
        <StatCard title="Expired Plans" value={stats.expiredPlans} color="red" />
        <StatCard title="Monthly Revenue" value={`₹${stats.revenue}`} color="purple" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expiring Plans */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Plans Expiring Soon</h2>
          <ul className="space-y-3">
            {expiringSoon.map((member, idx) => (
              <li key={idx} className="flex justify-between border-b pb-2">
                <span>{member.name} ({member.plan})</span>
                <span className="text-orange-600 font-medium">{member.expiresIn}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
          <ul className="space-y-3">
            {notifications.map((note, idx) => (
              <li key={idx} className="flex justify-between border-b pb-2">
                <span>{note.msg}</span>
                <span className="text-gray-500 text-sm">{note.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
  };

  return (
    <div className={`rounded-xl shadow p-5 ${colorMap[color]}`}>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

