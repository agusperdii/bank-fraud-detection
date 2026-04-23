import React from 'react';
import { Shield, Info, AlertTriangle, Activity } from 'lucide-react';
import SectionCard from '../components/molecules/SectionCard';
import PredictorResult from '../components/molecules/PredictorResult';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const Predictor = ({ formData, handleChange, handlePredict, loading, results, error }) => {
  const fields = [
    { label: 'Time Step', name: 'step', type: 'number' },
    { label: 'Amount ($)', name: 'amount', type: 'number' },
    { label: 'Origin Balance Delta', name: 'balanceDiffOrig', type: 'number' },
    { label: 'Dest Balance Delta', name: 'balanceDiffDest', type: 'number' },
    { label: 'Sender TxnCount', name: 'senderTxnCount', type: 'number' },
    { label: 'Receiver TxnCount', name: 'receiverTxnCount', type: 'number' },
  ];

  const txnTypes = ['CASH_IN', 'CASH_OUT', 'DEBIT', 'PAYMENT', 'TRANSFER'].map(t => ({ label: t, value: t }));
  const currentTxnType = Object.keys(formData).find(k => k.startsWith('type_') && formData[k] === 1)?.replace('type_', '') || 'TRANSFER';

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Left Column: Form */}
      <div>
        <SectionCard title="Transaction Forensics" subtitle="Input telemetry for real-time risk assessment." icon={Info}>
          <form onSubmit={(e) => { e.preventDefault(); handlePredict(); }} className="space-y-6 lg:space-y-8 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {fields.map(f => (
                <Input 
                  key={f.name}
                  label={f.label}
                  name={f.name}
                  type={f.type}
                  value={formData[f.name]}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              ))}
              <Input 
                label="Transaction Category"
                name="txn_type"
                type="select"
                value={currentTxnType}
                onChange={handleChange}
                options={txnTypes}
              />
              <Input 
                label="Destination Entity"
                name="destIsMerchant"
                type="select"
                value={formData.destIsMerchant}
                onChange={handleChange}
                options={[
                  { label: 'Peer-to-Peer Wallet', value: 0 },
                  { label: 'Registered Merchant', value: 1 }
                ]}
              />
            </div>
            
            <Button 
              type="submit" 
              loading={loading}
              className="w-full py-5 text-lg shadow-xl shadow-brand-primary/30"
            >
              <Shield size={24} className="mr-2" /> Execute Analysis
            </Button>
          </form>
          
          <div className="mt-8 p-4 lg:p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-2xl flex gap-4 items-start">
            <Info size={24} className="text-brand-primary shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-tight">Intelligence Insight</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Berdasarkan analisis historis **6.3M+ transaksi**, insiden fraud hanya ditemukan pada tipe <strong className="text-brand-accent">TRANSFER</strong> dan <strong className="text-brand-accent">CASH_OUT</strong>. Tipe transaksi lain secara historis memiliki risiko 0%.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
      
      {/* Right Column: Results */}
      <div className="space-y-6">
        <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] pl-4">Ensemble Output</h3>
        
        <div className="space-y-4">
          {error && (
            <div className="p-6 bg-brand-danger/10 border border-brand-danger/20 rounded-3xl text-brand-danger text-sm font-bold flex items-center gap-3 animate-slide-up">
              <AlertTriangle size={20} /> {error}
            </div>
          )}

          {!results && !loading && !error && (
            <div className="h-[300px] lg:h-[500px] border-2 border-dashed border-brand-surfaceLight rounded-[2rem] lg:rounded-[3rem] flex flex-col items-center justify-center text-slate-500 text-center p-6 lg:p-10 opacity-60">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6">
                <Activity size={32} className="animate-pulse" />
              </div>
              <p className="font-black uppercase tracking-widest text-[10px] mb-2 text-slate-400">Scanner Standby</p>
              <span className="text-[11px] lg:text-xs font-medium leading-relaxed max-w-[200px]">Awaiting telemetry for neural cross-validation.</span>
            </div>
          )}

          {results && results.map((res, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <PredictorResult 
                modelName={res.model_name} 
                isFraud={res.is_fraud} 
                probability={res.probability} 
                isDemo={res.is_demo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Predictor;
