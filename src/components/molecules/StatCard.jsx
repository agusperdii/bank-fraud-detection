import React from 'react';

const StatCard = ({ label, value, icon: Icon, color, trend }) => (
  <div className="bg-brand-surface p-5 rounded-2xl border border-brand-surfaceLight flex items-center gap-4 transition-all hover:border-brand-primary/30 min-w-0 h-full">
    <div className="p-3 rounded-xl shrink-0" style={{ backgroundColor: `${color}15` }}>
      {Icon && <Icon size={22} style={{ color }} />}
    </div>
    <div className="flex flex-col min-w-0 flex-1">
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-tight mb-1">
        {label}
      </span>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-xl font-extrabold text-slate-100 leading-none">
          {value}
        </span>
        {trend && (
          <span className={`text-[10px] font-bold shrink-0 ${trend.startsWith('+') ? 'text-brand-success' : 'text-slate-500'}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default StatCard;
