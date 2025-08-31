"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export default function traineesign() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const[loading,setLoading]=useState(false)

  const router = useRouter()

  const handleChange = (e) => {
    if(form.username=="" || form.password==""){
      setLoading(false)
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      let res = await axios.post("https://workout-backend-ethn.onrender.com/traineesignup", form);
     console.log(res.status)

      if (res.status == 201 || res.status == 200) {
        localStorage.setItem("token", res.data.token);
        toast.success("Account created successfully 🎉");
        setForm({ username: "", password: "" });
        router.push("/trainee/detail/edit")
      }
    }catch(e){
      if(e.response && e.response.status === 409){
        toast.error("Username already exists");
      }else{
        console.log(e)
      }
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>
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
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?
          <a href="/login" className="text-indigo-600 hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
