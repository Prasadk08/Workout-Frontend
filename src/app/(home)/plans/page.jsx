"use client";
import SidebarLayout from "@/components/SidebarLayout";
import { useState } from "react";

export default function PlansPage() {
  const [plans, setPlans] = useState([
    {
      name: "Basic",
      price: 800,
      duration: "1 Month",
      features: ["Gym Access", "Locker Room"],
    },
    {
      name: "Standard",
      price: 1000,
      duration: "1 Month",
      features: ["Gym Access", "Locker Room", "Yoga Classes"],
    },
    {
      name: "Premium",
      price: 1200,
      duration: "1 Month",
      features: ["All Access", "Personal Trainer", "Steam Bath"],
    },
  ]);

  return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Membership Plans</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            + Add Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-2">{plan.duration}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">₹{plan.price}</p>
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
