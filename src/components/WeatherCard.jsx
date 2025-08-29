import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return alert("Data not found");

  return (
    <div className="w-full max-w-md mx-auto rounded-3xl p-6 text-center 
      bg-gradient-to-br from-blue-400/70 via-blue-300/50 to-indigo-300/30 
      backdrop-blur-xl shadow-xl shadow-blue-300 border border-white/30 backface-visible">
      
      {/* City */}
      <h2 className="text-2xl font-semibold text-white drop-shadow mb-3">
        {weather.city}
      </h2>

      {/* Weather Icon */}
      <div className="text-7xl mb-3 animate-none drop-shadow-lg">
        {weather.icon}
      </div>

      {/* Temperature */}
      <p className="text-5xl font-extrabold text-white drop-shadow-md">
        {weather.temperature}°C
      </p>

      {/* Condition */}
      <p className="text-lg text-white/90 italic mb-6">
        {weather.condition}
      </p>

      {/* Extra Details */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
        <div className="flex flex-col items-center bg-white/20 rounded-2xl p-4 shadow-inner backdrop-blur-sm">
          <p className="text-sm uppercase tracking-wide">Humidity</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div className="flex flex-col items-center bg-white/20 rounded-2xl p-4 shadow-inner backdrop-blur-sm">
          <p className="text-sm uppercase tracking-wide">Wind</p>
          <p className="text-xl font-semibold">{weather.wind} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
