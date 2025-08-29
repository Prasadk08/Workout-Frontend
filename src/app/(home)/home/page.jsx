"use client";
import Loading from "@/app/Loading/page";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [owner, setOwner] = useState(null);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activePlans: 0,
    expiredPlans: 0,
    revenue: 0,
  });

  const[loading,setLoading]= useState(true)

  // gallery state
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://workout-backend-ethn.onrender.com/owner/home", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(res.data.gymImages);
        setOwner(res.data);
        setStats({
          totalMembers: res.data.members.length,
          activePlans: res.data.members.filter((m) => m.isActive).length,
          expiredPlans: res.data.members.filter((m) => !m.isActive).length,
          revenue: res.data.members.reduce((sum, m) => sum + (m.myPlan?.price || 0), 0),
        });
        setLoading(false)
      } catch (err) {
        console.error("Error fetching owner data", err);
      }
    };
 
    if (token) {
      fetchData();
    }
  }, [token]);

const onPickFiles = (e) => {
  const file = e.target.files?.[0];
  setFiles(file ? [file] : []);
};

  const onUpload = async () => {
  if (!files.length) return;
  setUploading(true);
  try {
    const form = new FormData();
    form.append("image", files[0]);   // only one file append

    const res = await axios.post("https://workout-backend-ethn.onrender.com/gymowner/upload", form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setImages((prev) => [...prev, res.data]);  // only one image add
    toast.success("Uploaded successfully");
    setFiles([]);
  } catch (e) {
    console.error("upload", e);
   toast.error("Upload failed. Try again.");
  } finally {
    setUploading(false);
  }
};

if(loading) return <Loading />

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-6">
        Welcome, {owner?.name || "Loading..."} 👋
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Members" value={stats.totalMembers} color="blue" />
        <StatCard title="Active Plans" value={stats.activePlans} color="green" />
        <StatCard title="Expired Plans" value={stats.expiredPlans} color="red" />
        <StatCard title="Monthly Revenue" value={`₹${stats.revenue}`} color="purple" />
      </div>

      {/* Uploader */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Showcase Your Gym ✨</h2>
        <p className="text-gray-500 mt-1">
          High-quality photos help your gym stand out and convert more visitors into members.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={onPickFiles}
            className="block w-full text-sm text-gray-700
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-xl file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
          />
          <button
            onClick={onUpload}
            disabled={!files.length || uploading}
            className={`px-5 py-2 rounded-xl text-white font-semibold transition
              ${uploading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* small previews before upload */}
        {!!files.length && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {files.map((f, i) => (
              <div key={i} className="relative h-24 rounded-lg overflow-hidden border">
                <img src={URL.createObjectURL(f)} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Your Gallery</h3>
          <p className="text-sm text-gray-500">{images.length} images</p>
        </div>
        {images.length === 0 ? (
          <p className="text-gray-500">
            No images yet. Upload a few great shots of your equipment, ambience, and trainers!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((img, idx) => (
              <figure key={idx} className="group relative rounded-xl overflow-hidden shadow">
                <img src={img.url} alt="" className="w-full h-40 object-cover" />
                <figcaption
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                             transition flex items-end"
                >
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
  };
  return (
    <div className={`rounded-xl shadow p-5 ${colorMap[color]}`}>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
