"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const JoinGymPage = () => {
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [blur, setBlur] = useState(false);
  const [gym, setGym] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    async function callData() {
      try {
        let join = await axios.get(
          `http://localhost:8080/trainee/getgyminfo/${id}`
        );
        setGym(join.data);
        toast.success("Gym Loaded");
      } catch (e) {
        toast.error("Something went wrong");
      }
    }
    callData();
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
    let startDate = new Date()
    let endDate = new Date(startDate)
    endDate.setMonth(startDate.getMonth()+duration)
    try {
      let join = await axios.post(
        "http://localhost:8080/trainee/confirmjoin",
        {
          gymId: id,
          planId: selectedPlan,
          startDate,
          endDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlur(false);
      toast.success("Joined Successfully");
      setShowModal(false);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  if (!gym) return <p className="text-center py-10">Loading...</p>;

  return (
    <div>
      <div
        className={`max-w-3xl mx-auto px-6 py-12 ${
          blur ? "blur-sm" : "blur-none"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Join {gym.gymName}
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-4 text-gray-800">
          <div>
            <strong className="text-blue-600">Owner Name:</strong> {gym.name}
          </div>
          <div>
            <strong className="text-blue-600">Phone Number:</strong> {gym.phone}
          </div>
          <div>
            <strong className="text-blue-600">Location:</strong>{" "}
            {gym.gymLocation}
          </div>
          <div>
            <strong className="text-blue-600">Total Members: </strong>
            {gym?.members?.length || 0}
          </div>
          <div>
            <strong className="text-blue-600">Available Plans:</strong>
            <ul className="list-disc list-inside ml-2 mt-1">
              {gym.plans &&
                gym.plans.map((plan) => (
                  <li key={plan._id}>{plan.planName}</li>
                ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleConfirmJoin}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg text-lg font-semibold transition-all"
          >
            Join Gym
          </button>
        </div>
      </div>

      {/* MODAL */}
      <div>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-opacity-40 flex justify-center items-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
                Select a Plan
              </h2>
              <div className="space-y-3">
                {gym.plans &&
                  gym.plans.map((plan) => (
                    <label
                      key={plan._id}
                      className="flex items-center justify-around p-2 border rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={plan._id}
                        checked={selectedPlan === plan._id}
                        onChange={() =>{ setSelectedPlan(plan._id); setDuration(plan.duration)}}
                        className="ml-4"
                      />

                      <span>{plan.planName}</span>
                      <span>{plan.price}</span>
                    </label>
                  ))}
              </div>
              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={() => {
                    setBlur(false);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPlan}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinGymPage;
