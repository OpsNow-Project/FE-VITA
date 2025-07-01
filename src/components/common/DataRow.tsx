import React from 'react';

interface DataRowProps {
  label: string;
  value: string | number;
  title?: string;
  className?: string;
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, title, className = "" }) => (
  <div className={`flex justify-between items-center bg-blue-50 rounded px-2 py-1 min-w-0 ${className}`}>
    <span 
      className="truncate whitespace-nowrap max-w-[320px]" 
      title={title || label}
    >
      {label}
    </span>
    <span className="font-mono font-bold whitespace-nowrap">
      {value}
    </span>
  </div>
); 