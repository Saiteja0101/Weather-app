import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";

const WeatherPage = ({weather}) => {
  const { city } = useParams();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center p-4 justify-center">
      <WeatherCard weather={weather} className="max-w-lg"/>
      
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-5 py-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 shadow"
      >
        Back
      </button>
    </div>
  );
};

export default WeatherPage;
