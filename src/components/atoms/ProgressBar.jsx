import React from 'react';

const ProgressBar = ({ progress, colorClass = "bg-brand-primary", className = "" }) => {
  return (
    <div className={`h-1.5 w-full bg-brand-bg rounded-full overflow-hidden ${className}`}>
      <div 
        className={`h-full transition-all duration-1000 ease-out ${colorClass}`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

export default ProgressBar;
