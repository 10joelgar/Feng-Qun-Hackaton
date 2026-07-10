// Main UI Controls and Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
  // Dark Mode Toggle
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const currentTheme = localStorage.getItem('upc_theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('upc_theme', isDark ? 'dark' : 'light');
      themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }

  // Intersection Observer for scroll animations
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));

  // Counter animation for stats if present
  const stats = document.querySelectorAll('.stat-card h3');
  stats.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-target'));
    const isFloat = stat.getAttribute('data-target').includes('.');
    let current = 0;
    const increment = target / 50;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.innerText = isFloat ? current.toFixed(2).replace('.', ',') : Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        stat.innerText = stat.getAttribute('data-target').replace('.', ',');
      }
    };
    updateCounter();
  });
});