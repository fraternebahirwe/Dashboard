import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Enregistrement des composants requis pour Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [trades, setTrades] = useState([]);
  const [pair, setPair] = useState('');
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Soumission d'un nouveau trade
  const handleRecordTrade = (e) => {
    e.preventDefault();
    if (!pair || !amount) return;

    const numericAmount = parseFloat(amount);
    const newTrade = {
      id: Date.now(),
      pair: pair.toUpperCase(),
      amount: numericAmount,
      type: numericAmount >= 0 ? 'win' : 'loss'
    };

    setTrades([newTrade, ...trades]);
    setPair('');
    setAmount('');
  };

  // Suppression d'un trade
  const handleDeleteTrade = (id) => {
    setTrades(trades.filter(trade => trade.id !== id));
  };

  // Calculs financiers dynamiques
  const totalBalance = trades.reduce((sum, t) => sum + t.amount, 0);
  const totalWins = trades.filter(t => t.type === 'win').length;
  const winRate = trades.length > 0 ? Math.round((totalWins / trades.length) * 100) : 0;

  // Configuration des données du graphique (Capital Curve Matrix)
  const getChartData = () => {
    let currentBalance = 0;
    // On inverse l'ordre pour afficher la courbe chronologiquement (du plus vieux au plus récent)
    const dataPoints = [...trades].reverse().map(t => {
      currentBalance += t.amount;
      return currentBalance;
    });

    const labels = [...trades].reverse().map((_, index) => `Trade ${index + 1}`);

    return {
      labels: labels.length > 0 ? labels : ['Start'],
      datasets: [
        {
          label: 'Capital Growth ($)',
          data: dataPoints.length > 0 ? dataPoints : [0],
          borderColor: '#2f81f7',
          backgroundColor: 'rgba(47, 129, 247, 0.1)',
          borderWidth: 3,
          pointBackgroundColor: '#2f81f7',
          pointBorderColor: '#fff',
          pointHoverRadius: 6,
          tension: 0.3, // Rend la courbe lisse et organique
          fill: true
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { grid: { color: 'rgba(48, 54, 61, 0.2)' }, ticks: { color: '#8b949e' } },
      y: { grid: { color: 'rgba(48, 54, 61, 0.2)' }, ticks: { color: '#8b949e' } }
    }
  };

  return (
    <div className="dashboard-container">
      {/* Premium Glassmorphism Informational Modal Overlay */}
      {isModalOpen && (
        <div className="info-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsModalOpen(false)} aria-label="Close Guide">&times;</button>
            <h2>💡 Quick Trader's Guide</h2>
            
            <div className="guide-item">
              <h3>💱 Currency Pair</h3>
              <p>This is the matchup between two currencies. Type the standard abbreviations. <br /><strong>Examples:</strong> EUR/USD, BTC/USD, GBP/JPY.</p>
            </div>

            <div className="guide-item">
              <h3>📈 Profit and Loss ($)</h3>
              <p>Enter your precise session result here:<br />
              • If you <strong>won</strong>: enter the integer normally (e.g., <code>150</code>).<br />
              • If you <strong>lost</strong>: put a negative sign in front (e.g., <code>-50</code>).</p>
            </div>

            <div className="guide-item">
              <h3>🧠 Neural Logic Engine</h3>
              <p>The client-side architecture records telemetry data in the background to dynamically index your capital curve balance, win rate metrics, and render immediate performance status indicators.</p>
            </div>
          </div>
        </div>
      )}

      {/* Executive Asymmetrical Header Section */}
      <header>
        <div>
          <h1>
            <span className="title-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#2f81f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </span> 
            FX Budget Dashboard
          </h1>
          <p>Performance analytics & smart data-driven risk management</p>
        </div>

        <button className="info-btn" onClick={() => setIsModalOpen(true)} title="How does it work?">🌙</button>
      </header>
      
      {/* Premium TradingView-Style Interactive Chart Workspace */}
      <section className="form-section chart-section" style={{ marginBottom: '30px', padding: '24px', borderRadius: '16px' }}>
        <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
          <span className="title-icon" style={{ padding: '5px', borderRadius: '6px', marginRight: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </span>
          Capital Evolution Curve
        </h2>
        <div className="chart-container" style={{ position: 'relative', width: 100 + '%', height: '250px' }}>
          <Line data={getChartData()} options={chartOptions} />
        </div>
      </section>

      {/* Intelligent High-End Statistics Matrix */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Net Balance</h3>
          <p id="total-balance" style={{ color: totalBalance >= 0 ? '#10b981' : '#f43f5e' }}>
            {totalBalance.toFixed(2)} $
          </p>
        </div>
        <div className="stat-card">
          <h3>Calculated Win Rate</h3>
          <p id="win-rate">{winRate} %</p>
        </div>
      </section>

      {/* Pro Split UI Grid Screen Workspace */}
      <main className="main-content">
        <section className="form-section">
          <h2>Add New Trade Entry</h2>
          <form onSubmit={handleRecordTrade} autoComplete="off">
            <label htmlFor="pair">Target Asset / Currency Pair:</label>
            <input 
              type="text" 
              id="pair" 
              placeholder="e.g., EUR/USD" 
              value={pair} 
              onChange={(e) => setPair(e.target.value)} 
              required 
            />

            <label htmlFor="amount">Session Yield / PnL ($):</label>
            <input 
              type="number" 
              step="0.01" 
              id="amount" 
              placeholder="e.g., 150 or -50" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />

            <button type="submit">Commit Trade to Ledger</button>
          </form>
        </section>

        <section className="history-section">
          <h2>Real-Time Session History</h2>
          <ul id="trade-list">
            {trades.map((trade) => (
              <li key={trade.id} className={`trade-item ${trade.type}`}>
                <span>{trade.pair}</span>
                <div>
                  <strong>{trade.amount >= 0 ? `+${trade.amount}` : trade.amount} $</strong>
                  <button className="delete-btn" onClick={() => handleDeleteTrade(trade.id)} style={{ background: 'none', border: 'none', color: '#f43f5e', marginLeft: '15px', cursor: 'pointer' }}>
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}