import React from 'react';
import { 
  Target, 
  Search, 
  Wand2, 
  Cpu, 
  BarChart3, 
  Rocket,
  Layers
} from 'lucide-react';
import SectionCard from '../components/molecules/SectionCard';

const Methodology = () => {
  const steps = [
    { 
      t: 'Business Understanding', 
      d: 'Menentukan tujuan deteksi fraud untuk meminimalkan kerugian finansial dan memahami kebutuhan sistem keamanan perbankan.', 
      i: Target 
    },
    { 
      t: 'Data Understanding', 
      d: 'Mengumpulkan dan mengeksplorasi data transaksi (6.3M+ record) untuk mengidentifikasi pola awal dan anomali pada fitur keuangan.', 
      i: Search 
    },
    { 
      t: 'Data Preparation', 
      d: 'Pembersihan data, rekayasa fitur, dan penanganan ketidakseimbangan kelas menggunakan SMOTEENN untuk mengoptimalkan performa model.', 
      i: Wand2 
    },
    { 
      t: 'Modeling', 
      d: 'Menerapkan arsitektur ensemble (CatBoost, TabPFN, FT-Transformer) untuk membangun mesin prediksi yang tangguh dan akurat.', 
      i: Cpu 
    },
    { 
      t: 'Evaluation', 
      d: 'Validasi model menggunakan metrik AUC-ROC, Recall, dan PR-AUC untuk memastikan sistem dapat menangkap fraud dengan presisi tinggi.', 
      i: BarChart3 
    },
    { 
      t: 'Deployment', 
      d: 'Integrasi model terbaik ke dalam sistem pemantauan real-time untuk penilaian risiko transaksi secara instan.', 
      i: Rocket 
    }
  ];

  return (
    <div className="animate-fade-in max-w-4xl">
      <SectionCard title="Siklus Proyek (CRISP-DM)" subtitle="Cross-Industry Standard Process for Data Mining" icon={Layers}>
        <div className="space-y-16 py-10 pl-4">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-10 group relative">
              <div className="flex flex-col items-center shrink-0">
                <div className="w-16 h-16 rounded-[1.25rem] bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                  <step.i size={28} />
                </div>
                {i < steps.length - 1 && <div className="w-[2px] flex-1 bg-gradient-to-b from-brand-primary/30 to-transparent my-6" />}
              </div>
              <div className="pt-2">
                <h4 className="text-xl font-black tracking-tight text-white mb-3 group-hover:text-brand-primary transition-colors">{step.t}</h4>
                <p className="text-slate-400 font-medium leading-relaxed text-base">{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default Methodology;
