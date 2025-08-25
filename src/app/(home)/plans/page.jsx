"use client";

import { getownerData } from "@/features/ownerData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PlansPage() {
  const [plans, setPlans] = useState([]);
  const dispatch = useDispatch()

  const data = useSelector((state)=> state.ownerData.ownerdata)
  useEffect(()=>{
    let token = localStorage.getItem("token")
    dispatch(getownerData(token))
  },[dispatch])

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Membership Plans</h1>
        <Link
          href={"/plans/addplan"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Plan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((plan, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {plan.planName}
            </h2>
            <p className="text-gray-600 mb-2">Months : {plan.duration}</p>
            <p className="text-lg font-bold text-blue-600 mb-4">
              ₹{plan.price}
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <div className="flex justify-between">
              <button className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
