import React from 'react';
import { Database, Target, Zap, Globe, BookOpen, CheckCircle2, ChevronRight, Shield } from 'lucide-react';
import StatCard from '../components/molecules/StatCard';
import SectionCard from '../components/molecules/SectionCard';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';

const Overview = ({ onStartAnalysis }) => {
  return (
    <div className="animate-fade-in space-y-8 lg:space-y-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-brand-surface border border-brand-surfaceLight rounded-[2rem] lg:rounded-[3rem] p-8 lg:p-16 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-6 lg:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <Badge variant="info" className="px-4 py-1.5 ring-1 ring-brand-primary/20">
            <Zap size={12} fill="currentColor" className="mr-2" /> Neural Engine Active
          </Badge>
          
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight tracking-tighter uppercase text-white">
              <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent">FGD Kelompok 2</span>
            </h1>
            <p className="text-base lg:text-xl text-slate-400 font-bold tracking-tight leading-relaxed max-wxl">
              Comparative Analysis: <span className="bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">CatBoost</span> vs <span className="bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">TabPFN</span> for Bank Fraud Detection
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <Button onClick={onStartAnalysis} className="px-10 py-5 text-lg font-bold uppercase tracking-wider w-full sm:w-auto rounded-xl group">
              Start Analysis 
              <ChevronRight size={22} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
        
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] hidden lg:block" />
        <div className="absolute right-0 bottom-0 opacity-[0.05] pointer-events-none p-12">
          <Shield size={300} strokeWidth={0.5} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        <StatCard label="Total Records" value="6,362,620" icon={Database} color="#6366f1" trend="Full Dataset" />
        <StatCard label="Highest Recall" value="95.74%" icon={Target} color="#10b981" trend="CatBoost" />
        <StatCard label="Avg Latency" value="142ms" icon={Zap} color="#f59e0b" trend="Optimized" />
        <StatCard label="Fraud Density" value="0.13%" icon={Globe} color="#06b6d4" trend="Minority" />
      </div>

      {/* Technical Foundations */}
      <SectionCard title="Core Research Foundations" subtitle="Strategi penanganan data finansial berskala besar." icon={BookOpen}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 py-4">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-brand-success/10 text-brand-success rounded text-[9px] font-black uppercase tracking-wider">
              Data Processing
            </div>
            <h4 className="font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-lg">
              Imbalance Remediation
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Menggunakan metode <strong>SMOTEENN</strong> untuk mensintesis sampel minoritas sekaligus membersihkan batas tumpang tindih data, memastikan model dapat membedakan anomali dengan presisi tinggi.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded text-[9px] font-black uppercase tracking-wider">
              Engineering
            </div>
            <h4 className="font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-lg">
              Feature Architecture
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Melakukan ekstraksi perilaku transaksi melalui fitur <strong>senderTxnCount</strong> dan <strong>receiverTxnCount</strong> untuk menangkap frekuensi aktivitas yang mencurigakan.
            </p>
          </div>

          <div className="md:col-span-2 space-y-4 pt-8 border-t border-brand-surfaceLight">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-brand-warning/10 text-brand-warning rounded text-[9px] font-black uppercase tracking-wider">
              Algorithm Strategy
            </div>
            <h4 className="font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent text-xl">
              Ensemble Model Comparison
            </h4>
            <p className="text-slate-400 text-base leading-relaxed">
              Penelitian ini mengadu kekuatan optimasi <span className="text-white font-semibold">CatBoost + Optuna</span> dan kemampuan zero-shot learning dari <span className="text-white font-semibold">TabPFN</span> untuk menemukan performa terbaik dalam deteksi fraud perbankan.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default Overview;
