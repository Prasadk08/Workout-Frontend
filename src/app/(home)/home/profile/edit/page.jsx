"use client";
import axios from "axios";

import React, { useState, useEffect } from "react";

const EditProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    gymName: "",
    phone: "",
    gymLocation: "",
  });

  // Simulate fetching existing data (replace with actual API call)
  useEffect(() => {
    const fetchData = async () => {
      const dummyData = {
        name: "Prasad Kshirsagar",
        gymName: "FitLife Gym",
        phone: 9876543210,
        gymLocation: "Pune, Maharashtra",
      };
      setFormData(dummyData);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("token"));
    try {
      let res = await axios.post(
        "http://localhost:8080/home/profile/edit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (e) {
        console.log("Errorr ",e)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-amber-100 to-cyan-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-amber-600">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Gym Name
            </label>
            <input
              type="text"
              name="gymName"
              value={formData.gymName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Gym Location
            </label>
            <input
              type="text"
              name="gymLocation"
              value={formData.gymLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-amber-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileForm;
