"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/Loading/page";

const JoinGymPage = () => {
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [blur, setBlur] = useState(false);
  const [gym, setGym] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState(0);
  const[loading,setLoading]= useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    console.log("Calling function")
    async function fetchGymData() {
      console.log("Befor api call")
      try {
        const response = await axios.get(
          `http://localhost:8080/trainee/getgyminfo/${id}`
        );
        console.log("Inside function ")
        setGym(response.data);
        setLoading(false)
        toast.success("Gym Loaded Successfully!");
      } catch (error) {
        toast.error("Failed to load gym details.");
      }
    }

    fetchGymData();
  }, []);

  const handleConfirmJoin = () => {
    setBlur(true);
    setShowModal(true);
  };

  const handleSubmitPlan = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + duration);

    try {
      await axios.post(
        "http://localhost:8080/trainee/confirmjoin",
        { gymId: id, planId: selectedPlan, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlur(false);
      setShowModal(false);
      toast.success("Joined Gym Successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <Loading />


  return (
    <div className="relative">
      {/* Gym info + Join button */}
      <div
        className={`max-w-5xl mx-auto px-6 py-12 ${blur ? "blur-sm" : "blur-none"} transition-all`}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Join <span className="text-green-600">{gym.gymName}</span>
        </h1>

        <div className="md:flex md:gap-8">
          {/* Gym Info */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 space-y-4 text-gray-800">
            <div>
              <strong className="text-blue-600">Owner Name:</strong> {gym.name}
            </div>
            <div>
              <strong className="text-blue-600">Phone:</strong> {gym.phone}
            </div>
            <div>
              <strong className="text-blue-600">Location:</strong> {gym.gymLocation}
            </div>
            <div>
              <strong className="text-blue-600">Total Members:</strong>{" "}
              {gym?.members?.length || 0}
            </div>

            <div>
              <strong className="text-blue-600">Available Plans:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {gym.plans &&
                  gym.plans.map((plan) => (
                    <li key={plan._id}>
                      <span className="font-medium">{plan.planName}</span> - $
                      {plan.price} ({plan.duration} months)
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Join Gym Button */}
          <div className="mt-6 md:mt-0 md:w-1/3 flex justify-center items-start">
            <button
              onClick={handleConfirmJoin}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:py-4 md:px-8 rounded-xl text-lg font-semibold shadow-lg transition-all"
            >
              Join Gym
            </button>
          </div>
        </div>
      </div>

      {/* Gym Photos Full Width */}
      <div className="w-full bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gym Photos</h2>
          {gym.gymImages && gym.gymImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gym.gymImages.map((photo, index) => (
                <img
                  key={index}
                  src={photo.url}
                  alt={`Gym Photo ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No photos uploaded yet</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-fadeIn">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">
              Select a Plan
            </h2>

            <div className="space-y-3">
              {gym.plans &&
                gym.plans.map((plan) => (
                  <label
                    key={plan._id}
                    className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100 transition-all ${
                      selectedPlan === plan._id
                        ? "border-green-600 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div>
                      <input
                        type="radio"
                        name="plan"
                        value={plan._id}
                        checked={selectedPlan === plan._id}
                        onChange={() => {
                          setSelectedPlan(plan._id);
                          setDuration(plan.duration);
                        }}
                        className="mr-3 accent-green-600"
                      />
                      <span className="font-medium">{plan.planName}</span>
                    </div>
                    <span className="font-semibold text-gray-700">${plan.price}</span>
                  </label>
                ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setBlur(false);
                  setShowModal(false);
                }}
                className="px-5 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitPlan}
                className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinGymPage;
