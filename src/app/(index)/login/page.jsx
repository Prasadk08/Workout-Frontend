"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("https://workout-backend-ethn.onrender.com/login", form);
      // let res = await axios.post("http://localhost:8080/login", form);
      localStorage.setItem("token", res.data.token);
      if (res.data.msg == "owner") {
        router.push("/home");
        toast.success("Login successful! Redirecting to owner page...");
      } else if (res.data.msg == "trainee") {
        toast.success("Welcome Trainee!");
        router.push("/trainee");
      }
    } catch (e) {
      if (e.response && e.response.status == 404) {
        toast.error("Username not found.");
      }else if(e.response && e.response.status == 401){
        toast.error("Wrong password.");
      } else {
        toast.error("Something went wrong. Try again!");
      }
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t from-cyan-300 to-amber-200">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-600">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
