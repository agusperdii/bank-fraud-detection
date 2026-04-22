import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { PieChart as PieIcon, AlertCircle, TrendingUp, Target } from 'lucide-react';
import SectionCard from '../components/molecules/SectionCard';

const CHART_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'];

const Analytics = ({ data }) => {
  const fraudRateData = [
    { name: 'CASH_OUT', rate: 0.18 },
    { name: 'TRANSFER', rate: 0.77 },
    { name: 'PAYMENT', rate: 0 },
    { name: 'CASH_IN', rate: 0 },
    { name: 'DEBIT', rate: 0 },
  ];

  return (
    <div className="animate-fade-in space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SectionCard title="Transaction Distribution" icon={PieIcon}>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data.types} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                  {data.types.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        
        <SectionCard title="Fraud Incident Vector (Count)" icon={AlertCircle}>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.fraud}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontWeight={800} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }} />
                <Bar dataKey="fraud" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 italic font-medium">
            *Note: Dataset menunjukkan konsentrasi fraud 100% pada metode penarikan dan transfer dana.
          </p>
        </SectionCard>

        <SectionCard title="Fraud Rate by Category (%)" subtitle="Percentage of fraudulent transactions within each type." icon={Target}>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fraudRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontWeight={800} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }} />
                <Bar dataKey="rate" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <div className="lg:col-span-1">
          <SectionCard title="Model Benchmark Comparison" subtitle="Recall & AUC-ROC metrics from cross-validation." icon={TrendingUp}>
            <div className="h-[350px] w-full mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.performance} layout="vertical" margin={{ left: 60, right: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" domain={[0.7, 1]} hide />
                  <YAxis dataKey="name" type="category" stroke="#fff" fontSize={14} fontWeight={900} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }} />
                  <Legend />
                  <Bar dataKey="auc" fill="#6366f1" name="AUC-ROC" radius={[0, 4, 4, 0]} barSize={15} />
                  <Bar dataKey="recall" fill="#f59e0b" name="Recall" radius={[0, 4, 4, 0]} barSize={15} />
                  <Bar dataKey="pr" fill="#10b981" name="PR-AUC" radius={[0, 4, 4, 0]} barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
