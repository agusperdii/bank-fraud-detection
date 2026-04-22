import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled, 
  loading, 
  className = '', 
  icon: Icon,
  type = 'button'
}) => {
  const variants = {
    primary: 'btn-primary',
    danger: 'px-6 py-3 bg-brand-danger text-white font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-danger/20',
    secondary: 'px-6 py-3 bg-brand-surfaceLight text-slate-100 font-bold rounded-xl flex items-center gap-2 transition-all hover:bg-brand-surfaceLight/80 active:scale-95 disabled:opacity-50',
    ghost: 'px-6 py-3 bg-transparent text-slate-400 font-bold rounded-xl flex items-center gap-2 transition-all hover:bg-white/5 active:scale-95 disabled:opacity-50',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${variants[variant]} ${className} justify-center`}
    >
      {loading ? (
        <span className="animate-spin inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
