import React from "react";

export default function Card({ image, title, description, buttonText = "Learn More", onButtonClick }) {
  return (
    <div
      className="group relative my-4 w-60 min-w-[220px] cursor-pointer transform-gpu transition-transform duration-300 hover:scale-105"
    >
      {/* Glow border */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-purple-600 opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-40" />

      {/* Card body */}
      <div className="relative flex flex-col h-full rounded-xl bg-[#181022] border border-fuchsia-700/40 shadow-xl">
        {/* Image */}
        <div className="relative p-4 flex justify-center items-center h-40 rounded-t-xl">
          <img
            src={image}
            alt={title}
            className="object-contain rounded-md w-24 h-24"
          />
        </div>

        {/* Text */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-white font-semibold text-base mb-2 leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-300 text-xs leading-relaxed mb-4 line-clamp-4">
            {description}
          </p>

          {/* CTA */}
          <div className="mt-auto">
            <button
              type="button"
              onClick={onButtonClick}
              className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-fuchsia-600 to-purple-600 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            >
              {/* animated shine */}
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-transform duration-500 group-hover:translate-x-[100%] group-hover:opacity-100" />
              <span className="relative z-10">{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
