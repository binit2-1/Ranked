import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import Resources from "./pages/Resources";
import BattlePage from "./pages/BattlePage";
import { SlideTabsExample } from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";
import { useAuth } from "./lib/useAuth";
import PrivateRoute from "./components/PrivateRoute";
import ParticlesBackground from "./components/ParticlesBackground";

export default function App() {
  const { user , loading } = useAuth(); // TODO Requires some changes
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isBattle = location.pathname === "/battle";

  return (
    <div className="min-h-screen bg-[#101010] text-white relative">
      <Toaster position="bottom-center" />
      {/* Animated background on all pages except the battle arena */}
      {!isBattle && <ParticlesBackground />}

      {/* Show Navbar only if authenticated, not on landing or battle page */}
      {!loading && user && !isLanding && !isBattle && (
        <header className="fixed top-0 left-0 right-0 bg-transparent z-50">
          <SlideTabsExample />
        </header>
      )}
      <main className={!isLanding && !isBattle ? "pt-20 relative z-40" : "relative z-40"}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/battle" element={<PrivateRoute><BattlePage /> </PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
