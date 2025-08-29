"use client";
import Link from "next/link";
import React, { useState } from "react";
import { UserCircleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClipboardListIcon, HomeIcon, UserCircle, UsersIcon } from "lucide-react";

const HomeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/home" },
    { name: "Members", href: "/members" },
    { name: "Plans", href: "/plans" },
    { name: "Check Status", href: "/status" },
  ];

  return (
    <div className="flex">
      {/* Mobile Toggle Button */}

      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-10 z-50 p-2 rounded-md bg-gray-900 text-white"
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>
      */}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Sidebar Header with Profile Icon */}
        <Link
          href={"/home/profile"}
          className="flex items-center gap-3 py-6 px-6 border-b border-gray-700"
        >
          <UserCircleIcon className="w-10 h-10 text-green-500" />
          <span className="text-2xl font-bold">Dashboard</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block w-full py-3 px-4 rounded-lg text-center font-medium hover:bg-green-600 hover:text-white transition-all"
              onClick={() => setIsOpen(false)} // auto-close on mobile
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-gray-700 text-center text-sm text-gray-400">
          © 2025 Fitness App
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-screen bg-white shadow-md z-50 md:hidden flex justify-around items-center h-14">
        <Link href="/home" className="flex flex-col items-center text-gray-600">
          <HomeIcon className="w-6 h-6" />
          <span className="text-base">Home</span>
        </Link>
        <Link href="/members" className="flex flex-col items-center text-gray-600">
          <UsersIcon className="w-6 h-6" />
          <span className="text-base">Members</span>
        </Link>
        <Link href="/plans" className="flex flex-col items-center text-gray-600">
          <ClipboardListIcon className="w-6 h-6" />
          <span className="text-base">Plans</span>
        </Link>
        <Link href="/status" className="flex flex-col items-center text-gray-600">
          <CheckCircleIcon className="w-6 h-6" />
          <span className="text-base">Status</span>
        </Link>
        <Link href="/home/profile" className="flex flex-col items-center text-gray-600">
          <UserCircle className="w-6 h-6" />
          <span className="text-base">Profile</span>
        </Link>
        

      </div>
    </div>
  );
};

export default HomeSidebar;
