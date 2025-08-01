import React from "react";

const About = () => {
  return (
    <div className="bg-amber-300 h-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-8xl text-center text-amber-950 p-3 text-2xl font-bold">
        <div>Create Your Gym Account</div>
        <div> Manage Members </div>
        <div>Track Subscriptions</div>
      </div>
      <div className="text-3xl font-bold text-center text-red-500 p-4">
        All at One Place
        All at One Place
      </div>
      <div className="text-black text-xl text-center p-4 max-w-4xl m-auto">
        Workout empowers gym owners to take full control of their gym operations
        with ease. Sign up and manage your gym from anywhere — add members,
        track monthly subscriptions, monitor expiry dates, and more. Whether
        you're running a small fitness center or a large gym franchise, Workout
        is designed to simplify your daily tasks and boost your productivity.
      </div>
      <div>
        <div className="text-center font-bold text-2xl text-red-600">Key Features</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center p-4 max-w-6xl m-auto">
          <div className="text-base md:text-lg text-black bg-blue-200 rounded-xl h-40 flex items-center justify-center p-2">Create and manage your gym profile</div>
          <div className="text-base md:text-lg text-black bg-blue-200 rounded-xl h-40 flex items-center justify-center p-2">Add and manage gym members with ease</div>
          <div className="text-base md:text-lg text-black bg-blue-200 rounded-xl h-40 flex items-center justify-center p-2">Track each member’s subscription and expiry dates</div>
          <div className="text-base md:text-lg text-black bg-blue-200 rounded-xl h-40 flex items-center justify-center p-2">View real-time status of active and expired memberships</div>
          <div className="text-base md:text-lg text-black bg-blue-200 rounded-xl h-40 flex items-center justify-center p-2">Safe and secure login system</div>
          <div className="text-base md:text-lg text-black bg-blue-200 rounded-xl h-40 flex items-center justify-center p-2">More powerful features coming soon...</div>
        </div>
      </div>
    </div>
  );
};

export default About;

