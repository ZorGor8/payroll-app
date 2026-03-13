// src/App.tsx
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeeDetails from "./pages/EmployeeDetails";
import AnalyticsPage from "./pages/AnalyticsPage";
import "./App.css";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    //Wrapper for the whole app:
    <div className={isDarkMode ? "app-wrapper dark-theme" : "app-wrapper"}>
      {/*button to change the theme */}
      <button
        className="theme-toggle-btn"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </div>
  );
}

// test change
