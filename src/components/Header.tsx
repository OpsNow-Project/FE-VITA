import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-gray-800 text-white py-2 px-5 border-b border-gray-700 shadow-md">
      <div className="flex items-center">
        <img src="/VITA_logo.png" alt="vita logo" className="w-10 h-10" />
        <span className="text-xl font-bold">VITA</span>
      </div>
    </header>
  );
};
