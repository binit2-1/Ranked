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
        {/* Restrict Heatmap width for original sizing, no extra margin */}
        <div className="w-full max-w-3xl ml-80 mt-[-264px]">
          <Heatmap />
        </div>
        <div className="absolute bottom-82 left-0 right-0 flex"></div>
      </main>
    </div>
  );
}