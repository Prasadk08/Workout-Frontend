"use client";
import Loading from "@/app/Loading/page";
import axios from "axios";
import React, { useEffect, useState } from "react";

const RecentJoinsPage = () => {
  const [traineeData, setTrainee] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = localStorage.getItem("token");
    const callData = async () => {
      try {
        const response = await axios.get(
          "https://workout-backend-ethn.onrender.com/trainee/profile/recent",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setTrainee(response.data);
        setLoading(false);
      } catch (e) {
        console.log("Error fetching recent joins: ", e);
      }
    };
    callData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Recent Joinings 🏋️
        </h1>

        {/* Current Gym Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Current Gym
          </h2>
          {traineeData?.myPlan ? (
            <div className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {traineeData.myPlan.gymName}
              </h3>
              <p className="text-gray-600">Price :{traineeData.myPlan.price}</p>
              <p className="text-gray-600">
                <span className="font-semibold">Joined:</span>{" "}
                {new Date(traineeData.startDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Plan:</span>{" "}
                {traineeData.myPlan.planName}
              </p>
              <p className="mt-2 inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                {traineeData.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">
              You haven’t joined any gym yet.
            </p>
          )}
        </div>

        {/* Past Gyms Section */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">
            Past Gyms
          </h2>
          {traineeData?.pastjoinings?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {traineeData.pastjoinings.map((gym, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {gym.gymName}
                  </h3>
                  <p className="text-gray-600">{gym.duration}</p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Price: </span> {gym.price}
                  </p>
                  {/* <p className="text-gray-600">
                    <span className="font-semibold">Left:</span> {gym.leftDate}
                  </p> */}
                  <p className="text-gray-600">
                    <span className="font-semibold">Plan:</span> {gym.planName}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No past gym history available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentJoinsPage;
