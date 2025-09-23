"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Dumbbell, Phone, MapPin, Pen } from "lucide-react";
import Link from "next/link";
import Loading from "@/app/Loading/page";

const ProfileView = () => {
  const [owner, setOwner] = useState({
    name: "",
    gymName: "",
    phone: "",
    gymLocation: "",
  });


  const[loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        let res = await axios.get("https://workout-backend-ethn.onrender.com/owner/profile", {
        // let res = await axios.get("http://localhost:8080/owner/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOwner(res.data);
        setLoading(false)
      } catch (err) {
        console.error("Error fetching profile", err);
      }
    };
    fetchData();
  }, []);

  if(loading) return <Loading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl transition hover:shadow-3xl duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-xl md:text-3xl font-extrabold text-gray-800 text-center sm:text-left">
            Owner Profile
          </h2>
          <Link
            href={"/home/profile/edit"}
            className="mt-4 sm:mt-0 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
          >
            <Pen size={18} />
            Edit Info
          </Link>
        </div>

        {/* Profile Info */}
        <div className="grid gap-6 sm:gap-8">
          {/* Name */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
            <User className="text-blue-600 w-7 h-7" />
            <div>
              <p className="text-sm text-gray-500">Owner Name</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                {owner.name || "Not Available"}
              </p>
            </div>
          </div>

          {/* Gym Name */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
            <Dumbbell className="text-pink-600 w-7 h-7" />
            <div>
              <p className="text-sm text-gray-500">Gym Name</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                {owner.gymName || "Not Available"}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
            <Phone className="text-green-600 w-7 h-7" />
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
                {owner.phone || "Not Available"}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition">
            <MapPin className="text-amber-600 w-7 h-7" />
            <div>
              <p className="text-sm text-gray-500">Gym Location</p>
              <p className="text-lg sm:text-xl font-semibold text-gray-800">
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
