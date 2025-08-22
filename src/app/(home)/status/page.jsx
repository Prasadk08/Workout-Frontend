"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function StatusPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/owner/status", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Sort by earliest endDate first
        const sorted = [...res.data].sort(
          (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );

        setMembers(sorted);
      } catch (err) {
        console.error("Error fetching member data", err);
      }
    };

    fetchMembers();
  }, []);

  const getStatus = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = (end - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return { label: "Expired", color: "bg-red-100 text-red-600" };
    if (diff <= 5) return { label: "Expiring Soon", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Active", color: "bg-green-100 text-green-700" };
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Check Member Plan Status</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">Member</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">End Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => {
              const status = getStatus(member.endDate);
              return (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4">{member.name}</td>
                  <td className="py-3 px-4">{member.myPlan?.planName || "N/A"}</td>
                  <td className="py-3 px-4">{member.startDate?.slice(0, 10)}</td>
                  <td className="py-3 px-4">{member.endDate?.slice(0, 10)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
            {members.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No member data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
