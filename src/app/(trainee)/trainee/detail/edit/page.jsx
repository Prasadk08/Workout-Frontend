"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditProfilePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    gender: "",
    age: "",
    personalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "https://workout-backend-ethn.onrender.com/trainee/profile/mydetail",
        // "http://localhost:8080/trainee/profile/mydetail",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Profile updated successfully!");
      router.push("/trainee");
      console.log("Updated Response:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong while updating!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-amber-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Edit Profile
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Share your details 🌟 <br />
          This helps us create a{" "}
          <span className="font-semibold">personalized daily workout plan</span> 
          for you with AI.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="2"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male 👨</option>
              <option value="Female">Female 👩</option>
              <option value="Other">Other 🌈</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Personal Information */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Personal Information
            </label>
            <textarea
              name="personalInfo"
              value={formData.personalInfo || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Tell us about your workout experience, diet (Veg/Non-Veg), and your fitness goals..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
