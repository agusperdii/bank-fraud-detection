import React, { useState } from 'react';
import axios from 'axios';
import { Shield, ShieldAlert, ShieldCheck, RefreshCw, AlertTriangle, Info, CreditCard, User, Landmark, HelpCircle } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000';

const App = () => {
  const [formData, setFormData] = useState({
    step: 200,
    amount: 50000.0,
    balanceDiffOrig: 50000.0,
    balanceDiffDest: -50000.0,
    destIsMerchant: 0,
    senderTxnCount: 5,
    receiverTxnCount: 10,
    type_CASH_IN: 0,
    type_CASH_OUT: 0,
    type_DEBIT: 0,
    type_PAYMENT: 0,
    type_TRANSFER: 1,
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    
    if (type === 'number') finalValue = parseFloat(value);
    if (name === 'txn_type') {
      const types = ['CASH_IN', 'CASH_OUT', 'DEBIT', 'PAYMENT', 'TRANSFER'];
      const newTypeData = { ...formData };
      types.forEach(t => {
        newTypeData[`type_${t}`] = t === value ? 1 : 0;
      });
      setFormData(newTypeData);
      return;
    }
    
    setFormData({
      ...formData,
      [name]: finalValue,
    });
  };

  const getTxnType = () => {
    if (formData.type_CASH_IN) return 'CASH_IN';
    if (formData.type_CASH_OUT) return 'CASH_OUT';
    if (formData.type_DEBIT) return 'DEBIT';
    if (formData.type_PAYMENT) return 'PAYMENT';
    if (formData.type_TRANSFER) return 'TRANSFER';
    return 'TRANSFER';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/predict`, formData);
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError('Gagal menghubungi server backend. Pastikan FastAPI sedang berjalan.');
    } finally {
      setLoading(false);
    }
  };

  const modelColors = {
    "CatBoost (Optuna)": "#f59e0b",
    "FT-Transformer (Optuna)": "#8b5cf6",
    "TabPFN (Zero-Shot)": "#10b981",
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}><Shield size={32} /> Fraud Detection Platform</h1>
        <p style={styles.subtitle}>Sistem Deteksi Fraud Perbankan Real-time berbasis AI</p>
      </header>

      <div style={styles.mainLayout}>
        {/* Form Section */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}><Info size={20} /> Input Detail Transaksi</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGrid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Step (Unit Waktu)</label>
                <input type="number" name="step" value={formData.step} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Amount (Jumlah)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Tujuan Merchant?</label>
                <select name="destIsMerchant" value={formData.destIsMerchant} onChange={handleChange} style={styles.input}>
                  <option value={0}>Tidak</option>
                  <option value={1}>Ya</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Tipe Transaksi</label>
                <select name="txn_type" value={getTxnType()} onChange={handleChange} style={styles.input}>
                  <option value="CASH_IN">CASH_IN</option>
                  <option value="CASH_OUT">CASH_OUT</option>
                  <option value="DEBIT">DEBIT</option>
                  <option value="PAYMENT">PAYMENT</option>
                  <option value="TRANSFER">TRANSFER</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Balance Diff Origin</label>
                <input type="number" name="balanceDiffOrig" value={formData.balanceDiffOrig} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Balance Diff Dest</label>
                <input type="number" name="balanceDiffDest" value={formData.balanceDiffDest} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Sender Txn Count</label>
                <input type="number" name="senderTxnCount" value={formData.senderTxnCount} onChange={handleChange} style={styles.input} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Receiver Txn Count</label>
                <input type="number" name="receiverTxnCount" value={formData.receiverTxnCount} onChange={handleChange} style={styles.input} />
              </div>
            </div>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? <RefreshCw className="spin" size={20} /> : 'Jalankan Analisis Fraud'}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div style={styles.resultsPanel}>
          {error && <div style={styles.errorBox}>{error}</div>}
          
          {!results && !loading && !error && (
            <div style={styles.emptyState}>
              <HelpCircle size={48} opacity={0.3} />
              <p>Masukkan data transaksi untuk memulai analisis.</p>
            </div>
          )}

          {results && (
            <div style={styles.resultsGrid}>
              {results.map((res, index) => (
                <div key={index} style={{
                  ...styles.resultCard,
                  borderColor: res.is_fraud ? '#ef4444' : '#10b981',
                  background: res.is_fraud ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)'
                }}>
                  <div style={styles.modelHeader}>
                    <span style={{ color: modelColors[res.model_name] }}>●</span> {res.model_name}
                  </div>
                  <div style={styles.resultMain}>
                    {res.is_fraud ? 
                      <div style={styles.fraudLabel}><ShieldAlert size={24} /> FRAUD</div> : 
                      <div style={styles.legitLabel}><ShieldCheck size={24} /> LEGIT</div>
                    }
                    <div style={styles.probValue}>{(res.probability * 100).toFixed(2)}% Prob</div>
                    {res.is_demo && <span style={styles.demoBadge}>Simulation Mode</span>}
                  </div>
                  <div style={styles.progressBarBg}>
                    <div style={{
                      ...styles.progressBar,
                      width: `${res.probability * 100}%`,
                      backgroundColor: res.is_fraud ? '#ef4444' : '#10b981'
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    color: '#e2e8f0',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    margin: '0 0 10px 0',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '1.1rem',
    margin: 0,
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '30px',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #334155',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#f8fafc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '0.875rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '10px 12px',
    color: '#f1f5f9',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    marginTop: '10px',
    backgroundColor: '#6366f1',
    color: 'white',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  resultsPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '15px',
  },
  resultCard: {
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid transparent',
    transition: 'transform 0.2s',
  },
  modelHeader: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  resultMain: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  fraudLabel: {
    color: '#ef4444',
    fontSize: '1.5rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  legitLabel: {
    color: '#10b981',
    fontSize: '1.5rem',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  probValue: {
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  demoBadge: {
    fontSize: '0.7rem',
    backgroundColor: '#334155',
    padding: '4px 8px',
    borderRadius: '999px',
    color: '#cbd5e1',
  },
  progressBarBg: {
    height: '8px',
    backgroundColor: '#0f172a',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    transition: 'width 0.5s ease-out',
  },
  emptyState: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#475569',
    gap: '10px',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #ef4444',
    marginBottom: '20px',
  }
};

export default App;
