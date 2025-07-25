// app/members/page.jsx
"use client";

import { useState } from "react";

export default function MembersPage() {
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("All");

  const members = [
    {
      name: "Ravi Shinde",
      plan: "Premium",
      start: "2025-06-01",
      end: "2025-07-01",
      fees: 1200,
    },
    {
      name: "Anjali Patil",
      plan: "Basic",
      start: "2025-06-20",
      end: "2025-07-20",
      fees: 800,
    },
    {
      name: "Amit Deshmukh",
      plan: "Standard",
      start: "2025-05-10",
      end: "2025-06-10",
      fees: 1000,
    },
  ];

  const filtered = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === "All" || member.plan === filterPlan;
    return matchesSearch && matchesPlan;
  });

  const checkStatus = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diff = (end - today) / (1000 * 60 * 60 * 24);
    if (diff < 0) return "Expired";
    if (diff <= 5) return "Expiring Soon";
    return "Active";
  };

  return (

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Members List</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded-md w-full md:w-1/2"
          />
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option>All</option>
            <option>Basic</option>
            <option>Standard</option>
            <option>Premium</option>
          </select>
        </div>

        {/* Members Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">End Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Fees (₹)</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member, index) => {
                const status = checkStatus(member.end);
                const statusColor =
                  status === "Expired"
                    ? "text-red-600"
                    : status === "Expiring Soon"
                    ? "text-orange-500"
                    : "text-green-600";

                return (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.plan}</td>
                    <td className="py-3 px-4">{member.start}</td>
                    <td className="py-3 px-4">{member.end}</td>
                    <td className={`py-3 px-4 font-semibold ${statusColor}`}>
                      {status}
                    </td>
                    <td className="py-3 px-4">{member.fees}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

  );
}
