import React from 'react';

const Badge = ({ children, variant = 'info', animate = false, className = "" }) => {
  const variants = {
    info: 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary',
    success: 'bg-brand-success/10 border-brand-success/20 text-brand-success',
    danger: 'bg-brand-danger/10 border-brand-danger/20 text-brand-danger',
    warning: 'bg-brand-warning/10 border-brand-warning/20 text-brand-warning',
  };

  const dotColors = {
    info: 'bg-brand-primary',
    success: 'bg-brand-success',
    danger: 'bg-brand-danger',
    warning: 'bg-brand-warning',
  };

  return (
    <div className={`border px-4 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${variants[variant]} ${className}`}>
      <div className={`w-2 h-2 rounded-full ${dotColors[variant]} ${animate ? 'animate-pulse' : ''}`} />
      {children}
    </div>
  );
};

export default Badge;
