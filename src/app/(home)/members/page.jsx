"use client";

import Loading from "@/app/Loading/page";
import { getAllmembers } from "@/features/members";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MembersPage() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.allmembers);
  const loading = useSelector((state) => state.members.loading);


  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      dispatch(getAllmembers(token));
    }
  }, [dispatch]);

  if(loading) return <Loading />

  return (
    <div className="mb-8 px-4 md:px-8">
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">Members List</h1>

      {/* Responsive Wrapper */}
      <div className="overflow-x-auto hidden md:block rounded-xl shadow-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Plan</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">End Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Fees (₹)</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => {
              const statusColor = member.isActive
                ? "text-green-600 bg-green-50"
                : "text-red-600 bg-red-50";

              return (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 truncate max-w-[150px]">
                    {member.name}
                  </td>
                  <td className="py-3 px-4">{member.myPlan.planName}</td>
                  <td className="py-3 px-4">
                    {new Date(member.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(member.endDate).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-2 px-3 font-semibold text-sm rounded-lg text-center ${statusColor}`}
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">
                    ₹{member.myPlan.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 mt-6 md:hidden">
        {members.map((member, index) => {
          const statusColor = member.isActive
            ? "text-green-600"
            : "text-red-600";

          return (
            <div
              key={index}
              className="p-4 bg-white rounded-xl shadow-md border border-gray-100"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                {member.name}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Plan:</span>{" "}
                {member.myPlan.planName}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Start:</span>{" "}
                {new Date(member.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">End:</span>{" "}
                {new Date(member.endDate).toLocaleDateString()}
              </p>
              <p className={`mt-1 font-semibold ${statusColor}`}>
                {member.isActive ? "Active" : "Inactive"}
              </p>
              <p className="text-gray-800 font-bold mt-1">
                Fees: ₹{member.myPlan.price}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
