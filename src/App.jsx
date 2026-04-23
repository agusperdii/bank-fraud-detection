import React, { useState, useMemo } from 'react';
import axios from 'axios';
import Sidebar from './components/organisms/Sidebar';
import Header from './components/organisms/Header';
import Overview from './pages/Overview';
import Predictor from './pages/Predictor';
import Analytics from './pages/Analytics';
import Methodology from './pages/Methodology';

const API_BASE_URL = 'https://backend-bank-fraud.vercel.app';
const TABPFN_API_URL = 'https://be-tabpfn.vercel.app';

const App = () => {
  const [currentTab, setCurrentTab] = useState('overview');
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]); // Initialize as empty array
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    step: 200, amount: 50000.0, balanceDiffOrig: 50000.0, balanceDiffDest: -50000.0,
    destIsMerchant: 0, senderTxnCount: 5, receiverTxnCount: 10,
    type_CASH_IN: 0, type_CASH_OUT: 0, type_DEBIT: 0, type_PAYMENT: 0, type_TRANSFER: 1,
  });

  const handlePredict = async () => {
    setLoading(true);
    setResults([]); // Clear previous results
    setError(null);

    // Call CatBoost (Fast)
    const catboostPromise = axios.post(`${API_BASE_URL}/predict/catboost`, formData)
      .then(res => {
        setResults(prev => [...prev.filter(r => r.model_name !== 'CatBoost (Optuna)'), res.data]);
        return res.data;
      })
      .catch(err => {
        console.error('CatBoost Error:', err);
        return null;
      });

    // Call TabPFN (Slow) with retry
    const tabpfnPromise = axios.post(`${TABPFN_API_URL}/predict`, formData)
      .then(res => {
        const resData = Array.isArray(res.data) ? res.data[0] : res.data;
        const data = {
          model_name: "TabPFN (Cloud)",
          is_fraud: !!resData.is_fraud,
          probability: parseFloat(resData.probability) || 0,
          is_demo: false
        };
        setResults(prev => [...prev.filter(r => r.model_name !== 'TabPFN (Cloud)'), data]);
        return data;
      })
      .catch(async err => {
        console.warn('TabPFN first attempt failed, retrying...', err);
        try {
          const retryRes = await axios.post(`${TABPFN_API_URL}/predict`, formData);
          const resData = Array.isArray(retryRes.data) ? retryRes.data[0] : retryRes.data;
          const data = {
            model_name: "TabPFN (Cloud)",
            is_fraud: !!resData.is_fraud,
            probability: parseFloat(resData.probability) || 0,
            is_demo: false
          };
          setResults(prev => [...prev.filter(r => r.model_name !== 'TabPFN (Cloud)'), data]);
          return data;
        } catch (retryErr) {
          console.error('TabPFN Retry failed:', retryErr);
          return null;
        }
      });

    try {
      // Wait for at least one to succeed or both to finish
      await Promise.allSettled([catboostPromise, tabpfnPromise]);
      
      // If no results after both finish, set error
      setResults(prev => {
        if (prev.length === 0) setError('Unable to reach predictive engines. Please check connection.');
        return prev;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (name === 'txn_type') {
      const types = ['CASH_IN', 'CASH_OUT', 'DEBIT', 'PAYMENT', 'TRANSFER'];
      const updated = { ...formData };
      types.forEach(t => updated[`type_${t}`] = t === value ? 1 : 0);
      setFormData(updated);
    } else {
      setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'number' ? parseFloat(value) || 0 : value 
      }));
    }
  };

  const analyticsData = useMemo(() => ({
    types: [
      { name: 'CASH_OUT', value: 2237500 }, { name: 'PAYMENT', value: 2151495 },
      { name: 'CASH_IN', value: 1399284 }, { name: 'TRANSFER', value: 532909 }, { name: 'DEBIT', value: 41432 },
    ],
    fraud: [
      { name: 'CASH_OUT', fraud: 4116 }, { name: 'TRANSFER', fraud: 4097 },
      { name: 'PAYMENT', fraud: 0 }, { name: 'CASH_IN', fraud: 0 }, { name: 'DEBIT', fraud: 0 },
    ],
    performance: [
      { name: 'TabPFN', auc: 0.9949, recall: 0.9000, pr: 0.8084 },
      { name: 'CatBoost', auc: 0.9936, recall: 0.9574, pr: 0.7440 },
    ]
  }), []);

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <Overview onStartAnalysis={() => setCurrentTab('predictor')} />;
      case 'predictor':
        return (
          <Predictor 
            formData={formData} 
            handleChange={handleChange} 
            handlePredict={handlePredict} 
            loading={loading}
            results={results}
            error={error}
          />
        );
      case 'analytics':
        return <Analytics data={analyticsData} />;
      case 'methodology':
        return <Methodology />;
      default:
        return <Overview onStartAnalysis={() => setCurrentTab('predictor')} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-brand-bg text-slate-100 font-sans selection:bg-brand-primary/30">
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        collapsed={isSidebarCollapsed} 
        setCollapsed={setSidebarCollapsed}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      <main 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}
      >
        <Header 
          title={currentTab} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-[1400px] mx-auto p-6 lg:p-10 space-y-10">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
