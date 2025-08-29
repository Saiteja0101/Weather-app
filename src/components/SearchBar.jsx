import { useNavigate } from "react-router-dom"
import React from "react"

const SearchBar = ({city, setCity, onSubmit }) => {
    return (
        <>
            {/* Search Bar */}
            <form
                onSubmit={onSubmit}
                className="w-full max-w-md flex items-center gap-2 mb-6"
            >
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="Enter city name..."
                    className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-medium hover:bg-cyan-600 shadow-md shadow-cyan-400/50"
                >
                    Search
                </button>
            </form>
        </>
    )
}

export default SearchBar