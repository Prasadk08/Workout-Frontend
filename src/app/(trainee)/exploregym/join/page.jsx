"use client"
import React, { useEffect, useState } from 'react'

const JoinGymPage = () => {
  const [gym, setGym] = useState(null);

  useEffect(() => {
    // Replace this with real API call
    setGym({
      _id: "gym123",
      name: "Fitness Pro Gym",
      gymName: "Fitness Pro Gym Pvt Ltd",
      phone: 9876543210,
      gymLocation: "Pune, Maharashtra",
      members: ["id1", "id2", "id3", "id4"],
      plans: [
        { _id: "plan1", title: "Basic Plan" },
        { _id: "plan2", title: "Premium Plan" },
      ],
    });
  }, []);

  const handleConfirmJoin = () => {
    
  };

  if (!gym) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Join {gym.gymName}
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-4 text-gray-800">
        <div>
          <strong className="text-blue-600">Owner Name:</strong> {gym.name}
        </div>
        <div>
          <strong className="text-blue-600">Phone Number:</strong> {gym.phone}
        </div>
        <div>
          <strong className="text-blue-600">Location:</strong> {gym.gymLocation}
        </div>
        <div>
          <strong className="text-blue-600">Total Members:</strong> {gym.members.length}
        </div>
        <div>
          <strong className="text-blue-600">Available Plans:</strong>
          <ul className="list-disc list-inside ml-2 mt-1">
            {gym.plans.map((plan) => (
              <li key={plan._id}>{plan.title}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleConfirmJoin}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all"
        >
          Confirm Join
        </button>
      </div>
    </div>
  );
};

export default JoinGymPage;
