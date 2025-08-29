import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
