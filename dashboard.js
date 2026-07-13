document.addEventListener('DOMContentLoaded', () => {

    // 1. DOM Elements Selection
    const tradeForm = document.getElementById('trade-form');
    const pairInput = document.getElementById('pair');
    const amountInput = document.getElementById('amount');
    const tradeList = document.getElementById('trade-list');
    const totalBalanceEl = document.getElementById('total-balance');
    const winRateEl = document.getElementById('win-rate');
    
    // Global variable to store the Chart.js instance
    let performanceChart = null;

    // 2. FEATURE 1: Load saved data (LocalStorage) or create an empty array
    let trades = JSON.parse(localStorage.getItem('fx_trades')) || [];

    // 3. FEATURE 2: Initialize or update the Chart.js chart
    function updateChart() {
        const ctx = document.getElementById('performance-chart').getContext('2d');
        
        // Calculate the cumulative evolution of the balance step by step
        let currentBalance = 0;
        const balanceHistory = trades.map(trade => {
            currentBalance += trade.amount;
            return currentBalance;
        });

        // Generate simple labels for the X-axis (Trade 1, Trade 2...)
        const labels = trades.map((_, index) => `Trade ${index + 1}`);

        // If the chart already exists, destroy it to cleanly recreate it with the new values
        if (performanceChart) {
            performanceChart.destroy();
        }

        // Chart.js curve configuration (TradingView Style)
        performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Balance ($)',
                    data: balanceHistory,
                    borderColor: '#58a6ff',
                    backgroundColor: 'rgba(88, 166, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.2, // Slight curve
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: '#30363d' }, ticks: { color: '#8b949e' } },
                    y: { grid: { color: '#30363d' }, ticks: { color: '#8b949e' } }
                }
            }
        });
    }

    // 4. Update application calculations
    function updateDashboard() {
        // Immediate backup in the browser on every change
        localStorage.setItem('fx_trades', JSON.stringify(trades));

        // Total Balance Calculation
        const total = trades.reduce((acc, trade) => acc + trade.amount, 0);
        totalBalanceEl.innerText = `${total.toFixed(2)} $`;
        totalBalanceEl.style.color = total >= 0 ? "#10b981" : "#ef4444";

        // Win Rate Calculation
        const winningTrades = trades.filter(trade => trade.amount > 0).length;
        const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0;
        winRateEl.innerText = `${winRate.toFixed(0)} %`;

        // Update the chart
        updateChart();
    }

    // 5. FEATURE 3: Render the list with a delete option
    function renderTrades() {
        tradeList.innerHTML = '';

        trades.forEach(trade => {
            const li = document.createElement('li');
            const isWin = trade.amount >= 0;
            li.className = isWin ? 'trade-item win' : 'trade-item loss';

            // HTML structure of the row integrating a trash can delete button "🗑️"
            li.innerHTML = `
                <div>
                    <span>🎯 ${trade.pair}</span>
                    <strong style="margin-left: 15px;">${isWin ? '+' : ''}${trade.amount.toFixed(2)} $</strong>
                </div>
                <button class="delete-btn" data-id="${trade.id}" style="background: none; border: none; cursor: pointer; font-size: 16px;">🗑️</button>
            `;
            
            tradeList.appendChild(li);
        });

        // Listen for clicks on all delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = parseInt(e.target.getAttribute('data-id'));
                // Filter out the deleted item from the array
                trades = trades.filter(trade => trade.id !== idToDelete);
                
                // Relaunch the complete rendering
                renderTrades();
                updateDashboard();
            });
        });
    }

    // 6. Form Event Listener
    tradeForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newTrade = {
            id: Date.now(),
            pair: pairInput.value.toUpperCase(),
            amount: parseFloat(amountInput.value)
        };

        trades.push(newTrade);
        tradeForm.reset();

        renderTrades();
        updateDashboard();
    });

    // INFORMATION PANEL LOGIC 
    const infoBtn = document.getElementById('info-trigger-btn');
    const infoModal = document.getElementById('info-modal');
    const closeBtn = document.getElementById('close-info-btn');

    if(infoBtn && infoModal && closeBtn) {
        infoBtn.addEventListener('click', () => infoModal.classList.remove('hidden'));
        closeBtn.addEventListener('click', () => infoModal.classList.add('hidden'));
        window.addEventListener('click', (e) => { if (e.target === infoModal) infoModal.classList.add('hidden'); });
    }

    // Automatic launch upon initial page load
    renderTrades();
    updateDashboard();

});