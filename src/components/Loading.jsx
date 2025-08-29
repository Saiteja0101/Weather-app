import React from "react";

const Loading = () => {
  return (
    <div
      className="w-full max-w-md mx-auto rounded-3xl p-6 text-center 
      bg-gradient-to-br from-blue-400/70 via-blue-300/50 to-indigo-300/30 
      backdrop-blur-xl shadow-xl shadow-blue-300 border border-white/30"
    >
      <div className="animate-pulse space-y-6">
        {/* City placeholder */}
        <div className="h-6 w-1/2 mx-auto rounded-lg bg-white/40"></div>

        {/* Weather Icon placeholder */}
        <div className="h-20 w-20 mx-auto rounded-full bg-white/30"></div>

        {/* Temperature placeholder */}
        <div className="h-10 w-24 mx-auto rounded-lg bg-white/40"></div>

        {/* Condition placeholder */}
        <div className="h-4 w-32 mx-auto rounded-lg bg-white/30"></div>

        {/* Extra Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="h-16 rounded-2xl bg-white/30"></div>
          <div className="h-16 rounded-2xl bg-white/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
