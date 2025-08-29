"use client";

import Loading from "@/app/Loading/page";
import { getownerData } from "@/features/ownerData";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PlansPage() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.ownerData.ownerdata);
  const loading = useSelector((state) => state.ownerData.loading);

  useEffect(() => {
    let token = localStorage.getItem("token");
    dispatch(getownerData(token));
  }, [dispatch]);

  if(loading) return <Loading />

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
          Membership Plans
        </h1>
        <Link
          href={"/plans/addplan"}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          + Add Plan
        </Link>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            {/* Title & Price */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {plan.planName}
              </h2>
              <p className="text-gray-600 mb-1">
                Duration:{" "}
                <span className="font-medium text-gray-800">
                  {plan.duration} Months
                </span>
              </p>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ₹{plan.price}
              </p>

              {/* Features */}
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {plan.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button className="flex-1 mr-2 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg transition">
                Edit
              </button>
              <button className="flex-1 ml-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
