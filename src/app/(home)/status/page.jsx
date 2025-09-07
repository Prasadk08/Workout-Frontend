"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/app/Loading/page";

export default function StatusPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://workout-backend-ethn.onrender.com/owner/status",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Sort by earliest endDate first
        if (res.data) {
          const sorted = [...res.data].sort(
            (a, b) => new Date(a.endDate) - new Date(b.endDate)
          );
        }

        setMembers(sorted);
        setLoading(false);
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
    if (diff <= 5)
      return { label: "Expiring Soon", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Active", color: "bg-green-100 text-green-700" };
  };

  if (loading) return <Loading />;

  return (
    <div className="mt-6 max-w-6xl mx-auto px-4">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800 text-center">
        Check Member Plan Status
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="py-3 px-6 text-left">Member</th>
              <th className="py-3 px-6 text-left">Plan</th>
              <th className="py-3 px-6 text-left">Start Date</th>
              <th className="py-3 px-6 text-left">End Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => {
              const status = getStatus(member.endDate);
              return (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-6">{member.name}</td>
                  <td className="py-3 px-6">
                    {member.myPlan?.planName || "N/A"}
                  </td>
                  <td className="py-3 px-6">
                    {member.startDate?.slice(0, 10)}
                  </td>
                  <td className="py-3 px-6">{member.endDate?.slice(0, 10)}</td>
                  <td className="py-3 px-6">
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

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {members.length > 0 ? (
          members.map((member, index) => {
            const status = getStatus(member.endDate);
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h2>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Plan:</span>{" "}
                  {member.myPlan?.planName || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Start:</span>{" "}
                  {member.startDate?.slice(0, 10)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">End:</span>{" "}
                  {member.endDate?.slice(0, 10)}
                </p>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No member data available.</p>
        )}
      </div>
    </div>
  );
}
