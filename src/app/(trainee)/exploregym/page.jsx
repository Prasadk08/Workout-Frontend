"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGym, searchReducer } from "@/features/allgym";
import Link from "next/link";
import Loading from "@/app/Loading/page";
import Showallgym from "@/components/Showallgym";

const ExploreGymPage = () => {
  const [search, Setsearchdata] = useState("");
  const dispatch = useDispatch();
  let { allgym, loading, searchData } = useSelector((state) => state.allgym);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    dispatch(fetchGym());
    setFilter(false);
  }, [dispatch]);

  useEffect(() => {
    if (searchData == "") {
      return;
    }
    setFilter(true);
    const time = setTimeout(() => {
      dispatch(searchReducer(search));
    }, 400);

    return () => clearTimeout(time);
  }, [search]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Explore Gyms Near You
      </h1>

      <input
        type="text"
        placeholder="Search by location"
        className="w-3/5 px-4 py-2 rounded-2xl"
        name="searchdata"
        value={search}
        onChange={(e) => Setsearchdata(e.target.value)}
      />

      {filter ? (
        <Showallgym data={searchData}  />
      ) : (
        <Showallgym data={allgym} />
      )}
    </div>
  );
};

export default ExploreGymPage;
