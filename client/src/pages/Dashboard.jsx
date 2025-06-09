import React from "react";
import { RevealBento } from "../components/Bento";
import Heatmap from "../components/Heatmap";
import "../index.css";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      {/* Main Dashboard Content */}
      <main className="p-6 flex flex-col justify-center min-h-[80vh] gap-0">
        <RevealBento className="pb-0 mb-0" />
      </main>
    </div>
  );
}