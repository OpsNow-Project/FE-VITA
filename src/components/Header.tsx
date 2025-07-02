import React, { useState } from "react";

export const Header: React.FC<{ hasAnalysis?: boolean }> = ({ hasAnalysis }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <header className="w-full bg-gray-800 text-white py-2 px-5 border-b border-gray-700 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/VITA_logo.png" alt="vita logo" className="w-10 h-10" />
          <span className="text-xl font-bold ml-2">VITA</span>
        </div>
        <div className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <span role="img" aria-label="알림">🔔</span>
          {hasAnalysis && (
            <>
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  background: 'red',
                  borderRadius: '50%',
                  display: 'inline-block',
                }}
              />
              {showTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    background: '#222',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 13,
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                >
                  클러스터 환경에 문제가 발생했습니다!
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
