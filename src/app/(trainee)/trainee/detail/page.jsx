"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Dumbbell, Phone, MapPin, PenIcon, Home, Info } from "lucide-react";
import Link from "next/link";


const MyDetailsPage = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    let token = localStorage.getItem("token");
    const callData = async () => {
      try {
        const response = await axios.get(
          "https://workout-backend-ethn.onrender.com/trainee/profile/mydetail",
          // "http://localhost:8080/trainee/profile/mydetail",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (e) {
        console.log("Error fetching details: ", e);
      }
    };
    callData();
  }, []);

  console.log("User Dataaa ", user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <div className="flex justify-around">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Profile
          </h2>
          <div className="flex">
            <PenIcon className="text-red" />
            <Link className="px-2" href={"/trainee/detail/edit"}>
              Edit Info
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          {/* Name */}
          <div className="flex items-center space-x-4">
            <User className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-xl font-semibold text-gray-800">
                {user.name || "Not Available"}
              </p>
            </div>
          </div>

          {/* Gym Status */}
          <div className="flex items-center space-x-4">
            <Dumbbell className="text-pink-500" />
            <div>
              <p className="text-sm text-gray-500">Gym Status</p>
              <p className="text-xl font-semibold text-gray-800">
                {user.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-4">
            <Phone className="text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-xl font-semibold text-gray-800">
                {user?.phone || "Not Available"}
              </p>
            </div>
          </div>

          {/* Current Plan */}
          <div className="flex items-center space-x-4">
            <MapPin className="text-amber-500" />
            <div>
              <p className="text-sm text-gray-500">Current Plan</p>
              <p className="text-xl font-semibold text-gray-800">
                {user?.myPlan?.planName || "Not Available"}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-center space-x-4">
            <Home className="text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-xl font-semibold text-gray-800">
                {user?.address || "Not Available"}
              </p>
            </div>
          </div>
          {/* Personal Info */}
      
          <div className="flex items-center space-x-4">
            <Info className="Red-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Personal Info :</p>
              <p className="text-xl font-semibold text-gray-800">
                {user?.personalInfo || "Not Added"}
              </p>
              <p className="text-red-600 text-base py-2">Ai-response is generated on above Info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDetailsPage;
