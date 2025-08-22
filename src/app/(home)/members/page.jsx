
"use client";

import { getAllmembers } from "@/features/members";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MembersPage() {

  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.allmembers);

  useEffect(()=>{
    let token = localStorage.getItem("token");
    if(token){
      dispatch(getAllmembers(token));
    }
  },[dispatch])

  console.log("Members Data:", members);

  return (

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Members List</h1>

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
              {members.map((member, index) => {
                {console.log("Checking ",member)}
                const statusColor =
                  (member.isActive)
                    ? "text-green-600"
                    : "text-red-500"

                return (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.myPlan.planName}</td>
                    <td className="py-3 px-4">{new Date(member.startDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{new Date(member.endDate).toLocaleDateString()}</td>
                    <td className={`py-3 px-4 font-semibold ${statusColor}`}>
                      {(member.isActive ? "Active" : "Inactive")}
                    </td>

                    <td className="py-3 px-4">{member.myPlan.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

  );
}
