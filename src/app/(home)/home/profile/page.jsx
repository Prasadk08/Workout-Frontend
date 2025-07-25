"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Dumbbell, Phone, MapPin, PenIcon } from "lucide-react";
import Link from "next/link";

const ProfileView = () => {
  const [owner, setOwner] = useState({
    name: "",
    gymName: "",
    phone: "",
    gymLocation: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        let res = await axios.get(
          "http://localhost:8080/home/owner/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOwner(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-amber-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <div className="flex justify-around">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Owner Profile
          </h2>
          <div className="flex">
            <PenIcon className="text-red" />
            <Link className="px-2" href={"/home/profile/edit"}>
              Edit Info
            </Link>
          </div>
        </div>

        <div className="space-y-5">
          {/* Name */}
          <div className="flex items-center space-x-4">
            <User className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Owner Name</p>
              <p className="text-xl font-semibold text-gray-800">
                {owner.name || "Not Available"}
              </p>
            </div>
          </div>

          {/* Gym Name */}
          <div className="flex items-center space-x-4">
            <Dumbbell className="text-pink-500" />
            <div>
              <p className="text-sm text-gray-500">Gym Name</p>
              <p className="text-xl font-semibold text-gray-800">
                {owner.gymName || "Not Available"}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-4">
            <Phone className="text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-xl font-semibold text-gray-800">
                {owner.phone || "Not Available"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-4">
            <MapPin className="text-amber-500" />
            <div>
              <p className="text-sm text-gray-500">Gym Location</p>
              <p className="text-xl font-semibold text-gray-800">
                {owner.gymLocation || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
