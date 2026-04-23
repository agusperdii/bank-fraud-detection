import React from 'react';
import Badge from '../atoms/Badge';
import ProgressBar from '../atoms/ProgressBar';

const PredictorResult = ({ modelName, isFraud, probability, isDemo }) => {
  const variant = isFraud ? 'danger' : 'success';
  const label = isFraud ? 'HIGH RISK' : 'CLEAN';
  const colorClass = isFraud ? 'bg-brand-danger' : 'bg-brand-success';
  const textColor = isFraud ? 'text-brand-danger' : 'text-brand-success';
  const bgColor = isFraud ? 'bg-brand-danger/5' : 'bg-brand-success/5';
  
  return (
    <div className={`p-6 rounded-2xl border ${isFraud ? 'border-brand-danger/30' : 'border-brand-success/30'} ${bgColor} transition-all relative overflow-hidden`}>
      {/* Indicator Overlay - Only show when using heuristics/demo */}
      {isDemo && (
        <div className="absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest bg-brand-warning/20 text-brand-warning">
          Heuristic Backup
        </div>
      )}

      <div className="flex justify-between items-start mb-6 pt-2">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">
            Analytic Engine
          </span>
          <h4 className="text-sm font-extrabold text-white">{modelName}</h4>
        </div>
        <Badge variant={variant} className="py-2 px-4 shadow-sm">{label}</Badge>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Risk Probability</span>
            <div className={`text-3xl font-black tracking-tighter ${textColor}`}>
              {(probability * 100).toFixed(2)}%
            </div>
          </div>
          <div className="text-[10px] font-bold text-slate-500 uppercase pb-1 text-right">
            Neural Confidence
          </div>
        </div>
        
        <ProgressBar progress={probability * 100} colorClass={colorClass} className="h-2" />
      </div>
    </div>
  );
};

export default PredictorResult;
