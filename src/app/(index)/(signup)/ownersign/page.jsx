"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/router";

export default function OwnerSignUp() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const router = useRouter()

  const[loading,setLoading]=useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post("https://workout-backend-ethn.onrender.com/ownersignup", form);
      console.log(res.status)

      if (res.status == 201 || res.status == 200) {
        toast.success("Account created successfully 🎉");
        setForm({ username: "", password: "" });
        router.push("/home")
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error("Username already exists ❌");
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign up to manage your restaurant with ease 🚀
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-md transform transition duration-300 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
