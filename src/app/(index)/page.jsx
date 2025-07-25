"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen  bg-[url('/c.jpg')] bg-cover bg-center">
        <div className="absolute flex flex-col  px-6 md:top-25 md:px-24">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">
            <span className="bg-gradient-to-t from-[#0000ff] to-[#00ffff] bg-clip-text text-transparent">Welcome</span> to <span className="text-blue-500">Workout</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-light mb-2">
            Smart Gym Management for Owners & Members
          </p>
          <p className="text-md text-gray-500 font-light mb-6">
            Start your fitness journey with us today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/ownersign"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold text-lg transition"
            >
              I’m a Gym Owner
            </Link>
            <Link
              href="/traineesign"
              className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-md font-semibold text-lg transition"
            >
              I’m a Trainee
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white font-medium text-center text-base">
          Manage gyms smartly. Join easily. Track effortlessly.
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 px-6 md:px-24 bg-white grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">What We Offer</h2>
          <ul className="space-y-4 text-lg text-gray-700 list-disc list-inside">
            <li>Powerful gym owner dashboard for easy control</li>
            <li>Secure trainee onboarding with gym selection by location</li>
            <li>Track plan start & end dates, expiry alerts</li>
            <li>Detailed membership and fees tracking</li>
            <li>Clean UI built with Next.js & Tailwind CSS</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <img
            src="/p.jpg"
            alt="Dashboard Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
