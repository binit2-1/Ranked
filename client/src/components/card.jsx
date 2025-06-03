import React from "react";

export default function Card({ image, title, description, buttonText = "Learn More", onButtonClick }) {
  return (
    <div className="relative flex flex-col my-4 bg-[#181022] shadow-sm border border-fuchsia-700 rounded-lg w-60 min-w-[220px]">
      <div className="relative p-2 flex justify-center items-center h-40 overflow-visible rounded-xl bg-clip-border">
        <img
          src={image}
          alt="card-image"
          className="object-contain rounded-md"
          style={{ width: 100, height: 100 }}
        />
      </div>
      <div className="p-3 flex flex-col h-full">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-white text-base font-semibold">
            {title}
          </p>
        </div>
        <p className="text-gray-300 leading-normal font-light text-xs mb-4">
          {description}
        </p>
        <div className="flex flex-1 items-end">
          <button
            className="rounded-md w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 py-1.5 px-3 border border-transparent text-center text-xs text-white font-semibold transition-all shadow-md hover:shadow-lg focus:bg-fuchsia-700 focus:shadow-none active:bg-fuchsia-700 hover:bg-gradient-to-l hover:from-fuchsia-500 hover:to-purple-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={onButtonClick}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
