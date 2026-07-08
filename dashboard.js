document.addEventListener('DOMContentLoaded', () => {

    // 1. Sélection des éléments du DOM
    const tradeForm = document.getElementById('trade-form');
    const pairInput = document.getElementById('pair');
    const amountInput = document.getElementById('amount');
    const tradeList = document.getElementById('trade-list');
    const totalBalanceEl = document.getElementById('total-balance');
    const winRateEl = document.getElementById('win-rate');
    
    // Variable globale pour stocker l'instance du graphique Chart.js
    let performanceChart = null;

    // 2. FONCTIONNALITÉ 1 : Charger les données sauvegardées (LocalStorage) ou créer un tableau vide
    let trades = JSON.parse(localStorage.getItem('fx_trades')) || [];

    // 3. FONCTIONNALITÉ 2 : Initialiser ou mettre à jour le graphique Chart.js
    function updateChart() {
        const ctx = document.getElementById('performance-chart').getContext('2d');
        
        // Calculer l'évolution cumulée de la balance pas à pas
        let currentBalance = 0;
        const balanceHistory = trades.map(trade => {
            currentBalance += trade.amount;
            return currentBalance;
        });

        // Générer des étiquettes simples pour l'axe X (Trade 1, Trade 2...)
        const labels = trades.map((_, index) => `Trade ${index + 1}`);

        // Si le graphique existe déjà, on le détruit pour le recréer proprement avec les nouvelles valeurs
        if (performanceChart) {
            performanceChart.destroy();
        }

        // Configuration de la courbe Chart.js (Style TradingView)
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
                    tension: 0.2, // Légère courbe
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

    // 4. Mettre à jour les calculs de l'application
    function updateDashboard() {
        // Sauvegarde immédiate dans le navigateur à chaque changement
        localStorage.setItem('fx_trades', JSON.stringify(trades));

        // Calcul de la Balance Totale
        const total = trades.reduce((acc, trade) => acc + trade.amount, 0);
        totalBalanceEl.innerText = `${total.toFixed(2)} $`;
        totalBalanceEl.style.color = total >= 0 ? "#10b981" : "#ef4444";

        // Calcul du Win Rate
        const winningTrades = trades.filter(trade => trade.amount > 0).length;
        const winRate = trades.length > 0 ? (winningTrades / trades.length) * 100 : 0;
        winRateEl.innerText = `${winRate.toFixed(0)} %`;

        // Mettre à jour le graphique
        updateChart();
    }

    // 5. FONCTIONNALITÉ 3 : Afficher la liste avec option de suppression
    function renderTrades() {
        tradeList.innerHTML = '';

        trades.forEach(trade => {
            const li = document.createElement('li');
            const isWin = trade.amount >= 0;
            li.className = isWin ? 'trade-item win' : 'trade-item loss';

            // Structure HTML de la ligne intégrant un bouton poubelle "🗑️"
            li.innerHTML = `
                <div>
                    <span>🎯 ${trade.pair}</span>
                    <strong style="margin-left: 15px;">${isWin ? '+' : ''}${trade.amount.toFixed(2)} $</strong>
                </div>
                <button class="delete-btn" data-id="${trade.id}" style="background: none; border: none; cursor: pointer; font-size: 16px;">🗑️</button>
            `;
            
            tradeList.appendChild(li);
        });

        // Écouter les clics sur tous les boutons de suppression
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idToDelete = parseInt(e.target.getAttribute('data-id'));
                // On filtre pour enlever l'élément supprimé du tableau
                trades = trades.filter(trade => trade.id !== idToDelete);
                
                // On relance l'affichage complet
                renderTrades();
                updateDashboard();
            });
        });
    }

    // 6. Écouteur d'événement sur le formulaire
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

    // LOGIQUE DU PANNEAU D'INFORMATION 
    const infoBtn = document.getElementById('info-trigger-btn');
    const infoModal = document.getElementById('info-modal');
    const closeBtn = document.getElementById('close-info-btn');

    if(infoBtn && infoModal && closeBtn) {
        infoBtn.addEventListener('click', () => infoModal.classList.remove('hidden'));
        closeBtn.addEventListener('click', () => infoModal.classList.add('hidden'));
        window.addEventListener('click', (e) => { if (e.target === infoModal) infoModal.classList.add('hidden'); });
    }

    // Lancement automatique au chargement initial de la page
    renderTrades();
    updateDashboard();

});