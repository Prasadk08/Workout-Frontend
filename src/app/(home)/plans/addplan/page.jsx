"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddPlanPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    planName: "",
    duration: "",
    price: "",
    features: [""],
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "features") {
      const updatedFeatures = [...formData.features];
      updatedFeatures[index] = value;
      setFormData({ ...formData, features: updatedFeatures });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeatureField = (index) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData({ ...formData, features: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = localStorage.getItem("token");
      let res = await axios.post(
        "https://workout-backend-ethn.onrender.com/owner/addplan",
        {
          ...formData,
          price: Number(formData.price),
          duration: Number(formData.duration),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/plans")

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Add Gym Plan
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Plan Name
          </label>
          <input
            type="text"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 1 Month / 3 Months"
            className="mt-1 w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                name="features"
                value={feature}
                onChange={(e) => handleChange(e, index)}
                className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="button"
                onClick={() => removeFeatureField(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeatureField}
            className="text-blue-500 hover:underline text-sm mt-1"
          >
            + Add more
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Submit Plan
        </button>
      </form>
    </div>
  );
}
