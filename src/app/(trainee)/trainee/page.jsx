"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Loading from "@/app/Loading/page";

const Page = () => {
  const [activePlan, setActivePlan] = useState(null);
  const[loading,setLoading]= useState(true)

  useEffect(() => {
    const fetchActivePlan = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://workout-backend-ethn.onrender.com/trainee/profile/mydetail", {
        // const response = await axios.get("http://localhost:8080/trainee/profile/mydetail", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setActivePlan(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching active plan:", error);
      }
    };
    fetchActivePlan()
  }, []);

  if(loading) return <Loading />

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full max-w-6xl mx-auto gap-8 p-6">
      {/* Sidebar Navigation */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center gap-6 border">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, Trainee 👋</h2>
        <p className="text-gray-600">
          Choose an option below to manage your fitness journey:
        </p>

        <nav className="flex flex-col gap-4">
          <Link
            href="/exploregym"
            className="bg-blue-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Explore Gyms
          </Link>
          <Link
            href="/trainee/recent"
            className="bg-green-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-green-700 transition-all duration-200"
          >
            Recent Joinings
          </Link>
          <Link
            href="/trainee/detail"
            className="bg-purple-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-purple-700 transition-all duration-200"
          >
            My Details
          </Link>
          <Link
            href="/trainee/ai"
            className="bg-red-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-purple-700 transition-all duration-200"
          >
            AI Diet & Workout
          </Link>
        </nav>
      </div>

      {/* Right Panel */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg p-8 flex flex-col justify-center items-center text-white text-center relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>

        {activePlan ? (
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-extrabold mb-6 drop-shadow-lg">
              Your Active Gym Plan
            </h2>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-6 text-left space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${
                    (activePlan.isActive )
                      ? "bg-green-500/80 text-white"
                      : "bg-red-500/80 text-white"
                  }`}
                >
                  {activePlan.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Plan:</span>
                <span>{activePlan.myPlan?.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Price:</span>
                <span>{activePlan.myPlan?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Start Date:</span>
                <span>{new Date(activePlan.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">End Date:</span>
                <span>{new Date(activePlan.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Gym Name:</span>
                <span>{activePlan.gymName}</span>
              </div>
            </div>
            <Link
              href="/trainee/detail"
              className="mt-6 inline-block bg-white text-yellow-700 font-bold py-2 px-6 rounded-full hover:bg-yellow-100 transition duration-200 shadow-md"
            >
              Manage My Plan
            </Link>
          </div>
        ) : (
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Join the Best Gyms in Your Area
            </h2>
            <p className="text-lg">
              Whether you're just starting out or continuing your fitness journey, we help you find the perfect gym for your goals.
            </p>
            <Link
              href="/exploregym"
              className="mt-6 inline-block bg-white text-yellow-700 font-bold py-2 px-6 rounded-full hover:bg-yellow-100 transition duration-200 shadow-md"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
