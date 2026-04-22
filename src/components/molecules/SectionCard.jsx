import React from 'react';

const SectionCard = ({ title, subtitle, icon: Icon, children, className = "" }) => (
  <div className={`bg-brand-surface border border-brand-surfaceLight rounded-[2rem] lg:rounded-[3xl] p-6 lg:p-8 transition-all ${className}`}>
    {(title || Icon) && (
      <div className="mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-3">
          {Icon && <Icon size={22} className="text-brand-primary shrink-0" />}
          <h3 className="text-lg lg:text-xl font-black tracking-tight text-white uppercase">
            {title}
          </h3>
        </div>
        {subtitle && <p className="text-xs lg:text-sm text-slate-500 font-medium">{subtitle}</p>}
      </div>
    )}
    <div className="text-slate-400 leading-relaxed font-medium text-sm lg:text-base">
      {children}
    </div>
  </div>
);

export default SectionCard;
