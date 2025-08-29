import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import weatherCodeMap from "../utils/weatherCodeMap";
import Loading from "../components/Loading";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const transformWeatherData = async (latitude, longitude, locationName) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,wind_speed_10m`
    );

    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();

    if (!data.current_weather) {
      setError("Weather data unavailable for this location.");
      return null;
    }

    const current = data.current_weather;
    const conditionCode = current.weathercode;
    const { text, icon } = weatherCodeMap[conditionCode] || { text: "Unknown", icon: "❓" };

    return {
      city: locationName,
      temperature: current.temperature,
      condition: text,
      icon: icon,
      humidity: data.hourly?.relative_humidity_2m?.[0] ?? "N/A",
      wind: current.windspeed ?? "N/A",
    };
  };



  // Fetch weather
  const getWeatherData = async (selectedCity) => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);
      const locationName = selectedCity || "Hyderabad" //default city

      // 1. Get coordinates
      const geoResult = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${locationName}`
      );

      if (!geoResult.ok) throw new Error("Failed to fetch location data");

      const geoData = await geoResult.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found. Please try another.");
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // 2. Transform & set
      const weatherData = await transformWeatherData(latitude, longitude, name);
      if (weatherData) setWeather(weatherData);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  // Fetch weather by coordinates
  const getWeatherByCoords = async (latitude, longitude, locationName = "Your Location") => {
    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const weatherData = await transformWeatherData(latitude, longitude, locationName);
      if (weatherData) setWeather(weatherData);

    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  // Triggered on search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    getWeatherData(city);
    setCity("")
  };

  const handleCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          getWeatherByCoords(latitude, longitude, "Your Location");
        },
        (err) => {
          console.warn("Geolocation error:", err.message);
          getWeatherData("Hyderabad"); // fallback
        }
      );

    } else {
      getWeatherData("Hyderabad");
    }
  };


  useEffect(() => {
    getWeatherData("Hyderabad");
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-300/50 to-indigo-400/70 flex flex-col items-center p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800/70 mb-6">Weather App</h1>

      {/* Search Bar */}
      <SearchBar city={city} setCity={setCity} onSubmit={handleSearch} />

      {/* Current location */}
      <button
        className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 shadow-md shadow-cyan-400/50 mb-5"
        onClick={handleCurrentLocation}
      >
        Current location
      </button>

      {/* Loading */}
      {loading && <Loading />}

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-600 font-medium bg-red-600/30 px-4 py-2 rounded-xl shadow">
          {error}
        </p>
      )}

      {/* Weather Results */}
      {!loading && weather && <WeatherCard weather={weather} />}
    </div>
  );
};

export default Home;
