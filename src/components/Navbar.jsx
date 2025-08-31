"use client";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl font-extrabold text-blue-600 tracking-wide">
          Start<span className="text-fuchsia-500">Today</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-8 font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
        </div>

        {/* Login Button */}
        <div>
          <Link
            href="/login"
            className="px-5 py-2 bg-blue-600 text-white rounded-full font-semibold 
                       hover:bg-blue-700 shadow-md transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
