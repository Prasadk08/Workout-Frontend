"use client"
import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full max-w-6xl mx-auto gap-8 p-6">
      {/* Sidebar Navigation */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center gap-6 border">
        <h2 className="text-2xl font-bold text-gray-800">Welcome, Trainee 👋</h2>
        <p className="text-gray-600">Choose an option below to manage your fitness journey:</p>

        <nav className="flex flex-col gap-4">
          <Link
            href="/exploregym"
            className="bg-blue-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Explore Gyms
          </Link>
          <Link
            href="/recent-joins"
            className="bg-green-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-green-700 transition-all duration-200"
          >
            Recent Joinings
          </Link>
          <Link
            href="/my-details"
            className="bg-purple-600 text-white py-2 px-4 rounded-xl text-center font-semibold hover:bg-purple-700 transition-all duration-200"
          >
            My Details
          </Link>
        </nav>
      </div>

      {/* Right Panel */}
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join the Best Gyms in Your Area</h2>
        <p className="text-lg max-w-md">
          Whether you're just starting out or continuing your fitness journey, we help you find the perfect gym for your goals.
        </p>
        <Link
          href="/explore-gym"
          className="mt-6 bg-white text-yellow-600 font-bold py-2 px-6 rounded-full hover:bg-yellow-100 transition duration-200"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Page;
