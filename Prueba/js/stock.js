document.addEventListener('DOMContentLoaded', () => {
  let stockData = [];
  const stockTableBody = document.getElementById('stockTableBody');
  const searchInput = document.getElementById('stockSearch');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let currentFilter = 'all';

  async function loadStock() {
    try {
      // Simulate reading data structure
      const response = await fetch('data/stock.json');
      stockData = await response.json();
      renderStock();
      if(typeof initCharts === 'function') initCharts(stockData);
    } catch (e) {
      console.error("Error carregant estoc lineal:", e);
    }
  }

  function renderStock() {
    if (!stockTableBody) return;
    stockTableBody.innerHTML = '';
    const query = searchInput ? searchInput.value.toLowerCase() : '';

    stockData.forEach(item => {
      if (query && !item.nom.toLowerCase().includes(query)) return;
      
      // Filter mapping
      if (currentFilter === 'disponible' && item.estat !== 'Disponible') return;
      if (currentFilter === 'poc' && item.estat !== 'Poc stock') return;
      if (currentFilter === 'esgotat' && item.estat !== 'Esgotat') return;

      let badgeClass = 'pulse-badge';
      if (item.estat === 'Poc stock') badgeClass += ' warning';
      if (item.estat === 'Esgotat') badgeClass += ' danger';

      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid var(--border-color)';
      row.innerHTML = `
        <td style="padding:16px; font-weight:600;">${item.nom}</td>
        <td style="padding:16px;">${item.quantitat} kg</td>
        <td style="padding:16px;"><span class="${badgeClass}"></span> ${item.estat}</td>
        <td style="padding:16px; color:var(--text-muted);">${item.categoria}</td>
      `;
      stockTableBody.appendChild(row);
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderStock);

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.style.opacity = '0.6');
      btn.style.opacity = '1';
      currentFilter = btn.getAttribute('data-filter');
      renderStock();
    });
  });

  // Automated real-time inventory simulation updates
  setInterval(() => {
    if (stockData.length > 0) {
      const randomIndex = Math.floor(Math.random() * stockData.length);
      if (stockData[randomIndex].quantitat > 0) {
        stockData[randomIndex].quantitat -= Math.floor(Math.random() * 3);
        if(stockData[randomIndex].quantitat <= 0) {
          stockData[randomIndex].quantitat = 0;
          stockData[randomIndex].estat = "Esgotat";
        } else if (stockData[randomIndex].quantitat < 30) {
          stockData[randomIndex].estat = "Poc stock";
        }
        renderStock();
        if(typeof window.updateChartsData === 'function') window.updateChartsData(stockData);
      }
    }
  }, 4000);

  loadStock();
});