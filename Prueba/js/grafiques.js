let qtyChart, statusChart;

window.initCharts = function(data) {
  const ctxQty = document.getElementById('qtyChart');
  const ctxStatus = document.getElementById('statusChart');
  if (!ctxQty || !ctxStatus) return;

  const labels = data.map(item => item.nom);
  const quantities = data.map(item => item.quantitat);

  // Status aggregation counters
  const statusCounts = { 'Disponible': 0, 'Poc stock': 0, 'Esgotat': 0 };
  data.forEach(item => statusCounts[item.estat]++);

  qtyChart = new Chart(ctxQty, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Quantitat en kg',
        data: quantities,
        backgroundColor: '#00519B',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  });

  statusChart = new Chart(ctxStatus, {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusCounts),
      datasets: [{
        data: Object.values(statusCounts),
        backgroundColor: ['#2A7B4C', '#f59e0b', '#ef4444']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
};

window.updateChartsData = function(data) {
  if (!qtyChart || !statusChart) return;
  
  qtyChart.data.datasets[0].data = data.map(item => item.quantitat);
  qtyChart.update();

  const statusCounts = { 'Disponible': 0, 'Poc stock': 0, 'Esgotat': 0 };
  data.forEach(item => statusCounts[item.estat]++);
  statusChart.data.datasets[0].data = Object.values(statusCounts);
  statusChart.update();
};