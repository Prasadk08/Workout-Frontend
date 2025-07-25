"use client";

import { useState } from "react";

export default function StatusPage() {
  const [members, setMembers] = useState([
    {
      name: "Ravi Shinde",
      plan: "Premium",
      start: "2025-06-01",
      end: "2025-07-01",
    },
    {
      name: "Anjali Patil",
      plan: "Basic",
      start: "2025-06-25",
      end: "2025-07-25",
    },
    {
      name: "Amit Deshmukh",
      plan: "Standard",
      start: "2025-05-10",
      end: "2025-06-10",
    },
  ]);

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
                const status = getStatus(member.end);
                return (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.plan}</td>
                    <td className="py-3 px-4">{member.start}</td>
                    <td className="py-3 px-4">{member.end}</td>
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
