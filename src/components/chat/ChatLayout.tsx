import React from "react";

export const ChatLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="fixed top-0 right-0 w-full md:w-1/2 h-full bg-white flex flex-col shadow-2xl z-50 border-l border-gray-200 rounded-l-3xl overflow-hidden transition-all">
    {children}
  </div>
); 