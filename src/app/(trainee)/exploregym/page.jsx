"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { fetchGym } from "@/features/allgym";

const dummyGyms = [
  {
    id: 1,
    name: "Fitness Pro Gym",
    location: "Pune, Maharashtra",
    description: "Modern equipment, certified trainers, and 24/7 access.",
  },
  {
    id: 2,
    name: "Muscle House",
    location: "Mumbai, Maharashtra",
    description: "Strength training focused gym with personal coaching.",
  },
  {
    id: 3,
    name: "Wellness Hub",
    location: "Nagpur, Maharashtra",
    description: "Yoga, cardio, and spa facilities under one roof.",
  },
];

const ExploreGymPage = () => {
  const [gyms, setGyms] = useState([]);
  const dispatch= useDispatch()

  useEffect(() => {
    // Replace this with actual API call in production
    dispatch(fetchGym())
    // setGyms(dummyGyms);
  }, [dispatch]);

  const handleJoin = (gymId) => {
    alert(`You have requested to join Gym ID: ${gymId}`);
    // Future: Send API request to backend to join this gym
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Explore Gyms Near You
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {gyms.map((gym) => (
          <div
            key={gym.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-700">{gym.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{gym.location}</p>
            <p className="text-gray-700 mt-3">{gym.description}</p>
            <Link
              href="/exploregym/join"
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreGymPage;
