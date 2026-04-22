import React from 'react';

const Input = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  error,
  options = [],
  className = ""
}) => {
  const inputBaseClass = "input-field";
  
  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
          {label}
        </label>
      )}
      
      {type === 'select' ? (
        <select 
          name={name} 
          value={value} 
          onChange={onChange} 
          className={`${inputBaseClass} cursor-pointer`}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input 
          type={type} 
          name={name} 
          value={value} 
          onChange={onChange} 
          placeholder={placeholder}
          className={inputBaseClass} 
        />
      )}
      
      {error && <p className="text-[10px] font-bold text-brand-danger mt-1">{error}</p>}
    </div>
  );
};

export default Input;
