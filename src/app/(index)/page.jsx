"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen bg-[url('/c.jpg')] bg-cover bg-center flex items-center">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl px-6 md:px-12 lg:px-24">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Welcome
            </span>{" "}
            to <span className="text-blue-500">Workout</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light mb-4">
            Smart Gym Management for Owners & Trainees
          </p>
          <p className="text-md text-gray-300 font-light mb-8">
            Simplify your fitness journey – manage gyms, track plans, and train smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/ownersign"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md transition"
            >
              I’m a Gym Owner
            </Link>
            <Link
              href="/traineesign"
              className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold text-lg shadow-md transition"
            >
              I’m a Trainee
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white font-medium text-center text-sm md:text-base">
          Manage gyms smartly. Join easily. Track effortlessly.
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 px-6 md:px-24 bg-white grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            What We Offer
          </h2>
          <ul className="space-y-4 text-lg text-gray-700 list-disc list-inside">
            <li>Powerful gym owner dashboard with insights</li>
            <li>Easy trainee onboarding by gym & location</li>
            <li>Plan tracking with expiry alerts & reminders</li>
            <li>Transparent fees & membership history</li>
            <li>Modern UI built using Next.js & Tailwind CSS</li>
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

      {/* Features Section */}
      <section className="py-20 px-6 md:px-24 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose <span className="text-blue-600">Workout?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Owner Dashboard"
            desc="Track members, plans, and revenue in real-time with a single glance."
            icon="📊"
          />
          <FeatureCard
            title="Trainee Access"
            desc="Trainees can join gyms, manage plans, and track workouts easily."
            icon="💪"
          />
          <FeatureCard
            title="Smart Alerts"
            desc="Automatic notifications for plan renewals and expired memberships."
            icon="🔔"
          />
          <FeatureCard
            title="Secure & Fast"
            desc="Built with modern web technologies ensuring speed and safety."
            icon="⚡"
          />
          <FeatureCard
            title="Anywhere Access"
            desc="Access the platform from any device, anytime, anywhere."
            icon="🌍"
          />
          <FeatureCard
            title="Beautiful Design"
            desc="Clean, professional, and user-friendly interface."
            icon="🎨"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white text-center px-6 md:px-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to transform your fitness journey?
        </h2>
        <p className="mb-8 text-lg">
          Join Workout today – Manage smarter. Train better.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/ownersign"
            className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Get Started as Owner
          </Link>
          <Link
            href="/traineesign"
            className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Join as Trainee
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
